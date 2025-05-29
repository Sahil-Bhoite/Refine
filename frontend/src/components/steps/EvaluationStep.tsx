import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { ArrowLeft, ArrowRight, Check, X, AlertTriangle, ThumbsUp, FileText } from 'lucide-react';
import { EvaluationResult } from '../../lib/types';
import { formatFitDecision, getFitDecisionColor } from '../../lib/utils';

interface EvaluationStepProps {
  evaluationResult: EvaluationResult;
  onBack: () => void;
  onContinue: () => void;
}

const EvaluationStep: React.FC<EvaluationStepProps> = ({
  evaluationResult,
  onBack,
  onContinue,
}) => {
  const { overallScore, categories, pros, cons, fitDecision, summary } = evaluationResult;
  
  const getFitDecisionIcon = () => {
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Resume Evaluation Results</CardTitle>
              <CardDescription>
                See how well your resume matches the job description
              </CardDescription>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-700 mr-2">Overall Match:</span>
              <span className="text-lg font-bold text-primary-700">{overallScore}%</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Category Scores</h3>
              <ul className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <li key={category.name} className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <span className="text-base font-semibold text-green-600">{category.score}%</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Overall Assessment</h3>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center mb-2">
                    {getFitDecisionIcon()}
                    <span className={`ml-2 text-lg font-medium ${getFitDecisionColor(fitDecision)}`}>
                      {formatFitDecision(fitDecision)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{summary}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h4 className="text-md font-medium flex items-center mb-2">
                    <Check className="h-4 w-4 text-success-600 mr-2" />
                    Strengths
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                    {pros.map((pro, index) => (
                      <li key={index} className="mb-1">{pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-md font-medium flex items-center mb-2">
                    <X className="h-4 w-4 text-error-600 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                    {cons.map((con, index) => (
                      <li key={index} className="mb-1">{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg">
            <h3 className="text-md font-medium text-primary-800 mb-2 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              AI Recommendation
            </h3>
            <p className="text-sm text-primary-700">
              Based on this evaluation, our AI can generate an improved version of your resume tailored to this job description.
              Click "Generate Optimized Resume" to continue.
            </p>
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
            Generate Optimized Resume
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EvaluationStep;
