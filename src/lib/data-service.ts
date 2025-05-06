
import { db, storage } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uuidv4 } from './uuid-helper';
import { defaultPortfolioData } from '@/data/portfolio-data';

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
