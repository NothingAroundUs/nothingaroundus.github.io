function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const offset = section.offsetTop - 70;
  const duration = 1000;

  const start = window.scrollY;
  const startTime = performance.now();

  function step(time) {
    const elapsed = time - startTime;
    window.scrollTo(0, easeInOutQuad(elapsed, start, offset, duration));
    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(step);
}

function toggleDescription(descriptionId, toggleId) {
  const description = document.getElementById(descriptionId);
  const toggle = document.getElementById(toggleId);
  const item = description.closest('.portfolio-item');
  const siblingItems = Array.from(item.parentElement.children).filter((el) => el !== item);

  const isActive = item.classList.contains('active');

  if (!isActive) {
    item.classList.add('active');
    toggle.classList.add('rotate');
    description.style.maxHeight = description.scrollHeight + 'px';
    siblingItems.forEach((element) => {
      if (element.offsetTop > item.offsetTop) {
        element.style.transition = 'margin-top 0.3s ease-in-out';
        element.style.marginTop = description.scrollHeight + 'px';
      }
    });
  } else {
    item.classList.remove('active');
    toggle.classList.remove('rotate');
    description.style.maxHeight = '0';
    siblingItems.forEach((element) => {
      if (element.offsetTop > item.offsetTop) {
        element.style.transition = 'margin-top 0.3s ease-in-out';
        element.style.marginTop = '0';
      }
    });
  }
}

function togglePlay() {
  let isPlaying = false;
  const audioPlayer = document.getElementById('audioPlayer');
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
}
