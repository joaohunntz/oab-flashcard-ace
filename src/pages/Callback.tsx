import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finalizarLogin = async () => {
      await supabase.auth.getSession(); // lê token da URL
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        navigate('/home'); // ou /categories, /dashboard, etc.
      } else {
        alert('Erro ao autenticar. Link inválido ou expirado.');
        navigate('/auth');
      }
    };

    finalizarLogin();
  }, [navigate]);

  return <p>Verificando login...</p>;
}
