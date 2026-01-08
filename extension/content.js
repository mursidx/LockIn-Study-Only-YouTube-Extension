// YouTube Study Guard Pro - Content Script
// Purpose: Detect currently playing video and report to background

(() => {
  'use strict';

  if (window.__ytStudyGuardInjected) return;
  window.__ytStudyGuardInjected = true;

  let lastTitle = '';
  let lastUrl = '';
  let observerStarted = false;

  function getVideoTitle() {
    const el =
      document.querySelector('h1.ytd-watch-metadata yt-formatted-string') ||
      document.querySelector('#title h1 yt-formatted-string');

    if (el?.textContent?.trim()) {
      return el.textContent.trim();
    }

    return document.title.replace(' - YouTube', '').trim();
  }

  function getChannel() {
    return document.querySelector('#channel-name a')?.textContent?.trim() || '';
  }

  function sendVideoInfo() {
    const title = getVideoTitle();
    const url = location.href;

    if (!title) return;
    if (title === lastTitle && url === lastUrl) return;

    lastTitle = title;
    lastUrl = url;

    chrome.runtime.sendMessage({
      type: 'VIDEO_DETECTED',
      data: {
        title,
        channel: getChannel(),
        url
      }
    }).catch(() => {});
  }

  function startObserverWhenReady() {
    if (observerStarted) return;

    if (!document.body) {
      // Body not ready yet → retry shortly
      setTimeout(startObserverWhenReady, 100);
      return;
    }

    observerStarted = true;

    const observer = new MutationObserver(() => {
      clearTimeout(window.__ytStudyGuardDebounce);
      window.__ytStudyGuardDebounce = setTimeout(sendVideoInfo, 400);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // SPA navigation hooks
  ['pushState', 'replaceState'].forEach(fn => {
    const orig = history[fn];
    history[fn] = function () {
      orig.apply(this, arguments);
      setTimeout(sendVideoInfo, 600);
    };
  });

  window.addEventListener('popstate', () => setTimeout(sendVideoInfo, 600));
  window.addEventListener('yt-navigate-finish', () => setTimeout(sendVideoInfo, 600));

  // Start observer safely
  startObserverWhenReady();

  // Initial detection (after page settles)
  setTimeout(sendVideoInfo, 1200);
})();
