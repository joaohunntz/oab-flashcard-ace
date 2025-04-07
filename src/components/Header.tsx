
import React from 'react';
import { Book } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-center px-4">
        <div className="flex items-center">
          <Book className="h-8 w-8 text-oab-gold mr-3" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-oab-blue">OAB Flashcard Ace</h1>
            <p className="text-sm text-gray-500">Seu assistente para a prova da OAB</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
