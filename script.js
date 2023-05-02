(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };
  let timerId;
  const $progressBar = get('.progress-bar');
  const $progressText = $progressBar.querySelector('.text');

  const throttle = (callback, time) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = undefined;
    }, time);
  };

  const onScroll = () => {
    const $html = document.documentElement;
    const height = $html.scrollHeight - $html.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    const percent = Math.floor((scrollTop / height) * 100);

    $progressBar.style.width = `${percent}%`;
    $progressText.innerText = `${percent}%`;
  };

  window.addEventListener('scroll', () => {
    throttle(onScroll, 100);
  });
})();
