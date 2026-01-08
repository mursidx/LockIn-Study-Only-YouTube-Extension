export class VideoClassifier {
  constructor() {
    this.mode = 'normal';
  }

  setMode(mode) {
    this.mode = ['strict', 'normal', 'lenient'].includes(mode)
      ? mode
      : 'normal';
  }

  classify(title, isShort = false) {
    const text = title.toLowerCase();

    const studyKeywords = [
      'tutorial','course','lecture','exam','preparation',
      'strategy','mock','revision','how to','guide',
      'programming','coding','react','python','java',
      'javascript','sql','dsa','leetcode','gate',
      'ssc','bank','rbi','nabard','upsc'
    ];

    const skillKeywords = [
      'podcast','interview','talk','live',
      'design','editing','ai','machine learning',
      'finance','startup','business','fitness',
      'language learning','productivity'
    ];

    const entertainmentKeywords = [
      'song','music','movie','trailer','reaction',
      'vlog','prank','funny','meme','reels'
    ];

    if (isShort && this.mode !== 'lenient') {
      return { isEducational: false };
    }

    if (this.mode === 'strict') {
      return {
        isEducational: studyKeywords.some(k => text.includes(k))
      };
    }

    if (this.mode === 'normal') {
      return {
        isEducational:
          studyKeywords.some(k => text.includes(k)) ||
          skillKeywords.some(k => text.includes(k))
      };
    }

    // lenient
    if (text.includes('reels') || text.includes('shorts')) {
      return { isEducational: false };
    }

    return { isEducational: true };
  }
}
