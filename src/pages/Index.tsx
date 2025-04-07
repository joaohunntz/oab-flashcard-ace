
import React, { useState } from 'react';
import Header from '@/components/Header';
import FlashcardDeck from '@/components/FlashcardDeck';
import TopicFilter from '@/components/TopicFilter';
import Progress from '@/components/Progress';
import { flashcards, Topic } from '@/data/flashcards';

const Index = () => {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  
  const handleTopicToggle = (topic: Topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        <TopicFilter 
          selectedTopics={selectedTopics} 
          onTopicToggle={handleTopicToggle} 
        />
        
        <Progress 
          total={flashcards.length} 
          reviewed={reviewedCount} 
          known={knownCount} 
        />
        
        <FlashcardDeck 
          cards={flashcards} 
          selectedTopics={selectedTopics}
        />
      </main>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            OAB Flashcard Ace - Sua ferramenta de estudo para o Exame da Ordem
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
