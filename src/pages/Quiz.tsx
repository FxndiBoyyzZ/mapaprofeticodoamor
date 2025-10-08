import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import QuizProgress from "@/components/quiz/QuizProgress";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Sparkles,
  Book,
  Calendar,
  User,
  Users,
  HelpCircle,
  HeartCrack,
} from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";
import InputMask from "react-input-mask";
import { supabase } from "@/integrations/supabase/client";

type QuizData = {
  momento?: string;
  user_state?: "solteiro" | "relacionamento" | "confuso" | "desacreditado";
  user_doubt?: string;
  situacaoAtual?: string[];
  duvida?: string;
  palavrasAmor?: string[];
  versiculo?: string;
  tempo?: string;
  nome?: string;
  whatsapp?: string;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { trackViewContent, trackLead, trackQuizStep, trackQuizStart, trackQuizComplete } = useTracking();

  const totalSteps = 6;

  // Check if any option is selected for current step
  const isStepValid = () => {
    if (step === 1) return !!quizData.momento;
    if (step === 2) return !!quizData.user_doubt;
    if (step === 3) return quizData.palavrasAmor && quizData.palavrasAmor.length > 0;
    if (step === 4) return !!quizData.versiculo;
    if (step === 5) return !!quizData.tempo;
    if (step === 6) {
      // Validação rigorosa para etapa final
      const nomeValido = quizData.nome && quizData.nome.trim().length >= 2;
      const whatsappValido = quizData.whatsapp && quizData.whatsapp.replace(/\D/g, "").length >= 10;
      return nomeValido && whatsappValido;
    }
    return true;
  };

  // Track initial quiz view
  useEffect(() => {
    trackViewContent({ content_category: "quiz" });
    trackQuizStart(); // Track quiz start
  }, []);

  const handleNext = async () => {
    console.log("🔍 handleNext - Step:", step, "Total Steps:", totalSteps);
    console.log("📋 Quiz Data:", quizData);
    setErrorMessage("");

    // Validations
    if (step === 1 && !quizData.momento) {
      setErrorMessage("Por favor, selecione uma opção");
      return;
    }
    if (step === 2 && !quizData.user_doubt) {
      setErrorMessage("Por favor, selecione uma opção");
      return;
    }
    if (step === 3 && (!quizData.palavrasAmor || quizData.palavrasAmor.length === 0)) {
      setErrorMessage("Por favor, selecione pelo menos uma palavra");
      return;
    }
    if (step === 3 && quizData.palavrasAmor && quizData.palavrasAmor.length > 3) {
      setErrorMessage("Selecione no máximo 3 palavras");
      return;
    }
    if (step === 4 && !quizData.versiculo) {
      setErrorMessage("Por favor, selecione um versículo");
      return;
    }
    if (step === 5 && !quizData.tempo) {
      setErrorMessage("Por favor, selecione uma opção");
      return;
    }

    if (step < totalSteps) {
      console.log("➡️ Avançando para próximo step");
      // Track quiz step progression with user_doubt data
      trackQuizStep(step + 1, quizData.user_doubt || quizData.momento);

      // Smooth transition
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    } else {
      console.log("🎯 STEP FINAL DETECTADO! Salvando contato...");
      console.log("👤 Nome:", quizData.nome);
      console.log("📱 WhatsApp:", quizData.whatsapp);

      // Contact data logged (database removed)
      if (quizData.nome && quizData.whatsapp) {
        console.log("💾 Contact saved locally:", {
          name: quizData.nome,
          whatsapp: quizData.whatsapp,
        });
      } else {
        console.warn("⚠️ Dados faltando - Nome ou WhatsApp vazios");
      }

      // Save user data to tracking (whatsapp hashing)
      if (quizData.whatsapp) {
        tracking.setUserData(undefined, quizData.whatsapp);
      }

      // Generate profile first
      const profile = generateProfile(quizData);

      // Track quiz completion with profile
      trackQuizComplete(profile);

      // Track Lead completion
      trackLead();

      // Navigate to loading page
      navigate("/loading", { state: { profile, quizData } });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step - 1);
        setErrorMessage("");
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    }
  };

  const generateProfile = (data: QuizData) => {
    // Enhanced logic with user_state personalization
    let tempoEspiritual = "Tempo de Revelação";
    let perfilAmor = "Aliança Profunda";

    // Personalize based on user_state
    if (data.user_state === "solteiro") {
      tempoEspiritual = "Tempo de Espera Profética";
      if (data.duvida?.includes("Confiança de que Deus")) {
        perfilAmor = "Fé e Esperança Fortalecidas";
      } else if (data.duvida?.includes("Curiosidade")) {
        perfilAmor = "Revelação do Amor Preparado";
      } else {
        perfilAmor = "Renovação da Esperança";
      }
    } else if (data.user_state === "relacionamento") {
      if (data.situacaoAtual?.includes("Sinto paz e confirmação")) {
        tempoEspiritual = "Tempo de Confirmação Divina";
        perfilAmor = "Aliança Abençoada";
      } else if (data.situacaoAtual?.includes("Recebi alertas")) {
        tempoEspiritual = "Tempo de Alinhamento";
        perfilAmor = "Discernimento Necessário";
      } else {
        tempoEspiritual = "Tempo de Clareza";
        perfilAmor = "Sabedoria para Decidir";
      }
    } else if (data.user_state === "confuso") {
      tempoEspiritual = "Tempo de Direção";
      perfilAmor = "Busca por Clareza Espiritual";
    } else if (data.user_state === "desacreditado") {
      tempoEspiritual = "Tempo de Restauração";
      perfilAmor = "Cura e Renovação do Coração";
    }

    // Adjust based on chosen words
    if (data.palavrasAmor?.includes("líder espiritual") && data.palavrasAmor?.includes("fiel")) {
      perfilAmor = "Aliança Profunda e Espiritual";
    } else if (data.palavrasAmor?.includes("missionário") || data.palavrasAmor?.includes("ousado")) {
      perfilAmor = "Amor Missional e Ousado";
    }

    return {
      tempoEspiritual,
      perfilAmor,
      versiculo: data.versiculo || "Jeremias 29:11",
      situacao: data.momento,
      ritmo: data.tempo,
      userState: data.user_state,
      userDoubt: data.user_doubt,
    };
  };

  const togglePalavra = (palavra: string) => {
    const current = quizData.palavrasAmor || [];
    if (current.includes(palavra)) {
      setQuizData({ ...quizData, palavrasAmor: current.filter((p) => p !== palavra) });
    } else if (current.length < 3) {
      setQuizData({ ...quizData, palavrasAmor: [...current, palavra] });
    }
  };

  const toggleSituacao = (situacao: string) => {
    const current = quizData.situacaoAtual || [];
    if (current.includes(situacao)) {
      setQuizData({ ...quizData, situacaoAtual: current.filter((s) => s !== situacao) });
    } else {
      setQuizData({ ...quizData, situacaoAtual: [...current, situacao] });
    }
  };

  const getQuestionIcon = (option: string) => {
    const iconMap: { [key: string]: any } = {
      "Solteiro(a)": User,
      "Em um relacionamento": Users,
      "É complicado/Em dúvida": HelpCircle,
      "Desacreditado(a) no amor": HeartCrack,
    };
    return iconMap[option] || Heart;
  };

  return (
    <div className="min-h-screen w-full pb-24 md:pb-20">
      <QuizProgress currentStep={step} totalSteps={totalSteps} />

      <div className="pt-[70px] px-4">
        <div className="container mx-auto max-w-2xl">
          <Card
            className={`p-6 xs:p-8 md:p-10 shadow-2xl transition-all duration-150 border border-white/10 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
            style={{ 
              backdropFilter: "blur(20px)", 
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(40, 30, 25, 0.85)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)"
            }}
          >
            {/* Question 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Sparkles 
                    className="w-12 h-12 mx-auto mb-6" 
                    style={{ color: '#E67E22' }}
                  />
                  <h3 
                    className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                    style={{
                      color: '#F5F0E8',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    Em que tempo do seu caminhar amoroso você está hoje?
                  </h3>
                  <p
                    className="text-[15px] xs:text-[16px] leading-relaxed"
                    style={{ 
                      color: '#E8DDD0',
                      opacity: 0.9
                    }}
                  >
                    Sua resposta vai moldar a direção profética do seu Mapa. Seja sincero(a), pois Deus fala com quem abre o coração
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      text: "Solteiro(a), à espera do propósito de Deus",
                      icon: Heart,
                      state: "solteiro" as const,
                    },
                    { text: "Em um relacionamento atualmente", icon: Users, state: "relacionamento" as const },
                    { text: "Vivendo um tempo confuso / em dúvida", icon: HelpCircle, state: "confuso" as const },
                  ].map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = quizData.momento === option.text;
                    return (
                      <button
                        key={option.text}
                        className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border ${
                          isSelected
                            ? "border-[#E67E22] border-2 shadow-lg"
                            : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                        }`}
                        style={{
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          background: isSelected 
                            ? "rgba(230, 126, 34, 0.15)" 
                            : "rgba(40, 30, 25, 0.6)",
                        }}
                        onClick={() => {
                          setQuizData({ ...quizData, momento: option.text, user_state: option.state });
                          setTimeout(() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setStep(2);
                              setIsTransitioning(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 150);
                          }, 100);
                        }}
                      >
                        <IconComponent
                          className="w-6 h-6 flex-shrink-0"
                          style={{ color: '#E67E22' }}
                        />
                        <span
                          className="text-[15px] xs:text-[16px] text-left flex-1"
                          style={{
                            color: '#F5F0E8',
                            fontWeight: isSelected ? '600' : '400',
                          }}
                        >
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 2 - Fully personalized based on user_state */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Sparkles 
                    className="w-12 h-12 mx-auto mb-6" 
                    style={{ color: '#E67E22' }}
                  />
                  {quizData.user_state === "solteiro" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Como você se sente nesse tempo de espera pelo seu propósito amoroso?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Identifique o que mais tem ocupado seus pensamentos e emoções neste período.
                      </p>
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        O que mais pesa no seu coração sobre esse relacionamento?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Seja sincero(a). Deus pode trazer clareza quando abrimos o coração.
                      </p>
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        O que mais te deixa em dúvida neste momento?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Identifique o que pesa no seu coração.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        O que mais te fez perder a fé no amor ou nas promessas de Deus?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Escolha o que mais reflete o seu coração hoje.
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {quizData.user_state === "solteiro" ? (
                    <>
                      {[
                        { text: "Às vezes perco a esperança de que vai acontecer", emoji: "🙏" },
                        { text: "Tenho fé, mas não sei quando vai acontecer", emoji: "✨" },
                        { text: "Sinto que Deus está preparando algo especial", emoji: "💖" },
                        { text: "Tenho medo de esperar em vão", emoji: "😔" },
                      ].map((option) => {
                        const isSelected = quizData.user_doubt === option.text;
                        return (
                          <button
                            key={option.text}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border ${
                              isSelected
                                ? "border-[#E67E22] border-2 shadow-lg"
                                : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                            }`}
                            style={{
                              backdropFilter: "blur(16px)",
                              WebkitBackdropFilter: "blur(16px)",
                              background: isSelected 
                                ? "rgba(230, 126, 34, 0.15)" 
                                : "rgba(40, 30, 25, 0.6)",
                            }}
                            onClick={() => {
                              setQuizData({ ...quizData, user_doubt: option.text });
                              setTimeout(() => {
                                trackQuizStep(3, option.text);
                                setIsTransitioning(true);
                                setTimeout(() => {
                                  setStep(3);
                                  setIsTransitioning(false);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }, 150);
                              }, 100);
                            }}
                          >
                            <span className="text-xl flex-shrink-0">{option.emoji}</span>
                            <span
                              className="text-[15px] xs:text-[16px] text-left flex-1"
                              style={{
                                color: '#F5F0E8',
                                fontWeight: isSelected ? '600' : '400',
                              }}
                            >
                              {option.text}
                            </span>
                          </button>
                        );
                      })}
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      {[
                        { text: "Não sei se é vontade de Deus ou minha", emoji: "🤔" },
                        { text: "Meu coração sente coisas boas e ruins, como se estivesse dividido.", emoji: "😕" },
                        { text: "Tenho medo de estar trilhando um caminho que não é o que Deus quer.", emoji: "🛑" },
                        { text: "Falta clareza espiritual sobre o próximo passo", emoji: "📖" },
                      ].map((option) => {
                        const isSelected = quizData.user_doubt === option.text;
                        return (
                          <button
                            key={option.text}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border ${
                              isSelected
                                ? "border-[#E67E22] border-2 shadow-lg"
                                : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                            }`}
                            style={{
                              backdropFilter: "blur(16px)",
                              WebkitBackdropFilter: "blur(16px)",
                              background: isSelected 
                                ? "rgba(230, 126, 34, 0.15)" 
                                : "rgba(40, 30, 25, 0.6)",
                            }}
                             onClick={() => {
                              setQuizData({ ...quizData, user_doubt: option.text });
                              setTimeout(() => {
                                trackQuizStep(3, option.text);
                                setIsTransitioning(true);
                                setTimeout(() => {
                                  setStep(3);
                                  setIsTransitioning(false);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }, 150);
                              }, 100);
                            }}
                          >
                            <span className="text-xl flex-shrink-0">{option.emoji}</span>
                            <span
                              className="text-[15px] xs:text-[16px] text-left flex-1"
                              style={{
                                color: '#F5F0E8',
                                fontWeight: isSelected ? '600' : '400',
                              }}
                            >
                              {option.text}
                            </span>
                          </button>
                        );
                      })}
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      {[
                        { text: "Não sei se é vontade de Deus ou minha", emoji: "🤔" },
                        { text: "Sinto coisas boas e ruins ao mesmo tempo", emoji: "✨" },
                        { text: "Medo de estar indo no caminho errado", emoji: "🛑" },
                        { text: "Falta clareza espiritual sobre o próximo passo", emoji: "📖" },
                      ].map((option) => {
                        const isSelected = quizData.user_doubt === option.text;
                        return (
                          <button
                            key={option.text}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border ${
                              isSelected
                                ? "border-[#E67E22] border-2 shadow-lg"
                                : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                            }`}
                            style={{
                              backdropFilter: "blur(16px)",
                              WebkitBackdropFilter: "blur(16px)",
                              background: isSelected 
                                ? "rgba(230, 126, 34, 0.15)" 
                                : "rgba(40, 30, 25, 0.6)",
                            }}
                             onClick={() => {
                              setQuizData({ ...quizData, user_doubt: option.text });
                              setTimeout(() => {
                                trackQuizStep(3, option.text);
                                setIsTransitioning(true);
                                setTimeout(() => {
                                  setStep(3);
                                  setIsTransitioning(false);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }, 150);
                              }, 100);
                            }}
                           >
                             <span className="text-xl flex-shrink-0">{option.emoji}</span>
                             <span
                               className="text-[15px] xs:text-[16px] text-left flex-1"
                               style={{
                                 color: '#F5F0E8',
                                 fontWeight: isSelected ? '600' : '400',
                               }}
                             >
                               {option.text}
                             </span>
                           </button>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {[
                        { text: "Uma decepção passada me feriu profundamente", emoji: "😔" },
                        { text: "Me sinto esquecido(a) por Deus", emoji: "🙏" },
                        { text: "Não vejo sinais de mudança", emoji: "⏳" },
                        { text: "Perdi as forças para acreditar", emoji: "💔" },
                      ].map((option) => {
                        const isSelected = quizData.user_doubt === option.text;
                        return (
                          <button
                            key={option.text}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border ${
                              isSelected
                                ? "border-[#E67E22] border-2 shadow-lg"
                                : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                            }`}
                            style={{
                              backdropFilter: "blur(16px)",
                              WebkitBackdropFilter: "blur(16px)",
                              background: isSelected 
                                ? "rgba(230, 126, 34, 0.15)" 
                                : "rgba(40, 30, 25, 0.6)",
                            }}
                             onClick={() => {
                              setQuizData({ ...quizData, user_doubt: option.text });
                              setTimeout(() => {
                                trackQuizStep(3, option.text);
                                setIsTransitioning(true);
                                setTimeout(() => {
                                  setStep(3);
                                  setIsTransitioning(false);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }, 150);
                              }, 100);
                            }}
                           >
                             <span className="text-xl flex-shrink-0">{option.emoji}</span>
                             <span
                               className="text-[15px] xs:text-[16px] text-left flex-1"
                               style={{
                                 color: '#F5F0E8',
                                 fontWeight: isSelected ? '600' : '400',
                               }}
                             >
                               {option.text}
                             </span>
                           </button>
                         );
                       })}
                     </>
                   )}
                 </div>
               </div>
             )}

             {/* Question 3 - Personalized */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Heart 
                    className="w-12 h-12 mx-auto mb-6" 
                    style={{ color: '#E67E22' }}
                  />
                  {quizData.user_state === "solteiro" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Se Deus fosse escrever uma nova história de amor para você, que qualidades não poderiam faltar?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Escolha até 3 características que refletem os desejos mais profundos do seu coração.
                      </p>
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Quais qualidades você mais deseja ver florescendo no relacionamento de vocês?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Escolha até 3 características que representam o que você acredita que Deus pode fortalecer.
                      </p>
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Se pudesse alinhar seu relacionamento ao propósito de Deus, quais qualidades seriam essenciais?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Escolha até 3 características que você gostaria de ver restauradas.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Se o amor fosse restaurado por Deus, que características fariam você acreditar novamente?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Escolha até 3 qualidades que reacenderiam sua fé no amor.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center px-2">
                  {[
                    "Fiel",
                    "Cúmplice",
                    "Líder espiritual",
                    "Acolhedor(a)",
                    "Ousado(a)",
                    "Coração manso e ensinável",
                    "Que traga alegria leve",
                    "Amor constante e inabalável",
                    "Com propósito missionário",
                    "Com alma de lar e parceria",
                  ].map((palavra) => {
                    const isSelected = quizData.palavrasAmor?.includes(palavra);
                    const isDisabled = !isSelected && (quizData.palavrasAmor?.length || 0) >= 3;

                    return (
                      <button
                        key={palavra}
                        disabled={isDisabled}
                        className={`
                          px-4 py-2.5 rounded-full text-sm font-medium 
                          transition-all duration-200 
                          active:scale-95
                          border
                          ${
                            isSelected
                              ? "border-2 border-[#E67E22] shadow-lg scale-[1.02] animate-[scale-in_180ms_ease-out]"
                              : isDisabled
                                ? "border border-[#E67E22]/20 cursor-not-allowed opacity-40"
                                : "border border-[#E67E22]/40 hover:border-[#E67E22]/70 hover:scale-105 cursor-pointer hover:shadow-md"
                          }
                        `}
                        style={{
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          background: isSelected 
                            ? "rgba(230, 126, 34, 0.2)" 
                            : isDisabled 
                              ? "rgba(40, 30, 25, 0.3)"
                              : "rgba(40, 30, 25, 0.5)",
                          color: isSelected ? '#F5F0E8' : '#E8DDD0',
                          fontWeight: isSelected ? '600' : '400',
                        }}
                        onClick={() => !isDisabled && togglePalavra(palavra)}
                      >
                        <span className="flex items-center gap-1.5">
                          {palavra}
                          {isSelected && <span className="text-base opacity-80 animate-fade-in">✨</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <p
                    className="text-sm font-medium transition-all duration-200"
                    style={{
                      color: (quizData.palavrasAmor?.length || 0) === 0
                        ? '#94A3B8'
                        : (quizData.palavrasAmor?.length || 0) === 3
                          ? '#E67E22'
                          : '#E8DDD0',
                      fontWeight: (quizData.palavrasAmor?.length || 0) === 3 ? '700' : '500',
                    }}
                  >
                    {quizData.palavrasAmor && quizData.palavrasAmor.length > 0
                      ? `${quizData.palavrasAmor.length}/3 selecionadas`
                      : "0/3 selecionadas"}
                  </p>
                </div>

                {/* Botão Próximo apenas na pergunta 3 */}
                <div className="mt-6 pt-4">
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="w-full rounded-2xl font-bold text-base transition-all duration-300 border-0"
                    style={{
                      height: "56px",
                      background: isStepValid()
                        ? 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)'
                        : 'rgba(230, 126, 34, 0.4)',
                      backgroundSize: '200% 100%',
                      color: '#FFFFFF',
                      boxShadow: isStepValid() ? '0 8px 24px rgba(230, 126, 34, 0.5)' : 'none',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      cursor: isStepValid() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

             {/* Question 4 - Personalized */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Book 
                    className="w-12 h-12 mx-auto mb-6" 
                    style={{ color: '#E67E22' }}
                  />
                  <h3 
                    className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                    style={{
                      color: '#F5F0E8',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    Qual promessa pode restaurar seu coração?
                  </h3>
                  <p
                    className="text-[15px] xs:text-[16px] leading-relaxed"
                    style={{ 
                      color: '#E8DDD0',
                      opacity: 0.9
                    }}
                  >
                    Escolha a promessa que mais fala ao seu coração neste momento. Ela será a base das direções
                    proféticas do seu Mapa.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      ref: "Jeremias 29:11",
                      tema: "Esperança",
                      texto: "Porque eu sei os planos que tenho para vocês...",
                      emoji: "🌟",
                    },
                    {
                      ref: "Provérbios 3:5-6",
                      tema: "Direção",
                      texto: "Confie no Senhor de todo o seu coração...",
                      emoji: "🧭",
                    },
                    {
                      ref: "Salmo 37:4-5",
                      tema: "Deleite",
                      texto: "Deleite-se no Senhor...",
                      emoji: "💫",
                    },
                    {
                      ref: "1 Coríntios 13:4-7",
                      tema: "Amor",
                      texto: "O amor é paciente, o amor é bondoso...",
                      emoji: "💝",
                    },
                  ].map((v) => {
                    const isSelected = quizData.versiculo === v.ref;
                    return (
                      <button
                        key={v.ref}
                        className={`w-full p-4 rounded-2xl flex flex-col gap-1.5 text-left relative transition-all duration-200 border ${
                          isSelected
                            ? "border-[#E67E22] border-2 shadow-lg"
                            : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                        }`}
                        style={{
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          background: isSelected 
                            ? "rgba(230, 126, 34, 0.15)" 
                            : "rgba(40, 30, 25, 0.6)",
                        }}
                         onClick={() => {
                          setQuizData({ ...quizData, versiculo: v.ref });
                          setTimeout(() => {
                            trackQuizStep(5, quizData.user_doubt || quizData.momento);
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setStep(5);
                              setIsTransitioning(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 150);
                          }, 100);
                        }}
                      >
                        {/* Ícone de seleção no canto superior direito */}
                        {isSelected && (
                          <span className="absolute top-2 right-2 text-[14px] opacity-70 animate-fade-in">✨</span>
                        )}

                        <div className="flex items-start justify-between w-full gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg flex-shrink-0">{v.emoji}</span>
                            <span
                              className="font-serif text-sm xs:text-base transition-all duration-150"
                              style={{
                                color: '#F5F0E8',
                                fontWeight: isSelected ? '700' : '500',
                              }}
                            >
                              {v.ref}
                            </span>
                          </div>
                          <span 
                            className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                            style={{
                              background: 'rgba(230, 126, 34, 0.15)',
                              color: '#E67E22',
                            }}
                          >
                            {v.tema}
                          </span>
                        </div>

                        <span
                          className="text-sm xs:text-base italic leading-relaxed ml-9 transition-colors duration-150"
                          style={{
                            color: isSelected ? '#F5F0E8' : '#E8DDD0',
                          }}
                        >
                          "{v.texto}"
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div 
                  className="rounded-xl p-3 border-l-4 mt-4 mb-4"
                  style={{
                    background: 'rgba(230, 126, 34, 0.1)',
                    borderColor: '#E67E22',
                  }}
                >
                  <p 
                    className="text-xs"
                    style={{ color: '#F5F0E8' }}
                  >
                    💡 <strong>Este versículo será a base</strong> das direções proféticas do seu Mapa
                  </p>
                </div>
              </div>
            )}

             {/* Question 5 - Personalized */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Calendar 
                    className="w-12 h-12 mx-auto mb-6" 
                    style={{ color: '#E67E22' }}
                  />
                  {quizData.user_state === "solteiro" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Quanto tempo por dia você está disposto(a) a separar para Deus preparar seu coração?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Quanto tempo por dia você está disposto(a) a separar para Deus trazer clareza?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Quanto tempo por dia você está disposto(a) a separar para Deus te guiar?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 
                        className="text-[28px] xs:text-[32px] md:text-[36px] font-bold leading-[1.2] mb-4"
                        style={{
                          color: '#F5F0E8',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Quanto tempo por dia você está disposto(a) a separar para Deus restaurar seu coração?
                      </h3>
                      <p
                        className="text-[15px] xs:text-[16px] leading-relaxed"
                        style={{ 
                          color: '#E8DDD0',
                          opacity: 0.9
                        }}
                      >
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {[
                    { text: "5 min", emoji: "⚡" },
                    { text: "10 min", emoji: "🕐" },
                    { text: "15 min", emoji: "⏰" },
                  ].map((option) => {
                    const isSelected = quizData.tempo === option.text;
                    return (
                      <button
                        key={option.text}
                        className={`w-full p-4 rounded-2xl flex items-center justify-between gap-3 relative transition-all duration-200 group border ${
                          isSelected
                            ? "border-[#E67E22] border-2 shadow-lg"
                            : "border-[#E67E22]/30 border hover:border-[#E67E22]/60 hover:shadow-md"
                        }`}
                        style={{
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          background: isSelected 
                            ? "rgba(230, 126, 34, 0.15)" 
                            : "rgba(40, 30, 25, 0.6)",
                        }}
                         onClick={() => {
                          setQuizData({ ...quizData, tempo: option.text });
                          setTimeout(() => {
                            trackQuizStep(6, quizData.user_doubt || quizData.momento);
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setStep(6);
                              setIsTransitioning(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 150);
                          }, 100);
                        }}
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`text-2xl w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                              isSelected ? "scale-110" : "group-hover:scale-105"
                            }`}
                          >
                            {option.emoji}
                          </span>
                          <span
                            className="text-base transition-all duration-200"
                            style={{
                              color: '#F5F0E8',
                              fontWeight: isSelected ? '700' : '600',
                            }}
                          >
                            {option.text} por dia
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[14px] opacity-70 animate-fade-in flex-shrink-0 drop-shadow-sm">
                            ✨
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div 
                  className="rounded-xl p-4 border-l-4 mt-5 shadow-sm backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(to right, rgba(230, 126, 34, 0.15), rgba(230, 126, 34, 0.08))',
                    borderColor: '#E67E22',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">💡</span>
                    <p 
                      className="text-[13px] leading-relaxed"
                      style={{ color: '#F5F0E8' }}
                    >
                      <strong className="font-bold">Seu compromisso espiritual</strong> moldará cada etapa do seu plano
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Question 6 */}
            {step === 6 && (
              <div className="space-y-8 px-1 pb-4">
                {/* Cabeçalho melhorado com glassmorphism */}
                <div 
                  className="text-center p-6 rounded-3xl border backdrop-blur-md"
                  style={{
                    background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.15), rgba(243, 156, 18, 0.1))',
                    borderColor: 'rgba(230, 126, 34, 0.3)',
                  }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.2), rgba(243, 156, 18, 0.15))',
                    }}
                  >
                    <Sparkles 
                      className="w-8 h-8" 
                      style={{ color: '#E67E22' }}
                    />
                  </div>
                  <h2 
                    className="text-[26px] xs:text-[30px] md:text-[34px] font-bold leading-[1.25] mb-3"
                    style={{
                      color: '#F5F0E8',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    Seu Mapa Profético está pronto! ✨
                  </h2>
                  <p
                    className="text-[14px] xs:text-[15px] leading-relaxed mx-auto max-w-md"
                    style={{ 
                      color: '#E8DDD0',
                      opacity: 0.95
                    }}
                  >
                    Falta apenas um passo para receber seu <strong style={{ color: '#E67E22' }}>Mapa Profético personalizado</strong> e o <strong style={{ color: '#E67E22' }}>Plano Espiritual de 7 dias</strong> diretamente no WhatsApp 💌
                  </p>
                </div>

                {/* Formulário com design melhorado */}
                <div className="space-y-5">
                  <div>
                    <Label 
                      htmlFor="nome" 
                      className="text-base font-bold mb-3 flex items-center gap-2"
                      style={{ color: '#F5F0E8' }}
                    >
                      <span className="text-lg">👤</span>
                      Seu primeiro nome
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Ex: Maria"
                      className="h-14 rounded-2xl text-base border-2 transition-all duration-200 focus:scale-[1.01]"
                      style={{
                        borderColor: 'rgba(230, 126, 34, 0.4)',
                        background: 'rgba(40, 30, 25, 0.7)',
                        color: '#F5F0E8',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                      value={quizData.nome || ""}
                      onChange={(e) => setQuizData({ ...quizData, nome: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label 
                      htmlFor="whatsapp" 
                      className="text-base font-bold mb-3 flex items-center gap-2"
                      style={{ color: '#F5F0E8' }}
                    >
                      <span className="text-lg">📱</span>
                      Seu WhatsApp
                    </Label>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={quizData.whatsapp || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuizData({ ...quizData, whatsapp: e.target.value })
                      }
                    >
                      {/* @ts-ignore */}
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="whatsapp"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="h-14 rounded-2xl text-base border-2 transition-all duration-200 focus:scale-[1.01]"
                          style={{
                            borderColor: 'rgba(230, 126, 34, 0.4)',
                            background: 'rgba(40, 30, 25, 0.7)',
                            color: '#F5F0E8',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                          }}
                        />
                      )}
                    </InputMask>
                    <p 
                      className="text-sm mt-3 flex items-center gap-2 px-2"
                      style={{ color: '#E8DDD0' }}
                    >
                      <span>💬</span>
                      <span>Enviaremos seu Mapa Profético diretamente no WhatsApp</span>
                    </p>
                  </div>
                </div>

                {/* Box de segurança aprimorado */}
                <div 
                  className="rounded-2xl p-4 border-2 backdrop-blur-md shadow-lg"
                  style={{
                    background: 'linear-gradient(to right, rgba(230, 126, 34, 0.12), rgba(243, 156, 18, 0.08))',
                    borderColor: 'rgba(230, 126, 34, 0.4)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(230, 126, 34, 0.15)',
                      }}
                    >
                      <span className="text-xl">🔒</span>
                    </div>
                    <div>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: '#F5F0E8' }}
                      >
                        <strong className="font-bold block mb-1">Seus dados estão 100% protegidos</strong>
                        <span style={{ color: '#E8DDD0', opacity: 0.95 }}>
                          Usamos apenas para entregar seu Mapa Profético com total segurança e privacidade.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div
                className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl"
                role="alert"
                aria-live="polite"
              >
                <p className="text-sm text-destructive font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Desktop Navigation - Visible only on desktop */}
            <div className="hidden md:flex gap-3 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(230, 126, 34, 0.2)' }}>
              {step > 1 && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleBack} 
                  className="flex-1 rounded-2xl font-semibold border-2 transition-all hover:scale-[1.02]"
                  style={{
                    borderColor: 'rgba(230, 126, 34, 0.3)',
                    color: '#F5F0E8',
                    background: 'rgba(40, 30, 25, 0.6)',
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}

              {step === 6 && (
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1 rounded-2xl font-bold text-lg transition-all duration-300 border-0 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    height: "60px",
                    background: isStepValid()
                      ? 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)'
                      : 'rgba(230, 126, 34, 0.4)',
                    backgroundSize: '200% 100%',
                    color: '#FFFFFF',
                    boxShadow: isStepValid() ? '0 12px 32px rgba(230, 126, 34, 0.6), 0 0 60px rgba(230, 126, 34, 0.3)' : 'none',
                    textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                    cursor: isStepValid() ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Receber meu Mapa Profético Agora
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Mobile Footer - Visible only on mobile */}
      {step === 6 && (
        <div 
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t shadow-2xl backdrop-blur-xl"
          style={{
            background: 'linear-gradient(to top, rgba(20, 15, 12, 0.98), rgba(20, 15, 12, 0.95))',
            borderColor: 'rgba(230, 126, 34, 0.3)',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            paddingTop: '1rem',
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))',
          }}
        >
          <div className="container mx-auto max-w-2xl flex gap-3 px-2">
            {step > 1 && (
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleBack} 
                className="rounded-2xl font-semibold w-14 h-14 p-0 border-2"
                style={{
                  borderColor: 'rgba(230, 126, 34, 0.4)',
                  background: 'rgba(40, 30, 25, 0.8)',
                  color: '#F5F0E8',
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}

            <Button
              size="lg"
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`rounded-2xl font-bold text-base transition-all duration-300 border-0 active:scale-[0.97] ${step > 1 ? "flex-1" : "w-full"}`}
              style={{
                height: "56px",
                background: isStepValid()
                  ? 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)'
                  : 'rgba(230, 126, 34, 0.4)',
                backgroundSize: '200% 100%',
                color: '#FFFFFF',
                boxShadow: isStepValid() ? '0 8px 32px rgba(230, 126, 34, 0.6), 0 0 60px rgba(230, 126, 34, 0.25)' : 'none',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                cursor: isStepValid() ? 'pointer' : 'not-allowed',
              }}
            >
              <Sparkles className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="truncate">Receber meu Mapa Profético</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
