// YouTube Study Guard Pro - Popup Script
// Handles UI interactions and state management

document.addEventListener('DOMContentLoaded', async () => {
  // Get state from background script
  let state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
  
  // Elements
  const powerToggle = document.getElementById('powerToggle');
  const statusText = document.getElementById('statusText');
  const statusDot = statusText.querySelector('.status-dot');
  const blockedCount = document.getElementById('blockedCount');
  const allowedCount = document.getElementById('allowedCount');
  const modeButtons = document.querySelectorAll('.mode-btn');
  const blockShorts = document.getElementById('blockShorts');
  const blockHomepage = document.getElementById('blockHomepage');
  const showNotifications = document.getElementById('showNotifications');
  const notificationDuration = document.getElementById('notificationDuration');
  const durationValue = document.getElementById('durationValue');
  const whitelistInput = document.getElementById('whitelistInput');
  const addWhitelistBtn = document.getElementById('addWhitelist');
  const whitelistItems = document.getElementById('whitelistItems');
  const whitelistCount = document.getElementById('whitelistCount');
  const blocklistInput = document.getElementById('blocklistInput');
  const addBlocklistBtn = document.getElementById('addBlocklist');
  const blocklistItems = document.getElementById('blocklistItems');
  const blocklistCount = document.getElementById('blocklistCount');
  const activityList = document.getElementById('activityList');
  const clearLogBtn = document.getElementById('clearLog');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Initialize UI with current state
  function initUI() {
    // Power toggle
    powerToggle.checked = state.isEnabled;
    updateStatus();
    
    // Stats
    blockedCount.textContent = state.stats?.blockedToday ?? 0;
    allowedCount.textContent = state.stats?.allowedToday ?? 0;
    
    // Mode
    modeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === state.mode);
    });
    
    // Settings
    blockShorts.checked = state.blockShorts !== false;
    blockHomepage.checked = state.blockHomepage === true;
    showNotifications.checked = state.showNotifications !== false;
    notificationDuration.value = (state.notificationDuration || 2000) / 1000;
    durationValue.textContent = `${notificationDuration.value}s`;
    
    // Lists
    renderWhitelist();
    renderBlocklist();
    
    // Activity log
    renderActivityLog();
  }

  // Update status display
  function updateStatus() {
    if (state.isEnabled) {
      statusDot.className = 'status-dot active';
      statusText.innerHTML = '<span class="status-dot active"></span>Active - Protecting your focus';
    } else {
      statusDot.className = 'status-dot inactive';
      statusText.innerHTML = '<span class="status-dot inactive"></span>Disabled - Protection paused';
    }
  }

  // Save state to background
  async function saveState(updates) {
    state = { ...state, ...updates };
    await chrome.runtime.sendMessage({ type: 'UPDATE_STATE', data: updates });
  }

  // Tab navigation
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Power toggle
  powerToggle.addEventListener('change', async () => {
    await saveState({ isEnabled: powerToggle.checked });
    updateStatus();
  });

  // Mode selection
  modeButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      await saveState({ mode: btn.dataset.mode });
    });
  });

  // Settings toggles
  blockShorts.addEventListener('change', async () => {
    await saveState({ blockShorts: blockShorts.checked });
  });

  blockHomepage.addEventListener('change', async () => {
    await saveState({ blockHomepage: blockHomepage.checked });
  });

  showNotifications.addEventListener('change', async () => {
    await saveState({ showNotifications: showNotifications.checked });
  });

  notificationDuration.addEventListener('input', async () => {
    const value = notificationDuration.value;
    durationValue.textContent = `${value}s`;
    await saveState({ notificationDuration: value * 1000 });
  });

  // Whitelist management
  function renderWhitelist() {
    const list = state.whitelist || [];
    whitelistCount.textContent = list.length;
    
    if (list.length === 0) {
      whitelistItems.innerHTML = '<li class="empty-state">No items</li>';
      return;
    }
    
    whitelistItems.innerHTML = list.map(item => `
      <li>
        <span>${escapeHtml(item)}</span>
        <button class="remove-btn" data-item="${escapeHtml(item)}">×</button>
      </li>
    `).join('');
    
    // Add remove handlers
    whitelistItems.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await chrome.runtime.sendMessage({ type: 'REMOVE_WHITELIST', item: btn.dataset.item });
        state.whitelist = state.whitelist.filter(i => i !== btn.dataset.item);
        renderWhitelist();
      });
    });
  }

  addWhitelistBtn.addEventListener('click', async () => {
    const value = whitelistInput.value.trim();
    if (value) {
      await chrome.runtime.sendMessage({ type: 'ADD_WHITELIST', item: value });
      state.whitelist = [...(state.whitelist || []), value];
      whitelistInput.value = '';
      renderWhitelist();
    }
  });

  whitelistInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addWhitelistBtn.click();
  });

  // Blocklist management
  function renderBlocklist() {
    const list = state.blocklist || [];
    blocklistCount.textContent = list.length;
    
    if (list.length === 0) {
      blocklistItems.innerHTML = '<li class="empty-state">No items</li>';
      return;
    }
    
    blocklistItems.innerHTML = list.map(item => `
      <li>
        <span>${escapeHtml(item)}</span>
        <button class="remove-btn" data-item="${escapeHtml(item)}">×</button>
      </li>
    `).join('');
    
    // Add remove handlers
    blocklistItems.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await chrome.runtime.sendMessage({ type: 'REMOVE_BLOCKLIST', item: btn.dataset.item });
        state.blocklist = state.blocklist.filter(i => i !== btn.dataset.item);
        renderBlocklist();
      });
    });
  }

  addBlocklistBtn.addEventListener('click', async () => {
    const value = blocklistInput.value.trim();
    if (value) {
      await chrome.runtime.sendMessage({ type: 'ADD_BLOCKLIST', item: value });
      state.blocklist = [...(state.blocklist || []), value];
      blocklistInput.value = '';
      renderBlocklist();
    }
  });

  blocklistInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBlocklistBtn.click();
  });

  // Activity log
  function renderActivityLog() {
    const log = state.activityLog || [];
    
    if (log.length === 0) {
      activityList.innerHTML = '<li class="empty-state">No activity yet</li>';
      return;
    }
    
    activityList.innerHTML = log.slice(0, 50).map(entry => {
      const time = new Date(entry.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      const icon = entry.type === 'blocked' ? '🚫' : '✅';
      const typeText = entry.type === 'blocked' ? 'Blocked' : 'Allowed';
      
      return `
        <li class="${entry.type}">
          <div class="log-type">${icon} ${typeText}</div>
          <div class="log-title">${escapeHtml(entry.title)}</div>
          <div class="log-time">${time}</div>
        </li>
      `;
    }).join('');
  }

  clearLogBtn.addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: 'CLEAR_LOG' });
    state.activityLog = [];
    renderActivityLog();
  });

  // Utility: Escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Refresh state periodically
setInterval(async () => {
  state = await chrome.runtime.sendMessage({ type: 'GET_STATE' });

  blockedCount.textContent = state.stats?.blockedToday ?? 0;
  allowedCount.textContent = state.stats?.allowedToday ?? 0;

  renderActivityLog();
}, 5000);

  // Initialize
  initUI();
});