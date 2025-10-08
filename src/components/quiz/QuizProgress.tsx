interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4" 
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(40, 30, 25, 0.75)",
        borderBottom: "1px solid rgba(230, 126, 34, 0.2)",
      }}
      role="progressbar" 
      aria-valuenow={percentage} 
      aria-valuemin={0} 
      aria-valuemax={100}
    >
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <span 
            className="text-sm font-medium"
            style={{ color: '#E8DDD0' }}
          >
            Pergunta {currentStep} de {totalSteps}
          </span>
          <span 
            className="text-sm font-bold"
            style={{ color: '#E8DDD0' }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
        <div 
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(230, 126, 34, 0.2)' }}
        >
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{ 
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, #E67E22 0%, #F39C12 100%)',
              boxShadow: '0 0 10px rgba(230, 126, 34, 0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
