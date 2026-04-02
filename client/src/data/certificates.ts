export const certificatesData = {
  python: [
    { name: "Google — Python Crash Course", platform: "Coursera (Free Audit)", link: "https://coursera.org/learn/python-crash-course" },
    { name: "IBM — Python for Data Science", platform: "IBM SkillsBuild", link: "https://skillsbuild.org" },
    { name: "Scientific Computing with Python", platform: "freeCodeCamp", link: "https://freecodecamp.org/learn/scientific-computing-with-python" },
    { name: "Microsoft Learn — Python Fundamentals", platform: "Microsoft", link: "https://learn.microsoft.com/python" },
    { name: "Simplilearn — Python for Beginners", platform: "Simplilearn", link: "https://simplilearn.com/free-python-course" },
    { name: "NPTEL — Programming in Python", platform: "NPTEL", link: "https://nptel.ac.in/courses/106/106/" }
  ],
  general: [
    { name: "Coursera Free Audit Courses", platform: "Coursera", link: "https://coursera.org" },
    { name: "freeCodeCamp Certifications", platform: "freeCodeCamp", link: "https://freecodecamp.org" },
    { name: "Microsoft Cloud Skills", platform: "Microsoft", link: "https://learn.microsoft.com" }
  ]
};

export const getCertificates = (fieldId: string) => {
  if (fieldId.includes('python')) return certificatesData.python;
  return certificatesData.general;
};

export const freePlatforms = [
  { name: "Forage", url: "https://theforage.com" },
  { name: "freeCodeCamp", url: "https://freecodecamp.org" },
  { name: "Google", url: "https://grow.google/certificates" },
  { name: "Microsoft", url: "https://learn.microsoft.com" },
  { name: "IBM SkillsBuild", url: "https://skillsbuild.org" },
  { name: "Simplilearn", url: "https://simplilearn.com/free-courses" },
  { name: "Coursera Audit", url: "https://coursera.org" },
  { name: "edX Audit", url: "https://edx.org" },
  { name: "NPTEL", url: "https://nptel.ac.in" },
  { name: "Cisco NetAcad", url: "https://netacad.com" },
  { name: "AWS Training", url: "https://aws.amazon.com/training/free" },
  { name: "Kaggle Learn", url: "https://kaggle.com/learn" },
  { name: "LinkedIn Learn", url: "https://linkedin.com/learning" },
  { name: "Infosys Lex", url: "https://infosysbpo.com/springboard" },
  { name: "NASSCOM", url: "https://nasscom.in/futureskills" }
];
