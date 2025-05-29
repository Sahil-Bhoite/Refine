import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { ArrowLeft, FileEdit, Copy, Check, X, AlertTriangle, ThumbsUp } from 'lucide-react'; // Import icons
import { RefinementResult, EvaluationResult } from '../../lib/types'; // Import EvaluationResult
import { formatFitDecision, getFitDecisionColor, formatScore } from '../../lib/utils'; // Import utility functions

// Import Editor and syntax highlighting libraries
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-latex'; // Import LaTeX language
import 'prismjs/themes/prism.css'; // Import a basic theme

interface RefinementStepProps {
  refinementResult: RefinementResult;
  originalEvaluationResult: EvaluationResult | null; // Accept original evaluation result
  refinedEvaluationResult: EvaluationResult | null; // Accept refined evaluation result
  onBack: () => void;
}

const RefinementStep: React.FC<RefinementStepProps> = ({
  refinementResult,
  originalEvaluationResult, // Destructure original evaluation result
  refinedEvaluationResult, // Destructure refined evaluation result
  onBack,
}) => {
  console.log("RefinementStep refinedLatexCode:", refinementResult.refinedLatexCode);
  console.log("RefinementStep originalEvaluationResult:", originalEvaluationResult); // Log original evaluation
  console.log("RefinementStep refinedEvaluationResult:", refinedEvaluationResult); // Log refined evaluation
  const [copied, setCopied] = useState(false);

  const originalScore = originalEvaluationResult?.overallScore ?? 0;
  const refinedScore = refinedEvaluationResult?.overallScore ?? 0;
  const improvementScore = refinedScore - originalScore;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(refinementResult.refinedLatexCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy to clipboard.");
    }
  };

  // Helper function for fit decision icon (copied from EvaluationStep)
  const getFitDecisionIcon = (fitDecision: EvaluationResult['fitDecision']) => {
    switch (fitDecision) {
      case 'excellent':
        return <ThumbsUp className="h-6 w-6 text-success-600" />;
      case 'good':
        return <Check className="h-6 w-6 text-primary-600" />;
      case 'moderate':
        return <AlertTriangle className="h-6 w-6 text-warning-500" />;
      case 'poor':
        return <X className="h-6 w-6 text-error-600" />;
      default:
        return null;
    }
  };


  return (
    <div className="animate-fade-in">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Refined Resume</CardTitle>
          <CardDescription>
            Review the AI-optimized version of your resume and its new evaluation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="py-6">
          <div className="space-y-6">
            {/* Improvement Summary */}
            <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
              <h3 className="text-md font-medium text-success-800 mb-2 flex items-center">
                <Check className="h-5 w-5 mr-2 text-success-600" />
                Improvement Summary
              </h3>
              <p className="text-sm text-success-700">
                {refinementResult.overallImprovementsSummary || "See the optimized resume below."}
              </p>
            </div>

            {/* Evaluation Scores Comparison */}
            {originalEvaluationResult && refinedEvaluationResult && (
              <div className="border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-medium mb-4">Evaluation Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Original Score</p>
                    <p className="text-2xl font-bold text-primary-700">{formatScore(originalScore)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Refined Score</p>
                    <p className="text-2xl font-bold text-primary-700">{formatScore(refinedScore)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Improvement</p>
                    <p className={`text-2xl font-bold ${improvementScore >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                      {improvementScore >= 0 ? '+' : ''}{formatScore(improvementScore)}
                    </p>
                  </div>
                </div>

                {/* Detailed Refined Evaluation Results */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium">Refined Resume Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Scores */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Category Scores</h5>
                      <ul className="divide-y divide-gray-200">
                        {refinedEvaluationResult.categories.map((category) => (
                          <li key={category.name} className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-700">{category.name}</span>
                            <span className="text-base font-semibold text-green-600">{formatScore(category.score)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Overall Assessment */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Overall Assessment</h5>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center mb-2">
                          {getFitDecisionIcon(refinedEvaluationResult.fitDecision)}
                          <span className={`ml-2 text-lg font-medium ${getFitDecisionColor(refinedEvaluationResult.fitDecision)}`}>
                            {formatFitDecision(refinedEvaluationResult.fitDecision)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{refinedEvaluationResult.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Refined Resume LaTeX Code Preview */}
            <div className="border rounded-lg">
              <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                <h3 className="text-md font-medium">Refined Resume (LaTeX)</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FileEdit className="h-3.5 w-3.5 mr-1" />
                  AI-optimized version
                </div>
              </div>
              <div className="p-4 max-h-[400px] overflow-y-auto">
                {/* Use Editor for syntax highlighting */}
                <Editor
                  value={refinementResult.refinedLatexCode || 'No LaTeX code provided.'}
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
            onClick={handleCopyToClipboard}
            icon={<Copy className="h-4 w-4" />}
            iconPosition="left"
            disabled={!refinementResult.refinedLatexCode}
          >
            {copied ? "Now paste it on Overleaf!" : "Copy to Clipboard"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RefinementStep;
