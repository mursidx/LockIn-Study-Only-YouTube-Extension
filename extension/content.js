// LockIn – Content Script

(() => {
  if (window.__lockInInjected) return;
  window.__lockInInjected = true;

  let lastUrl = '';
  let lastTitle = '';

  function getTitle() {
    const el =
      document.querySelector('h1.ytd-watch-metadata yt-formatted-string') ||
      document.querySelector('#title h1 yt-formatted-string');

    return (
      el?.textContent?.trim() ||
      document.title.replace(' - YouTube', '').trim()
    );
  }

  function sendVideo() {
    const title = getTitle();
    const url = location.href;

    if (!title || (title === lastTitle && url === lastUrl)) return;

    lastTitle = title;
    lastUrl = url;

    try {
      chrome.runtime.sendMessage({
        type: 'VIDEO_DETECTED',
        data: { title, url }
      });
    } catch {}
  }

  function initObserver() {
    if (!document.body) return;

    const observer = new MutationObserver(() => {
      clearTimeout(window.__lockInDebounce);
      window.__lockInDebounce = setTimeout(sendVideo, 500);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // SPA navigation hooks
  ['pushState', 'replaceState'].forEach(fn => {
    const original = history[fn];
    history[fn] = function () {
      original.apply(this, arguments);
      setTimeout(sendVideo, 800);
    };
  });

  window.addEventListener('popstate', () => setTimeout(sendVideo, 800));
  window.addEventListener('yt-navigate-finish', () => setTimeout(sendVideo, 800));

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }

  setTimeout(sendVideo, 1200);
})();
