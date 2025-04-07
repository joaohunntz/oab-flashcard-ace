
import React, { useState, useEffect, useRef } from 'react';
import { Flashcard, topicColors } from '../data/flashcards';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FlashcardProps {
  card: Flashcard;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onSwipeUp: () => void;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({
  card,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExitX(200);
    onSwipeRight();
    toast.success("Ótimo! Você já sabe essa questão.");
  };

  const handleDontKnow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExitX(-200);
    onSwipeLeft();
    toast.error("Essa questão voltará para revisão.");
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExitY(-200);
    onSwipeUp();
    toast("Pergunta pulada para depois");
  };

  return (
    <motion.div
      className="flashcard"
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ 
        x: exitX, 
        y: exitY, 
        opacity: 0, 
        rotate: exitX > 0 ? 20 : exitX < 0 ? -20 : 0,
        transition: { duration: 0.5 } 
      }}
      onClick={handleFlip}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute top-4 left-4">
        <Badge variant="outline" className={`${topicColors[card.topic]} px-2 py-1 text-xs`}>
          {card.topic}
        </Badge>
      </div>
      
      <div className="flashcard-content">
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ backfaceVisibility: 'hidden' }}
          className={`absolute inset-6 flex items-center justify-center ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
        >
          <p className="flashcard-question">{card.question}</p>
        </motion.div>
        
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: 0.4 }}
          style={{ backfaceVisibility: 'hidden' }}
          className={`absolute inset-6 flex items-center justify-center ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="flashcard-answer">{card.answer}</p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 mt-4">
        <Button 
          variant="outline"
          size="icon"
          className="action-button bg-red-100 hover:bg-red-200 text-red-600"
          onClick={handleDontKnow}
          title="Não sei"
        >
          <X size={18} />
        </Button>
        
        <Button 
          variant="outline"
          size="icon"
          className="action-button bg-gray-100 hover:bg-gray-200 text-gray-600"
          onClick={handleSkip}
          title="Pular"
        >
          <ArrowRight size={18} />
        </Button>
        
        <Button 
          variant="outline"
          size="icon"
          className="action-button bg-green-100 hover:bg-green-200 text-green-600"
          onClick={handleKnow}
          title="Eu sei"
        >
          <Check size={18} />
        </Button>
      </div>
    </motion.div>
  );
};

export default FlashcardComponent;
