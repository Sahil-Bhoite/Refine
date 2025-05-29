import { cn } from '../../lib/utils';
import { Step } from '../../lib/types';

interface StepperProps {
  steps: {
    id: Step;
    label: string;
    description?: string;
  }[];
  currentStep: Step;
  onStepClick?: (step: Step) => void;
  className?: string;
}

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepperProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const isStepCompleted = (stepId: Step) => {
    const currentIndex = getCurrentStepIndex();
    const stepIndex = steps.findIndex(step => step.id === stepId);
    return stepIndex < currentIndex;
  };

  const isStepCurrent = (stepId: Step) => {
    return stepId === currentStep;
  };

  const isStepClickable = (stepId: Step) => {
    if (!onStepClick) return false;
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentIndex = getCurrentStepIndex();
    return stepIndex <= currentIndex;
  };

  return (
    <div className={cn('w-full', className)}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(step.id);
          const isCurrent = isStepCurrent(step.id);
          const isClickable = isStepClickable(step.id);
          
          return (
            <li
              key={step.id}
              className={cn(
                'flex items-center',
                index < steps.length - 1 ? 'w-full' : '',
              )}
            >
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick?.(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    'z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium border-2 transition-all',
                    isCompleted
                      ? 'bg-primary-600 text-white border-primary-600'
                      : isCurrent
                      ? 'bg-white text-primary-600 border-primary-600'
                      : 'bg-white text-gray-500 border-gray-300',
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
                {step.description ? (
                  <div className="mt-2 text-center">
                    <h3 className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-primary-600' : 'text-gray-900'
                    )}>
                      {step.label}
                    </h3>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                ) : (
                  <h3 className={cn(
                    'mt-2 text-sm font-medium',
                    isCurrent ? 'text-primary-600' : 'text-gray-900'
                  )}>
                    {step.label}
                  </h3>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-2 z-0',
                  isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                )}></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Stepper;
