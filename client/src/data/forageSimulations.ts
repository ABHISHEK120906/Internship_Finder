export const forageSimulationsData = {
  python: [
    {
      company: "JPMorgan Chase",
      role: "Software Engineering",
      skills: "Python, Git, Data Visualization",
      link: "https://theforage.com/simulations/jpmorgan/software-engineering-mgnj",
      duration: "5-6 hours"
    },
    {
      company: "Goldman Sachs",
      role: "Engineering",
      skills: "Python, Security, Cryptography",
      link: "https://theforage.com/simulations/goldman-sachs/engineering-oatg",
      duration: "1-2 hours"
    },
    {
      company: "Accenture",
      role: "Data Analytics & Visualization",
      skills: "Python, Excel, Data storytelling",
      link: "https://theforage.com/simulations/accenture/data-analytics-mmlb",
      duration: "5-6 hours"
    },
    {
      company: "BCG",
      role: "Data Science",
      skills: "Python, ML, Business analysis",
      link: "https://theforage.com/simulations/bcg/data-science-ccdz",
      duration: "6-8 hours"
    },
    {
      company: "Cognizant",
      role: "Agile + AI",
      skills: "Python, AI concepts, Agile",
      link: "https://theforage.com/simulations/cognizant/agile-methodology-lolo",
      duration: "4-5 hours"
    }
  ],
  general: [
    {
      company: "Various Top Firms",
      role: "Software Engineering & Data",
      skills: "Software Dev, Data Analysis",
      link: "https://theforage.com",
      duration: "Varies"
    }
  ]
};

export const getForageSimulations = (fieldId: string) => {
  if (fieldId.includes('python')) return forageSimulationsData.python;
  return forageSimulationsData.general;
};
