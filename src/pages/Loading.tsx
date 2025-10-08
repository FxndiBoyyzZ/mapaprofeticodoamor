import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";

const steps = [
  { text: "Analisando suas respostas...", duration: 3000 },
  { text: "Consultando revelações...", duration: 3500 },
  { text: "Preparando seu Mapa Profético...", duration: 3500 },
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
      {/* Premium dark purple background with animated gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0f2e 25%, #2d1b4e 50%, #1a0f2e 75%, #0f0a1e 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      >
        {/* Premium stars effect with animation */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                             radial-gradient(2px 2px at 60% 70%, white, transparent),
                             radial-gradient(1px 1px at 50% 50%, white, transparent),
                             radial-gradient(1px 1px at 80% 10%, white, transparent),
                             radial-gradient(2px 2px at 90% 60%, white, transparent),
                             radial-gradient(1px 1px at 33% 85%, white, transparent),
                             radial-gradient(2px 2px at 15% 20%, white, transparent),
                             radial-gradient(1px 1px at 70% 40%, white, transparent),
                             radial-gradient(2px 2px at 40% 90%, white, transparent),
                             radial-gradient(1px 1px at 25% 50%, white, transparent)`,
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%',
            animation: 'float-sparkle 20s ease-in-out infinite',
          }}
        />
        
        {/* Premium glow orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #F39C12 0%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9b59b6 0%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite reverse',
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
                  textShadow: '0 4px 30px rgba(243, 156, 18, 0.5), 0 0 60px rgba(243, 156, 18, 0.3)',
                  letterSpacing: '0.02em',
                }}
              >
                {step.text}
              </h1>
            </div>
          ))}
        </div>

        {/* Premium Spinner with double ring */}
        <div className="mb-8 relative">
          {/* Outer glow ring */}
          <svg 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" 
            width="100" 
            height="100" 
            viewBox="0 0 100 100"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(243, 156, 18, 0.6)) drop-shadow(0 0 50px rgba(243, 156, 18, 0.4))',
              animationDuration: '3s',
            }}
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#gradient1)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="200 60"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F39C12', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#9b59b6', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Inner main ring */}
          <svg 
            className="animate-spin" 
            width="80" 
            height="80" 
            viewBox="0 0 80 80"
            style={{
              filter: 'drop-shadow(0 0 25px rgba(243, 156, 18, 0.7))',
              animationDuration: '2s',
            }}
          >
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="url(#gradient2)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="150 50"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#F39C12', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f1c40f', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Premium dots indicator */}
        <div className="flex gap-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? 'bg-[#F39C12] w-8 shadow-[0_0_20px_rgba(243,156,18,0.8)]' 
                  : 'bg-[#F39C12]/30 w-2'
              }`}
              style={{
                boxShadow: index === currentStep ? '0 0 20px rgba(243, 156, 18, 0.8)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
