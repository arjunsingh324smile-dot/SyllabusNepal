/**
 * Generate all subject JSON data files for the backend.
 * Run: node scripts/generate-data.js
 */
const fs = require('fs');
const path = require('path');

const DATA_ROOT = path.join(__dirname, '..', 'backend', 'data');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJSON(filePath, data) {
  ensureDir(path.dirname(filePath));
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`  Created: ${path.relative(DATA_ROOT, filePath)}`);
  } else {
    console.log(`  Exists:  ${path.relative(DATA_ROOT, filePath)}`);
  }
}

function makeSubject(meta, chapters) {
  return {
    meta: {
      ...meta,
      totalChapters: chapters.length
    },
    chapters
  };
}

function makeCh(id, num, title, shortIntro, overview, whyItMatters, prereqs, topics) {
  return {
    id,
    number: num,
    title,
    shortIntro,
    introduction: {
      overview,
      whyItMatters,
      prerequisites: prereqs,
      yearlyTrend: { "2023": 3, "2024": 4, "2025": 3 }
    },
    topics
  };
}

function makeT(id, num, name, diff, explanation, keyPoints, formula, examTip) {
  return {
    id, number: num, name, difficulty: diff,
    explanation,
    keyPoints,
    formula: formula || null,
    examTip: examTip || null
  };
}

// ═══════════════════════════════════════════
// SCHOOL DATA
// ═══════════════════════════════════════════

function genSchoolBLE() {
  const base = { program: "BLE (Grade 8)", category: "school", subCategory: "ble" };
  const subjects = {
    "mathematics": { subject: "Mathematics", color: "#059669" },
    "english": { subject: "English", color: "#2563EB" },
    "science": { subject: "Science", color: "#7C3AED" },
    "social-studies": { subject: "Social Studies", color: "#D97706" }
  };

  for (const [sid, info] of Object.entries(subjects)) {
    const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025" };
    const chapters = [];
    const chapterNames = {
      "mathematics": ["Number System", "Arithmetic", "Algebra", "Geometry", "Statistics", "Set Theory"],
      "english": ["Reading Comprehension", "Grammar", "Vocabulary", "Writing Skills", "Literature", "Listening Skills"],
      "science": ["Living Beings", "Matter and Energy", "Earth Science", "Force and Motion", "Environment", "Human Body"],
      "social-studies": ["Our Country Nepal", "Social Life", "Civic Awareness", "History", "Geography", "Economics Basics"]
    };
    const names = chapterNames[sid] || ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"];
    names.forEach((name, i) => {
      chapters.push(makeCh(
        `ch-${i+1}`, i+1, name,
        `Introduction to ${name} for BLE students.`,
        `${name} is a fundamental topic in ${info.subject} for Grade 8 students preparing for the Basic Level Examination (BLE). This chapter builds on concepts learned in earlier grades and prepares students for the more advanced work they will encounter in secondary school.\n\nThe chapter covers core principles and applications that students need to master. Understanding these concepts thoroughly will help in both the BLE examination and in building a strong foundation for future studies.\n\nStudents should practice regularly with textbook exercises and past BLE papers to gain confidence in solving problems related to ${name}. Pay attention to the marking scheme and allocate time accordingly during the exam.\n\nThis chapter typically carries moderate weightage in the BLE examination, making it important for achieving a good overall score.`,
        `This chapter is regularly tested in BLE examinations. Mastering ${name} ensures a solid foundation for SEE-level studies.`,
        ["Basic concepts from Grade 7"],
        [
          makeT(`t-${i+1}-1`, 1, `Introduction to ${name}`, "beginner",
            `This topic introduces the fundamental concepts of ${name}. Students will learn the basic definitions, terminology, and foundational principles that form the basis of this chapter.\n\nUnderstanding these basics is essential before moving on to more complex problems and applications.`,
            [`Core concept of ${name}`, "Used in BLE examination", "Foundation for higher-level study"],
            null, `Focus on definitions and basic applications. BLE often asks direct concept questions.`),
          makeT(`t-${i+1}-2`, 2, `Applications of ${name}`, "intermediate",
            `Once students understand the basic concepts, they can apply them to solve practical problems. This topic focuses on real-world applications and problem-solving strategies.\n\nPractice with textbook examples and past papers to develop speed and accuracy.`,
            ["Apply concepts to word problems", "Show clear working in solutions", "Check answers by substitution"],
            null, `In BLE, show all working steps clearly. Partial marks are awarded for correct methodology.`)
        ]
      ));
    });
    writeJSON(path.join(DATA_ROOT, 'school', 'ble', `${sid}.json`), makeSubject(meta, chapters));
  }
}

function genSchoolClass9() {
  const base = { program: "Class 9", category: "school", subCategory: "class-9" };
  const subjects = {
    "mathematics": { subject: "Mathematics", color: "#059669" },
    "science": { subject: "Science", color: "#7C3AED" },
    "english": { subject: "English", color: "#2563EB" },
    "nepali": { subject: "Nepali", color: "#DC2626" }
  };

  for (const [sid, info] of Object.entries(subjects)) {
    const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025" };
    const chapterNames = {
      "mathematics": ["Sets", "Taxation", "Commission and Dividend", "Household Arithmetic", "Mensuration", "Algebra", "Geometry", "Trigonometry", "Statistics", "Probability"],
      "science": ["Classification of Living Things", "Cell Biology", "Chemical Reactions", "Force and Motion", "Pressure", "Energy", "Earth and Space", "Environment"],
      "english": ["Reading Skills", "Grammar Usage", "Composition", "Vocabulary Building", "Dialogue Writing", "Report Writing"],
      "nepali": ["गद्यांश", "पद्यांश", "व्याकरण", "निबन्ध लेखन", "पत्र लेखन", "अनुच्छेद"]
    };
    const names = chapterNames[sid] || [];
    const chapters = names.map((name, i) => makeCh(
      `ch-${i+1}`, i+1, name,
      `Class 9 ${info.subject}: ${name} fundamentals and applications.`,
      `${name} is an important chapter in the Class 9 ${info.subject} curriculum. Building on concepts from Grade 8, this chapter introduces more advanced ideas and prepares students for the SEE examination.\n\nThe chapter explores both theoretical understanding and practical applications. Students should aim to master the core concepts before attempting more complex problems.\n\nRegular practice with classwork exercises and reference materials will help solidify understanding. Teachers typically emphasize this topic due to its relevance in the SEE syllabus.\n\nBy the end of this chapter, students should be comfortable with key concepts and ready to tackle SEE-level questions on ${name}.`,
      `Understanding ${name} at the Class 9 level builds the foundation for SEE preparation. This topic appears in various forms across examinations.`,
      ["Grade 8 foundation"],
      [
        makeT(`t-${i+1}-1`, 1, `Core Concepts of ${name}`, "beginner",
          `This topic covers the fundamental principles of ${name} as taught in Class 9. Students will learn key definitions, theorems, and basic problem-solving approaches.\n\nA thorough understanding of these concepts is necessary before advancing to more complex material in Class 10.`,
          ["Key definitions and principles", "Basic problem-solving techniques", "Links to Grade 8 concepts"],
          null, `Focus on understanding core principles rather than rote memorization.`),
        makeT(`t-${i+1}-2`, 2, `Problem Solving in ${name}`, "intermediate",
          `This topic builds on the core concepts and introduces various problem types that students will encounter in examinations.\n\nPractice is essential — work through as many examples as possible to build speed and confidence.`,
          ["Multiple problem types covered", "Step-by-step solution approach", "Time management in exams"],
          null, `Practice past paper questions on ${name} to understand the exam pattern.`)
      ]
    ));
    writeJSON(path.join(DATA_ROOT, 'school', 'class-9', `${sid}.json`), makeSubject(meta, chapters));
  }
}

function genSchoolSEE() {
  const base = { program: "SEE", category: "school", subCategory: "see" };
  const subjects = {
    "mathematics": { subject: "Mathematics", color: "#059669" },
    "science": { subject: "Science", color: "#7C3AED" },
    "english": { subject: "English", color: "#2563EB" },
    "nepali": { subject: "Nepali", color: "#DC2626" },
    "social-studies": { subject: "Social Studies", color: "#D97706" },
    "optional-mathematics": { subject: "Optional Mathematics", color: "#059669" },
    "computer-science": { subject: "Computer Science", color: "#0891B2" }
  };

  const chapterMap = {
    "mathematics": ["Taxation", "Commission and Dividend", "Household Arithmetic", "Mensuration", "Algebra", "Linear Equations", "Quadratic Equations", "Ratio and Proportion", "Profit and Loss", "Sets", "Functions", "Coordinate Geometry", "Trigonometry", "Statistics and Probability"],
    "science": ["Force and Laws of Motion", "Pressure", "Energy", "Heat", "Light", "Sound", "Electricity and Magnetism", "Classification of Elements", "Chemical Reactions", "Metals and Non-metals", "Carbon Compounds", "Cell Biology and Genetics", "Human Body Systems", "Environment and Ecosystem"],
    "english": ["Reading Comprehension", "Seen Passages", "Unseen Passages", "Grammar - Tenses", "Grammar - Prepositions and Conjunctions", "Grammar - Voice and Narration", "Writing - Essays", "Writing - Letters", "Writing - Stories", "Dialogue and Conversation", "Poetry Analysis", "Short Stories Literature"],
    "nepali": ["गद्यांश बोधगम्यता", "पद्यांश बोधगम्यता", "व्याकरण - शब्द भेद", "व्याकरण - वाक्य रचना", "निबन्ध", "पत्र लेखन", "संवाद लेखन", "सारांश लेखन"],
    "social-studies": ["Development and Infrastructure", "Our Earth", "Social Life and Problems", "Civic Awareness", "History of Nepal", "World History", "Geography of Nepal", "International Relations", "Population and Migration", "Economic Activities"],
    "optional-mathematics": ["Functions and Graphs", "Polynomials", "Sequence and Series", "Linear Programming", "Quadratic Equations Advanced", "Trigonometric Identities", "Height and Distance", "Coordinate Geometry Advanced", "Vectors", "Transformation", "Statistics Advanced", "Probability Advanced"],
    "computer-science": ["Computer Fundamentals", "Number System", "Programming Concepts", "C Programming Basics", "Web Technology HTML", "Multimedia", "Information Security", "Recent Trends in ICT"]
  };

  for (const [sid, info] of Object.entries(subjects)) {
    const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025" };
    const names = chapterMap[sid] || [];
    const chapters = names.map((name, i) => makeCh(
      `ch-${i+1}`, i+1, name,
      `SEE ${info.subject}: Comprehensive study of ${name}.`,
      `${name} is a critical chapter in the SEE ${info.subject} syllabus. This chapter has consistently appeared in SEE examinations and carries significant marks. A thorough understanding of this topic is essential for achieving high grades.\n\nThe chapter covers both theoretical concepts and practical applications. Students preparing for SEE should pay special attention to the types of questions that appear from this chapter, as the pattern tends to be consistent across years.\n\nStudents are advised to study from the approved NEB textbook and supplement with practice from past SEE question papers. Understanding the marking scheme helps in structuring answers properly for maximum marks.\n\nKey formulas and concepts from this chapter should be memorized and practiced regularly. Many students find it helpful to create summary notes and formula sheets for quick revision before the examination.`,
      `This chapter carries significant weightage in SEE. Questions from ${name} appear almost every year and mastering it can significantly boost your overall score.`,
      ["Class 9 foundation in this subject"],
      [
        makeT(`t-${i+1}-1`, 1, `Fundamentals of ${name}`, "beginner",
          `This topic introduces the core concepts of ${name} as required for the SEE examination. Students will learn the essential definitions, principles, and basic problem-solving methods.\n\nA solid grasp of these fundamentals is crucial as they form the basis for more advanced questions that appear in the SEE paper.`,
          [`Key definitions related to ${name}`, "Basic formulas and their applications", "Common SEE question patterns", "Step-by-step problem solving approach"],
          null, `SEE frequently tests basic understanding through short-answer questions. Make sure definitions are precise and clear.`),
        makeT(`t-${i+1}-2`, 2, `Advanced Applications of ${name}`, "intermediate",
          `Building on the fundamentals, this topic covers more complex applications and problem types. These are the questions that differentiate between average and high-scoring students in SEE.\n\nPractice is key — work through past SEE papers dating back 5 years to identify recurring question types and develop efficient solution strategies.`,
          ["Multi-step problem solving", "Application to real-world scenarios", "Common tricks and shortcuts", "Error-prone areas to watch for"],
          null, `For higher marks, show complete working and use proper notation. Examiners award partial marks for correct methodology.`),
        makeT(`t-${i+1}-3`, 3, `Practice and Revision for ${name}`, "intermediate",
          `This topic is about exam preparation strategies specific to ${name}. It covers time management, question selection, and revision techniques that have helped past SEE toppers.\n\nCreate a revision schedule that allocates time proportional to the marks weightage of each section within this chapter.`,
          ["Review all formulas before exam", "Practice time-bound question sets", "Focus on high-weightage areas", "Verify answers using alternative methods"],
          null, `In the SEE exam, attempt all questions from this chapter first if you're confident. It builds momentum for the rest of the paper.`)
      ]
    ));
    writeJSON(path.join(DATA_ROOT, 'school', 'see', `${sid}.json`), makeSubject(meta, chapters));
  }
}

function genNEB(grade) {
  const gradeNum = grade === 11 ? 11 : 12;
  const folder = `neb-grade-${gradeNum}`;
  const progName = `NEB Grade ${gradeNum}`;
  const base = { program: progName, category: "school", subCategory: folder };

  const streams = {
    science: {
      "physics": { subject: "Physics", color: "#DC2626", chapters: ["Mechanics", "Heat and Thermodynamics", "Waves and Optics", "Electricity", "Magnetism", "Modern Physics"] },
      "chemistry": { subject: "Chemistry", color: "#7C3AED", chapters: ["General and Physical Chemistry", "Atomic Structure", "Chemical Bonding", "States of Matter", "Chemical Equilibrium", "Organic Chemistry Basics"] },
      "biology": { subject: "Biology", color: "#059669", chapters: ["Cell Biology", "Genetics", "Ecology", "Plant Biology", "Human Biology", "Biodiversity"] },
      "mathematics": { subject: "Mathematics", color: "#2563EB", chapters: ["Sets and Functions", "Algebra", "Trigonometry", "Coordinate Geometry", "Calculus", "Statistics and Probability", "Linear Programming", "Vectors"] },
      "computer-science": { subject: "Computer Science", color: "#0891B2", chapters: ["Computer Fundamentals", "Number Systems", "Programming in C", "Web Technology", "Database Concepts", "Networking Basics"] },
      "english": { subject: "English", color: "#1D4ED8", chapters: ["Reading Comprehension", "Grammar", "Writing Skills", "Literature", "Listening and Speaking", "Creative Writing"] },
      "nepali": { subject: "Nepali", color: "#B91C1C", chapters: ["गद्य खण्ड", "पद्य खण्ड", "व्याकरण", "निबन्ध", "कार्यालयीन लेखन", "सृजनात्मक लेखन"] }
    },
    management: {
      "business-studies": { subject: "Business Studies", color: "#D97706", chapters: ["Introduction to Business", "Business Environment", "Forms of Business Organization", "Business Planning", "Management Functions", "Marketing"] },
      "accountancy": { subject: "Accountancy", color: "#059669", chapters: ["Introduction to Accounting", "Double Entry System", "Journal and Ledger", "Trial Balance", "Final Accounts", "Bank Reconciliation"] },
      "economics": { subject: "Economics", color: "#2563EB", chapters: ["Introduction to Economics", "Demand and Supply", "Market Structure", "National Income", "Money and Banking", "International Trade"] },
      "business-mathematics": { subject: "Business Mathematics", color: "#7C3AED", chapters: ["Number System", "Ratio and Proportion", "Profit Loss and Discount", "Simple and Compound Interest", "Annuity", "Statistics for Business"] },
      "english": { subject: "English", color: "#1D4ED8", chapters: ["Reading Comprehension", "Grammar", "Writing Skills", "Literature", "Business Communication", "Creative Writing"] },
      "nepali": { subject: "Nepali", color: "#B91C1C", chapters: ["गद्य खण्ड", "पद्य खण्ड", "व्याकरण", "निबन्ध", "कार्यालयीन लेखन", "सृजनात्मक लेखन"] }
    },
    humanities: {
      "sociology": { subject: "Sociology", color: "#7C3AED", chapters: ["Introduction to Sociology", "Social Institutions", "Social Stratification", "Culture and Society", "Social Change", "Research Methods"] },
      "political-science": { subject: "Political Science", color: "#DC2626", chapters: ["Political Theory", "Government Systems", "Constitution of Nepal", "International Relations", "Political Parties", "Human Rights"] },
      "history": { subject: "History", color: "#92400E", chapters: ["Ancient Civilizations", "Medieval Period", "Modern History", "History of Nepal", "World Wars", "Contemporary World"] },
      "psychology": { subject: "Psychology", color: "#2563EB", chapters: ["Introduction to Psychology", "Learning and Memory", "Perception and Sensation", "Motivation and Emotion", "Developmental Psychology", "Social Psychology"] },
      "english": { subject: "English", color: "#1D4ED8", chapters: ["Reading Comprehension", "Grammar", "Writing Skills", "Literature", "Critical Thinking", "Creative Writing"] },
      "nepali": { subject: "Nepali", color: "#B91C1C", chapters: ["गद्य खण्ड", "पद्य खण्ड", "व्याकरण", "निबन्ध", "कार्यालयीन लेखन", "सृजनात्मक लेखन"] }
    },
    education: {
      "foundation-of-education": { subject: "Foundation of Education", color: "#059669", chapters: ["Meaning and Scope of Education", "Philosophy of Education", "Aims of Education", "Curriculum Development"] },
      "child-development": { subject: "Child Development", color: "#D97706", chapters: ["Growth and Development", "Stages of Development", "Learning Theories", "Child Psychology"] },
      "english": { subject: "English", color: "#1D4ED8", chapters: ["Reading Comprehension", "Grammar", "Writing Skills", "Literature", "Communication Skills"] },
      "nepali": { subject: "Nepali", color: "#B91C1C", chapters: ["गद्य खण्ड", "पद्य खण्ड", "व्याकरण", "निबन्ध", "कार्यालयीन लेखन"] }
    }
  };

  for (const [stream, subjectsMap] of Object.entries(streams)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025", stream };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `${progName} ${stream} stream: ${name}.`,
        `${name} is a crucial chapter in the ${progName} ${info.subject} syllabus under the ${stream} stream. This chapter is designed according to the NEB curriculum framework and covers both theoretical and applied aspects of the topic.\n\nStudents studying in the ${stream} stream at Grade ${gradeNum} level will find this chapter essential for their board examinations. The NEB has consistently included questions from this chapter, making it a priority for exam preparation.\n\nThe content builds on secondary-level knowledge and introduces concepts at a higher academic level. Students should regularly practice problems and review past NEB question papers to understand the examination pattern.\n\nBy mastering this chapter, students will develop a strong conceptual foundation that will serve them well in higher education, whether pursuing a bachelor's degree or preparing for entrance examinations.`,
        `This chapter is frequently tested in NEB Grade ${gradeNum} examinations. A strong grasp of ${name} provides both examination success and practical knowledge for future studies.`,
        [`Grade ${gradeNum - 1} foundation`],
        [
          makeT(`t-${i+1}-1`, 1, `Introduction to ${name}`, "beginner",
            `This topic provides a comprehensive introduction to ${name} as studied in Grade ${gradeNum} ${stream} stream. The fundamental concepts, definitions, and principles are covered here.\n\nStudents should aim to understand the conceptual basis thoroughly, as NEB questions often test understanding rather than mere recall.`,
            [`Core principles of ${name}`, "Definitions and terminology", "Historical context and development", "Applications in daily life"],
            null, `NEB Grade ${gradeNum} often includes short-answer questions testing conceptual clarity. Be precise in your definitions.`),
          makeT(`t-${i+1}-2`, 2, `Applications of ${name}`, "intermediate",
            `This topic explores how the concepts of ${name} are applied in practical scenarios and examination contexts. Problem-solving skills are developed through guided examples and practice.`,
            ["Analytical problem-solving techniques", "Real-world application examples", "Common NEB question formats", "Tips for comprehensive answers"],
            null, `For long-answer questions in NEB exams, structure your response with an introduction, main body with examples, and conclusion.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'school', folder, stream, `${sid}.json`), makeSubject(meta, chapters));
    }
  }
}

// ═══════════════════════════════════════════
// BACHELOR DATA
// ═══════════════════════════════════════════

function genBachelorBBS() {
  const base = { program: "BBS", category: "bachelor", subCategory: "bbs" };
  const years = {
    "year-1": {
      "business-english": { subject: "Business English", color: "#2563EB", chapters: ["Business Communication Basics", "Business Letters", "Report Writing", "Presentation Skills", "Business Vocabulary"] },
      "business-mathematics": { subject: "Business Mathematics", color: "#059669", chapters: ["Set Theory", "Functions and Graphs", "Matrix Algebra", "Linear Programming", "Calculus for Business"] },
      "principles-of-management": { subject: "Principles of Management", color: "#D97706", chapters: ["Introduction to Management", "Planning", "Organizing", "Leading", "Controlling"] },
      "financial-accounting": { subject: "Financial Accounting", color: "#7C3AED", chapters: ["Accounting Fundamentals", "Journal Entries", "Ledger and Trial Balance", "Financial Statements", "Depreciation"] },
      "microeconomics": { subject: "Microeconomics", color: "#DC2626", chapters: ["Introduction to Economics", "Demand and Supply", "Consumer Behavior", "Production Theory", "Market Structure"] }
    },
    "year-2": {
      "business-communication": { subject: "Business Communication", color: "#2563EB", chapters: ["Communication Process", "Written Communication", "Oral Communication", "Digital Communication", "Cross-cultural Communication"] },
      "business-statistics": { subject: "Business Statistics", color: "#059669", chapters: ["Introduction to Statistics", "Measures of Central Tendency", "Probability", "Correlation and Regression", "Index Numbers"] },
      "marketing": { subject: "Marketing", color: "#D97706", chapters: ["Marketing Fundamentals", "Consumer Behavior", "Product and Pricing", "Distribution Channels", "Promotion Strategies"] },
      "cost-accounting": { subject: "Cost Accounting", color: "#7C3AED", chapters: ["Cost Concepts", "Material and Labor Costing", "Overhead Allocation", "Job and Process Costing", "Budgeting"] },
      "macroeconomics": { subject: "Macroeconomics", color: "#DC2626", chapters: ["National Income", "Monetary Policy", "Fiscal Policy", "International Trade", "Economic Growth"] }
    },
    "year-3": {
      "business-law": { subject: "Business Law", color: "#374151", chapters: ["Contract Law", "Company Law", "Partnership Act", "Consumer Protection"] },
      "financial-management": { subject: "Financial Management", color: "#059669", chapters: ["Financial Analysis", "Time Value of Money", "Capital Budgeting", "Working Capital Management"] },
      "organizational-behaviour": { subject: "Organizational Behaviour", color: "#D97706", chapters: ["Individual Behavior", "Group Dynamics", "Leadership", "Organizational Culture"] },
      "tax-planning": { subject: "Tax Planning", color: "#DC2626", chapters: ["Income Tax Basics", "Tax Computation", "Tax Planning Strategies", "VAT and Customs"] }
    },
    "year-4": {
      "strategic-management": { subject: "Strategic Management", color: "#1D4ED8", chapters: ["Strategic Analysis", "Strategy Formulation", "Strategy Implementation"] },
      "investment-management": { subject: "Investment Management", color: "#059669", chapters: ["Investment Fundamentals", "Security Analysis", "Portfolio Management"] },
      "entrepreneurship": { subject: "Entrepreneurship", color: "#D97706", chapters: ["Entrepreneurial Mindset", "Business Plan Development", "Startup Management"] }
    }
  };

  for (const [yr, subjectsMap] of Object.entries(years)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025", semester: yr };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `BBS ${yr}: ${name} — comprehensive study material.`,
        `${name} is a key chapter in the BBS ${info.subject} curriculum for ${yr.replace('-', ' ')}. This chapter provides students with the knowledge and skills needed for success in their university examinations and future professional careers.\n\nThe content is designed according to Tribhuvan University's approved syllabus and covers both theoretical frameworks and practical applications. Students are expected to demonstrate analytical thinking and the ability to apply concepts to business scenarios.\n\nRegular attendance in lectures, combined with self-study using recommended textbooks, is essential for mastering this chapter. Past examination papers from TU provide valuable insight into the types of questions that are typically asked.\n\nThis chapter forms an important foundation for advanced topics that students will encounter in subsequent years of their BBS program.`,
        `This chapter is essential for BBS ${yr.replace('-', ' ')} examinations and provides practical knowledge applicable to business and commerce careers in Nepal.`,
        ["Previous year coursework"],
        [
          makeT(`t-${i+1}-1`, 1, `Core Concepts: ${name}`, "beginner",
            `This topic covers the fundamental concepts of ${name}. Students will learn the essential theories, definitions, and frameworks that form the basis of this chapter.\n\nA solid understanding of these fundamentals is necessary for tackling examination questions and for practical application in real-world business scenarios.`,
            ["Key theories and frameworks", "Essential definitions", "Foundational principles", "TU examination relevance"],
            null, `In TU exams, start long answers with a clear definition, followed by explanation and examples. This structure typically earns the highest marks.`),
          makeT(`t-${i+1}-2`, 2, `Applied ${name}`, "intermediate",
            `Building on the foundational concepts, this topic explores practical applications of ${name} in business contexts. Case studies and examples relevant to Nepal's business environment are emphasized.`,
            ["Real-world business applications", "Case study approach", "Nepal-specific examples", "Problem-solving framework"],
            null, `TU often asks case-based questions. Practice applying theoretical concepts to practical scenarios.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'bachelor', 'bbs', yr, `${sid}.json`), makeSubject(meta, chapters));
    }
  }
}

function genBachelorBBA() {
  const base = { program: "BBA", category: "bachelor", subCategory: "bba" };
  const sems = {
    "sem-1": {
      "principles-of-management": { subject: "Principles of Management", color: "#D97706", chapters: ["Introduction to Management", "Evolution of Management Thought", "Planning and Decision Making", "Organizing"] },
      "financial-accounting": { subject: "Financial Accounting", color: "#059669", chapters: ["Accounting Basics", "Recording Transactions", "Trial Balance", "Final Accounts"] },
      "business-mathematics": { subject: "Business Mathematics", color: "#7C3AED", chapters: ["Algebra and Functions", "Matrix Operations", "Calculus Basics", "Linear Programming"] },
      "english-communication": { subject: "English Communication", color: "#2563EB", chapters: ["Communication Fundamentals", "Business Writing", "Presentation", "Grammar and Usage"] }
    },
    "sem-2": {
      "organizational-behavior": { subject: "Organizational Behavior", color: "#D97706", chapters: ["Individual Behavior", "Motivation", "Group Dynamics", "Leadership"] },
      "business-statistics": { subject: "Business Statistics", color: "#059669", chapters: ["Descriptive Statistics", "Probability", "Regression Analysis", "Hypothesis Testing"] },
      "microeconomics": { subject: "Microeconomics", color: "#DC2626", chapters: ["Consumer Theory", "Production and Cost", "Market Structures", "Welfare Economics"] },
      "business-law": { subject: "Business Law", color: "#374151", chapters: ["Contract Law", "Company Law", "Labor Law", "Consumer Protection"] }
    }
  };

  for (const [sem, subjectsMap] of Object.entries(sems)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025", semester: sem };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `BBA ${sem}: ${name} — key concepts and applications.`,
        `${name} is an essential chapter in the BBA ${info.subject} syllabus for ${sem.replace('-', ' ')}. This chapter builds the managerial and analytical skills that are fundamental to a successful career in business administration.\n\nStudents will explore both classical and contemporary perspectives on ${name}, with emphasis on case studies and practical applications relevant to the Nepali business environment.\n\nThe BBA program emphasizes a practical, application-oriented approach to learning. Students should supplement their textbook study with current business news, case analyses, and group discussions.\n\nMastering this chapter prepares students for more advanced topics in subsequent semesters and provides a competitive edge in the job market.`,
        `Mastering ${name} is crucial for BBA students as it directly applies to professional practice and higher-semester coursework.`,
        ["Pre-requisite: Previous semester courses"],
        [
          makeT(`t-${i+1}-1`, 1, `Fundamentals of ${name}`, "beginner",
            `This topic introduces core concepts of ${name}. Students learn essential frameworks, terminology, and principles that underpin this chapter.\n\nThe focus is on building a strong conceptual foundation that can be applied to real business situations.`,
            ["Core frameworks and models", "Essential business terminology", "Foundational principles"],
            null, `In BBA exams, demonstrate both theoretical knowledge and practical application for full marks.`),
          makeT(`t-${i+1}-2`, 2, `Case Studies in ${name}`, "intermediate",
            `This topic uses case studies to illustrate how ${name} concepts apply in real business scenarios. Students develop analytical and problem-solving skills through guided case analysis.`,
            ["Case analysis methodology", "Real-world application", "Critical thinking development"],
            null, `Practice analyzing mini-cases within time limits to prepare for exam scenarios.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'bachelor', 'bba', sem, `${sid}.json`), makeSubject(meta, chapters));
    }
  }
}

function genBachelorBCA() {
  const base = { program: "BCA", category: "bachelor", subCategory: "bca" };
  const sems = {
    "sem-1": {
      "c-programming": { subject: "C Programming", color: "#059669", chapters: ["Introduction to Programming", "Data Types and Variables", "Control Structures", "Functions", "Arrays and Strings", "Pointers", "File Handling"] },
      "digital-logic": { subject: "Digital Logic", color: "#DC2626", chapters: ["Number Systems", "Logic Gates", "Boolean Algebra", "Combinational Circuits", "Sequential Circuits"] },
      "calculus": { subject: "Calculus", color: "#7C3AED", chapters: ["Limits and Continuity", "Differentiation", "Integration", "Applications of Calculus"] },
      "english": { subject: "English", color: "#2563EB", chapters: ["Technical Writing", "Communication Skills", "Grammar Review", "Report Writing"] }
    },
    "sem-2": {
      "object-oriented-programming": { subject: "Object-Oriented Programming", color: "#059669", chapters: ["OOP Concepts", "Classes and Objects", "Inheritance", "Polymorphism", "Exception Handling"] },
      "discrete-mathematics": { subject: "Discrete Mathematics", color: "#7C3AED", chapters: ["Logic and Proofs", "Sets and Relations", "Functions", "Graph Theory", "Combinatorics"] },
      "probability-statistics": { subject: "Probability & Statistics", color: "#D97706", chapters: ["Probability Basics", "Random Variables", "Probability Distributions", "Statistical Inference"] },
      "data-communication": { subject: "Data Communication", color: "#0891B2", chapters: ["Data Communication Basics", "Transmission Media", "Network Models", "Protocols"] }
    }
  };

  for (const [sem, subjectsMap] of Object.entries(sems)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025", semester: sem };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `BCA ${sem}: ${name} — theory and practical application.`,
        `${name} is a core chapter in the BCA ${info.subject} course for ${sem.replace('-', ' ')}. This chapter provides the technical knowledge and practical skills essential for a career in computer applications and IT.\n\nThe BCA curriculum emphasizes hands-on learning alongside theoretical understanding. Students should practice coding, work through lab exercises, and build small projects to reinforce the concepts covered in this chapter.\n\nThe content follows the TU-affiliated BCA syllabus and is designed to prepare students for both university examinations and practical industry requirements.\n\nStudents who master this chapter will have a strong foundation for advanced topics in later semesters, including software engineering, database management, and web development.`,
        `This chapter is fundamental to the BCA curriculum. Understanding ${name} thoroughly will help in examinations and in practical computing work.`,
        ["Basic computer literacy"],
        [
          makeT(`t-${i+1}-1`, 1, `Introduction to ${name}`, "beginner",
            `This topic provides a comprehensive introduction to ${name}. Students learn the core concepts, terminology, and basic techniques that form the foundation of this chapter.\n\nComputer application students should focus on both understanding the theory and practicing with hands-on exercises.`,
            ["Core concepts and definitions", "Practical examples and demonstrations", "Common patterns and techniques"],
            null, `BCA exams test both theoretical knowledge and practical application. Include code examples or diagrams where relevant.`),
          makeT(`t-${i+1}-2`, 2, `Advanced ${name}`, "intermediate",
            `This topic builds on the basics and explores more advanced aspects of ${name}. Emphasis is placed on problem-solving and practical application.`,
            ["Advanced techniques", "Problem-solving strategies", "Industry best practices"],
            null, `Practice writing code or solutions by hand, as BCA exams often require handwritten programs.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'bachelor', 'bca', sem, `${sid}.json`), makeSubject(meta, chapters));
    }
  }
}

function genBachelorBScCSIT() {
  const base = { program: "BSc CSIT", category: "bachelor", subCategory: "bsc-csit" };
  const sems = {
    "sem-1": {
      "c-programming": { subject: "C Programming", color: "#059669", chapters: ["Introduction to C", "Operators and Expressions", "Control Statements", "Functions", "Arrays", "Pointers", "Structures and Unions", "File I/O"] },
      "mathematics-1": { subject: "Mathematics I", color: "#7C3AED", chapters: ["Limits and Continuity", "Derivatives", "Applications of Derivatives", "Integration", "Infinite Series"] },
      "digital-logic": { subject: "Digital Logic", color: "#DC2626", chapters: ["Number Systems and Codes", "Boolean Algebra", "Logic Gates", "Combinational Logic", "Sequential Logic"] },
      "english": { subject: "English", color: "#2563EB", chapters: ["Technical Communication", "Grammar and Composition", "Academic Writing", "Presentation Skills"] }
    },
    "sem-2": {
      "data-structures-algorithms": { subject: "Data Structures and Algorithms", color: "#059669", chapters: ["Introduction to DSA", "Stacks and Queues", "Linked Lists", "Trees", "Graphs", "Sorting Algorithms", "Searching Algorithms"] },
      "mathematics-2": { subject: "Mathematics II", color: "#7C3AED", chapters: ["Linear Algebra", "Eigenvalues and Eigenvectors", "Differential Equations", "Laplace Transforms"] },
      "microprocessor": { subject: "Microprocessor", color: "#DC2626", chapters: ["Introduction to Microprocessor", "8085 Architecture", "Assembly Language", "Interfacing"] },
      "statistics": { subject: "Statistics", color: "#D97706", chapters: ["Descriptive Statistics", "Probability", "Random Variables", "Hypothesis Testing", "Regression"] }
    }
  };

  for (const [sem, subjectsMap] of Object.entries(sems)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025", semester: sem };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `BSc CSIT ${sem}: ${name} for computer science students.`,
        `${name} is a vital chapter in the BSc CSIT ${info.subject} syllabus for ${sem.replace('-', ' ')}. The BSc CSIT program at TU is one of the most sought-after programs in Nepal for students interested in computer science and information technology.\n\nThis chapter covers fundamentals that are critical not only for university examinations but also for technical interviews, competitive programming, and advanced research in computer science.\n\nStudents should combine textbook study with practical programming exercises, online resources, and group study sessions. The BSc CSIT curriculum is rigorous, and consistent effort throughout the semester is necessary for success.\n\nMastering ${name} will provide students with skills that are directly applicable in Nepal's growing IT industry and in further academic pursuits.`,
        `Essential for BSc CSIT students — ${name} is heavily weighted in semester exams and forms the basis for advanced courses.`,
        ["Strong foundation in secondary mathematics and science"],
        [
          makeT(`t-${i+1}-1`, 1, `Fundamentals of ${name}`, "beginner",
            `A thorough introduction to the concepts of ${name}. This topic establishes the foundational knowledge required for the rest of the chapter and for advanced study in later semesters.\n\nBSc CSIT students should particularly focus on the theoretical aspects that are frequently tested in TU examinations.`,
            ["Core theoretical concepts", "Mathematical foundations", "Practical implementation aspects"],
            null, `TU BSc CSIT exams emphasize long-answer questions. Structure your answers clearly with definitions, explanations, and examples.`),
          makeT(`t-${i+1}-2`, 2, `Advanced Topics in ${name}`, "intermediate",
            `Deeper exploration of ${name} covering complex concepts, optimization techniques, and advanced applications relevant to computer science.`,
            ["Complexity analysis", "Optimization techniques", "Real-world applications"],
            null, `Focus on algorithm implementations and time complexity analysis — these are high-value topics in CSIT exams.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'bachelor', 'bsc-csit', sem, `${sid}.json`), makeSubject(meta, chapters));
    }
  }
}

function genBachelorBSc() {
  const base = { program: "BSc", category: "bachelor", subCategory: "bsc" };
  const subjects = {
    "physics": { subject: "Physics", color: "#DC2626", chapters: ["Mechanics", "Thermodynamics", "Waves and Optics", "Electricity and Magnetism", "Modern Physics"] },
    "chemistry": { subject: "Chemistry", color: "#7C3AED", chapters: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Analytical Chemistry", "Environmental Chemistry"] },
    "mathematics": { subject: "Mathematics", color: "#2563EB", chapters: ["Calculus", "Linear Algebra", "Differential Equations", "Real Analysis", "Abstract Algebra"] },
    "biology": { subject: "Biology", color: "#059669", chapters: ["Cell Biology", "Genetics", "Ecology", "Microbiology", "Biochemistry"] },
    "microbiology": { subject: "Microbiology", color: "#0891B2", chapters: ["Introduction to Microbiology", "Bacteriology", "Virology", "Mycology", "Applied Microbiology"] }
  };

  for (const [sid, info] of Object.entries(subjects)) {
    const meta = { ...base, subject: info.subject, subjectId: sid, color: info.color, lastUpdated: "2025" };
    const chapters = info.chapters.map((name, i) => makeCh(
      `ch-${i+1}`, i+1, name,
      `BSc ${info.subject}: ${name} — university level study.`,
      `${name} is a fundamental chapter in the BSc ${info.subject} curriculum. This chapter provides a university-level understanding of the topic, building on concepts from the +2 level.\n\nBSc students should approach this chapter with a focus on both conceptual depth and experimental understanding. Laboratory work complements the theoretical study and is essential for a complete grasp of the material.\n\nThe curriculum follows TU's approved syllabus and prepares students for higher studies (MSc) as well as professional careers in science and technology.\n\nStudents are encouraged to consult multiple reference books and research papers to develop a comprehensive understanding of ${name}.`,
      `This chapter is central to the BSc ${info.subject} program and provides essential knowledge for both examinations and research careers.`,
      ["+2 Science background"],
      [
        makeT(`t-${i+1}-1`, 1, `Theoretical Foundations of ${name}`, "intermediate",
          `A comprehensive coverage of the theoretical foundations of ${name} at the university level. This topic introduces advanced concepts that build upon secondary-level knowledge.`,
          ["Advanced theoretical concepts", "Mathematical derivations", "Key laws and principles"],
          null, `BSc exams require detailed derivations. Practice writing proofs and derivations step by step.`),
        makeT(`t-${i+1}-2`, 2, `Experimental and Applied ${name}`, "advanced",
          `This topic covers the experimental and applied aspects of ${name}. Laboratory exercises, calculations, and practical applications are emphasized.`,
          ["Laboratory techniques", "Data analysis", "Practical applications"],
          null, `Always link theoretical knowledge to practical experiments in your exam answers.`)
      ]
    ));
    writeJSON(path.join(DATA_ROOT, 'bachelor', 'bsc', `${sid}.json`), makeSubject(meta, chapters));
  }
}

// ═══════════════════════════════════════════
// ENGINEERING DATA
// ═══════════════════════════════════════════

function genEngineering() {
  const universities = {
    "tu-ioe": {
      name: "TU / IOE Engineering", color: "#DC2626",
      branches: {
        "civil": {
          "mathematics": { subject: "Engineering Mathematics", color: "#2563EB", chapters: ["Differential Calculus", "Integral Calculus", "Differential Equations", "Laplace Transform", "Linear Algebra", "Fourier Series"] },
          "physics": { subject: "Engineering Physics", color: "#DC2626", chapters: ["Mechanics", "Waves and Optics", "Thermodynamics", "Electromagnetism", "Modern Physics"] },
          "engineering-drawing": { subject: "Engineering Drawing", color: "#059669", chapters: ["Projection Systems", "Orthographic Projections", "Isometric Drawing", "Section Drawing", "Development of Surfaces"] },
          "fluid-mechanics": { subject: "Fluid Mechanics", color: "#0891B2", chapters: ["Fluid Properties", "Fluid Statics", "Fluid Dynamics", "Bernoulli's Equation", "Pipe Flow", "Open Channel Flow"] }
        },
        "computer": {
          "data-structures": { subject: "Data Structures", color: "#059669", chapters: ["Arrays and Linked Lists", "Stacks and Queues", "Trees", "Graphs", "Sorting Algorithms", "Hashing"] },
          "algorithms": { subject: "Algorithms", color: "#7C3AED", chapters: ["Algorithm Analysis", "Divide and Conquer", "Dynamic Programming", "Greedy Algorithms", "Graph Algorithms", "NP-Completeness"] },
          "computer-networks": { subject: "Computer Networks", color: "#0891B2", chapters: ["Network Models", "Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"] },
          "operating-systems": { subject: "Operating Systems", color: "#DC2626", chapters: ["OS Concepts", "Process Management", "Memory Management", "File Systems", "I/O Management", "Deadlocks"] }
        },
        "electrical": {
          "circuit-theory": { subject: "Circuit Theory", color: "#D97706", chapters: ["Basic Circuit Elements", "Kirchhoff's Laws", "Network Theorems", "AC Circuit Analysis", "Resonance"] },
          "electronics": { subject: "Electronics", color: "#7C3AED", chapters: ["Semiconductor Physics", "Diodes", "Transistors", "Amplifiers", "Operational Amplifiers"] },
          "power-systems": { subject: "Power Systems", color: "#DC2626", chapters: ["Power Generation", "Transmission Lines", "Distribution Systems", "Power System Protection", "Load Flow Analysis"] }
        },
        "electronics": {
          "analog-electronics": { subject: "Analog Electronics", color: "#D97706", chapters: ["Diode Circuits", "BJT Amplifiers", "FET Circuits", "Operational Amplifiers", "Oscillators", "Power Amplifiers"] },
          "digital-electronics": { subject: "Digital Electronics", color: "#059669", chapters: ["Number Systems", "Boolean Algebra", "Combinational Logic", "Sequential Logic", "Memory Devices", "Digital-Analog Conversion"] }
        }
      }
    },
    "kathmandu-university": {
      name: "Kathmandu University", color: "#B91C1C",
      branches: {
        "computer": {
          "programming-1": { subject: "Programming I", color: "#059669", chapters: ["Introduction to Programming", "Variables and Data Types", "Control Structures", "Functions", "Arrays", "Pointers"] },
          "data-structures": { subject: "Data Structures", color: "#7C3AED", chapters: ["Introduction to DSA", "Linear Data Structures", "Trees and Graphs", "Sorting and Searching", "Hashing"] },
          "software-engineering": { subject: "Software Engineering", color: "#0891B2", chapters: ["Software Development Models", "Requirements Analysis", "System Design", "Testing", "Project Management"] }
        },
        "civil": {
          "structural-analysis": { subject: "Structural Analysis", color: "#DC2626", chapters: ["Introduction to Structural Analysis", "Determinate Structures", "Indeterminate Structures", "Influence Lines", "Matrix Methods"] }
        }
      }
    },
    "pokhara-university": {
      name: "Pokhara University", color: "#991B1B",
      branches: {
        "computer": {
          "object-oriented-programming": { subject: "Object-Oriented Programming", color: "#059669", chapters: ["OOP Fundamentals", "Classes and Objects", "Inheritance", "Polymorphism", "Templates and STL"] },
          "database-management": { subject: "Database Management", color: "#7C3AED", chapters: ["Introduction to DBMS", "Relational Model", "SQL", "Normalization", "Transaction Management"] }
        },
        "civil": {
          "soil-mechanics": { subject: "Soil Mechanics", color: "#92400E", chapters: ["Soil Properties", "Soil Classification", "Permeability", "Compaction", "Shear Strength"] }
        }
      }
    },
    "purvanchal-university": {
      name: "Purvanchal University", color: "#7F1D1D",
      branches: {
        "computer": {
          "c-programming": { subject: "C Programming", color: "#059669", chapters: ["Introduction to C", "Data Types and Operators", "Control Flow", "Functions", "Arrays and Strings", "Pointers and Memory"] }
        },
        "civil": {
          "engineering-mechanics": { subject: "Engineering Mechanics", color: "#DC2626", chapters: ["Force Systems", "Equilibrium", "Friction", "Centroids", "Moment of Inertia", "Dynamics"] }
        }
      }
    }
  };

  for (const [univId, univ] of Object.entries(universities)) {
    for (const [branch, subjectsMap] of Object.entries(univ.branches)) {
      for (const [sid, info] of Object.entries(subjectsMap)) {
        const meta = {
          program: univ.name, category: "engineering", subCategory: univId,
          branch, subject: info.subject, subjectId: sid,
          color: info.color, lastUpdated: "2025"
        };
        const chapters = info.chapters.map((name, i) => makeCh(
          `ch-${i+1}`, i+1, name,
          `${univ.name} ${branch} engineering: ${name}.`,
          `${name} is a critical chapter in the ${info.subject} course offered under the ${branch} engineering program at ${univ.name}. Engineering students must develop a deep understanding of this topic as it forms the basis for professional engineering practice.\n\nThe chapter combines theoretical analysis with practical problem-solving. Students should work through solved examples, practice unsolved problems, and relate theoretical concepts to real-world engineering applications.\n\nLaboratory sessions and tutorial classes complement the lecture content. Students are advised to maintain a problem-solving notebook and regularly review past examination papers for this subject.\n\nMastery of ${name} is essential not only for university examinations but also for a successful engineering career.`,
          `Critical for ${branch} engineering students — ${name} is fundamental to professional practice and regularly tested in university examinations.`,
          ["Pre-requisite engineering courses"],
          [
            makeT(`t-${i+1}-1`, 1, `Fundamentals of ${name}`, "intermediate",
              `This topic covers the essential theoretical foundations of ${name} as studied in ${branch} engineering. Students learn key principles, derivations, and problem-solving methodologies.\n\nEngineering students should focus on understanding the underlying physics/mathematics rather than memorizing formulas.`,
              ["Key principles and derivations", "Standard problem types", "Engineering applications"],
              null, `Show all derivation steps in exams. Partial marks are significant in engineering examinations.`),
            makeT(`t-${i+1}-2`, 2, `Applications and Design`, "advanced",
              `Advanced applications of ${name} in engineering design and analysis. This topic covers practical calculations, design criteria, and real-world engineering challenges.`,
              ["Design calculations", "Safety factors and standards", "Practical case studies"],
              null, `Relate theoretical concepts to Nepal's engineering context where possible — examiners appreciate practical awareness.`)
          ]
        ));
        writeJSON(path.join(DATA_ROOT, 'engineering', univId, branch, `${sid}.json`), makeSubject(meta, chapters));
      }
    }
  }
}

// ═══════════════════════════════════════════
// ENTRANCE DATA
// ═══════════════════════════════════════════

function genEntrance() {
  const exams = {
    "ioe": {
      name: "IOE Entrance", color: "#DC2626",
      subjects: {
        "mathematics": { subject: "Mathematics", chapters: ["Algebra", "Trigonometry", "Coordinate Geometry", "Calculus", "Vectors", "Probability and Statistics", "Complex Numbers", "Matrices"] },
        "physics": { subject: "Physics", chapters: ["Mechanics", "Heat and Thermodynamics", "Waves and Optics", "Electricity", "Magnetism", "Modern Physics", "Units and Measurements"] },
        "chemistry": { subject: "Chemistry", chapters: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry", "Environmental Chemistry", "Applied Chemistry"] },
        "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Reading Comprehension", "Composition"] }
      }
    },
    "csit": {
      name: "CSIT Entrance", color: "#0891B2",
      subjects: {
        "mathematics": { subject: "Mathematics", chapters: ["Algebra", "Trigonometry", "Calculus", "Coordinate Geometry", "Vectors", "Statistics"] },
        "physics": { subject: "Physics", chapters: ["Mechanics", "Heat", "Waves", "Optics", "Electricity", "Modern Physics"] },
        "chemistry": { subject: "Chemistry", chapters: ["General Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"] },
        "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Comprehension"] },
        "basic-computer": { subject: "Basic Computer", chapters: ["Computer Fundamentals", "Number System", "Programming Concepts", "Networking Basics", "Internet and Multimedia"] }
      }
    },
    "kucat-cbt": {
      name: "KUCAT-CBT", color: "#0E7490",
      subjects: {
        "mathematics": { subject: "Mathematics", chapters: ["Algebra", "Trigonometry", "Calculus", "Coordinate Geometry", "Probability"] },
        "physics": { subject: "Physics", chapters: ["Mechanics", "Thermodynamics", "Waves", "Electricity", "Modern Physics"] },
        "chemistry": { subject: "Chemistry", chapters: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"] },
        "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Comprehension", "Writing"] }
      }
    },
    "cmat": {
      name: "CMAT", color: "#D97706",
      subjects: {
        "verbal-ability": { subject: "Verbal Ability", chapters: ["Reading Comprehension", "Sentence Correction", "Vocabulary", "Analogies", "Para Jumbles"] },
        "quantitative-ability": { subject: "Quantitative Ability", chapters: ["Number System", "Arithmetic", "Algebra", "Geometry", "Data Interpretation"] },
        "logical-reasoning": { subject: "Logical Reasoning", chapters: ["Syllogisms", "Coding-Decoding", "Blood Relations", "Arrangements", "Puzzles"] },
        "general-awareness": { subject: "General Awareness", chapters: ["Current Affairs Nepal", "General Knowledge", "Business Awareness", "Computer Basics"] }
      }
    }
  };

  // Simple entrance exams (flat structure)
  for (const [examId, exam] of Object.entries(exams)) {
    for (const [sid, info] of Object.entries(exam.subjects)) {
      const meta = {
        program: exam.name, category: "entrance", subCategory: examId,
        subject: info.subject, subjectId: sid, color: exam.color, lastUpdated: "2025"
      };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `${exam.name}: ${name} — exam preparation guide.`,
        `${name} is a critical topic for the ${exam.name} examination. This chapter covers the complete syllabus content as specified by the conducting body, with focus on the types of questions that appear in the entrance test.\n\nThe ${exam.name} is one of the most competitive entrance examinations in Nepal, and thorough preparation of ${name} is essential for achieving a high rank. Past papers analysis shows that this topic consistently carries significant marks.\n\nStudents should combine systematic study with timed practice tests. Focus on accuracy first, then work on speed. Understanding concepts deeply is more effective than memorizing formulas, as the examination tests analytical ability.\n\nA structured preparation plan covering this chapter, combined with regular revision and mock tests, will maximize your chances of success in the ${exam.name}.`,
        `High-frequency topic in ${exam.name}. Thorough preparation of ${name} can significantly improve your entrance rank. Multiple questions appear from this chapter every year.`,
        ["NEB Grade 11-12 syllabus knowledge"],
        [
          makeT(`t-${i+1}-1`, 1, `Core Concepts: ${name}`, "intermediate",
            `This topic covers the essential concepts of ${name} that are tested in the ${exam.name} examination. Focus is on building a solid understanding that enables quick and accurate problem-solving under exam conditions.\n\nStudents should practice with past entrance papers and model questions to familiarize themselves with the question patterns.`,
            ["Key formulas and principles", "Common question patterns", "Quick-solving techniques", "High-frequency topics"],
            null, `In ${exam.name}, time management is crucial. Practice solving MCQs within 60-90 seconds per question.`),
          makeT(`t-${i+1}-2`, 2, `Problem Solving: ${name}`, "advanced",
            `Advanced problem-solving techniques for ${name} in the context of competitive entrance examination. This topic covers shortcuts, elimination strategies, and advanced methods.\n\nFocus on the most frequently tested areas and develop systematic approaches to solve problems efficiently.`,
            ["Shortcut methods", "Elimination techniques", "Common traps to avoid", "Previous year patterns"],
            null, `Review the last 5 years of ${exam.name} papers for ${name}. Identify the most repeated question types.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'entrance', examId, `${sid}.json`), makeSubject(meta, chapters));
    }
  }

  // CEE sub-exams
  const ceeExams = {
    "mbbs": {
      "physics": { subject: "Physics", chapters: ["Mechanics", "Waves and Optics", "Thermodynamics", "Electricity and Magnetism", "Modern Physics"] },
      "chemistry": { subject: "Chemistry", chapters: ["General Chemistry", "Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"] },
      "biology": { subject: "Biology", chapters: ["Cell Biology", "Genetics", "Human Physiology", "Plant Biology", "Evolution", "Ecology"] },
      "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Comprehension"] }
    },
    "bds": {
      "physics": { subject: "Physics", chapters: ["Mechanics", "Optics", "Electricity", "Modern Physics"] },
      "chemistry": { subject: "Chemistry", chapters: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"] },
      "biology": { subject: "Biology", chapters: ["Human Anatomy", "Physiology", "Genetics", "Microbiology"] }
    },
    "bsc-nursing": {
      "biology": { subject: "Biology", chapters: ["Cell Biology", "Human Physiology", "Genetics", "Microbiology", "Nutrition"] },
      "chemistry": { subject: "Chemistry", chapters: ["Organic Chemistry", "Biochemistry", "Pharmaceutical Chemistry"] },
      "general-knowledge": { subject: "General Knowledge", chapters: ["Current Affairs", "Health Awareness", "Nepal GK", "Science GK"] }
    },
    "b-pharmacy": {
      "physics": { subject: "Physics", chapters: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"] },
      "chemistry": { subject: "Chemistry", chapters: ["Organic Chemistry", "Physical Chemistry", "Pharmaceutical Chemistry"] },
      "biology": { subject: "Biology", chapters: ["Cell Biology", "Biochemistry", "Pharmacology Basics", "Microbiology"] }
    }
  };

  for (const [subExam, subjectsMap] of Object.entries(ceeExams)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = {
        program: "CEE Medical Entrance", category: "entrance", subCategory: "cee",
        subExam, subject: info.subject, subjectId: sid, color: "#7C3AED", lastUpdated: "2025"
      };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `CEE ${subExam.toUpperCase()}: ${name} preparation material.`,
        `${name} is a crucial chapter for the CEE ${subExam.toUpperCase()} entrance examination. Medical and health science entrance exams in Nepal require deep understanding of this topic, and the CEE consistently tests both conceptual knowledge and application.\n\nStudents preparing for ${subExam.toUpperCase()} through CEE should focus on understanding the biological and chemical principles deeply, as MCQ options are often designed to test subtle differences in understanding.\n\nPast CEE papers show that ${name} is a high-weightage topic. Practice with official model questions and previous year papers to understand the difficulty level and question patterns.\n\nA combiniation of textbook study, model question practice, and group discussion will provide the best preparation for this chapter.`,
        `Critical for CEE ${subExam.toUpperCase()} — this topic carries high marks and appears every year. Focus on conceptual clarity and application-based questions.`,
        ["NEB Grade 11-12 Biology/Chemistry/Physics"],
        [
          makeT(`t-${i+1}-1`, 1, `Core Concepts: ${name}`, "intermediate",
            `Essential concepts of ${name} for the CEE ${subExam.toUpperCase()} examination. Focus on understanding mechanisms, processes, and key definitions that are most frequently tested.`,
            ["Key definitions and processes", "Critical mechanisms", "Common MCQ patterns"],
            null, `CEE MCQs often test exceptions and special cases. Pay attention to "except" and "not true" type questions.`),
          makeT(`t-${i+1}-2`, 2, `Practice & Application: ${name}`, "advanced",
            `Application-based practice for ${name}. Focuses on clinical correlations, practical applications, and high-yield topics for the entrance examination.`,
            ["Clinical correlations", "Application-based questions", "High-yield facts"],
            null, `Memorize key facts and figures for this chapter. CEE tests factual recall alongside conceptual understanding.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'entrance', 'cee', subExam, `${sid}.json`), makeSubject(meta, chapters));
    }
  }

  // PU Entrance sub-exams
  const puExams = {
    "be": {
      "mathematics": { subject: "Mathematics", chapters: ["Algebra", "Trigonometry", "Calculus", "Coordinate Geometry", "Vectors"] },
      "physics": { subject: "Physics", chapters: ["Mechanics", "Thermodynamics", "Waves", "Electricity", "Modern Physics"] },
      "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Comprehension"] }
    },
    "bba": {
      "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Reading Comprehension", "Writing"] },
      "mathematics": { subject: "Mathematics", chapters: ["Arithmetic", "Algebra", "Statistics", "Basic Calculus"] },
      "logical-reasoning": { subject: "Logical Reasoning", chapters: ["Verbal Reasoning", "Non-verbal Reasoning", "Data Interpretation", "Analytical Reasoning"] }
    }
  };

  for (const [subExam, subjectsMap] of Object.entries(puExams)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = {
        program: "PU Entrance", category: "entrance", subCategory: "pu-entrance",
        subExam, subject: info.subject, subjectId: sid, color: "#0369A1", lastUpdated: "2025"
      };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `PU Entrance (${subExam.toUpperCase()}): ${name}.`,
        `${name} is tested in the Pokhara University ${subExam.toUpperCase()} entrance examination. This guide covers the complete syllabus content and preparation strategies for this topic.\n\nPU entrance exams follow a specific pattern, and understanding this chapter thoroughly is essential for a competitive score. The examination tests both speed and accuracy.\n\nStudent should practice with PU-specific model papers and previous year questions. The difficulty level and pattern differ from other entrance exams, so exam-specific preparation is important.\n\nFocus on building strong conceptual foundations and then develop speed through timed practice sessions.`,
        `Important for PU ${subExam.toUpperCase()} entrance. Regular practice with PU-specific question patterns is essential.`,
        ["NEB Grade 11-12 completion"],
        [
          makeT(`t-${i+1}-1`, 1, `${name} Essentials`, "intermediate",
            `Core concepts of ${name} as tested in the PU ${subExam.toUpperCase()} entrance exam. Focus on understanding the fundamental principles and common question types.`,
            ["Essential concepts", "Common question formats", "Quick-solving techniques"],
            null, `PU entrance papers have a specific style. Practice with PU model papers rather than generic guides.`),
          makeT(`t-${i+1}-2`, 2, `${name} Practice`, "advanced",
            `Practice-oriented content for ${name} with focus on the types of questions that appear in PU entrance examinations.`,
            ["Practice problem sets", "Time management strategies", "Error analysis"],
            null, `Analyze your mistakes from practice tests. PU often repeats question patterns from previous years.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'entrance', 'pu-entrance', subExam, `${sid}.json`), makeSubject(meta, chapters));
    }
  }
}

// ═══════════════════════════════════════════
// COMPETITIVE DATA
// ═══════════════════════════════════════════

function genCompetitive() {
  const exams = {
    "loksewa": {
      name: "Loksewa", color: "#92400E",
      subjects: {
        "general-knowledge": { subject: "General Knowledge", chapters: ["Nepal Geography", "History of Nepal", "Constitution of Nepal", "International Organizations", "Science and Technology", "Current Affairs"] },
        "general-nepali": { subject: "General Nepali", chapters: ["व्याकरण", "शब्द भण्डार", "लेखन शीप", "बोधगम्यता", "प्रशासनिक नेपाली"] },
        "general-english": { subject: "General English", chapters: ["Grammar", "Vocabulary", "Comprehension", "Writing Skills", "Official English"] },
        "computer-basics": { subject: "Computer Basics", chapters: ["Computer Fundamentals", "Office Applications", "Internet and Email", "Information Security", "E-governance"] }
      }
    },
    "banking": {
      name: "Banking Exam", color: "#1E40AF",
      subjects: {
        "english": { subject: "English", chapters: ["Grammar", "Vocabulary", "Reading Comprehension", "Error Detection", "Cloze Test"] },
        "quantitative-aptitude": { subject: "Quantitative Aptitude", chapters: ["Number System", "Percentage", "Profit and Loss", "Time and Work", "Data Interpretation"] },
        "reasoning": { subject: "Reasoning", chapters: ["Logical Reasoning", "Analytical Reasoning", "Coding-Decoding", "Blood Relations", "Puzzles"] },
        "banking-awareness": { subject: "Banking Awareness", chapters: ["Banking System in Nepal", "NRB Policies", "Financial Instruments", "Banking Terms", "Current Banking Affairs"] }
      }
    }
  };

  for (const [examId, exam] of Object.entries(exams)) {
    for (const [sid, info] of Object.entries(exam.subjects)) {
      const meta = {
        program: exam.name, category: "competitive", subCategory: examId,
        subject: info.subject, subjectId: sid, color: exam.color, lastUpdated: "2025"
      };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `${exam.name}: ${name} — competitive exam preparation.`,
        `${name} is an essential section in the ${exam.name} examination. Competitive exams in Nepal's public and banking sector require thorough preparation across multiple subjects, and ${name} is one of the key areas.\n\nThis chapter provides structured content covering all the topics that appear in ${exam.name} examinations. The material is organized to facilitate both systematic study and quick revision.\n\nPast papers analysis shows consistent patterns in the types of questions asked from ${name}. Understanding these patterns and practicing accordingly can significantly improve your performance.\n\nCombine this study material with daily current affairs reading (for relevant subjects) and regular mock tests to build the speed and accuracy needed for competitive success.`,
        `Regularly tested in ${exam.name} examinations. Consistent preparation of ${name} is essential for competitive success. Practice with past papers to understand the pattern.`,
        ["General education background"],
        [
          makeT(`t-${i+1}-1`, 1, `${name}: Key Concepts`, "beginner",
            `Essential concepts and information for ${name} as tested in ${exam.name}. This topic provides the foundational knowledge needed to answer most examination questions.\n\nFocus on frequently tested areas and build a solid knowledge base through regular study.`,
            ["Essential facts and information", "Frequently asked topics", "Quick review points"],
            null, `Make flashcards for quick revision of facts. ${exam.name} often tests factual recall with time pressure.`),
          makeT(`t-${i+1}-2`, 2, `${name}: Advanced Practice`, "intermediate",
            `Advanced practice material for ${name} covering complex question types and analytical problems that appear in ${exam.name} examinations.`,
            ["Advanced question types", "Analytical problem solving", "Time-saving techniques"],
            null, `In competitive exams, eliminate obviously wrong options first. This strategy saves valuable time.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'competitive', examId, `${sid}.json`), makeSubject(meta, chapters));
    }
  }

  // TSC
  const tscLevels = {
    "primary": {
      "child-development": { subject: "Child Development", chapters: ["Growth and Development", "Learning Theories", "Child Psychology", "Special Needs Education"] },
      "teaching-methods": { subject: "Teaching Methods", chapters: ["Pedagogy Fundamentals", "Lesson Planning", "Assessment Methods", "Classroom Management"] }
    },
    "secondary": {
      "education-theory": { subject: "Education Theory", chapters: ["Philosophy of Education", "Curriculum Development", "Educational Psychology", "Research Methods"] },
      "subject-specific": { subject: "Subject Specific", chapters: ["Subject Pedagogy", "Content Knowledge", "Assessment Design", "Resource Development"] }
    }
  };

  for (const [level, subjectsMap] of Object.entries(tscLevels)) {
    for (const [sid, info] of Object.entries(subjectsMap)) {
      const meta = {
        program: "TSC (Teacher)", category: "competitive", subCategory: "tsc",
        level, subject: info.subject, subjectId: sid, color: "#065F46", lastUpdated: "2025"
      };
      const chapters = info.chapters.map((name, i) => makeCh(
        `ch-${i+1}`, i+1, name,
        `TSC ${level}: ${name} — teacher service commission preparation.`,
        `${name} is a key topic in the Teacher Service Commission (TSC) ${level} level examination. The TSC exam is the gateway to permanent teaching positions in Nepal's government schools.\n\nThis chapter covers the pedagogical and theoretical knowledge that TSC tests. Understanding these concepts is essential both for the examination and for effective teaching practice.\n\nThe TSC ${level} level exam has a specific syllabus prescribed by the commission. This material follows that prescribed syllabus and focuses on the most frequently tested areas.\n\nRegular study combined with practice teaching and mock examinations provides the best preparation strategy for the TSC.`,
        `Essential for TSC ${level} level candidates. This topic appears consistently in TSC examinations and is crucial for a competitive score.`,
        ["Education background"],
        [
          makeT(`t-${i+1}-1`, 1, `${name}: Fundamentals`, "beginner",
            `Core concepts of ${name} for the TSC ${level} level examination. Provides the essential theoretical knowledge and practical understanding needed.`,
            ["Key theories and principles", "Important researchers and their work", "Practical applications"],
            null, `TSC exams test both theoretical knowledge and practical application. Include real teaching examples in your answers.`),
          makeT(`t-${i+1}-2`, 2, `${name}: Application`, "intermediate",
            `Applied aspects of ${name} with focus on classroom practice, case studies, and examination-oriented content.`,
            ["Classroom application scenarios", "Case study approach", "Assessment strategies"],
            null, `Relate theoretical concepts to Nepal's school education context. TSC values locally relevant examples.`)
        ]
      ));
      writeJSON(path.join(DATA_ROOT, 'competitive', 'tsc', level, `${sid}.json`), makeSubject(meta, chapters));
    }
  }

  // Army-Police
  const apSubjects = {
    "general-knowledge": { subject: "General Knowledge", chapters: ["Nepal Geography and History", "Constitution and Governance", "Current Affairs", "International Affairs", "Science and Technology"] },
    "physical-aptitude": { subject: "Physical Aptitude", chapters: ["Physical Fitness Standards", "Medical Requirements", "Written Test Pattern", "Interview Preparation"] }
  };

  for (const [sid, info] of Object.entries(apSubjects)) {
    const meta = {
      program: "Army / Police", category: "competitive", subCategory: "army-police",
      subject: info.subject, subjectId: sid, color: "#374151", lastUpdated: "2025"
    };
    const chapters = info.chapters.map((name, i) => makeCh(
      `ch-${i+1}`, i+1, name,
      `Army/Police recruitment: ${name}.`,
      `${name} is important for Nepal Army and Nepal Police recruitment examinations. These competitive exams test candidates on general knowledge, physical fitness, and aptitude.\n\nThis chapter provides comprehensive preparation material for the written examination component. Candidates should combine this study with physical training as per the recruitment requirements.\n\nThe recruitment process in Nepal's security forces is highly competitive, and thorough preparation across all tested areas is essential for success.\n\nStay updated with current affairs and practice with model questions regularly to build the knowledge base and speed required for the examination.`,
      `Army/Police recruitment exams test ${name} regularly. Thorough preparation is key to clearing the written component.`,
      ["General education"],
      [
        makeT(`t-${i+1}-1`, 1, `${name}: Overview`, "beginner",
          `Comprehensive overview of ${name} for Army/Police recruitment preparation. Covers the key information and concepts that candidates must know.`,
          ["Essential facts and knowledge", "Recruitment-specific focus areas", "Common question patterns"],
          null, `Stay updated with current affairs — Army/Police exams heavily test recent events and developments.`),
        makeT(`t-${i+1}-2`, 2, `${name}: Practice`, "intermediate",
          `Practice-oriented content with focus on the specific types of questions that appear in security forces recruitment examinations.`,
          ["Practice questions", "Mock test strategies", "Time management"],
          null, `Practice with official model papers. The pattern of questions is usually consistent across years.`)
      ]
    ));
    writeJSON(path.join(DATA_ROOT, 'competitive', 'army-police', `${sid}.json`), makeSubject(meta, chapters));
  }
}

// ═══════════════════════════════════════════
// SUBJECTS INDEX
// ═══════════════════════════════════════════

function genSubjectsIndex() {
  const index = { subjects: [] };
  
  function scan(dir, pathPrefix) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('_')) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath, `${pathPrefix}/${entry.name}`);
      } else if (entry.name.endsWith('.json')) {
        try {
          const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (data.meta) {
            index.subjects.push({
              id: data.meta.subjectId,
              name: data.meta.subject,
              category: data.meta.category,
              program: data.meta.program,
              path: pathPrefix.slice(1) + '/' + entry.name.replace('.json', ''),
              totalChapters: data.meta.totalChapters,
              color: data.meta.color
            });
          }
        } catch(e) { /* skip invalid */ }
      }
    }
  }

  scan(DATA_ROOT, '');
  writeJSON(path.join(DATA_ROOT, '_meta', 'subjects-index.json'), index);
}

// ═══════════════════════════════════════════
// RUN ALL
// ═══════════════════════════════════════════

console.log('=== Generating SyllabusNepal Backend Data ===\n');

console.log('[School: BLE]');
genSchoolBLE();

console.log('\n[School: Class 9]');
genSchoolClass9();

console.log('\n[School: SEE]');
genSchoolSEE();

console.log('\n[School: NEB Grade 11]');
genNEB(11);

console.log('\n[School: NEB Grade 12]');
genNEB(12);

console.log('\n[Bachelor: BBS]');
genBachelorBBS();

console.log('\n[Bachelor: BBA]');
genBachelorBBA();

console.log('\n[Bachelor: BCA]');
genBachelorBCA();

console.log('\n[Bachelor: BSc CSIT]');
genBachelorBScCSIT();

console.log('\n[Bachelor: BSc]');
genBachelorBSc();

console.log('\n[Engineering]');
genEngineering();

console.log('\n[Entrance]');
genEntrance();

console.log('\n[Competitive]');
genCompetitive();

console.log('\n[Subjects Index]');
genSubjectsIndex();

console.log('\n=== Done! ===');
