
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Book } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está logado
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/');
    };
    
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Fluxo de cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // Verificar se o e-mail está na tabela users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select()
          .eq('email', email)
          .single();

        if (userError || !userData) {
          // Se o e-mail não estiver na tabela, fazer logout e mostrar erro
          await supabase.auth.signOut();
          toast({
            title: "Acesso negado",
            description: "Seu e-mail não está autorizado a acessar este aplicativo.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Cadastro realizado",
            description: "Verifique seu e-mail para confirmar o cadastro.",
          });
        }
      } else {
        // Fluxo de login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Verificar se o e-mail está na tabela users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select()
          .eq('email', email)
          .single();

        if (userError || !userData) {
          // Se o e-mail não estiver na tabela, fazer logout e mostrar erro
          await supabase.auth.signOut();
          toast({
            title: "Acesso negado",
            description: "Seu e-mail não está autorizado a acessar este aplicativo.",
            variant: "destructive",
          });
        } else {
          // Usuário está na tabela, redirecionar para a página principal
          navigate('/');
          toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo ao OAB Flashcard Ace!",
          });
        }
      }
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
          {isSignUp ? 'Crie sua conta' : 'Acesse sua conta'}
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <button
              type="button"
              className="text-sm text-oab-blue hover:text-oab-blue/80 w-full text-center"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
