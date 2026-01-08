import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DownloadPage = () => {
  const [copied, setCopied] = useState(false);

  const copyPath = () => {
    navigator.clipboard.writeText('/app/extension');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LockIn – Study-Only YouTube Extension
            </span>
          </Link>
          <Link to="/preview" className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition">
            Preview UI
          </Link>
        </nav>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-4xl font-bold text-white mb-4">Download & Install</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Follow these simple steps to install YouTube Study Guard Pro on your Chrome browser
          </p>
        </div>

        {/* Installation Steps */}
        <div className="space-y-6 mb-12">
          <InstallStep 
            number="1"
            title="Locate Extension Files"
            description="The extension files are located in the /app/extension directory. All necessary files are already created and ready to use."
          >
            <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <code className="text-green-400 text-sm">/app/extension</code>
                <button 
                  onClick={copyPath}
                  className="px-3 py-1 bg-white/10 rounded text-sm text-gray-300 hover:bg-white/20 transition flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                <p>Files included:</p>
                <ul className="mt-1 space-y-0.5 text-gray-400">
                  <li>• manifest.json - Extension configuration</li>
                  <li>• background.js - Service worker</li>
                  <li>• content.js - YouTube page monitoring</li>
                  <li>• classifier.js - Video classification logic</li>
                  <li>• popup.html/js/css - Settings UI</li>
                  <li>• icons/ - Extension icons</li>
                </ul>
              </div>
            </div>
          </InstallStep>

          <InstallStep 
            number="2"
            title="Open Chrome Extensions"
            description="Open Chrome browser and navigate to the extensions management page."
          >
            <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10">
              <p className="text-gray-300 text-sm mb-2">Type this in Chrome address bar:</p>
              <code className="text-purple-400 text-sm">chrome://extensions/</code>
            </div>
          </InstallStep>

          <InstallStep 
            number="3"
            title="Enable Developer Mode"
            description="Toggle the 'Developer mode' switch in the top-right corner of the extensions page."
          >
            <div className="mt-4 flex items-center gap-4">
              <div className="px-4 py-2 bg-[#3b82f6] rounded-full text-white text-sm font-medium">
                Developer mode
              </div>
              <span className="text-gray-400 text-sm">Toggle this ON →</span>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </InstallStep>

          <InstallStep 
            number="4"
            title="Load Unpacked Extension"
            description="Click the 'Load unpacked' button and select the /app/extension folder."
          >
            <div className="mt-4">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Load unpacked
              </button>
              <p className="text-gray-500 text-xs mt-2">Select the extension folder when the file dialog opens</p>
            </div>
          </InstallStep>

          <InstallStep 
            number="5"
            title="Start Using!"
            description="The extension is now installed! You'll see the 📚 icon in your Chrome toolbar. Click it to access settings."
          >
            <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center text-lg">
                  📚
                </div>
                <div>
                  <p className="text-green-400 font-semibold">Extension Active</p>
                  <p className="text-gray-400 text-sm">Now protecting your YouTube study time!</p>
                </div>
              </div>
            </div>
          </InstallStep>
        </div>

        {/* Tips Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span> Tips for Best Results
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span>
              <span>Pin the extension to your toolbar for easy access to settings</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span>
              <span>Start with <strong>Strict mode</strong> during intense study sessions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span>
              <span>Keep <strong>Block YouTube Shorts</strong> enabled - they're highly addictive</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span>
              <span>Add your favorite educational channels to the whitelist</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400">•</span>
              <span>Check the Activity log to see what's being blocked</span>
            </li>
          </ul>
        </div>

        {/* Troubleshooting */}
        <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
          <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
            <span>⚠️</span> Troubleshooting
          </h3>
          <div className="text-gray-300 text-sm space-y-2">
            <p><strong>Extension not working?</strong> Make sure you reload YouTube tabs after installation.</p>
            <p><strong>Educational content blocked?</strong> Add the channel name to your whitelist in settings.</p>
            <p><strong>Need to update?</strong> Click the reload button on the extension card in chrome://extensions/</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstallStep = ({ number, title, description, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        {children}
      </div>
    </div>
  </div>
);

export default DownloadPage;