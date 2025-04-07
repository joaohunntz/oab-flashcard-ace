
import React, { useState, useEffect } from 'react';
import { Flashcard, Topic } from '../data/flashcards';
import FlashcardComponent from './FlashcardComponent';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface FlashcardDeckProps {
  cards: Flashcard[];
  selectedTopics: Topic[];
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards, selectedTopics }) => {
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<string[]>([]);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [skippedCards, setSkippedCards] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  
  // Apply topic filter
  useEffect(() => {
    let filtered = cards;
    
    if (selectedTopics.length > 0) {
      filtered = cards.filter(card => selectedTopics.includes(card.topic));
    }
    
    setFilteredCards(filtered);
    setCurrentIndex(0);
    setIsFinished(false);
  }, [cards, selectedTopics]);
  
  const handleSwipeRight = () => {
    const currentCard = filteredCards[currentIndex];
    if (currentCard) {
      setReviewedCards(prev => [...prev, currentCard.id]);
      setKnownCards(prev => [...prev, currentCard.id]);
      handleNextCard();
    }
  };
  
  const handleSwipeLeft = () => {
    const currentCard = filteredCards[currentIndex];
    if (currentCard) {
      setReviewedCards(prev => [...prev, currentCard.id]);
      handleNextCard();
    }
  };
  
  const handleSwipeUp = () => {
    const currentCard = filteredCards[currentIndex];
    if (currentCard) {
      setSkippedCards(prev => [...prev, currentCard.id]);
      handleNextCard();
    }
  };
  
  const handleNextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleReset = () => {
    setCurrentIndex(0);
    setIsFinished(false);
    setReviewedCards([]);
    setKnownCards([]);
    setSkippedCards([]);
  };
  
  const handleReviewSkipped = () => {
    if (skippedCards.length > 0) {
      const skippedCardsFull = filteredCards.filter(card => skippedCards.includes(card.id));
      setFilteredCards(skippedCardsFull);
      setSkippedCards([]);
      setCurrentIndex(0);
      setIsFinished(false);
    }
  };
  
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-6">
      {filteredCards.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-oab-blue font-medium mb-4">Nenhum card encontrado para os tópicos selecionados.</p>
          <p className="text-gray-600">Por favor, selecione pelo menos um tópico para começar.</p>
        </div>
      ) : isFinished ? (
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-serif font-bold text-oab-blue mb-4">Parabéns!</h2>
          <p className="text-gray-700 mb-6">
            Você revisou {reviewedCards.length} cartões e acertou {knownCards.length}!
          </p>
          
          <div className="flex flex-col gap-4">
            {skippedCards.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleReviewSkipped}
                className="bg-oab-blue text-white hover:bg-oab-blue/90"
              >
                Revisar {skippedCards.length} Cartões Pulados
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCw size={16} />
              Reiniciar Revisão
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-md aspect-[3/4]">
            <AnimatePresence>
              {filteredCards[currentIndex] && (
                <FlashcardComponent
                  key={filteredCards[currentIndex].id}
                  card={filteredCards[currentIndex]}
                  onSwipeRight={handleSwipeRight}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeUp={handleSwipeUp}
                />
              )}
            </AnimatePresence>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            Cartão {currentIndex + 1} de {filteredCards.length}
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardDeck;
