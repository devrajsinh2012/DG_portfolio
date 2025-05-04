"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { Plus, Trash2, Save, X, Edit } from "lucide-react";
import { Education, Certification, Extracurricular } from "@/context/data-context";

export function EducationForm() {
  const { data, updateEducation, updateCertifications, updateExtracurricular } = usePortfolioData();
  const [educations, setEducations] = useState<Education[]>([...data.education]);
  const [certifications, setCertifications] = useState<Certification[]>([...data.certifications]);
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([...data.extracurricular]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'education' | 'certifications' | 'extracurricular'>('education');
  
  const [isEditingEducation, setIsEditingEducation] = useState<string | null>(null);
  const [isEditingCertification, setIsEditingCertification] = useState<string | null>(null);
  const [isEditingExtracurricular, setIsEditingExtracurricular] = useState<string | null>(null);
  
  const emptyEducation: Education = {
    degree: "",
    institution: "",
    period: "",
    description: ""
  };
  
  const emptyCertification: Certification = {
    name: "",
    issuer: "",
    date: "",
    description: ""
  };
  
  const emptyExtracurricular: Extracurricular = {
    role: "",
    organization: "",
    period: "",
    description: ""
  };
  
  const [educationForm, setEducationForm] = useState<Education>({ ...emptyEducation });
  const [certificationForm, setCertificationForm] = useState<Certification>({ ...emptyCertification });
  const [extracurricularForm, setExtracurricularForm] = useState<Extracurricular>({ ...emptyExtracurricular });

  // Education operations
  const startEditingEducation = (edu: Education) => {
    setIsEditingEducation(edu.degree);
    setEducationForm({ ...edu });
  };

  const startCreatingEducation = () => {
    setIsEditingEducation("new");
    setEducationForm({ ...emptyEducation });
  };

  const cancelEditingEducation = () => {
    setIsEditingEducation(null);
    setEducationForm({ ...emptyEducation });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEducationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEducation = () => {
    // Validation
    if (!educationForm.degree || !educationForm.institution) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (isEditingEducation === "new") {
      // Add new education
      setEducations(prev => [...prev, educationForm]);
    } else {
      // Update existing education
      setEducations(prev => 
        prev.map(edu => edu.degree === isEditingEducation ? educationForm : edu)
      );
    }
    
    setIsEditingEducation(null);
    setEducationForm({ ...emptyEducation });
  };

  const removeEducation = (degree: string) => {
    if (confirm("Are you sure you want to remove this education?")) {
      setEducations(prev => prev.filter(edu => edu.degree !== degree));
    }
  };

  // Certification operations
  const startEditingCertification = (cert: Certification) => {
    setIsEditingCertification(cert.name);
    setCertificationForm({ ...cert });
  };

  const startCreatingCertification = () => {
    setIsEditingCertification("new");
    setCertificationForm({ ...emptyCertification });
  };

  const cancelEditingCertification = () => {
    setIsEditingCertification(null);
    setCertificationForm({ ...emptyCertification });
  };

  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCertificationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveCertification = () => {
    // Validation
    if (!certificationForm.name || !certificationForm.issuer) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (isEditingCertification === "new") {
      // Add new certification
      setCertifications(prev => [...prev, certificationForm]);
    } else {
      // Update existing certification
      setCertifications(prev => 
        prev.map(cert => cert.name === isEditingCertification ? certificationForm : cert)
      );
    }
    
    setIsEditingCertification(null);
    setCertificationForm({ ...emptyCertification });
  };

  const removeCertification = (name: string) => {
    if (confirm("Are you sure you want to remove this certification?")) {
      setCertifications(prev => prev.filter(cert => cert.name !== name));
    }
  };

  // Extracurricular operations
  const startEditingExtracurricular = (extra: Extracurricular) => {
    setIsEditingExtracurricular(extra.role);
    setExtracurricularForm({ ...extra });
  };

  const startCreatingExtracurricular = () => {
    setIsEditingExtracurricular("new");
    setExtracurricularForm({ ...emptyExtracurricular });
  };

  const cancelEditingExtracurricular = () => {
    setIsEditingExtracurricular(null);
    setExtracurricularForm({ ...emptyExtracurricular });
  };

  const handleExtracurricularChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExtracurricularForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveExtracurricular = () => {
    // Validation
    if (!extracurricularForm.role || !extracurricularForm.organization) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (isEditingExtracurricular === "new") {
      // Add new extracurricular
      setExtracurriculars(prev => [...prev, extracurricularForm]);
    } else {
      // Update existing extracurricular
      setExtracurriculars(prev => 
        prev.map(extra => extra.role === isEditingExtracurricular ? extracurricularForm : extra)
      );
    }
    
    setIsEditingExtracurricular(null);
    setExtracurricularForm({ ...emptyExtracurricular });
  };

  const removeExtracurricular = (role: string) => {
    if (confirm("Are you sure you want to remove this extracurricular activity?")) {
      setExtracurriculars(prev => prev.filter(extra => extra.role !== role));
    }
  };

  const saveAllChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateEducation(educations);
      updateCertifications(certifications);
      updateExtracurricular(extracurriculars);
      setIsSubmitting(false);
    }, 800);
  };

  const isEditingAny = isEditingEducation !== null || isEditingCertification !== null || isEditingExtracurricular !== null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-light">Education & Activities</h2>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-navy-light">
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'education'
                ? 'text-teal border-b-2 border-teal'
                : 'text-slate hover:text-slate-light'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'certifications'
                ? 'text-teal border-b-2 border-teal'
                : 'text-slate hover:text-slate-light'
            }`}
          >
            Certifications
          </button>
          <button
            onClick={() => setActiveTab('extracurricular')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'extracurricular'
                ? 'text-teal border-b-2 border-teal'
                : 'text-slate hover:text-slate-light'
            }`}
          >
            Extracurricular
          </button>
        </div>
      </div>

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-light">Academic Background</h3>
            <button
              onClick={startCreatingEducation}
              className="px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors"
              disabled={isEditingAny}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Education
            </button>
          </div>

          {educations.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-navy-light rounded-lg mb-6">
              <p className="text-slate">No education entries added yet.</p>
              <button
                onClick={startCreatingEducation}
                className="mt-2 px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
                disabled={isEditingAny}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Education
              </button>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {educations.map((edu) => (
                <div
                  key={edu.degree}
                  className="p-4 border border-navy-light rounded-lg bg-navy-light"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-slate-light">{edu.degree}</h4>
                      <p className="text-teal font-mono text-sm">{edu.institution}</p>
                      <p className="text-slate-light text-sm">{edu.period}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditingEducation(edu)}
                        className="p-1 text-slate hover:text-teal transition-colors"
                        disabled={isEditingAny}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeEducation(edu.degree)}
                        className="p-1 text-slate hover:text-red-500 transition-colors"
                        disabled={isEditingAny}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate mt-2">{edu.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-light">Professional Certifications</h3>
            <button
              onClick={startCreatingCertification}
              className="px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors"
              disabled={isEditingAny}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Certification
            </button>
          </div>

          {certifications.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-navy-light rounded-lg mb-6">
              <p className="text-slate">No certifications added yet.</p>
              <button
                onClick={startCreatingCertification}
                className="mt-2 px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
                disabled={isEditingAny}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Certification
              </button>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-4 border border-navy-light rounded-lg bg-navy-light"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-slate-light">{cert.name}</h4>
                      <p className="text-teal font-mono text-sm">{cert.issuer}</p>
                      <p className="text-slate-light text-sm">{cert.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditingCertification(cert)}
                        className="p-1 text-slate hover:text-teal transition-colors"
                        disabled={isEditingAny}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeCertification(cert.name)}
                        className="p-1 text-slate hover:text-red-500 transition-colors"
                        disabled={isEditingAny}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate mt-2">{cert.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Extracurricular Tab */}
      {activeTab === 'extracurricular' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-light">Extracurricular Activities</h3>
            <button
              onClick={startCreatingExtracurricular}
              className="px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors"
              disabled={isEditingAny}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Activity
            </button>
          </div>

          {extracurriculars.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-navy-light rounded-lg mb-6">
              <p className="text-slate">No extracurricular activities added yet.</p>
              <button
                onClick={startCreatingExtracurricular}
                className="mt-2 px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
                disabled={isEditingAny}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Activity
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {extracurriculars.map((extra) => (
                <div
                  key={extra.role}
                  className="p-4 border border-navy-light rounded-lg bg-navy-light"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-slate-light">{extra.role}</h4>
                      <p className="text-teal font-mono text-sm">{extra.organization}</p>
                      <p className="text-slate-light text-sm">{extra.period}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditingExtracurricular(extra)}
                        className="p-1 text-slate hover:text-teal transition-colors"
                        disabled={isEditingAny}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeExtracurricular(extra.role)}
                        className="p-1 text-slate hover:text-red-500 transition-colors"
                        disabled={isEditingAny}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate mt-2">{extra.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education Edit Modal */}
      {isEditingEducation && (
        <div className="fixed inset-0 bg-navy-dark/80 flex items-center justify-center z-50 p-4">
          <div className="bg-navy border border-navy-light rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-light">
                {isEditingEducation === "new" ? "Add Education" : "Edit Education"}
              </h3>
              <button
                onClick={cancelEditingEducation}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="degree" className="block text-slate mb-1 text-sm">
                Degree/Program *
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={educationForm.degree}
                onChange={handleEducationChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Bachelor of Technology in Computer Engineering"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="institution" className="block text-slate mb-1 text-sm">
                Institution *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={educationForm.institution}
                onChange={handleEducationChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Marwadi University"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="period" className="block text-slate mb-1 text-sm">
                Period
              </label>
              <input
                type="text"
                id="period"
                name="period"
                value={educationForm.period}
                onChange={handleEducationChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. 2020 - 2024"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="edu-description" className="block text-slate mb-1 text-sm">
                Description
              </label>
              <textarea
                id="edu-description"
                name="description"
                value={educationForm.description}
                onChange={handleEducationChange}
                rows={3}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="Brief description of your education"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditingEducation}
                className="px-4 py-2 border border-slate text-slate rounded hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEducation}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {isEditingEducation === "new" ? "Add Education" : "Update Education"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certification Edit Modal */}
      {isEditingCertification && (
        <div className="fixed inset-0 bg-navy-dark/80 flex items-center justify-center z-50 p-4">
          <div className="bg-navy border border-navy-light rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-light">
                {isEditingCertification === "new" ? "Add Certification" : "Edit Certification"}
              </h3>
              <button
                onClick={cancelEditingCertification}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate mb-1 text-sm">
                Certification Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={certificationForm.name}
                onChange={handleCertificationChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Google Project Management Certification"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="issuer" className="block text-slate mb-1 text-sm">
                Issuing Organization *
              </label>
              <input
                type="text"
                id="issuer"
                name="issuer"
                value={certificationForm.issuer}
                onChange={handleCertificationChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Coursera.org"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-slate mb-1 text-sm">
                Date
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={certificationForm.date}
                onChange={handleCertificationChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. 2023"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="cert-description" className="block text-slate mb-1 text-sm">
                Description
              </label>
              <textarea
                id="cert-description"
                name="description"
                value={certificationForm.description}
                onChange={handleCertificationChange}
                rows={3}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="Brief description of your certification"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditingCertification}
                className="px-4 py-2 border border-slate text-slate rounded hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCertification}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {isEditingCertification === "new" ? "Add Certification" : "Update Certification"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Extracurricular Edit Modal */}
      {isEditingExtracurricular && (
        <div className="fixed inset-0 bg-navy-dark/80 flex items-center justify-center z-50 p-4">
          <div className="bg-navy border border-navy-light rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-light">
                {isEditingExtracurricular === "new" ? "Add Activity" : "Edit Activity"}
              </h3>
              <button
                onClick={cancelEditingExtracurricular}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="role" className="block text-slate mb-1 text-sm">
                Role/Position *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={extracurricularForm.role}
                onChange={handleExtracurricularChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Chair of Innovation Vertical"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="organization" className="block text-slate mb-1 text-sm">
                Organization *
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={extracurricularForm.organization}
                onChange={handleExtracurricularChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Young Indians"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="extra-period" className="block text-slate mb-1 text-sm">
                Period
              </label>
              <input
                type="text"
                id="extra-period"
                name="period"
                value={extracurricularForm.period}
                onChange={handleExtracurricularChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. 2023 - Present"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="extra-description" className="block text-slate mb-1 text-sm">
                Description
              </label>
              <textarea
                id="extra-description"
                name="description"
                value={extracurricularForm.description}
                onChange={handleExtracurricularChange}
                rows={3}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="Brief description of your activity"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditingExtracurricular}
                className="px-4 py-2 border border-slate text-slate rounded hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveExtracurricular}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {isEditingExtracurricular === "new" ? "Add Activity" : "Update Activity"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save All Changes Button */}
      <div className="mt-8">
        <button
          onClick={saveAllChanges}
          disabled={isSubmitting || isEditingAny}
          className="px-6 py-3 bg-teal text-navy font-medium rounded flex items-center justify-center hover:bg-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal focus:ring-offset-navy disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}