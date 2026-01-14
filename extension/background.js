// LockIn – Study-Only YouTube Extension
// Background Service Worker (Manifest V3)

import { VideoClassifier } from "./classifier.js";

const classifier = new VideoClassifier();

/* =========================
   STATE
========================= */
let state = {
  isEnabled: true,
  mode: "strict",
  blockShorts: true,
  whitelist: [],
  blocklist: [],
  stats: {
    blockedToday: 0,
    allowedToday: 0,
    lastReset: new Date().toDateString(),
  },
  activityLog: [],
};

/* =========================
   INIT
========================= */
async function initState() {
  const stored = await chrome.storage.local.get(null);
  state = { ...state, ...stored };
  classifier.setMode(state.mode);
  resetStatsIfNeeded();
}

async function persistState() {
  await chrome.storage.local.set(state);
}

/* =========================
   HELPERS
========================= */
function isShorts(url) {
  return typeof url === "string" && url.includes("/shorts/");
}

function isWatchPage(url) {
  return typeof url === "string" && url.includes("youtube.com/watch");
}

function resetStatsIfNeeded() {
  const today = new Date().toDateString();
  if (state.stats.lastReset !== today) {
    state.stats.blockedToday = 0;
    state.stats.allowedToday = 0;
    state.stats.lastReset = today;
  }
}

function logActivity(type, title) {
  state.activityLog.unshift({
    type,
    title,
    timestamp: Date.now(),
  });
  state.activityLog = state.activityLog.slice(0, 50);
}

/* =========================
   CORE LOGIC
========================= */
async function handleVideo(tabId, { title, url }) {
  if (!state.isEnabled || !title || !url) {
    return { block: false };
  }

  resetStatsIfNeeded();

  const lowerTitle = title.toLowerCase();
  const short = isShorts(url);

  // 🚫 Shorts
  if (short && state.blockShorts && state.mode !== "lenient") {
    state.stats.blockedToday++;
    logActivity("blocked", title);
    await persistState();
    return { block: true };
  }

  // ❗ Ignore non-watch pages
  if (!isWatchPage(url) && !short) {
    return { block: false };
  }

  // ✅ Whitelist
  if (state.whitelist.some((w) => lowerTitle.includes(w))) {
    state.stats.allowedToday++;
    logActivity("allowed", title);
    await persistState();
    return { block: false };
  }

  // 🚫 Blocklist
  if (state.blocklist.some((b) => lowerTitle.includes(b))) {
    state.stats.blockedToday++;
    logActivity("blocked", title);
    await persistState();
    return { block: true };
  }

  // 🧠 Classifier
  const result = classifier.classify(title, short);

  if (!result.isEducational) {
    state.stats.blockedToday++;
    logActivity("blocked", title);
    await persistState();
    return { block: true };
  }

  // ✅ Educational
  state.stats.allowedToday++;
  logActivity("allowed", title);
  await persistState();
  return { block: false };
}

/* =========================
   MESSAGES
========================= */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg) return;

  switch (msg.type) {
    case "VIDEO_DETECTED":
      handleVideo(sender.tab?.id, msg.data).then(sendResponse);
      return true;

    case "GET_STATE":
      sendResponse(state);
      break;

    case "UPDATE_STATE":
      state = { ...state, ...msg.data };
      classifier.setMode(state.mode);
      persistState();
      sendResponse({ success: true });
      break;

    case "ADD_WHITELIST": {
      const item = msg.item.toLowerCase();
      if (!state.whitelist.includes(item)) state.whitelist.push(item);
      persistState();
      sendResponse({ success: true });
      break;
    }

    case "REMOVE_WHITELIST": {
      const item = msg.item.toLowerCase();
      state.whitelist = state.whitelist.filter((i) => i !== item);
      persistState();
      sendResponse({ success: true });
      break;
    }

    case "ADD_BLOCKLIST": {
      const item = msg.item.toLowerCase();
      if (!state.blocklist.includes(item)) state.blocklist.push(item);
      persistState();
      sendResponse({ success: true });
      break;
    }

    case "REMOVE_BLOCKLIST": {
      const item = msg.item.toLowerCase();
      state.blocklist = state.blocklist.filter((i) => i !== item);
      persistState();
      sendResponse({ success: true });
      break;
    }

    case "CLEAR_LOG":
      state.activityLog = [];
      persistState();
      sendResponse({ success: true });
      break;
  }

  return true;
});

/* =========================
   STARTUP
========================= */
chrome.runtime.onInstalled.addListener(initState);
chrome.runtime.onStartup.addListener(initState);
initState();
