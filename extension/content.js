// LockIn – Content Script

(() => {
  // Prevent multiple injections
  if (window.__lockInInjected) return;
  window.__lockInInjected = true;

  let lastUrl = "";
  let lastTitle = "";
  let blockTriggered = false; // 🔑 prevents re-logging after redirect

  function getTitle() {
    const el =
      document.querySelector("h1.ytd-watch-metadata yt-formatted-string") ||
      document.querySelector("#title h1 yt-formatted-string");

    const title =
      el?.textContent?.trim() ||
      document.title.replace(" - YouTube", "").trim();

    return title;
  }

  function isValidVideoTitle(title) {
    if (!title) return false;

    const lower = title.toLowerCase();

    // Reject placeholder titles
    if (
      lower === "youtube" ||
      lower.endsWith("youtube") ||
      lower.includes("(youtube") ||
      lower.length < 6
    ) {
      return false;
    }

    return true;
  }

  function sendVideo(retry = 0) {
    const title = getTitle();
    const url = location.href;

    // ❌ Ignore invalid / early titles
    if (!isValidVideoTitle(title)) {
      if (retry < 5) {
        setTimeout(() => sendVideo(retry + 1), 300);
      }
      return;
    }

    if (title === lastTitle && url === lastUrl) return;

    lastTitle = title;
    lastUrl = url;

    chrome.runtime.sendMessage(
      {
        type: "VIDEO_DETECTED",
        data: { title, url },
      },
      (response) => {
        if (response?.block === true) {
          if (location.pathname.startsWith("/watch")) {
            window.location.replace("https://www.youtube.com/");
          }
        }
      }
    );
  }

  function initObserver() {
    if (!document.body) return;

    const observer = new MutationObserver(() => {
      clearTimeout(window.__lockInDebounce);
      window.__lockInDebounce = setTimeout(sendVideo, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // SPA navigation hooks (YouTube internal routing)
  ["pushState", "replaceState"].forEach((fn) => {
    const original = history[fn];
    history[fn] = function () {
      original.apply(this, arguments);
      setTimeout(sendVideo, 800);
    };
  });

  window.addEventListener("popstate", () => setTimeout(sendVideo, 800));
  window.addEventListener("yt-navigate-finish", () =>
    setTimeout(sendVideo, 800)
  );

  // Init
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initObserver);
  } else {
    initObserver();
  }

  // Initial check
  setTimeout(sendVideo, 1200);
})();
