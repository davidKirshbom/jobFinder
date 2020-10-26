const totalJobs = 1024;


const jobsList = [
    {
        code:1,
        name: "Full Stack Technical Lead",
        type: "full time",
        experienceYearsNeeded:6,
        location: "tel-aviv",
        category: "internet",
        companyOccupation: "Hight Tech",
        additionalPositions: ["JAVASCRIPT Developer", "Team leader", "WEB Developer"],
        jobDescription: "For a hi-tech company developing entertainment products, with offices in the center",
        JobQualifications: {general:["5 years of experience with front end development using JavaScript, CSS3, HTML5, JQuery - Mandatory. ",
                            "At least 1-2 years of experience with React.JS framework - Mandatory",
                            "2 years of experience as full stack developer - huge advantage",
                            "Experience with node.js - huge advantage. ",
                            "Knowledge with mySQL / Redis - huge advantage"],
                             minimum: [],
                             preferred :[],
        },
        
        
    },
    {
        code:2,
        name: "Senior DV Engineer- Hod HaSharon",
        type: "full time",
        experienceYearsNeeded:5,
        location: "Sharon area",
        category: "software",
        additionalPositions: [],
        jobDescription: "We are looking for a Senior Design Varification Engineer to join our company of inventors that is unlocking 5G, ushering in the age of rapid acceleration in connectivity, and creating new possibilities that will transform industries, generate jobs and enrich lives",
        JobQualifications: {
            general:[ "Our company is looking to expand the VLSI team and looking for Senior DV engineer to join the development of our 5G products.",],
            minimum: ["Leadership capabilities",
                        "5+ years experience as DV engineer.",
                        "Eager to succeed",
                        "Accountable & responsible.",
                        "Team player.",
                        "Great communication skills."],
            preferred: [" System Verilog, UVM ",
                        " Coverage-driven verification.",
                        "Power aware simulation.",
                        " Gate level simulations",
                        "Co-sim with Matlab/SysC.",
                        " ASIC familiar with various design blocks including processors/ micro controllers/ hw accelerators.",
                        "System a vast full system understanding.",
                        `Leadership capabilities - MUST. Leadership experience - Advantage
                        *References to a particular number of years experience are for indicative purposes only. Applications from candidates with equivalent experience will be considered, provided that the candidate can demonstrate an ability to fulfill the principal duties of the role and possesses the required competencies.`]
        },
        companyOccupation: "Hight Tech",
    }
]
export {totalJobs,jobsList}