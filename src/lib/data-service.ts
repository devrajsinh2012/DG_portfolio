import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { uuidv4 } from "./uuid-helper";
import defaultData from "@/data/portfolio-data";

// Types
import type { PortfolioData } from "@/data/portfolio-data";

// Get portfolio data
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const docRef = doc(db, "portfolio", "main");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    } else {
      // Initialize with default data if not exists
      await setDoc(docRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return defaultData;
  }
}

// Update portfolio data
export async function updatePortfolioData(
  data: Partial<PortfolioData>
): Promise<boolean> {
  try {
    const docRef = doc(db, "portfolio", "main");
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

// Upload image
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const fileId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const fullPath = `${path}/${fileId}.${fileExtension}`;
    const storageRef = ref(storage, fullPath);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// Delete image
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extract the path from the URL
    const decodedUrl = decodeURIComponent(url);
    const pathStartIndex = decodedUrl.indexOf("/o/") + 3;
    const pathEndIndex = decodedUrl.indexOf("?");
    const path = decodedUrl.substring(pathStartIndex, pathEndIndex);

    const storageRef = ref(storage, path);
    await deleteObject(storageRef);

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

//The rest of the functions from original file are removed because they are replaced by the new functions above.


// Media upload (This function is kept because it's different from uploadImage)
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