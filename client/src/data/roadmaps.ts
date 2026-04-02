export const roadmapsData = [
  { id: 'python-dev', emoji: '🐍', title: 'Python Development', category: 'Backend' },
  { id: 'web-front', emoji: '🌐', title: 'Web Development (Frontend)', category: 'Web Dev' },
  { id: 'web-back', emoji: '⚙️', title: 'Web Development (Backend)', category: 'Web Dev' },
  { id: 'full-stack', emoji: '🌍', title: 'Full Stack Web Development', category: 'Web Dev' },
  { id: 'data-science', emoji: '📊', title: 'Data Science', category: 'Data Science' },
  { id: 'machine-learning', emoji: '🤖', title: 'Machine Learning', category: 'AI/ML' },
  { id: 'ai', emoji: '🧠', title: 'Artificial Intelligence', category: 'AI/ML' },
  { id: 'deep-learning', emoji: '🕸️', title: 'Deep Learning', category: 'AI/ML' },
  { id: 'nlp', emoji: '🗣️', title: 'Natural Language Processing (NLP)', category: 'AI/ML' },
  { id: 'computer-vision', emoji: '👁️', title: 'Computer Vision', category: 'AI/ML' },
  { id: 'data-eng', emoji: '🛠️', title: 'Data Engineering', category: 'Data Science' },
  { id: 'data-analytics', emoji: '📈', title: 'Data Analytics', category: 'Data Science' },
  { id: 'bi', emoji: '💼', title: 'Business Intelligence', category: 'Data Science' },
  { id: 'cybersecurity', emoji: '🛡️', title: 'Cybersecurity / Ethical Hacking', category: 'Cybersecurity' },
  { id: 'pentesting', emoji: '🔓', title: 'Penetration Testing', category: 'Cybersecurity' },
  { id: 'digital-forensics', emoji: '🔍', title: 'Digital Forensics', category: 'Cybersecurity' },
  { id: 'soc-analyst', emoji: '🚨', title: 'SOC Analyst', category: 'Cybersecurity' },
  { id: 'cloud-aws', emoji: '☁️', title: 'Cloud Computing (AWS)', category: 'Cloud' },
  { id: 'cloud-azure', emoji: '☁️', title: 'Cloud Computing (Azure)', category: 'Cloud' },
  { id: 'cloud-gcp', emoji: '☁️', title: 'Cloud Computing (GCP)', category: 'Cloud' },
  { id: 'devops', emoji: '♾️', title: 'DevOps Engineering', category: 'DevOps' },
  { id: 'mlops', emoji: '🔄', title: 'MLOps', category: 'AI/ML' },
  { id: 'sre', emoji: '👷', title: 'Site Reliability Engineering (SRE)', category: 'DevOps' },
  { id: 'mobile-android', emoji: '📱', title: 'Mobile Development (Android)', category: 'Mobile' },
  { id: 'mobile-ios', emoji: '🍏', title: 'Mobile Development (iOS)', category: 'Mobile' },
  { id: 'flutter', emoji: '🦋', title: 'Flutter / Cross-Platform', category: 'Mobile' },
  { id: 'react-native', emoji: '⚛️', title: 'React Native', category: 'Mobile' },
  { id: 'blockchain', emoji: '⛓️', title: 'Blockchain Development', category: 'Blockchain' },
  { id: 'web3', emoji: '🪙', title: 'Web3 / Solidity / Smart Contracts', category: 'Blockchain' },
  { id: 'game-unity', emoji: '🎮', title: 'Game Development (Unity)', category: 'Game Dev' },
  { id: 'game-unreal', emoji: '🎮', title: 'Game Development (Unreal Engine)', category: 'Game Dev' },
  { id: 'ui-ux', emoji: '🎨', title: 'UI/UX Design', category: 'UI/UX' },
  { id: 'product-mgmt', emoji: '📋', title: 'Product Management', category: 'Product' },
  { id: 'embedded', emoji: '🔌', title: 'Embedded Systems / IoT', category: 'Embedded' },
  { id: 'robotics', emoji: '🤖', title: 'Robotics', category: 'Embedded' },
  { id: 'ar-vr', emoji: '🥽', title: 'AR/VR Development', category: 'AR/VR' },
  { id: 'quantum-comp', emoji: '⚛️', title: 'Quantum Computing', category: 'Other' },
  { id: 'dba', emoji: '🗄️', title: 'Database Administration', category: 'Backend' },
  { id: 'api-dev', emoji: '🔌', title: 'API Development', category: 'Backend' },
  { id: 'microservices', emoji: '🧩', title: 'Microservices Architecture', category: 'Backend' },
  { id: 'system-design', emoji: '🏗️', title: 'System Design', category: 'Architecture' },
  { id: 'open-source', emoji: '🌍', title: 'Open Source Contribution', category: 'Other' },
  { id: 'tech-writing', emoji: '✍️', title: 'Technical Writing', category: 'Other' },
  { id: 'java-dev', emoji: '☕', title: 'Java Development', category: 'Backend' },
  { id: 'cpp-dev', emoji: '⚙️', title: 'C++ Development', category: 'Backend' },
  { id: 'rust-dev', emoji: '🦀', title: 'Rust Development', category: 'Backend' },
  { id: 'go-dev', emoji: '🐹', title: 'Go (Golang) Development', category: 'Backend' },
  { id: 'ts-dev', emoji: '💙', title: 'TypeScript Development', category: 'Web Dev' },
  { id: 'r-prog', emoji: '📈', title: 'R Programming (Statistics)', category: 'Data Science' },
  { id: 'matlab', emoji: '🧪', title: 'MATLAB / Simulation', category: 'Other' }
];

export const allCategories = [
  'All', 'Web Dev', 'Data Science', 'Cybersecurity', 'Mobile', 
  'Cloud', 'DevOps', 'AI/ML', 'Blockchain', 'Game Dev', 
  'UI/UX', 'Embedded', 'AR/VR', 'Backend', 'Architecture', 'Product', 'Other'
];

export const pythonRoadmapSteps = {
  beginner: [
    { id: 'py-b1', text: 'Step 1: Install Python + VS Code setup' },
    { id: 'py-b2', text: 'Step 2: Variables, Data Types, Operators' },
    { id: 'py-b3', text: 'Step 3: Conditionals (if/else)' },
    { id: 'py-b4', text: 'Step 4: Loops (for, while)' },
    { id: 'py-b5', text: 'Step 5: Functions' },
    { id: 'py-b6', text: 'Step 6: Lists, Tuples, Dicts, Sets' },
    { id: 'py-b7', text: 'Step 7: File handling' },
    { id: 'py-b8', text: 'Step 8: Error handling (try/except)' },
    { id: 'py-b9', text: 'Step 9: OOP (Classes, Objects, Inheritance)' },
    { id: 'py-b10', text: 'Step 10: Modules and Packages' },
  ],
  intermediate: [
    { id: 'py-i1', text: 'Step 11: pip, virtual environments' },
    { id: 'py-i2', text: 'Step 12: NumPy basics' },
    { id: 'py-i3', text: 'Step 13: Pandas (data manipulation)' },
    { id: 'py-i4', text: 'Step 14: Matplotlib / Seaborn (visualization)' },
    { id: 'py-i5', text: 'Step 15: Web scraping (BeautifulSoup, Requests)' },
    { id: 'py-i6', text: 'Step 16: APIs (REST, JSON, requests library)' },
    { id: 'py-i7', text: 'Step 17: Flask basics (build a simple web app)' },
    { id: 'py-i8', text: 'Step 18: SQL + SQLite with Python' },
    { id: 'py-i9', text: 'Step 19: Git & GitHub' },
    { id: 'py-i10', text: 'Step 20: Regular Expressions' },
  ],
  advanced: [
    { id: 'py-a1', text: 'Step 21: Django (full web framework)' },
    { id: 'py-a2', text: 'Step 22: Machine Learning (scikit-learn)' },
    { id: 'py-a3', text: 'Step 23: Deep Learning intro (TensorFlow/Keras)' },
    { id: 'py-a4', text: 'Step 24: Docker + Python deployment' },
    { id: 'py-a5', text: 'Step 25: Testing (pytest, unittest)' },
    { id: 'py-a6', text: 'Step 26: Async programming (asyncio)' },
    { id: 'py-a7', text: 'Step 27: Design patterns' },
    { id: 'py-a8', text: 'Step 28: System design basics' },
    { id: 'py-a9', text: 'Step 29: Contributing to open source' },
    { id: 'py-a10', text: 'Step 30: Build portfolio projects' },
  ]
};

// You'd typically populate other roadmap steps in a detailed map or fetch via API.
export const getRoadmapSteps = (fieldId: string) => {
  if (fieldId.includes('python')) {
    return pythonRoadmapSteps;
  }
  return {
    beginner: [
      { id: `${fieldId}-b1`, text: 'Step 1: Introduction and Environment Setup' },
      { id: `${fieldId}-b2`, text: 'Step 2: Basic Syntax and Concepts' },
      { id: `${fieldId}-b3`, text: 'Step 3: Core Concepts' }
    ],
    intermediate: [
      { id: `${fieldId}-i1`, text: 'Step 4: Advanced Concepts' },
      { id: `${fieldId}-i2`, text: 'Step 5: Common Libraries' },
    ],
    advanced: [
      { id: `${fieldId}-a1`, text: 'Step 6: Best Practices and Architecture' },
      { id: `${fieldId}-a2`, text: 'Step 7: Portfolio Projects' },
    ]
  };
};
