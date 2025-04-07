
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Book } from 'lucide-react';

const CreatePassword = () => {
  const navigate = useNavigate();

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
          Novo método de acesso
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Acesso via Magic Link</h3>
            <p className="mt-4 text-sm text-gray-600">
              Agora você pode acessar o sistema através de um link mágico enviado para seu e-mail.
              Não é mais necessário criar ou lembrar de senhas.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Basta inserir seu e-mail e clicar no link que enviaremos para você.
            </p>

            <div className="mt-8">
              <Button 
                className="w-full"
                onClick={() => navigate('/auth')}
              >
                Ir para página de login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
