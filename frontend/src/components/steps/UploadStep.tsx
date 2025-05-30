import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import FileUpload from '../ui/FileUpload';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Upload, ClipboardCheck, ArrowRight } from 'lucide-react';

interface UploadStepProps {
  onComplete: (resumeText: string, resumeFile: File | null, jobDescription: string) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ onComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'text'>('text');
  const [errors, setErrors] = useState<{ resume?: string; jobDescription?: string }>({});

  const handleResumeFileSelect = (file: File) => {
    setResumeFile(file);
    // Read .tex file content as string
    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeText(e.target?.result as string || "");
    };
    reader.readAsText(file);
  };

  const validateForm = () => {
    const newErrors: { resume?: string; jobDescription?: string } = {};
    
    if (uploadType === 'file' && !resumeFile) {
      newErrors.resume = 'Please upload your resume';
    } else if (uploadType === 'text' && !resumeText.trim()) {
      newErrors.resume = 'Please enter your resume text';
    }
    
    if (!jobDescription.trim()) {
      newErrors.jobDescription = 'Please enter the job description';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(resumeText, resumeFile, jobDescription);
    }
  };

  return (
    <div className="animate-fade-in">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Your Materials</CardTitle>
          <CardDescription>
            Upload your resume and paste the job description you're targeting
          </CardDescription>
          <p className="text-sm text-gray-500 italic mt-2">
            Get the most out of your resume! Refine analyzes your content against job descriptions to suggest impactful, honest improvements to best showcase your qualification.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  uploadType === 'file'
                    ? 'bg-primary-100 text-primary-800 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload .tex File
              </button>
              
              <button
                type="button"
                onClick={() => setUploadType('text')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  uploadType === 'text'
                    ? 'bg-primary-100 text-primary-800 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Paste LaTeX Code
              </button>
            </div>
            
            {uploadType === 'file' ? (
              <FileUpload
                label="Your Resume (.tex)"
                hint="Upload your current resume in LaTeX (.tex) format"
                accept=".tex"
                onFileSelect={handleResumeFileSelect}
                error={errors.resume}
              />
            ) : (
              <TextArea
                label="Your Resume (LaTeX code)"
                placeholder="Paste your LaTeX resume code here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                error={errors.resume}
                className="min-h-[200px] font-mono"
              />
            )}
          </div>
          
          <TextArea
            label="Job Description"
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            error={errors.jobDescription}
            className="min-h-[200px]"
          />
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSubmit}
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadStep;
