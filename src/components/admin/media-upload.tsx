"use client";

import React, { useState, useCallback, useEffect } from "react";
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Search,
  Grid,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaLibrary, MediaItem } from "@/components/admin/media-service";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface MediaUploadProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

type UploadStatus = "idle" | "uploading" | "success" | "error";
type ViewMode = "grid" | "list";

export function MediaUpload({
  onSelect,
  onClose,
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"],
  maxSize = 5 // 5MB default
}: MediaUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const { 
    mediaItems, 
    loading, 
    error, 
    uploadProgress, 
    isUploading, 
    uploadFile, 
    deleteFile 
  } = useMediaLibrary();

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Triggers when file is dropped
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  // Triggers when file input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Handle file validation and upload
  const handleFiles = async (files: FileList) => {
    const file = files[0];
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus("error");
      setErrorMessage(`File type not allowed. Please use: ${allowedTypes.join(", ")}`);
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadStatus("error");
      setErrorMessage(`File too large. Maximum size is ${maxSize}MB.`);
      return;
    }
    
    // Start upload
    setUploadStatus("uploading");
    
    const result = await uploadFile(file);
    
    if (result) {
      setUploadStatus("success");
      setSelectedFile(result.url);
    } else {
      setUploadStatus("error");
      setErrorMessage("Failed to upload file. Please try again.");
    }
  };

  // Handle file selection
  const handleFileSelect = (url: string) => {
    setSelectedFile(url);
  };

  // Handle file deletion
  const handleDelete = async (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this file?")) {
      const success = await deleteFile(item);
      if (success && selectedFile === item.url) {
        setSelectedFile(null);
      }
    }
  };

  // Filter media items based on search query
  const filteredMedia = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Confirm selection
  const confirmSelection = () => {
    if (selectedFile) {
      onSelect(selectedFile);
    }
    onClose();
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Reset upload status when done
  useEffect(() => {
    if (uploadStatus === "success" && !isUploading) {
      const timer = setTimeout(() => {
        setUploadStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus, isUploading]);

  return (
    <div className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-navy border border-navy-light rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-navy-light">
          <h2 className="text-xl font-bold text-slate-light">Media Library</h2>
          <button
            onClick={onClose}
            className="p-1 text-slate hover:text-teal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex p-4 border-b border-navy-light">
          <div className="relative flex-grow mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-navy-light text-teal' : 'text-slate hover:text-slate-light'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-navy-light text-teal' : 'text-slate hover:text-slate-light'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-0 h-full">
          {/* Upload area */}
          <div className="md:col-span-1 p-4 border-r border-navy-light">
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 ${
                dragActive ? 'border-teal bg-teal/5' : 'border-navy-light'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadStatus === "idle" && (
                <>
                  <Upload className="w-12 h-12 text-slate mb-4" />
                  <p className="text-slate text-center mb-2">
                    Drag & drop files here, or click to browse
                  </p>
                  <p className="text-slate-dark text-xs text-center">
                    Max file size: {maxSize}MB
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleChange}
                    accept={allowedTypes.join(",")}
                  />
                  <button
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="mt-4 px-4 py-2 bg-navy-light text-slate-light rounded hover:text-teal transition-colors"
                  >
                    Select File
                  </button>
                </>
              )}
              
              {uploadStatus === "uploading" && (
                <div className="w-full">
                  <p className="text-slate text-center mb-2">Uploading...</p>
                  <div className="w-full bg-navy-dark rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-teal h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-slate text-center text-sm">{uploadProgress}%</p>
                </div>
              )}
              
              {uploadStatus === "success" && (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                  <p className="text-slate-light">File uploaded successfully!</p>
                  <button
                    onClick={() => setUploadStatus("idle")}
                    className="mt-4 px-4 py-2 bg-navy-light text-slate-light rounded hover:text-teal transition-colors"
                  >
                    Upload Another
                  </button>
                </div>
              )}
              
              {uploadStatus === "error" && (
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-red-400 mb-2">{errorMessage}</p>
                  <button
                    onClick={() => setUploadStatus("idle")}
                    className="mt-2 px-4 py-2 bg-navy-light text-slate-light rounded hover:text-teal transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <h3 className="text-slate-light font-medium mb-2">Files Guidelines</h3>
              <ul className="space-y-1 text-sm text-slate">
                <li>• Images should be optimized for web</li>
                <li>• Recommended formats: JPG, PNG, SVG</li>
                <li>• For best results, use high-resolution images</li>
                <li>• Maximum file size: {maxSize}MB</li>
              </ul>
            </div>
          </div>
          
          {/* Media library */}
          <div className="md:col-span-2 overflow-y-auto p-4 max-h-[50vh]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner size="lg" color="teal" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-slate-light font-medium mb-2">Error loading media</h3>
                <p className="text-slate text-sm">{error}</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <ImageIcon className="w-16 h-16 text-slate/30 mb-4" />
                <h3 className="text-slate-light font-medium mb-2">No files found</h3>
                <p className="text-slate text-sm">
                  {searchQuery ? 'Try a different search term' : 'Upload files to see them here'}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredMedia.map((file) => (
                  <div
                    key={file.url}
                    onClick={() => handleFileSelect(file.url)}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:border-teal group ${
                      selectedFile === file.url ? 'border-teal ring-1 ring-teal' : 'border-navy-light'
                    }`}
                  >
                    <div className="relative aspect-video bg-navy-dark flex items-center justify-center">
                      {file.type?.startsWith('image/') ? (
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <File className="w-12 h-12 text-slate-light" />
                      )}
                      <div className="absolute inset-0 bg-navy-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={(e) => handleDelete(file, e)}
                          className="p-2 bg-red-500/80 rounded-full text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-slate-light text-sm truncate" title={file.name}>{file.name}</p>
                      <p className="text-slate text-xs">{file.size ? formatFileSize(file.size) : '-'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-2">
                {filteredMedia.map((file) => (
                  <div
                    key={file.url}
                    onClick={() => handleFileSelect(file.url)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-navy-light ${
                      selectedFile === file.url ? 'bg-navy-light border-l-2 border-teal' : 'bg-navy'
                    }`}
                  >
                    <div className="w-10 h-10 bg-navy-dark rounded flex items-center justify-center mr-3">
                      {file.type?.startsWith('image/') ? (
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="object-cover w-full h-full rounded"
                        />
                      ) : (
                        <File className="w-5 h-5 text-slate-light" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-slate-light text-sm truncate" title={file.name}>{file.name}</p>
                      <div className="flex text-xs text-slate">
                        <span>{file.size ? formatFileSize(file.size) : '-'}</span>
                        {file.date && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{file.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(file, e)}
                      className="p-1.5 text-slate hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-navy-light flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="teal" 
            onClick={confirmSelection}
            disabled={!selectedFile}
          >
            Select File
          </Button>
        </div>
      </div>
    </div>
  );
}