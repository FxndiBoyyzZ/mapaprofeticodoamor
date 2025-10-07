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

      // Save contact to Supabase
      if (quizData.nome && quizData.whatsapp) {
        try {
          console.log("💾 Chamando Supabase insert...");
          const { data, error } = await supabase
            .from("contacts")
            .insert([
              {
                name: quizData.nome,
                whatsapp: quizData.whatsapp,
              },
            ])
            .select();

          if (error) {
            console.error("❌ ERRO Supabase:", error);
            console.error("Detalhes do erro:", JSON.stringify(error, null, 2));
          } else {
            console.log("✅ SUCESSO! Contato salvo:", data);
          }
        } catch (error) {
          console.error("💥 EXCEÇÃO ao salvar:", error);
        }
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
    <div className="min-h-screen w-full bg-gradient-to-br from-secondary/20 via-lilac/5 to-secondary/20 pb-24 md:pb-20">
      <QuizProgress currentStep={step} totalSteps={totalSteps} />

      <div className="pt-[70px] px-4">
        <div className="container mx-auto max-w-2xl">
          <Card
            className={`p-4 xs:p-6 md:p-8 shadow-card transition-all duration-150 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
            style={{ backdropFilter: "blur(8px)", background: "rgba(255, 255, 255, 0.95)" }}
          >
            {/* Question 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <Sparkles className="w-8 h-8 text-golden mx-auto mb-2" />
                  <h3 className="text-lg xs:text-xl font-bold text-[#3F3D56] mb-2 leading-tight">
                    ✨ Como é que Deus está escrevendo sua vida amorosa hoje?
                  </h3>
                  <p
                    className="text-sm text-[#7A7A8C] leading-[1.4]"
                    style={{ marginTop: "8px", marginBottom: "16px" }}
                  >
                    Sua resposta moldará a direção profética do seu Mapa.
                    <br />
                    Seja sincero(a): Deus fala com quem abre o coração.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      text: "Solteiro(a), à espera do cumprimento da promessa",
                      icon: Heart,
                      state: "solteiro" as const,
                    },
                    { text: "Em um relacionamento atualmente", icon: Users, state: "relacionamento" as const },
                    { text: "Vivendo um tempo confuso / em dúvida", icon: HelpCircle, state: "confuso" as const },
                    {
                      text: "Desacreditado(a), precisando de direção",
                      icon: HeartCrack,
                      state: "desacreditado" as const,
                    },
                  ].map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = quizData.momento === option.text;
                    return (
                      <button
                        key={option.text}
                        className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-180 border ${
                          isSelected
                            ? "bg-[#F4F0FF] border-[#6C4AB6] border-2 shadow-md animate-option-select"
                            : "bg-white border-[#B69FFF] border-1 hover:border-[#6C4AB6] hover:bg-[#F4F0FF]/30 hover:shadow-sm shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                        }`}
                        onClick={() => setQuizData({ ...quizData, momento: option.text, user_state: option.state })}
                      >
                        <IconComponent
                          className={`w-5 h-5 flex-shrink-0 transition-colors duration-150 ${
                            isSelected ? "text-[#6C4AB6]" : "text-[#3F3D56]"
                          }`}
                        />
                        <span
                          className={`text-base transition-all duration-150 text-left flex-1 ${
                            isSelected ? "text-[#3F3D56] font-bold" : "text-[#3F3D56] font-normal"
                          }`}
                        >
                          {option.text}
                        </span>
                        {isSelected && (
                          <span className="text-[14px]" style={{ opacity: 0.7 }}>
                            ✨
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 2 - Fully personalized based on user_state */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <Sparkles className="w-8 h-8 text-lilac mx-auto mb-2" />
                  {quizData.user_state === "solteiro" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        Como você se sente nesse tempo de espera pelo seu propósito amoroso?
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        Identifique o que mais tem ocupado seus pensamentos e emoções neste período.
                      </p>
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        O que mais pesa no seu coração sobre esse relacionamento?
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        Seja sincero(a). Deus pode trazer clareza quando abrimos o coração.
                      </p>
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        O que mais te deixa em dúvida neste momento?
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed">Identifique o que pesa no seu coração.</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        O que mais te fez perder a fé no amor ou nas promessas de Deus?
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        Escolha o que mais reflete o seu coração hoje.
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-2">
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
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-150 border-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ${
                              isSelected
                                ? "bg-[#F4F0FF] border-[#3F51B5] shadow-md scale-[1.01]"
                                : "bg-white border-[#E2E8F0] hover:border-[#3F51B5]/30 hover:bg-[#F4F0FF]/30 hover:shadow-sm"
                            }`}
                            onClick={() => setQuizData({ ...quizData, user_doubt: option.text })}
                          >
                            <span className="text-xl flex-shrink-0">{option.emoji}</span>
                            <span
                              className={`text-[15px] xs:text-base text-left transition-all duration-150 ${
                                isSelected ? "text-[#1E293B] font-semibold" : "text-[#1E293B] font-medium"
                              }`}
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
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-150 border-2 text-left shadow-[0_2px_8px_rgba(0,0,0,0.05)] ${
                              isSelected
                                ? "bg-[#F4F0FF] border-[#3F51B5] shadow-md scale-[1.01]"
                                : "bg-white border-[#E2E8F0] hover:border-[#3F51B5]/30 hover:bg-[#F4F0FF]/30 hover:shadow-sm"
                            }`}
                            onClick={() => setQuizData({ ...quizData, user_doubt: option.text })}
                          >
                            <span className="text-[18px] leading-none flex-shrink-0 pl-2">{option.emoji}</span>
                            <span
                              className={`text-[15px] xs:text-base transition-all duration-150 ${
                                isSelected ? "text-[#1E293B] font-semibold" : "text-[#1E293B] font-medium"
                              }`}
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
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-150 border-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ${
                              isSelected
                                ? "bg-[#F4F0FF] border-[#3F51B5] shadow-md scale-[1.01]"
                                : "bg-white border-[#E2E8F0] hover:border-[#3F51B5]/30 hover:bg-[#F4F0FF]/30 hover:shadow-sm"
                            }`}
                            onClick={() => setQuizData({ ...quizData, user_doubt: option.text })}
                          >
                            <span className="text-xl flex-shrink-0">{option.emoji}</span>
                            <span
                              className={`text-[15px] xs:text-base text-left transition-all duration-150 ${
                                isSelected ? "text-[#1E293B] font-semibold" : "text-[#1E293B] font-medium"
                              }`}
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
                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-150 border-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ${
                              isSelected
                                ? "bg-[#F4F0FF] border-[#3F51B5] shadow-md scale-[1.01]"
                                : "bg-white border-[#E2E8F0] hover:border-[#3F51B5]/30 hover:bg-[#F4F0FF]/30 hover:shadow-sm"
                            }`}
                            onClick={() => setQuizData({ ...quizData, user_doubt: option.text })}
                          >
                            <span className="text-xl flex-shrink-0">{option.emoji}</span>
                            <span
                              className={`text-[15px] xs:text-base text-left transition-all duration-150 ${
                                isSelected ? "text-[#1E293B] font-semibold" : "text-[#1E293B] font-medium"
                              }`}
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
                <div className="text-center mb-5">
                  <Heart className="w-8 h-8 text-golden mx-auto mb-2" />
                  {quizData.user_state === "solteiro" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        Se Deus fosse escrever uma nova história de amor para você, que qualidades não poderiam faltar?
                      </h3>
                      <p className="text-sm text-[#475569]">
                        Escolha até 3 características que refletem os desejos mais profundos do seu coração.
                      </p>
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        Quais qualidades você mais deseja ver florescendo no relacionamento de vocês?
                      </h3>
                      <p className="text-sm text-[#475569]">
                        Escolha até 3 características que representam o que você acredita que Deus pode fortalecer.
                      </p>
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        Se pudesse alinhar seu relacionamento ao propósito de Deus, quais qualidades seriam essenciais?
                      </h3>
                      <p className="text-sm text-[#475569]">
                        Escolha até 3 características que você gostaria de ver restauradas.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2 leading-tight">
                        Se o amor fosse restaurado por Deus, que características fariam você acreditar novamente?
                      </h3>
                      <p className="text-sm text-[#475569]">
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
                          ${
                            isSelected
                              ? "bg-[#F4F0FF] border-2 border-[#6C4AB6] text-[#3F3D56] font-semibold shadow-[0_4px_12px_rgba(108,74,182,0.15)] scale-[1.02] animate-[scale-in_180ms_ease-out]"
                              : isDisabled
                                ? "bg-white/50 border border-[#B69FFF]/30 text-[#1E293B]/40 cursor-not-allowed opacity-40"
                                : "bg-white border border-[#B69FFF] text-[#3F3D56] hover:bg-[#F4F0FF]/30 hover:border-[#6C4AB6]/50 hover:scale-105 cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_8px_rgba(182,159,255,0.2)]"
                          }
                        `}
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
                    className={`text-sm font-medium transition-all duration-200 ${
                      (quizData.palavrasAmor?.length || 0) === 0
                        ? "text-[#94A3B8]"
                        : (quizData.palavrasAmor?.length || 0) === 3
                          ? "text-[#6C4AB6] font-bold animate-pulse"
                          : "text-[#475569] font-semibold"
                    }`}
                  >
                    {quizData.palavrasAmor && quizData.palavrasAmor.length > 0
                      ? `${quizData.palavrasAmor.length}/3 selecionadas`
                      : "0/3 selecionadas"}
                  </p>
                </div>
              </div>
            )}

            {/* Question 4 - Personalized */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <Book className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-lg xs:text-xl font-bold text-[#1E293B] mb-2.5 leading-tight">
                    Qual promessa pode restaurar seu coração?
                  </h3>
                  <p className="text-sm text-[#475569]">
                    Escolha a promessa que mais fala ao seu coração neste momento. Ela será a base das direções
                    proféticas do seu Mapa.
                  </p>
                </div>

                <div className="space-y-2">
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
                        className={`w-full p-4 rounded-xl flex flex-col gap-1.5 text-left relative transition-all duration-150 ${
                          isSelected
                            ? "bg-[#F4F0FF] border-2 border-[#6C4AB6] shadow-md animate-[verse-select_180ms_ease-out]"
                            : "bg-white border border-[#B69FFF] hover:border-[#6C4AB6]/50 hover:bg-[#F4F0FF]/30 hover:shadow-sm"
                        }`}
                        onClick={() => setQuizData({ ...quizData, versiculo: v.ref })}
                      >
                        {/* Ícone de seleção no canto superior direito */}
                        {isSelected && (
                          <span className="absolute top-2 right-2 text-[14px] opacity-70 animate-fade-in">✨</span>
                        )}

                        <div className="flex items-start justify-between w-full gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg flex-shrink-0">{v.emoji}</span>
                            <span
                              className={`font-serif text-sm xs:text-base transition-all duration-150 ${
                                isSelected ? "font-bold text-[#3F3D56]" : "font-medium text-[#1E293B]"
                              }`}
                            >
                              {v.ref}
                            </span>
                          </div>
                          <span className="text-xs bg-[#6C4AB6]/10 text-[#6C4AB6] px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                            {v.tema}
                          </span>
                        </div>

                        <span
                          className={`text-xs xs:text-sm italic leading-relaxed ml-9 transition-colors duration-150 ${
                            isSelected ? "text-[#3F3D56]" : "text-[#555555]"
                          }`}
                        >
                          "{v.texto}"
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#6C4AB6]/5 rounded-xl p-3 border-l-4 border-[#6C4AB6] mt-4 mb-4">
                  <p className="text-xs text-[#3F3D56]">
                    💡 <strong>Este versículo será a base</strong> das direções proféticas do seu Mapa
                  </p>
                </div>
              </div>
            )}

            {/* Question 5 - Personalized */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <Calendar className="w-8 h-8 text-lilac mx-auto mb-3" />
                  {quizData.user_state === "solteiro" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#3F3D56] mb-2.5 leading-tight">
                        Quanto tempo por dia você está disposto(a) a separar para Deus preparar seu coração?
                      </h3>
                      <p className="text-sm text-[#7A7A8C] leading-relaxed">
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  ) : quizData.user_state === "relacionamento" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#3F3D56] mb-2.5 leading-tight">
                        Quanto tempo por dia você está disposto(a) a separar para Deus trazer clareza?
                      </h3>
                      <p className="text-sm text-[#7A7A8C] leading-relaxed">
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  ) : quizData.user_state === "confuso" ? (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#3F3D56] mb-2.5 leading-tight">
                        Quanto tempo por dia você está disposto(a) a separar para Deus te guiar?
                      </h3>
                      <p className="text-sm text-[#7A7A8C] leading-relaxed">
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg xs:text-xl font-bold text-[#3F3D56] mb-2.5 leading-tight">
                        Quanto tempo por dia você está disposto(a) a separar para Deus restaurar seu coração?
                      </h3>
                      <p className="text-sm text-[#7A7A8C] leading-relaxed">
                        Esse tempo será a base do plano profético personalizado que você receberá.
                      </p>
                    </>
                  )}
                </div>

                <div className="space-y-3.5">
                  {[
                    { text: "5 min", emoji: "⚡" },
                    { text: "10 min", emoji: "🕐" },
                    { text: "15 min", emoji: "⏰" },
                  ].map((option) => {
                    const isSelected = quizData.tempo === option.text;
                    return (
                      <button
                        key={option.text}
                        className={`w-full p-4 rounded-xl flex items-center justify-between gap-3 relative transition-all duration-200 group ${
                          isSelected
                            ? "bg-[#F4F0FF] border-2 border-[#6C4AB6] shadow-[0_4px_16px_rgba(108,74,182,0.15)] scale-[1.01]"
                            : "bg-white border-2 border-[#E2E8F0] hover:border-[#6C4AB6]/40 hover:bg-[#F4F0FF]/20 hover:shadow-[0_2px_12px_rgba(108,74,182,0.08)] hover:scale-[1.005]"
                        }`}
                        onClick={() => setQuizData({ ...quizData, tempo: option.text })}
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
                            className={`text-base transition-all duration-200 ${
                              isSelected ? "text-[#3F3D56] font-bold" : "text-[#1E293B] font-semibold"
                            }`}
                          >
                            {option.text} por dia
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[14px] opacity-70 animate-fade-in flex-shrink-0 drop-shadow-sm">
                            ✨
                          </span>
                        )}
                        {/* Subtle glow effect on selection */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6C4AB6]/5 to-transparent opacity-50 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-gradient-to-r from-[#6C4AB6]/8 to-[#6C4AB6]/4 rounded-xl p-4 border-l-4 border-[#6C4AB6] mt-5 shadow-sm backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-[13px] text-[#3F3D56] leading-relaxed">
                      <strong className="font-bold">Seu compromisso espiritual</strong> moldará cada etapa do seu plano
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Question 6 */}
            {step === 6 && (
              <div className="space-y-6 px-1">
                <div className="text-center mb-6">
                  <Sparkles className="w-10 h-10 text-golden mx-auto mb-4 animate-pulse" />
                  <h2 className="text-xl xs:text-2xl font-bold text-[#3F3D56] mb-3 leading-tight px-2">
                    ✨ Última etapa para receber seu Mapa Profético personalizado 💌
                  </h2>
                  <p className="text-sm xs:text-base text-[#7A7A8C] leading-relaxed mx-auto max-w-[90%]">
                    Preencha abaixo para receber seu Mapa Profético e o Plano Espiritual de 7 dias diretamente no seu
                    WhatsApp.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome" className="text-base font-semibold text-[#3F3D56] mb-2.5 block">
                      Seu primeiro nome
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Ex: Maria"
                      className="h-12 rounded-xl text-base border-2 border-[#D8D8E3] focus:border-[#6C4AB6] focus:ring-2 focus:ring-[#6C4AB6]/20 transition-all duration-200"
                      value={quizData.nome || ""}
                      onChange={(e) => setQuizData({ ...quizData, nome: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="text-base font-semibold text-[#3F3D56] mb-2.5 block">
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
                          className="h-12 rounded-xl text-base border-2 border-[#D8D8E3] focus:border-[#6C4AB6] focus:ring-2 focus:ring-[#6C4AB6]/20 transition-all duration-200"
                        />
                      )}
                    </InputMask>
                    <p className="text-[13px] text-[#7A7A8C] mt-2.5 flex items-center gap-1.5">
                      <span>📩</span>
                      <span>Enviaremos seu Mapa Profético diretamente no WhatsApp.</span>
                    </p>
                  </div>
                </div>

                <div className="bg-[#F4F0FF] rounded-xl p-3.5 border border-[#E5DEFF] shadow-sm">
                  <p className="text-[13px] xs:text-sm text-[#5E5E70] leading-relaxed flex items-start gap-2">
                    <span className="text-base flex-shrink-0 mt-0.5">🔒</span>
                    <span>
                      <strong className="font-bold">Seus dados estão protegidos</strong> — usamos apenas para entregar
                      seu Mapa espiritual com segurança.
                    </span>
                  </p>
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
            <div className="hidden md:flex gap-3 mt-6 pt-4 border-t border-border">
              {step > 1 && (
                <Button variant="outline" size="lg" onClick={handleBack} className="flex-1 rounded-full font-semibold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}

              <Button
                size="lg"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex-1 rounded-xl font-bold text-base transition-all duration-300 ${
                  isStepValid()
                    ? "bg-[#6C4AB6] text-white hover:bg-[#5A3D9A] hover:shadow-[0_0_24px_rgba(108,74,182,0.5)] hover:scale-[1.02] animate-[scale-in_300ms_ease-out]"
                    : "bg-[#6C4AB6]/40 text-white/60 cursor-not-allowed opacity-60"
                }`}
                style={{ height: "52px" }}
              >
                {step === totalSteps ? "✨ Receber meu Mapa Profético Agora" : "Próximo"}
                {step === totalSteps ? null : <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Mobile Footer - Visible only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg p-4 pb-6">
        <div className="container mx-auto max-w-2xl flex gap-2">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={handleBack} className="rounded-full font-semibold w-16">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`rounded-xl font-bold text-base transition-all duration-300 ${step > 1 ? "flex-1" : "w-full"} ${
              isStepValid()
                ? "bg-[#6C4AB6] text-white hover:bg-[#5A3D9A] hover:shadow-[0_0_28px_rgba(108,74,182,0.6)] hover:scale-[1.02] animate-[scale-in_300ms_ease-out]"
                : "bg-[#6C4AB6]/40 text-white/60 cursor-not-allowed opacity-60"
            }`}
            style={{ height: "56px" }}
          >
            {step === totalSteps ? "✨ Receber meu Mapa Profético Agora" : "Próximo"}
            {step === totalSteps ? null : <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
