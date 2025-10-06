import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

const steps = [
  { text: "Analisando suas respostas...", duration: 2000 },
  { text: "Identificando seu tempo espiritual...", duration: 2300 },
  { text: "🌿 Buscando versículos únicos para o seu coração...", duration: 2100 },
  { text: "🔮 Revelando sinais proféticos exclusivos...", duration: 2200 },
  { text: "✨ Gerando seu perfil de amor profético...", duration: 2000 },
  { text: "💌 Finalizando o seu Mapa Profético...", duration: 1900 },
];

const proofMessages = [
  "✨ Mais de 1.200 pessoas descobriram seu tempo espiritual no amor esta semana usando o Mapa Profético!",
  "⏳ 98% das pessoas completam essa etapa em menos de 15 segundos",
  "💌 Seu mapa está sendo preparado com base em princípios espirituais reais",
];

const Loading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, quizData } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);
  const [currentProofMessage, setCurrentProofMessage] = useState(0);
  const { trackEvent } = useTracking();

  // Immediate redirect if no profile - prevents 404 flash
  if (!profile) {
    return <Navigate to="/quiz" replace />;
  }

  useEffect(() => {
    // Track loading started
    trackEvent('quiz_loading_started');

    // Rotate proof messages every 4 seconds
    const proofTimer = setInterval(() => {
      setCurrentProofMessage((prev) => (prev + 1) % proofMessages.length);
    }, 4000);

    return () => clearInterval(proofTimer);
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
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
            backgroundSize: '400% 400%',
          }}
        />
        
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        />
      </div>

      {/* Loading Card */}
      <Card className="relative z-10 w-full max-w-md p-8 bg-white/95 backdrop-blur-xl shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-lilac mb-4">
            <span 
              className="text-3xl"
              style={{
                display: 'inline-block',
                animation: 'spiritual-glow 2s linear infinite'
              }}
            >
              ✨
            </span>
          </div>
          <h2 className="text-primary-dark mb-3 font-bold flex items-center justify-center gap-2">
            <span className="animate-pulse">✨</span>
            Gerando seu Mapa Profético...
          </h2>
          <p className="text-sm text-text-muted max-w-[90%] mx-auto">
            Aguarde alguns instantes enquanto preparamos suas revelações espirituais personalizadas com base nas suas respostas.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 transition-all duration-200 ${
                index <= currentStep ? 'opacity-100' : 'opacity-30'
              }`}
              style={
                index === currentStep
                  ? { animation: 'fade-in-step 0.2s ease-out' }
                  : {}
              }
            >
              {index < currentStep ? (
                <CheckCircle2 
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  style={{ animation: 'check-pop 0.18s ease-out' }}
                />
              ) : index === currentStep ? (
                <Loader2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-border flex-shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm ${
                  index === currentStep
                    ? 'text-primary font-bold'
                    : index < currentStep
                    ? 'text-primary-dark'
                    : 'text-text-muted'
                }`}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="h-1.5 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-lilac transition-all duration-1000 ease-out"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-center text-text-muted mt-2 font-medium">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% concluído
          </p>
        </div>

        {/* Social Proof - Rotating Messages */}
        <div className="mt-6 p-3 bg-[#F4F0FF] rounded-xl">
          <p 
            className="text-sm text-primary-dark leading-relaxed transition-opacity duration-500"
            key={currentProofMessage}
            style={{ animation: 'fade-in 0.5s ease-in-out' }}
          >
            {proofMessages[currentProofMessage]}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Loading;
