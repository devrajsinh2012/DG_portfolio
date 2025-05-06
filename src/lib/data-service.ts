
import { db, storage } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uuidv4 } from './uuid-helper';

// Default data
export const defaultPortfolioData = {
  personalInfo: {
    name: "Devrajsinh Gohil",
    title: "Project Management Professional",
    email: "contact@devrajsinh.com",
    phone: "+91 9876543210",
    location: "Rajkot, Gujarat, India",
    linkedin: "https://linkedin.com/in/devrajsinh",
    bio: "Project Management professional with expertise in digital marketing campaigns, cross-functional coordination, and product management."
  },
  skills: [
    {
      category: "Project Management",
      items: [
        { name: "Agile Methodology", proficiency: 90, description: "Certified Scrum Master with experience leading agile teams" },
        { name: "Resource Allocation", proficiency: 85, description: "Skilled in optimal resource allocation across multiple projects" }
      ]
    },
    {
      category: "Marketing",
      items: [
        { name: "Digital Marketing", proficiency: 80, description: "Experience managing multi-channel digital marketing campaigns" },
        { name: "Brand Strategy", proficiency: 75, description: "Developed brand strategies for multiple products" }
      ]
    }
  ],
  experience: [
    {
      company: "ABC Tech Solutions",
      position: "Senior Project Manager",
      period: "2020 - Present",
      description: "Leading cross-functional teams in the development and launch of enterprise software products.",
      achievements: [
        "Reduced project delivery time by 30% through agile methodology implementation",
        "Successfully managed a team of 15 developers across 3 time zones"
      ],
      technologies: ["Agile", "JIRA", "Confluence", "MS Project"]
    }
  ],
  education: [
    {
      degree: "MBA in Project Management",
      institution: "University of Technology",
      period: "2017 - 2019",
      description: "Focused on digital transformation and agile methodologies."
    }
  ],
  certifications: [
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      date: "2020",
      description: "Globally recognized certification in project management"
    }
  ],
  extracurricular: [
    {
      role: "Volunteer Project Manager",
      organization: "Tech For All",
      period: "2021 - Present",
      description: "Managing technical projects for non-profit organizations"
    }
  ],
  projects: [
    {
      title: "Enterprise CRM Implementation",
      description: "Led the implementation of a company-wide CRM system affecting over 200 employees.",
      technologies: ["Salesforce", "Agile", "Integration APIs"],
      role: "Project Lead",
      outcome: "Increased sales team efficiency by 40% and improved customer response time by 25%"
    }
  ],
  websiteSettings: {
    colorTheme: {
      primary: "#0ea5e9",
      secondary: "#64748b",
      background: "#0f172a",
      textPrimary: "#e2e8f0",
      textSecondary: "#94a3b8",
      accent: "#38bdf8"
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans",
      code: "Fira Code"
    },
    animations: {
      enabled: true,
      speed: "normal",
      intensity: "medium"
    },
    layout: {
      sections: ["hero", "about", "skills", "experience", "projects", "education", "contact"],
      maxWidth: "1200px",
      spacing: "comfortable"
    }
  }
};

// Main data fetching function
export const fetchPortfolioData = async () => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    const docSnap = await getDoc(portfolioDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Create default data if no data exists
      await setDoc(portfolioDocRef, defaultPortfolioData);
      return defaultPortfolioData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return default data if there's an error
    return defaultPortfolioData;
  }
};

// Update specific sections
export const updatePersonalInfo = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { personalInfo: data });
    return true;
  } catch (error) {
    console.error('Error updating personal info:', error);
    return false;
  }
};

export const updateSkills = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { skills: data });
    return true;
  } catch (error) {
    console.error('Error updating skills:', error);
    return false;
  }
};

export const updateExperience = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { experience: data });
    return true;
  } catch (error) {
    console.error('Error updating experience:', error);
    return false;
  }
};

export const updateProjects = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { projects: data });
    return true;
  } catch (error) {
    console.error('Error updating projects:', error);
    return false;
  }
};

export const updateEducation = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { education: data });
    return true;
  } catch (error) {
    console.error('Error updating education:', error);
    return false;
  }
};

export const updateCertifications = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { certifications: data });
    return true;
  } catch (error) {
    console.error('Error updating certifications:', error);
    return false;
  }
};

export const updateExtracurricular = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { extracurricular: data });
    return true;
  } catch (error) {
    console.error('Error updating extracurricular activities:', error);
    return false;
  }
};

export const updateContact = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { contact: data });
    return true;
  } catch (error) {
    console.error('Error updating contact:', error);
    return false;
  }
};

export const updateWebsiteSettings = async (data) => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await updateDoc(portfolioDocRef, { websiteSettings: data });
    return true;
  } catch (error) {
    console.error('Error updating website settings:', error);
    return false;
  }
};

export const resetToDefaults = async () => {
  try {
    const portfolioDocRef = doc(db, 'portfolios', 'main');
    await setDoc(portfolioDocRef, defaultPortfolioData);
    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    return false;
  }
};

// Media upload helper
export const uploadMedia = async (file) => {
  try {
    const fileId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${fileId}.${fileExtension}`;
    const storageRef = ref(storage, `media/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Save media info to Firestore
    const mediaCollectionRef = collection(db, 'media');
    const mediaDocRef = doc(mediaCollectionRef, fileId);
    await setDoc(mediaDocRef, {
      id: fileId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      url: downloadURL,
      createdAt: new Date().toISOString()
    });
    
    return {
      id: fileId,
      url: downloadURL,
      name: file.name
    };
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};
