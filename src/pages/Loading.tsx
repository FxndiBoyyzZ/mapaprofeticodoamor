import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";

const steps = [
  { text: "Analisando suas respostas...", duration: 2000 },
  { text: "Consultando revelações...", duration: 2300 },
  { text: "Preparando seu Mapa Profético...", duration: 2500 },
];

const Loading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, quizData } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);
  const { trackEvent } = useTracking();

  // Immediate redirect if no profile - prevents 404 flash
  if (!profile) {
    return <Navigate to="/quiz" replace />;
  }

  useEffect(() => {
    // Track loading started
    trackEvent('quiz_loading_started');
  }, [trackEvent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        // Track each step completion
        trackEvent('quiz_loading_step', { step: currentStep + 1 });
        setCurrentStep(currentStep + 1);
      } else {
        // Track loading completed
        trackEvent('quiz_loading_completed');
        // Navigate to result after all steps
        navigate("/resultado", { state: { profile, quizData }, replace: true });
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, profile, navigate, quizData, trackEvent]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Dark purple background with stars */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #1a0f2e 100%)',
        }}
      >
        {/* Subtle stars effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                             radial-gradient(2px 2px at 60% 70%, white, transparent),
                             radial-gradient(1px 1px at 50% 50%, white, transparent),
                             radial-gradient(1px 1px at 80% 10%, white, transparent),
                             radial-gradient(2px 2px at 90% 60%, white, transparent),
                             radial-gradient(1px 1px at 33% 85%, white, transparent),
                             radial-gradient(1px 1px at 15% 70%, white, transparent)`,
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%',
          }}
        />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl w-full">
        {/* Text Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentStep 
                  ? 'opacity-100 scale-100' 
                  : index < currentStep 
                  ? 'opacity-40 scale-95' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
                style={{ 
                  color: '#F39C12',
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 2px 20px rgba(243, 156, 18, 0.3)'
                }}
              >
                {step.text}
              </h1>
            </div>
          ))}
        </div>

        {/* Spinner */}
        <div className="mb-8">
          <svg 
            className="animate-spin" 
            width="80" 
            height="80" 
            viewBox="0 0 80 80"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(243, 156, 18, 0.5))'
            }}
          >
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#F39C12"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="150 50"
            />
          </svg>
        </div>

        {/* Dots indicator */}
        <div className="flex gap-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentStep ? 'bg-[#F39C12] w-8' : 'bg-[#F39C12]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
