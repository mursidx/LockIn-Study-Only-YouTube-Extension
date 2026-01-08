// YouTube Study Guard Pro - Video Classifier
// Rule: ONLY educational videos are allowed

export class VideoClassifier {
  classify(title) {
    const text = title.toLowerCase();

    // 🔒 STRONG STUDY KEYWORDS
    const studyKeywords = [
      // Exams
      'exam','prelims','mains','mock','pyq','previous year',
      'ssc','cgl','chsl','mts','upsc','ias','ips',
      'bank','rbi','nabard','sebi','ibps','sbi',

      // Learning signals
      'lecture','class','course','tutorial','one shot',
      'full course','crash course','revision','strategy',
      'preparation','analysis','syllabus','notes','how to','end-to-end', 'end to end','stack',

      // Tech / Coding
      'programming','coding','graph', 'python','java','javascript',
      'typescript','c++','php','sql','dsa','algorithm',
      'data structure','react','node','backend','frontend',

      // Academics
      'math','maths','physics','chemistry','biology',
      'science','economics','polity','geography','history',
      'english','grammar','reasoning','aptitude'
    ];

    for (const word of studyKeywords) {
      if (text.includes(word)) {
        return {
          isEducational: true,
          reason: 'Study keyword detected'
        };
      }
    }

    // ❌ EVERYTHING ELSE = DISTRACTION
    return {
      isEducational: false,
      reason: 'Non-study content'
    };
  }
}
