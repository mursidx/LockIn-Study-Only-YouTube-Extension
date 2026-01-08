import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExtensionPreview = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEnabled, setIsEnabled] = useState(true);
  const [mode, setMode] = useState('strict');
  const [blockShorts, setBlockShorts] = useState(true);
  const [blockHomepage, setBlockHomepage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [notificationDuration, setNotificationDuration] = useState(2);
  const [whitelist, setWhitelist] = useState(['Physics Wallah', 'Unacademy']);
  const [blocklist, setBlocklist] = useState(['vlog', 'reaction']);
  const [whitelistInput, setWhitelistInput] = useState('');
  const [blocklistInput, setBlocklistInput] = useState('');

  const activityLog = [
    { type: 'blocked', title: 'Funny Cat Compilation 2024', time: '2:34 PM' },
    { type: 'allowed', title: 'GATE CSE Operating Systems Lecture 5', time: '2:31 PM' },
    { type: 'blocked', title: 'My Daily Vlog - Day in My Life', time: '2:28 PM' },
    { type: 'allowed', title: 'UPSC Prelims 2024 Strategy by Toppers', time: '2:25 PM' },
    { type: 'blocked', title: 'Top 10 Movie Scenes That Made Us Cry', time: '2:20 PM' },
  ];

  const addToWhitelist = () => {
    if (whitelistInput.trim()) {
      setWhitelist([...whitelist, whitelistInput.trim()]);
      setWhitelistInput('');
    }
  };

  const addToBlocklist = () => {
    if (blocklistInput.trim()) {
      setBlocklist([...blocklist, blocklistInput.trim()]);
      setBlocklistInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LockIn – Study-Only YouTube Extension
            </span>
          </Link>
          <Link to="/download" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:opacity-90 transition">
            Download
          </Link>
        </nav>

        <h1 className="text-3xl font-bold text-white text-center mb-4">Extension UI Preview</h1>
        <p className="text-gray-400 text-center mb-10">This is how the extension popup looks when you click the icon in Chrome</p>

        {/* Extension Preview Container */}
        <div className="flex justify-center">
          <div className="w-[380px] bg-[#0f0f14] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#1a1a24] to-[#252532] p-4 border-b border-[#2d2d3d]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <span className="font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                    LockIn – Study-Only YouTube Extension
                  </span>
                </div>
                <label className="relative inline-block w-12 h-6 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-[#252532] rounded-full peer-checked:bg-gradient-to-r peer-checked:from-[#667eea] peer-checked:to-[#764ba2] transition-all border-2 border-[#2d2d3d] peer-checked:border-[#667eea]"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-gray-400 rounded-full peer-checked:translate-x-6 peer-checked:bg-white transition-all"></div>
                </label>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-red-400'}`}></span>
                {isEnabled ? 'Active - Protecting your focus' : 'Disabled - Protection paused'}
              </div>
            </header>

            {/* Tabs */}
            <nav className="flex bg-[#1a1a24] p-2 gap-1 border-b border-[#2d2d3d]">
              {['dashboard', 'settings', 'lists', 'log'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                      : 'text-gray-400 hover:bg-[#252532] hover:text-white'
                  }`}
                >
                  {tab === 'log' ? 'Activity' : tab}
                </button>
              ))}
            </nav>

            {/* Content */}
            <main className="p-4 min-h-[380px]">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-[#1a1a24] border border-red-500/20 rounded-xl p-4 text-center hover:-translate-y-0.5 transition-transform">
                      <div className="text-2xl mb-2">🚫</div>
                      <div className="text-3xl font-bold text-red-400 mb-1">12</div>
                      <div className="text-xs text-gray-400">Blocked Today</div>
                    </div>
                    <div className="bg-[#1a1a24] border border-green-500/20 rounded-xl p-4 text-center hover:-translate-y-0.5 transition-transform">
                      <div className="text-2xl mb-2">✅</div>
                      <div className="text-3xl font-bold text-green-400 mb-1">28</div>
                      <div className="text-xs text-gray-400">Allowed Today</div>
                    </div>
                  </div>

                  <h3 className="text-sm text-gray-400 mb-3">Protection Mode</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'strict', icon: '🔒', name: 'Strict', desc: 'Block anything questionable' },
                      { id: 'normal', icon: '⚖️', name: 'Normal', desc: 'Balanced filtering' },
                      { id: 'lenient', icon: '🔓', name: 'Lenient', desc: 'Only obvious entertainment' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                          mode === m.id
                            ? 'border-[#667eea] bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10'
                            : 'border-[#2d2d3d] bg-[#1a1a24] hover:border-[#667eea]/50'
                        }`}
                      >
                        <span className="text-lg">{m.icon}</span>
                        <span className="flex-1 text-sm font-semibold text-white">{m.name}</span>
                        <span className="text-xs text-gray-500">{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-2">
                  <SettingItem
                    name="Block YouTube Shorts"
                    desc="Highly addictive short-form videos"
                    checked={blockShorts}
                    onChange={() => setBlockShorts(!blockShorts)}
                  />
                  <SettingItem
                    name="Block Homepage"
                    desc="Show warning on YouTube homepage"
                    checked={blockHomepage}
                    onChange={() => setBlockHomepage(!blockHomepage)}
                  />
                  <SettingItem
                    name="Show Notifications"
                    desc="Brief alert when blocking content"
                    checked={showNotifications}
                    onChange={() => setShowNotifications(!showNotifications)}
                  />
                  <div className="flex justify-between items-center p-3 bg-[#1a1a24] rounded-xl border border-[#2d2d3d]">
                    <div>
                      <div className="text-sm font-medium text-white">Notification Duration</div>
                      <div className="text-xs text-gray-500">How long to show block alerts</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={notificationDuration}
                        onChange={(e) => setNotificationDuration(e.target.value)}
                        className="w-20 h-1 bg-[#252532] rounded-lg appearance-none cursor-pointer accent-[#667eea]"
                      />
                      <span className="text-sm text-[#667eea] font-semibold w-6">{notificationDuration}s</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lists Tab */}
              {activeTab === 'lists' && (
                <div>
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-white">Whitelist</h3>
                      <span className="text-xs bg-[#252532] text-gray-400 px-2 py-0.5 rounded-full">{whitelist.length}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Channels/keywords always allowed</p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={whitelistInput}
                        onChange={(e) => setWhitelistInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addToWhitelist()}
                        placeholder="Add channel or keyword..."
                        className="flex-1 px-3 py-2 bg-[#1a1a24] border border-[#2d2d3d] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#667eea]"
                      />
                      <button 
                        onClick={addToWhitelist}
                        className="w-10 h-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white text-xl hover:opacity-90 transition"
                      >+</button>
                    </div>
                    <div className="max-h-24 overflow-y-auto space-y-1">
                      {whitelist.map((item, i) => (
                        <div key={i} className="flex justify-between items-center px-3 py-2 bg-[#1a1a24] rounded-lg text-sm">
                          <span className="text-white">{item}</span>
                          <button 
                            onClick={() => setWhitelist(whitelist.filter((_, idx) => idx !== i))}
                            className="text-gray-500 hover:text-red-400 transition"
                          >×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-white">Blocklist</h3>
                      <span className="text-xs bg-[#252532] text-gray-400 px-2 py-0.5 rounded-full">{blocklist.length}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Keywords always blocked</p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={blocklistInput}
                        onChange={(e) => setBlocklistInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addToBlocklist()}
                        placeholder="Add keyword to block..."
                        className="flex-1 px-3 py-2 bg-[#1a1a24] border border-[#2d2d3d] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#667eea]"
                      />
                      <button 
                        onClick={addToBlocklist}
                        className="w-10 h-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white text-xl hover:opacity-90 transition"
                      >+</button>
                    </div>
                    <div className="max-h-24 overflow-y-auto space-y-1">
                      {blocklist.map((item, i) => (
                        <div key={i} className="flex justify-between items-center px-3 py-2 bg-[#1a1a24] rounded-lg text-sm">
                          <span className="text-white">{item}</span>
                          <button 
                            onClick={() => setBlocklist(blocklist.filter((_, idx) => idx !== i))}
                            className="text-gray-500 hover:text-red-400 transition"
                          >×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Log Tab */}
              {activeTab === 'log' && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-white">Recent Activity</h3>
                    <button className="text-xs text-gray-400 px-3 py-1 border border-[#2d2d3d] rounded-md hover:border-red-400 hover:text-red-400 transition">
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {activityLog.map((entry, i) => (
                      <div 
                        key={i} 
                        className={`p-3 bg-[#1a1a24] rounded-lg border-l-4 ${
                          entry.type === 'blocked' ? 'border-red-400' : 'border-green-400'
                        }`}
                      >
                        <div className={`text-xs font-semibold mb-1 ${entry.type === 'blocked' ? 'text-red-400' : 'text-green-400'}`}>
                          {entry.type === 'blocked' ? '🚫 Blocked' : '✅ Allowed'}
                        </div>
                        <div className="text-sm text-white mb-1 break-words">{entry.title}</div>
                        <div className="text-xs text-gray-500">{entry.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>

            {/* Footer */}
            <footer className="border-t border-[#2d2d3d] py-3 text-center text-xs text-gray-500 bg-[#1a1a24]">
              LockIn - v1.0
            </footer>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            This is an interactive preview of the extension popup. The actual extension works silently in Chrome, 
            monitoring YouTube tabs and blocking distracting content automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ name, desc, checked, onChange }) => (
  <div className="flex justify-between items-center p-3 bg-[#1a1a24] rounded-xl border border-[#2d2d3d]">
    <div>
      <div className="text-sm font-medium text-white">{name}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
    <label className="relative inline-block w-10 h-5 cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-[#252532] rounded-full peer-checked:bg-[#667eea] transition-all border border-[#2d2d3d]"></div>
      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-gray-400 rounded-full peer-checked:translate-x-5 peer-checked:bg-white transition-all"></div>
    </label>
  </div>
);

export default ExtensionPreview;