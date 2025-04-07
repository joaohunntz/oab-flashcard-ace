
import React from 'react';
import { Topic, topicColors } from '../data/flashcards';
import { Check } from 'lucide-react';

interface TopicFilterProps {
  selectedTopics: Topic[];
  onTopicToggle: (topic: Topic) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({ selectedTopics, onTopicToggle }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <h3 className="font-serif text-lg font-medium text-oab-blue mb-3">Filtrar por Tópicos</h3>
      <div className="flex flex-wrap gap-2">
        {Object.values(Topic).map(topic => {
          const isSelected = selectedTopics.includes(topic);
          const baseClasses = `${topicColors[topic]} px-3 py-1 rounded-full text-sm font-medium 
                              cursor-pointer transition-all duration-200 flex items-center gap-1`;
          const selectedClasses = isSelected 
            ? 'ring-2 ring-offset-1 ring-blue-500' 
            : 'opacity-70 hover:opacity-100';
            
          return (
            <button
              key={topic}
              className={`${baseClasses} ${selectedClasses}`}
              onClick={() => onTopicToggle(topic)}
            >
              {isSelected && <Check size={14} className="inline-block" />}
              <span>{topic}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicFilter;
