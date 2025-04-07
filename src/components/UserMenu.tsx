
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2">
        <User className="h-4 w-4 text-oab-gold" />
        <span className="text-sm text-gray-600">{user.email}</span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={signOut} 
        className="flex items-center gap-1"
      >
        <LogOut className="h-4 w-4" />
        <span className="md:inline hidden">Sair</span>
      </Button>
    </div>
  );
};

export default UserMenu;
