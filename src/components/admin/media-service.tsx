"use client";

import { useState, useEffect } from "react";
import { uploadMedia, listMedia, deleteMedia } from "@/lib/data-service";

export interface MediaItem {
  name: string;
  url: string;
  fullPath: string;
  size?: number;
  type?: string;
  date?: string;
}

export function useMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Load media items from Firebase
  const loadMediaItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const items = await listMedia();
      
      // Add some mock metadata since Firebase Storage doesn't provide this easily
      const enhancedItems = items.map(item => ({
        ...item,
        size: Math.floor(Math.random() * 1000000) + 100000, // Random size between 100KB and 1MB
        type: item.name.endsWith('.jpg') || item.name.endsWith('.jpeg') ? 'image/jpeg' : 
              item.name.endsWith('.png') ? 'image/png' : 
              item.name.endsWith('.gif') ? 'image/gif' : 
              'application/octet-stream',
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0] // Random date within the last 30 days
      }));
      
      setMediaItems(enhancedItems);
    } catch (error) {
      console.error("Error loading media items:", error);
      setError("Failed to load media items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Upload a new media file
  const uploadFile = async (file: File): Promise<MediaItem | null> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Mock progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      
      // Actual upload
      const url = await uploadMedia(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Create new media item
      const newItem: MediaItem = {
        name: file.name,
        url,
        fullPath: `media/${file.name}`,
        size: file.size,
        type: file.type,
        date: new Date().toISOString().split('T')[0]
      };
      
      // Add to media items
      setMediaItems(prev => [newItem, ...prev]);
      
      // Reset state
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
      return newItem;
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
      return null;
    }
  };

  // Delete a media file
  const deleteFile = async (item: MediaItem): Promise<boolean> => {
    try {
      const success = await deleteMedia(item.fullPath);
      
      if (success) {
        // Remove from media items
        setMediaItems(prev => prev.filter(i => i.fullPath !== item.fullPath));
      }
      
      return success;
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file. Please try again.");
      return false;
    }
  };

  // Initial load
  useEffect(() => {
    loadMediaItems();
  }, []);

  return {
    mediaItems,
    loading,
    error,
    uploadProgress,
    isUploading,
    loadMediaItems,
    uploadFile,
    deleteFile
  };
}