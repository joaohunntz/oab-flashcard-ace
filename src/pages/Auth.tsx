
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Book } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está logado
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/home', { replace: true });
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verificar se o e-mail está na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .single();

      if (userError || !userData) {
        toast({
          title: "Acesso negado",
          description: "Seu e-mail não está autorizado a acessar este aplicativo.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // E-mail está autorizado, realizar autenticação direta
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Não criar usuários novos
        }
      });

      if (error) throw error;

      toast({
        title: "Login realizado com sucesso",
        description: "Você será redirecionado para a página inicial.",
      });

      // Redirecionar para a página home após login bem-sucedido
      navigate('/home', { replace: true });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro durante a autenticação.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Book className="h-12 w-12 text-oab-gold" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-oab-blue">
          OAB Flashcard Ace
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Acesse sua conta
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleAuth}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Acessar aplicativo'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
