import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";

const DashboardLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useDashboardAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Senha incorreta. Tente novamente.");
      setPassword("");
    }
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
            <Label htmlFor="password" className="text-base font-medium text-text-primary mb-2 block">
              Senha de Acesso
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite a senha"
              className="h-12 rounded-xl text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              autoFocus
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
          >
            Acessar Dashboard
          </Button>

          <p className="text-xs text-center text-text-muted">
            Este painel contém informações sensíveis do negócio.
          </p>
        </form>
      </Card>
    </div>
  );
};

export default DashboardLogin;
