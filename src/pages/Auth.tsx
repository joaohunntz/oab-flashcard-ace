
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
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está logado
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/home', { replace: true });
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
        .maybeSingle();

      if (userError || !userData) {
        toast({
          title: "Acesso negado",
          description: "Seu e-mail não está autorizado a acessar este aplicativo.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // E-mail está autorizado, enviar magic link para autenticação
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Não criar usuários novos
          emailRedirectTo: 'https://oab-flashcard-ace.vercel.app/callback',
        }
      });

      if (error) throw error;

      // Informar o usuário que o magic link foi enviado
      setMagicLinkSent(true);
      toast({
        title: "Magic Link enviado",
        description: "Verifique seu e-mail para fazer login no aplicativo.",
      });
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
          {magicLinkSent ? (
            <div className="space-y-6 text-center">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Magic Link enviado!
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Verifique seu e-mail {email} e clique no link enviado para fazer login.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                type="button"
                className="w-full"
                onClick={() => setMagicLinkSent(false)}
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
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
                  {loading ? 'Enviando...' : 'Enviar link de acesso'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
