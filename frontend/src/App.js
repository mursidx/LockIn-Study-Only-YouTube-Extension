import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ExtensionPreview from './pages/ExtensionPreview';
import DownloadPage from './pages/DownloadPage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Study Guard Pro
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/preview" className="px-4 py-2 text-gray-300 hover:text-white transition">
              Preview
            </Link>
            <Link to="/download" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:opacity-90 transition">
              Download
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Chrome Extension Ready
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Guard Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              YouTube Study Time
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Automatically blocks distracting videos while allowing educational content. 
            Perfect for UPSC, SSC, GATE, JEE, NEET aspirants who study on YouTube.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/download"
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Extension
            </Link>
            <Link 
              to="/preview"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview UI
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          <FeatureCard 
            icon="🎯"
            title="Smart Classification"
            description="AI-powered keyword scoring identifies educational vs entertainment content instantly"
          />
          <FeatureCard 
            icon="⚡"
            title="Instant Blocking"
            description="Closes distracting videos in under 1 second - faster than temptation"
          />
          <FeatureCard 
            icon="🔒"
            title="Works Offline"
            description="100% local processing. No data leaves your device. Complete privacy"
          />
          <FeatureCard 
            icon="📱"
            title="YouTube Shorts Blocker"
            description="Optional strict filtering for addictive short-form content"
          />
          <FeatureCard 
            icon="⚙️"
            title="Customizable"
            description="Add your own whitelist and blocklist. Three protection modes available"
          />
          <FeatureCard 
            icon="📊"
            title="Activity Tracking"
            description="See what's been blocked and allowed. Track your study discipline"
          />
        </div>

        {/* Supported Exams */}
        <div className="text-center mb-20">
          <h3 className="text-lg text-gray-500 mb-6">Perfect for aspirants preparing for</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {['UPSC', 'SSC', 'Banking', 'GATE', 'CAT', 'JEE', 'NEET', 'NDA', 'Railway', 'State PSC'].map((exam) => (
              <span key={exam} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm">
                {exam}
              </span>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Install Extension"
              description="Load the extension in Chrome Developer Mode"
            />
            <StepCard 
              number="2"
              title="Browse YouTube"
              description="Study as usual - the extension works silently in background"
            />
            <StepCard 
              number="3"
              title="Stay Focused"
              description="Distracting videos are automatically blocked before you can watch"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>📚 YouTube Study Guard Pro - Built for serious aspirants</p>
          <p className="text-sm mt-2">"The best self-control tool is one that removes the need for self-control."</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<ExtensionPreview />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;