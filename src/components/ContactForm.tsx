import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  whatsapp: z.string().trim().min(10, "WhatsApp inválido").max(20, "WhatsApp inválido"),
});

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate input
      const validated = contactSchema.parse({ name, whatsapp });
      
      setIsSubmitting(true);
      
      // Insert into database
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: validated.name,
          whatsapp: validated.whatsapp
        }]);

      if (error) throw error;

      toast.success("Contato enviado com sucesso!");
      setName("");
      setWhatsapp("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Erro ao enviar contato. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nome
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          required
          maxLength={100}
        />
      </div>
      
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
          WhatsApp
        </label>
        <Input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="(00) 00000-0000"
          required
          maxLength={20}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar Contato"}
      </Button>
    </form>
  );
};
