export class VideoClassifier {
  constructor() {
    this.mode = "strict";
  }

  setMode(mode) {
    this.mode = ["strict", "normal", "lenient"].includes(mode)
      ? mode
      : "strict";
  }

  classify(title, isShort = false) {
    /* =========================
       1️⃣ NORMALIZE TITLE
    ========================= */
    const text = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const tokens = text.split(" ");

    let score = 0;

    /* =========================
       2️⃣ HARD BLOCKS
    ========================= */

    // Shorts (except lenient)
    if (isShort && this.mode !== "lenient") {
      return { isEducational: false, score: -10 };
    }

    /* =========================
       3️⃣ STRONG EDUCATION SIGNALS
    ========================= */

    // Lecture / chapter numbering
    if (/^\d+[\.\-]/.test(text)) score += 5;

    // Explicit academic words
    const strongEdu = [
      "tutorial","math","coding","programming",
      "lecture",
      "lesson",
      "course",
      "chapter",
      "introduction",
      "explanation",
      "concept",
      "theory",
      "basics",
      "advanced",
      "complete course"
    ];

    strongEdu.forEach(k => {
      if (text.includes(k)) score += 4;
    });

    /* =========================
       4️⃣ EDUCATIONAL DOMAINS
    ========================= */

    const eduDomains = {
      math: [
        "math",
        "Logarithm",
        "pi",
        "log",
        "Logarithmic",
        "mathematics",
        "calculus",
        "algebra",
        "statistics",
        "probability",
        "equation",
        "formula",
        "theorem",
        "proof",
        "geometry",
        "linear algebra",
        "number theory",
      ],
      science: [
        // Core sciences
        "science",
        "scientific",
        "physics",
        "chemistry",
        "biology",

        // Physics
        "mechanics",
        "kinematics",
        "dynamics",
        "laws of motion",
        "work energy power",
        "gravitation",
        "thermodynamics",
        "waves",
        "sound waves",
        "optics",
        "ray optics",
        "wave optics",
        "electricity",
        "magnetism",
        "electromagnetism",
        "modern physics",
        "atomic physics",
        "nuclear physics",
        "quantum mechanics",

        // Chemistry
        "physical chemistry",
        "organic chemistry",
        "inorganic chemistry",
        "chemical bonding",
        "periodic table",
        "thermochemistry",
        "electrochemistry",
        "chemical kinetics",
        "solutions",
        "coordination compounds",
        "reaction mechanism",
        "stoichiometry",

        // Biology
        "life science",
        "cell biology",
        "cell structure",
        "biomolecules",
        "enzymes",
        "genetics",
        "inheritance",
        "dna",
        "rna",
        "evolution",
        "human physiology",
        "plant physiology",
        "reproduction",
        "ecology",
        "environmental biology",
        "biotechnology",
        "microbiology",

        // Scientific methods
        "research",
        "experiment",
        "laboratory",
        "practical",
        "observation",
        "hypothesis",
        "theory",
        "law",
        "data analysis",
        "scientific method",
        "measurement",
        "units and dimensions",

        // Academic context
        "science notes",
        "science syllabus",
        "science exam",
        "science question",
        "science problem",
        "numericals",
        "derivation",
        "proof",
      ],
      cs: [
        /* ================= CORE CS ================= */
        "computer science",
        "programming",
        "coding",
        "software development",

        /* ================= PROGRAMMING LANGUAGES ================= */
        "c",
        "c++",
        "c#",
        "java",
        "python",
        "javascript",
        "typescript",
        "go",
        "rust",
        "kotlin",
        "swift",
        "php",
        "ruby",
        "scala",
        "dart",
        "r",
        "matlab",
        "objective-c",
        "perl",
        "haskell",
        "lua",
        "julia",
        "groovy",
        "fortran",
        "cobol",
        "assembly language",
        "bash",
        "shell scripting",
        "powershell",

        /* ================= JAVASCRIPT CORE & RUNTIMES ================= */
        "vanilla javascript",
        "ecmascript",
        "es6",
        "node",
        "node.js",
        "deno",
        "bun",

        /* ================= FRONTEND ================= */
        "html",
        "css",
        "react",
        "react.js",
        "angular",
        "angularjs",
        "vue",
        "vue.js",
        "svelte",
        "sveltekit",
        "solidjs",
        "lit",

        /* ================= FULLSTACK / META FRAMEWORKS ================= */
        "next.js",
        "nuxt",
        "nuxt.js",
        "remix",
        "gatsby",
        "astro",

        /* ================= BACKEND FRAMEWORKS ================= */
        "express",
        "express.js",
        "nestjs",
        "fastify",
        "koa",
        "hapi",

        /* ================= PYTHON FRAMEWORKS ================= */
        "django",
        "flask",
        "fastapi",
        "pyramid",

        /* ================= JAVA FRAMEWORKS ================= */
        "spring",
        "spring boot",
        "spring mvc",
        "hibernate",
        "jakarta ee",

        /* ================= .NET ================= */
        ".net",
        "dotnet",
        "asp.net",
        "asp.net core",
        "blazor",

        /* ================= MOBILE DEVELOPMENT ================= */
        "android development",
        "android sdk",
        "ios development",
        "swiftui",
        "jetpack compose",
        "react native",
        "flutter",
        "xamarin",

        /* ================= DESKTOP ================= */
        "electron",
        "tauri",
        "qt",
        "gtk",

        /* ================= DATA STRUCTURES ================= */
        "data structure",
        "data structures",
        "dsa",
        "array",
        "string",
        "matrix",
        "linked list",
        "singly linked list",
        "doubly linked list",
        "stack",
        "queue",
        "deque",
        "priority queue",
        "binary tree",
        "binary search tree",
        "bst",
        "avl tree",
        "red black tree",
        "heap",
        "trie",
        "graph",
        "directed graph",
        "undirected graph",
        "weighted graph",
        "hashing",
        "hash table",
        "hash map",

        /* ================= ALGORITHMS ================= */
        "algorithm",
        "algorithms",
        "linear search",
        "binary search",
        "sorting",
        "bubble sort",
        "selection sort",
        "insertion sort",
        "merge sort",
        "quick sort",
        "heap sort",
        "greedy algorithm",
        "divide and conquer",
        "dynamic programming",
        "memoization",
        "tabulation",
        "backtracking",

        /* ================= GRAPH & TREE ALGORITHMS ================= */
        "tree traversal",
        "inorder traversal",
        "preorder traversal",
        "postorder traversal",
        "level order traversal",
        "breadth first search",
        "depth first search",
        "bfs",
        "dfs",
        "shortest path algorithm",
        "dijkstra algorithm",
        "minimum spanning tree",
        "prim algorithm",
        "kruskal algorithm",
        "topological sort",

        /* ================= COMPLEXITY ================= */
        "complexity analysis",
        "time complexity",
        "space complexity",
        "big o notation",
        "big omega notation",
        "big theta notation",
        "best case complexity",
        "average case complexity",
        "worst case complexity",
        "recurrence relation",

        /* ================= OPERATING SYSTEM ================= */
        "operating system",
        "process",
        "thread",
        "multithreading",
        "multiprocessing",
        "cpu scheduling",
        "deadlock",
        "mutex",
        "semaphore",
        "virtual memory",
        "paging",
        "segmentation",

        /* ================= COMPUTER NETWORKS ================= */
        "computer networks",
        "osi model",
        "tcp ip model",
        "http protocol",
        "https protocol",
        "dns protocol",
        "udp protocol",
        "ip addressing",

        /* ================= DATABASE ================= */
        "database",
        "dbms",
        "sql",
        "nosql",
        "mysql",
        "postgresql",
        "sqlite",
        "mongodb",
        "redis",
        "normalization",
        "denormalization",
        "indexing",
        "acid properties",

        /* ================= AI / ML / DL ================= */
        "artificial intelligence",
        "machine learning",
        "deep learning",
        "neural network",
        "neural networks",
        "artificial neural network",
        "convolutional neural network",
        "recurrent neural network",
        "long short term memory",
        "transformer architecture",
        "attention mechanism",
        "self attention",
        "supervised learning",
        "unsupervised learning",
        "reinforcement learning",
        "classification",
        "regression",
        "clustering",
        "feature engineering",
        "model training",
        "model evaluation",
        "overfitting",
        "underfitting",

        /* ================= GRAPH ML ================= */
        "graph neural network",
        "gnn",
        "node classification",
        "link prediction",

        /* ================= NLP / LLM ================= */
        "natural language processing",
        "nlp",
        "language model",
        "large language model",
        "llm",
        "prompt engineering",
        "tokenization",
        "embedding",
        "vector database",

        /* ================= MODERN AI TOOLS ================= */
        "langchain",
        "llamaindex",
        "huggingface",
        "openai api",
        "retrieval augmented generation",
        "rag",

        /* ================= DEV TOOLS ================= */
        "git",
        "github",
        "gitlab",
        "docker",
        "kubernetes",
        "linux",
        "unix",
        "ci cd",

        /* ================= ACADEMIC CONTEXT ================= */
        "computer science syllabus",
        "computer science notes",
        "computer science exam",
        "gate computer science",
        "placement preparation",
      ],
      ai: [
        "artificial intelligence",
        "ai",
        "machine learning",
        "deep learning",
        "neural network",
        "neural networks",
        "cnn",
        "rnn",
        "lstm",
        "transformer",
      ],
      exams: [
        /* ================= GENERAL ================= */
        "exam",
        "exams",
        "competitive exam",
        "entrance exam",
        "exam preparation",
        "revision",
        "mock test",
        "practice test",
        "test series",
        "previous year questions",
        "pyq",

        /* ================= ENGINEERING / SCIENCE (INDIA) ================= */
        "jee",
        "jee mains",
        "jee advanced",
        "neet",
        "neet ug",
        "neet pg",
        "aiims exam",
        "gate",
        "ese",
        "ies",
        "iit",
        "nit",
        "iiit",
        "bitsat",

        /* ================= MANAGEMENT ================= */
        "cat",
        "xat",
        "snap",
        "cmat",
        "iift",
        "iim entrance",
        "mba entrance",
        "gmat",
        "gre",

        /* ================= UPSC & CIVIL SERVICES ================= */
        "upsc",
        "civil services exam",
        "ias",
        "ips",
        "ifs",
        "irs",

        /* ================= STATE PSC (INDIA) ================= */
        "state psc",
        "wbcs",
        "bpsc",
        "uppsc",
        "mpsc",
        "rpsc",
        "apsc",
        "tnpsc",
        "kpsc",
        "gpsc",
        "hpsc",
        "jkpsc",

        /* ================= SSC ================= */
        "ssc",
        "ssc cgl",
        "ssc chsl",
        "ssc mts",
        "ssc gd",
        "ssc stenographer",

        /* ================= BANKING ================= */
        "bank exam",
        "banking exam",
        "sbi po",
        "sbi clerk",
        "ibps po",
        "ibps clerk",
        "ibps rrb",
        "rbi grade b",
        "nabard",
        "sidbi",

        /* ================= RAILWAY ================= */
        "rrb",
        "railway exam",
        "rrb ntpc",
        "rrb group d",
        "rrb je",

        /* ================= DEFENCE ================= */
        "nda",
        "cds",
        "afcat",
        "territorial army",
        "army exam",
        "navy exam",
        "air force exam",

        /* ================= TEACHING ================= */
        "ugc net",
        "csir net",
        "ctet",
        "tet",
        "kvs exam",
        "nvs exam",

        /* ================= LAW ================= */
        "clat",
        "ailet",
        "judiciary exam",

        /* ================= COMMERCE / FINANCE ================= */
        "ca",
        "ca foundation",
        "ca intermediate",
        "ca final",
        "cs exam",
        "cma exam",

        /* ================= INTERNATIONAL ================= */
        "sat",
        "act",
        "ielts",
        "toefl",
        "pte",
        "usmle",
        "plab",
        "bar exam",

        /* ================= ACADEMIC ================= */
        "school exam",
        "board exam",
        "cbse exam",
        "icse exam",
        "state board exam",
        "semester exam",
        "university exam",
      ],
    };

    Object.values(eduDomains).forEach(domain => {
      domain.forEach(k => {
        if (text.includes(k)) score += 2;
      });
    });

    /* =========================
       5️⃣ POPULAR SCIENCE / CURIOSITY
       (VERY IMPORTANT FIX)
    ========================= */

    const curiositySignals = [
      "why", "how", "what is", "explained",
      "predicts", "predict", "works",
      "understanding", "strange", "hidden",
      "power of", "future of"
    ];

    curiositySignals.forEach(k => {
      if (text.includes(k)) score += 1;
    });

    /* =========================
       6️⃣ ENTERTAINMENT PENALTIES
    ========================= */

    const entertainment = [
      "vlog", "travel", "trip", "journey",
      "episode", "motorcycle", "bike", "car",
      "road trip", "funny", "comedy", "prank",
      "reaction", "movie", "trailer",
      "song", "music", "gaming", "gameplay",
      "celebrity", "actor", "actress",
      "podcast", "talk show"
    ];

    entertainment.forEach(k => {
      if (text.includes(k)) score -= 4;
    });

    /* =========================
       7️⃣ NEWS / POLITICS PENALTIES
    ========================= */

    const news = [
      "breaking", "news", "government", "govt",
      "politics", "political", "court",
      "supreme court", "bail", "arrest",
      "law", "misuse", "debate", "exposed",
      "latest", "today","hc", "CM", "pm",
       "minister","address","addresses",
       "ed", "judge", "justiece", "order",
       "nation","country","india", "us",  
       "opposition","election","bjp",
       "congress","aap","tmc","case", "cbi", 
    ];

    news.forEach(k => {
      if (text.includes(k)) score -= 5;
    });

    /* =========================
       8️⃣ CONTEXT RULES
    ========================= */

    // If entertainment AND education both present → bias to block
    if (
      entertainment.some(k => text.includes(k)) &&
      score < 5
    ) {
      score -= 3;
    }

    // Single-word tech clickbait protection
    if (
      tokens.length <= 4 &&
      !strongEdu.some(k => text.includes(k))
    ) {
      score -= 1;
    }

    /* =========================
       9️⃣ MODE THRESHOLDS
    ========================= */

    let threshold = 6; // strict
    if (this.mode === "normal") threshold = 4;
    if (this.mode === "lenient") threshold = 2;

    return {
      isEducational: score >= threshold,
      score
    };
  }
}
