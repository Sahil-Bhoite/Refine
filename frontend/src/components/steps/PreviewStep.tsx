import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

// Import Editor and syntax highlighting libraries
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-latex'; // Import LaTeX language
import 'prismjs/themes/prism.css'; // Import a basic theme

interface PreviewStepProps {
  resumeText: string;
  jobDescription: string;
  onBack: () => void;
  onContinue: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  resumeText,
  jobDescription,
  onBack,
  onContinue,
}) => {
  return (
    <div className="animate-fade-in">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Preview & Confirm</CardTitle>
          <CardDescription>
            Review your LaTeX resume code and job description before analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary-600" />
                Your Resume (LaTeX)
              </h3>
              <div className="border rounded-md p-4 bg-gray-50 min-h-[500px] max-h-[500px] h-[500px] overflow-y-auto flex items-start">
                {/* Use Editor for syntax highlighting */}
                <Editor
                  value={resumeText || 'No LaTeX code provided.'}
                  highlight={code => highlight(code, languages.latex, 'latex')}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
                    fontSize: 14,
                    width: '100%', // Ensure it takes full width
                    minHeight: '100%', // Ensure it takes full height
                  }}
                  readOnly // Make it read-only for preview
                  onValueChange={() => {}} // Add empty onValueChange prop
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Job Description</h3>
              <div className="border rounded-md p-4 bg-gray-50 min-h-[500px] max-h-[500px] h-[500px] overflow-y-auto flex items-start">
                <pre className="text-sm whitespace-pre-wrap text-gray-700 w-full">
                  {jobDescription || 'No job description provided.'}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            icon={<ArrowLeft className="h-4 w-4" />}
            iconPosition="left"
          >
            Back
          </Button>
          
          <Button
            onClick={onContinue}
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Analyze Resume
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PreviewStep;
