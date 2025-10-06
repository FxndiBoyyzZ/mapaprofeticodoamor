interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3 px-4" 
      role="progressbar" 
      aria-valuenow={percentage} 
      aria-valuemin={0} 
      aria-valuemax={100}
    >
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-text-muted">
            Pergunta {currentStep} de {totalSteps}
          </span>
          <span className="text-xs font-bold text-lilac">{Math.round(percentage)}%</span>
        </div>
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-lilac to-primary transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
