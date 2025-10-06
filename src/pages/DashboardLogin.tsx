import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";

const DashboardLogin = () => {
  const [email, setEmail] = useState("admin@profetico.com");
  const [password, setPassword] = useState("profetico2024");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdminAuth();
  const { toast } = useToast();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!loading && isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Email ou senha incorretos.");
      setIsLoading(false);
      return;
    }

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: isAdminUser, error: roleError } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'admin' });
      
      if (roleError || !isAdminUser) {
        setError("Você não tem permissão para acessar o dashboard.");
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      navigate("/dashboard", { replace: true });
    }
    
    setIsLoading(false);
  };

  const handleRegisterAdmin = async () => {
    setIsRegistering(true);
    setError("");

    // Sign up user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError("Erro ao criar usuário: " + signUpError.message);
      setIsRegistering(false);
      return;
    }

    if (signUpData.user) {
      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ user_id: signUpData.user.id, role: 'admin' });

      if (roleError) {
        setError("Erro ao adicionar role de admin.");
        setIsRegistering(false);
        return;
      }

      toast({
        title: "Admin criado com sucesso!",
        description: "Faça login para acessar o dashboard.",
      });
    }

    setIsRegistering(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/5 to-lilac/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-primary mb-2">Dashboard Analytics</h1>
          <p className="text-sm text-text-muted">Acesso restrito para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-base font-medium text-text-primary mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="h-12 rounded-xl text-base"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-base font-medium text-text-primary mb-2 block">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="h-12 rounded-xl text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl" role="alert">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 rounded-full font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              "Acessar Dashboard"
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-text-muted mb-3">
              Este painel contém informações sensíveis do negócio.
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRegisterAdmin}
              disabled={isRegistering}
              className="text-xs"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  Criando admin...
                </>
              ) : (
                "Criar primeiro admin (admin@profetico.com)"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DashboardLogin;
