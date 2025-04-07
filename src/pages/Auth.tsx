
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Book } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está logado
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/home', { replace: true });
    };
    
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
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

      // E-mail está autorizado, fazer login com email/senha
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Login bem-sucedido, redirecionar para /home
      toast({
        title: "Login bem-sucedido",
        description: "Você foi autenticado com sucesso.",
      });
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

  const handleVerifyEmail = async () => {
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
          title: "E-mail não encontrado",
          description: "Este e-mail não está cadastrado em nossa base de dados. Entre em contato para adquirir acesso.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // E-mail verificado, abrir diálogo para criar senha
      setVerifiedEmail(email);
      setShowPasswordDialog(true);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao verificar o e-mail.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Registrar novo usuário com o email verificado
      const { data, error } = await supabase.auth.signUp({
        email: verifiedEmail,
        password,
      });

      if (error) throw error;

      // Senha criada com sucesso
      toast({
        title: "Senha criada com sucesso",
        description: "Agora você pode fazer login com seu e-mail e senha.",
      });
      
      // Fechar o diálogo
      setShowPasswordDialog(false);
      setPassword('');
    } catch (error: any) {
      if (error.message.includes('already registered')) {
        toast({
          title: "E-mail já registrado",
          description: "Este e-mail já possui uma senha cadastrada. Por favor, tente fazer login.",
        });
        setShowPasswordDialog(false);
      } else {
        toast({
          title: "Erro",
          description: error.message || "Ocorreu um erro ao criar a senha.",
          variant: "destructive",
        });
      }
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
          <form className="space-y-6" onSubmit={handleLogin}>
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
                {loading ? 'Processando...' : 'Entrar'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <Button 
              variant="link" 
              className="w-full text-oab-blue" 
              onClick={handleVerifyEmail}
              disabled={loading || !email}
            >
              Já fez sua compra? Crie sua senha
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar senha para {verifiedEmail}</DialogTitle>
            <DialogDescription>
              E-mail verificado com sucesso. Crie sua senha para acessar o aplicativo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePassword} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Nova senha
              </label>
              <div className="mt-1">
                <Input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || password.length < 6}
            >
              {loading ? 'Processando...' : 'Criar senha'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
