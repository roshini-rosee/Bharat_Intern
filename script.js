const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const toggleAudioButton = document.getElementById('toggle-audio-button');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
let isAudioEnabled = true;

// Function to start the video stream
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      localVideo.srcObject = stream;
    })
    .catch(error => {
      console.error('Error accessing video stream:', error);
    });
}

// Function to stop the video stream
function stopVideo() {
  const stream = localVideo.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(track => {
    track.stop();
  });

  localVideo.srcObject = null;
}

// Function to toggle audio
function toggleAudio() {
  const stream = localVideo.srcObject;
  const audioTracks = stream.getAudioTracks();

  audioTracks.forEach(track => {
    track.enabled = !isAudioEnabled;
  });

  isAudioEnabled = !isAudioEnabled;
  toggleAudioButton.innerText = isAudioEnabled ? 'Mute Audio' : 'Unmute Audio';
}

// Add event listeners to the buttons
startButton.addEventListener('click', startVideo);
stopButton.addEventListener('click', stopVideo);
toggleAudioButton.addEventListener('click', toggleAudio);