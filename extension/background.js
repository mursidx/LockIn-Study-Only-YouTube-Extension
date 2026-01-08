// YouTube Study Guard Pro - Background Service Worker (MV3)

import { VideoClassifier } from './classifier.js';

const classifier = new VideoClassifier();

let state = {
  isEnabled: true
};

async function initState() {
  const stored = await chrome.storage.local.get(Object.keys(state));
  state = { ...state, ...stored };
}

// ✅ Only classify real video watch pages
function isWatchPage(url) {
  try {
    const u = new URL(url);
    return u.pathname === '/watch' && u.searchParams.has('v');
  } catch {
    return false;
  }
}

async function blockTab(tabId) {
  try {
    await chrome.tabs.update(tabId, { url: 'chrome://newtab' });
  } catch {
    try {
      await chrome.tabs.remove(tabId);
    } catch {}
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (!state.isEnabled) return;
  if (!sender?.tab?.id) return;
  if (msg.type !== 'VIDEO_DETECTED') return;

  const { title, url } = msg.data || {};
  if (!title || !url) return;

  // 🚨 IGNORE non-video pages (THIS FIXES AUTO-CLOSING)
  if (!isWatchPage(url)) {
    return;
  }

  const result = classifier.classify(title);

  if (!result.isEducational) {
    blockTab(sender.tab.id);
  }
});

chrome.runtime.onInstalled.addListener(initState);
chrome.runtime.onStartup.addListener(initState);
initState();
