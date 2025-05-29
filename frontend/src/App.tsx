import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Stepper from './components/ui/Stepper';
import UploadStep from './components/steps/UploadStep';
import PreviewStep from './components/steps/PreviewStep';
import EvaluationStep from './components/steps/EvaluationStep';
import RefinementStep from './components/steps/RefinementStep';
import { AppState, Step, EvaluationResult, RefinementResult } from './lib/types';
import { evaluateResume, refineResume } from './lib/utils';

function App() {
  const [state, setState] = useState<AppState>({
    currentStep: 'upload',
    originalResume: null,
    jobDescription: '',
    evaluationResult: null,
    refinementResult: null,
    refinedEvaluationResult: null,
    isLoading: false,
    error: null,
  });
  const steps: { id: Step; label: string }[] = [
    { id: 'upload', label: 'Upload' },
    { id: 'preview', label: 'Preview' },
    { id: 'evaluation', label: 'Evaluation' },
    { id: 'refinement', label: 'Refinement' },
  ];

  const navigateToStep = (step: Step) => {
    if (canNavigateToStep(step)) {
      setState(prev => ({ ...prev, currentStep: step }));
    }
  };

  const canNavigateToStep = (step: Step): boolean => {
    const stepIndex = steps.findIndex(s => s.id === step);
    const currentStepIndex = steps.findIndex(s => s.id === state.currentStep);
    return stepIndex <= currentStepIndex + 1;
  };

  const handleUploadComplete = (latexCode: string, _resumeFile: File | null, jobDescription: string) => {
    setState(prev => ({
      ...prev,
      originalResume: { latexCode },
      jobDescription,
      currentStep: 'preview',
      evaluationResult: null,
      error: null,
    }));
  };

  const handleEvaluateResume = async () => {
    if (!state.originalResume) return;
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));
    try {
      const result = await evaluateResume(
        state.originalResume.latexCode,
        state.jobDescription
      );
      setState(prev => ({
        ...prev,
        evaluationResult: result as EvaluationResult,
        currentStep: 'evaluation',
        isLoading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to evaluate resume. Please try again.',
        isLoading: false,
      }));
    }
  };

  const handleRefineResume = async () => {
    if (!state.originalResume || !state.evaluationResult) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await refineResume(
        state.originalResume.latexCode,
        state.jobDescription,
        state.evaluationResult
      );
      // result is expected to be { refinedLatexCode, overallImprovementsSummary }
      setState(prev => {
        const newState = {
          ...prev,
          refinementResult: result as RefinementResult,
          currentStep: 'refinement' as Step,
          isLoading: false,
        };
        console.log("Set refinementResult:", newState.refinementResult);
        return newState;
      });

      // Evaluate the refined resume
      const refinedEvalResult = await evaluateResume(
        result.refinedLatexCode, // Use result directly
        state.jobDescription
      );

      setState(prev => ({
        ...prev,
        refinementResult: result as RefinementResult, // Update refinementResult
        refinedEvaluationResult: refinedEvalResult as EvaluationResult, // Update refinedEvaluationResult
        currentStep: 'refinement' as Step, // Navigate to refinement
        isLoading: false, // Set isLoading to false after both calls complete
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to refine or re-evaluate resume. Please try again.',
        isLoading: false,
      }));
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (state.currentStep) {
      case 'upload':
        return <UploadStep onComplete={handleUploadComplete} />;
      
      case 'preview':
        return (
          <PreviewStep
            resumeText={state.originalResume?.latexCode || ''}
            jobDescription={state.jobDescription}
            onBack={() => navigateToStep('upload')}
            onContinue={handleEvaluateResume}
          />
        );
      
      case 'evaluation':
        return (
          <EvaluationStep
            evaluationResult={state.evaluationResult!}
            onBack={() => navigateToStep('preview')}
            onContinue={handleRefineResume}
          />
        );
      
      case 'refinement':
        return (
          <RefinementStep
            refinementResult={state.refinementResult!}
            originalEvaluationResult={state.evaluationResult}
            refinedEvaluationResult={state.refinedEvaluationResult}
            onBack={() => navigateToStep('evaluation')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 px-4 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <Stepper
            steps={steps}
            currentStep={state.currentStep}
            onStepClick={navigateToStep}
            className="mb-8"
          />
          
          {state.error && (
            <div className="max-w-4xl mx-auto mb-6 p-4 bg-error-50 border border-error-200 rounded-md text-error-700">
              {state.error}
            </div>
          )}
          
          {state.isLoading ? (
            <div className="max-w-4xl mx-auto p-12 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700">
                {state.currentStep === 'preview' ? 'Analyzing your resume...' : 'Generating optimized resume...'}
              </p>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
