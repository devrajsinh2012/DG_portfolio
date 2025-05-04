import { db, storage } from '@/lib/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  getDocs
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  listAll, 
  deleteObject 
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { 
  PortfolioData,
  PersonalInfo,
  SkillCategory,
  Experience,
  Education,
  Certification,
  Extracurricular,
  Project,
  WebsiteSettings
} from '@/context/data-context';
import initialData from '@/data/portfolio-data';

// Firestore Collection paths
const COLLECTIONS = {
  PERSONAL_INFO: 'personalInfo',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  EXTRACURRICULAR: 'extracurricular',
  PROJECTS: 'projects',
  WEBSITE_SETTINGS: 'websiteSettings'
};

// Initialize portfolio data in Firestore if it doesn't exist
export async function initializeDataIfNeeded() {
  try {
    // Check if personal info exists
    const personalInfoRef = doc(db, COLLECTIONS.PERSONAL_INFO, 'main');
    const personalInfoSnap = await getDoc(personalInfoRef);

    if (!personalInfoSnap.exists()) {
      // Data doesn't exist, initialize with default data
      await setDoc(personalInfoRef, initialData.personalInfo);
      
      // Initialize other collections
      for (const category of initialData.skills) {
        const docRef = doc(db, COLLECTIONS.SKILLS, category.category);
        await setDoc(docRef, category);
      }
      
      for (const exp of initialData.experience) {
        const docRef = doc(db, COLLECTIONS.EXPERIENCE, exp.company);
        await setDoc(docRef, exp);
      }
      
      for (const edu of initialData.education) {
        const docRef = doc(db, COLLECTIONS.EDUCATION, edu.degree);
        await setDoc(docRef, edu);
      }
      
      for (const cert of initialData.certifications) {
        const docRef = doc(db, COLLECTIONS.CERTIFICATIONS, cert.name);
        await setDoc(docRef, cert);
      }
      
      for (const extra of initialData.extracurricular) {
        const docRef = doc(db, COLLECTIONS.EXTRACURRICULAR, extra.role);
        await setDoc(docRef, extra);
      }
      
      for (const project of initialData.projects) {
        const docRef = doc(db, COLLECTIONS.PROJECTS, project.title);
        await setDoc(docRef, project);
      }
      
      const settingsRef = doc(db, COLLECTIONS.WEBSITE_SETTINGS, 'main');
      await setDoc(settingsRef, initialData.websiteSettings);
      
      console.log("Firebase initialized with default data");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
    // Fallback to localStorage to make the app work offline
    if (!localStorage.getItem('portfolioData')) {
      localStorage.setItem('portfolioData', JSON.stringify(initialData));
    }
    throw error;
  }
}

// Fetch all portfolio data
export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    await initializeDataIfNeeded();
    
    // Fetch personal info
    const personalInfoRef = doc(db, COLLECTIONS.PERSONAL_INFO, 'main');
    const personalInfoSnap = await getDoc(personalInfoRef);
    const personalInfo = personalInfoSnap.data() as PersonalInfo;
    
    // Fetch skills
    const skillsCol = collection(db, COLLECTIONS.SKILLS);
    const skillsSnapshot = await getDocs(skillsCol);
    const skills = skillsSnapshot.docs.map(doc => doc.data() as SkillCategory);
    
    // Fetch experience
    const experienceCol = collection(db, COLLECTIONS.EXPERIENCE);
    const experienceSnapshot = await getDocs(experienceCol);
    const experience = experienceSnapshot.docs.map(doc => doc.data() as Experience);
    
    // Fetch education
    const educationCol = collection(db, COLLECTIONS.EDUCATION);
    const educationSnapshot = await getDocs(educationCol);
    const education = educationSnapshot.docs.map(doc => doc.data() as Education);
    
    // Fetch certifications
    const certificationsCol = collection(db, COLLECTIONS.CERTIFICATIONS);
    const certificationsSnapshot = await getDocs(certificationsCol);
    const certifications = certificationsSnapshot.docs.map(doc => doc.data() as Certification);
    
    // Fetch extracurricular
    const extracurricularCol = collection(db, COLLECTIONS.EXTRACURRICULAR);
    const extracurricularSnapshot = await getDocs(extracurricularCol);
    const extracurricular = extracurricularSnapshot.docs.map(doc => doc.data() as Extracurricular);
    
    // Fetch projects
    const projectsCol = collection(db, COLLECTIONS.PROJECTS);
    const projectsSnapshot = await getDocs(projectsCol);
    const projects = projectsSnapshot.docs.map(doc => doc.data() as Project);
    
    // Fetch website settings
    const settingsRef = doc(db, COLLECTIONS.WEBSITE_SETTINGS, 'main');
    const settingsSnap = await getDoc(settingsRef);
    const websiteSettings = settingsSnap.data() as WebsiteSettings;
    
    return {
      personalInfo,
      skills,
      experience,
      education,
      certifications,
      extracurricular,
      projects,
      websiteSettings
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Fallback to localStorage if Firebase fails
    const localData = localStorage.getItem('portfolioData');
    if (localData) {
      return JSON.parse(localData) as PortfolioData;
    }
    
    // If all else fails, return initial data
    return initialData;
  }
}

// Update personal info
export async function updatePersonalInfo(data: PersonalInfo) {
  try {
    const docRef = doc(db, COLLECTIONS.PERSONAL_INFO, 'main');
    await updateDoc(docRef, { ...data });
    return true;
  } catch (error) {
    console.error("Error updating personal info:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.personalInfo = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update skills
export async function updateSkills(data: SkillCategory[]) {
  try {
    // First, get existing skills to compare
    const skillsCol = collection(db, COLLECTIONS.SKILLS);
    const skillsSnapshot = await getDocs(skillsCol);
    const existingSkills = skillsSnapshot.docs.map(doc => doc.id);
    
    // Add or update new skills
    for (const category of data) {
      const docRef = doc(db, COLLECTIONS.SKILLS, category.category);
      await setDoc(docRef, category, { merge: true });
    }
    
    // Remove skills that no longer exist
    const newSkillIds = data.map(category => category.category);
    const skillsToRemove = existingSkills.filter(id => !newSkillIds.includes(id));
    
    for (const skillId of skillsToRemove) {
      const docRef = doc(db, COLLECTIONS.SKILLS, skillId);
      await updateDoc(docRef, { items: [] });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating skills:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.skills = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update experience
export async function updateExperience(data: Experience[]) {
  try {
    // First, get existing experience to compare
    const experienceCol = collection(db, COLLECTIONS.EXPERIENCE);
    const experienceSnapshot = await getDocs(experienceCol);
    const existingExperience = experienceSnapshot.docs.map(doc => doc.id);
    
    // Add or update experience
    for (const experience of data) {
      const docRef = doc(db, COLLECTIONS.EXPERIENCE, experience.company);
      await setDoc(docRef, experience, { merge: true });
    }
    
    // Remove experience that no longer exists
    const newExperienceIds = data.map(exp => exp.company);
    const experienceToRemove = existingExperience.filter(id => !newExperienceIds.includes(id));
    
    for (const expId of experienceToRemove) {
      const docRef = doc(db, COLLECTIONS.EXPERIENCE, expId);
      // Since we can't delete yet in our simplified model, clear it
      await updateDoc(docRef, { position: "Removed", period: "", description: "", achievements: [], technologies: [] });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating experience:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.experience = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update education
export async function updateEducation(data: Education[]) {
  try {
    // First, get existing education to compare
    const educationCol = collection(db, COLLECTIONS.EDUCATION);
    const educationSnapshot = await getDocs(educationCol);
    const existingEducation = educationSnapshot.docs.map(doc => doc.id);
    
    // Add or update education
    for (const education of data) {
      const docRef = doc(db, COLLECTIONS.EDUCATION, education.degree);
      await setDoc(docRef, education, { merge: true });
    }
    
    // Remove education that no longer exists
    const newEducationIds = data.map(edu => edu.degree);
    const educationToRemove = existingEducation.filter(id => !newEducationIds.includes(id));
    
    for (const eduId of educationToRemove) {
      const docRef = doc(db, COLLECTIONS.EDUCATION, eduId);
      await updateDoc(docRef, { institution: "Removed", period: "", description: "" });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating education:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.education = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update certifications
export async function updateCertifications(data: Certification[]) {
  try {
    // First, get existing certifications to compare
    const certificationsCol = collection(db, COLLECTIONS.CERTIFICATIONS);
    const certificationsSnapshot = await getDocs(certificationsCol);
    const existingCertifications = certificationsSnapshot.docs.map(doc => doc.id);
    
    // Add or update certifications
    for (const certification of data) {
      const docRef = doc(db, COLLECTIONS.CERTIFICATIONS, certification.name);
      await setDoc(docRef, certification, { merge: true });
    }
    
    // Remove certifications that no longer exist
    const newCertificationIds = data.map(cert => cert.name);
    const certificationsToRemove = existingCertifications.filter(id => !newCertificationIds.includes(id));
    
    for (const certId of certificationsToRemove) {
      const docRef = doc(db, COLLECTIONS.CERTIFICATIONS, certId);
      await updateDoc(docRef, { issuer: "Removed", date: "", description: "" });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating certifications:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.certifications = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update extracurricular
export async function updateExtracurricular(data: Extracurricular[]) {
  try {
    // First, get existing extracurricular to compare
    const extracurricularCol = collection(db, COLLECTIONS.EXTRACURRICULAR);
    const extracurricularSnapshot = await getDocs(extracurricularCol);
    const existingExtracurricular = extracurricularSnapshot.docs.map(doc => doc.id);
    
    // Add or update extracurricular
    for (const extracurricular of data) {
      const docRef = doc(db, COLLECTIONS.EXTRACURRICULAR, extracurricular.role);
      await setDoc(docRef, extracurricular, { merge: true });
    }
    
    // Remove extracurricular that no longer exists
    const newExtracurricularIds = data.map(extra => extra.role);
    const extracurricularToRemove = existingExtracurricular.filter(id => !newExtracurricularIds.includes(id));
    
    for (const extraId of extracurricularToRemove) {
      const docRef = doc(db, COLLECTIONS.EXTRACURRICULAR, extraId);
      await updateDoc(docRef, { organization: "Removed", period: "", description: "" });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating extracurricular:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.extracurricular = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update projects
export async function updateProjects(data: Project[]) {
  try {
    // First, get existing projects to compare
    const projectsCol = collection(db, COLLECTIONS.PROJECTS);
    const projectsSnapshot = await getDocs(projectsCol);
    const existingProjects = projectsSnapshot.docs.map(doc => doc.id);
    
    // Add or update projects
    for (const project of data) {
      const docRef = doc(db, COLLECTIONS.PROJECTS, project.title);
      await setDoc(docRef, project, { merge: true });
    }
    
    // Remove projects that no longer exist
    const newProjectIds = data.map(proj => proj.title);
    const projectsToRemove = existingProjects.filter(id => !newProjectIds.includes(id));
    
    for (const projId of projectsToRemove) {
      const docRef = doc(db, COLLECTIONS.PROJECTS, projId);
      await updateDoc(docRef, { description: "Removed", technologies: [], role: "", outcome: "" });
    }
    
    return true;
  } catch (error) {
    console.error("Error updating projects:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.projects = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Update website settings
export async function updateWebsiteSettings(data: WebsiteSettings) {
  try {
    const docRef = doc(db, COLLECTIONS.WEBSITE_SETTINGS, 'main');
    await updateDoc(docRef, { ...data });
    return true;
  } catch (error) {
    console.error("Error updating website settings:", error);
    
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('portfolioData');
      if (localData) {
        const parsedData = JSON.parse(localData) as PortfolioData;
        parsedData.websiteSettings = data;
        localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      }
    } catch (localError) {
      console.error("Error updating localStorage:", localError);
    }
    
    return false;
  }
}

// Reset data to initial values
export async function resetToDefaults() {
  try {
    // Set all collections to initial data
    const personalInfoRef = doc(db, COLLECTIONS.PERSONAL_INFO, 'main');
    await setDoc(personalInfoRef, initialData.personalInfo, { merge: true });
    
    // Clear existing skills and add initial ones
    const skillsCol = collection(db, COLLECTIONS.SKILLS);
    const skillsSnapshot = await getDocs(skillsCol);
    
    // Remove existing skills
    for (const skillDoc of skillsSnapshot.docs) {
      await updateDoc(doc(db, COLLECTIONS.SKILLS, skillDoc.id), { items: [] });
    }
    
    // Add initial skills
    for (const category of initialData.skills) {
      const docRef = doc(db, COLLECTIONS.SKILLS, category.category);
      await setDoc(docRef, category, { merge: true });
    }
    
    // Repeat for other collections...
    // (Similar implementation for experience, education, etc.)
    
    // Update website settings
    const settingsRef = doc(db, COLLECTIONS.WEBSITE_SETTINGS, 'main');
    await setDoc(settingsRef, initialData.websiteSettings, { merge: true });
    
    // Reset localStorage as well
    localStorage.setItem('portfolioData', JSON.stringify(initialData));
    
    return true;
  } catch (error) {
    console.error("Error resetting data:", error);
    
    // At least reset localStorage
    localStorage.setItem('portfolioData', JSON.stringify(initialData));
    
    return false;
  }
}

// Media upload
export async function uploadMedia(file: File): Promise<string> {
  try {
    const fileId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const filename = `${fileId}.${fileExtension}`;
    const storageRef = ref(storage, `media/${filename}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
}

// List media files
export async function listMedia() {
  try {
    const storageRef = ref(storage, 'media');
    const result = await listAll(storageRef);
    
    const mediaItems = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url,
          fullPath: itemRef.fullPath
        };
      })
    );
    
    return mediaItems;
  } catch (error) {
    console.error("Error listing media:", error);
    return [];
  }
}

// Delete media file
export async function deleteMedia(path: string) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error deleting media:", error);
    return false;
  }
}