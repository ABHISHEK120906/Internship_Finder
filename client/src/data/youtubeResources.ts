export const youtubeResourcesData = {
  python: {
    english: [
      { name: "freeCodeCamp.org", link: "https://youtube.com/watch?v=rfscVS0vtbw", detail: "Python Full Course for Beginners" },
      { name: "Corey Schafer", link: "https://youtube.com/@coreyms", detail: "Python Tutorials playlist" },
      { name: "Tech With Tim", link: "https://youtube.com/@TechWithTim", detail: "Python projects and tutorials" },
      { name: "Sentdex", link: "https://youtube.com/@sentdex", detail: "Python for ML/Data Science" },
      { name: "CS Dojo", link: "https://youtube.com/@CSDojo", detail: "Python for beginners" },
    ],
    hindi: [
      { name: "CodeWithHarry", link: "https://youtube.com/@CodeWithHarry", detail: "Python Tutorial in Hindi (100 days)" },
      { name: "Apna College", link: "https://youtube.com/@ApnaCollegeOfficial", detail: "Python + DSA in Hindi" },
      { name: "Krish Naik", link: "https://youtube.com/@krishnaik06", detail: "Python for Data Science / ML in Hindi" },
      { name: "Campus X", link: "https://youtube.com/@CampusX-official", detail: "Python ML/AI in Hindi" },
      { name: "Chai aur Code", link: "https://youtube.com/@chaiaurcode", detail: "Python + Web Dev in Hindi" },
    ]
  },
  general: {
    english: [
      { name: "freeCodeCamp.org", link: "https://youtube.com/@freecodecamp", detail: "General CS and programming" },
      { name: "Traversy Media", link: "https://youtube.com/@TraversyMedia", detail: "Web development and more" }
    ],
    hindi: [
      { name: "CodeWithHarry", link: "https://youtube.com/@CodeWithHarry", detail: "Various programming courses" },
      { name: "Apna College", link: "https://youtube.com/@ApnaCollegeOfficial", detail: "Placement prep and coding" }
    ]
  }
};

export const getYoutubeResources = (fieldId: string) => {
  if (fieldId.includes('python')) return youtubeResourcesData.python;
  return youtubeResourcesData.general;
};
