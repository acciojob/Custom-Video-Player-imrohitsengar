/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
toggle.addEventListener("click", (e) => {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚ ❚";
  } else {
    video.pause();
    toggle.textContent = "►";
  }
});
ranges[0].addEventListener("input", (e) => {
  video.volume = Number(ranges[0].value);
});
ranges[1].addEventListener("input", (e) => {
  video.playbackRate = Number(ranges[1].value);
});
skipButtons[0].addEventListener("click", (e) => {
  video.currentTime += Number(skipButtons[0].dataset.skip);
});
skipButtons[1].addEventListener("click", (e) => {
  video.currentTime += Number(skipButtons[1].dataset.skip);
});
video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚ ❚";
  } else {
    video.pause();
    toggle.textContent = "►";
  }
});

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

video.addEventListener("timeupdate", handleProgress);

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  handleProgress();
}

progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
window.addEventListener("mouseup", () => (mousedown = false));

