# LockIn – Study-Only YouTube Extension

📚 **Intelligent guardian for YouTube-based studying**

Automatically blocks distracting videos while allowing educational content to play uninterrupted. Perfect for UPSC, SSC, Banking, GATE, CAT, JEE, NEET, and other competitive exam aspirants.

## ✨ Features

- **Real-time YouTube Monitoring**: Continuously scans all YouTube tabs
- **AI-Powered Classification**: Intelligent keyword-based classification with weighted scoring
- **Instant Blocking**: Closes distracting videos within milliseconds
- **Educational Content Whitelist**: Never blocks legitimate study material
- **YouTube Shorts Blocking**: Optional strict filtering for addictive short-form content
- **Customizable Lists**: Add your own whitelist/blocklist entries
- **Activity Logging**: Track what's been blocked/allowed
- **Multiple Protection Modes**: Strict, Normal, and Lenient modes
- **Works Offline**: All classification happens locally

## 🚀 Installation

### Step 1: Download the Extension

1. Download or clone this repository
2. Ensure all files are in a single folder:
   ```
   extension/
   ├── manifest.json
   ├── background.js
   ├── content.js
   ├── classifier.js
   ├── popup.html
   ├── popup.js
   ├── styles.css
   └── icons/
       ├── icon16.png
       ├── icon32.png
       ├── icon48.png
       └── icon128.png
   ```

### Step 2: Load in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right corner)
3. Click **"Load unpacked"** button
4. Select the `extension` folder
5. The extension icon (📚) will appear in your toolbar

### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon in Chrome toolbar
2. Find "YouTube Study Guard Pro"
3. Click the pin icon to keep it visible

## 🎯 How It Works

### Classification System

The extension uses a sophisticated weighted keyword scoring system:

**Educational Keywords** (examples):
- Exam names: UPSC, SSC, GATE, JEE, NEET, CAT, Banking
- Academic: Mathematics, Physics, Chemistry, Programming
- Study indicators: Lecture, Tutorial, Course, Revision, PYQ

**Non-Educational Keywords** (examples):
- Entertainment: Vlog, Reaction, Prank, Comedy, Meme
- Music/Movies: Song, Trailer, Official Video
- Gaming: Gameplay, Stream, Let's Play
- Clickbait: Top 10, You Won't Believe

### Protection Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **Strict** | Blocks anything questionable | Intense study sessions |
| **Normal** | Balanced filtering | Regular studying |
| **Lenient** | Only obvious entertainment | Light revision |

## ⚙️ Settings

Click the extension icon to access settings:

- **Power Toggle**: Enable/disable protection
- **Mode Selection**: Choose protection level
- **Block YouTube Shorts**: Recommended ON (highly addictive)
- **Block Homepage**: Show warning on youtube.com homepage
- **Notifications**: Show/hide block notifications
- **Whitelist**: Add channels/keywords to always allow
- **Blocklist**: Add keywords to always block

## 📊 Activity Log

The extension logs all decisions:
- ✅ Allowed videos (title + reason)
- 🚫 Blocked videos (title + reason + timestamp)

View the last 100 entries in the Activity tab.

## 🔧 Troubleshooting

### Extension not working?

1. Make sure the extension is enabled in `chrome://extensions/`
2. Check if the power toggle is ON (green status dot)
3. Refresh YouTube pages after installation
4. Try disabling and re-enabling the extension

### False positives (educational content blocked)?

1. Add the channel name to your **Whitelist**
2. Try switching to **Normal** or **Lenient** mode
3. Add specific keywords from the video title to whitelist

### False negatives (entertainment not blocked)?

1. Switch to **Strict** mode
2. Add specific keywords to your **Blocklist**
3. Enable "Block YouTube Shorts" if not already on

### Performance issues?

The extension is designed to be lightweight. If you notice lag:
1. Clear the activity log
2. Disable notifications
3. Check for Chrome updates

## 🛡️ Privacy

- **100% Local Processing**: All video analysis happens on your device
- **No Data Collection**: We don't track your viewing habits
- **No External APIs**: Works completely offline
- **Open Source**: Review the code yourself

## 📁 File Structure

```
manifest.json     - Extension configuration (Manifest V3)
background.js     - Service worker for tab monitoring
content.js        - Content script injected into YouTube
classifier.js     - Video classification logic
popup.html        - Settings popup interface
popup.js          - Popup UI logic
styles.css        - Popup styling
icons/            - Extension icons
README.md         - This file
```

## 🤝 Contributing

Want to improve the classifier? Here's how:

1. Open `classifier.js`
2. Add keywords to `educationalKeywords` or `nonEducationalKeywords`
3. Adjust weights (0-100) based on how strong an indicator each keyword is
4. Test thoroughly before using

## 📄 License

MIT License - Feel free to modify and distribute.

## 🌟 Support

Built with ❤️ for students everywhere. Stay focused, achieve your dreams!

---

**"The best self-control tool is one that removes the need for self-control."**