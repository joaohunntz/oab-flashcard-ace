
import React from 'react';
import { Progress as ProgressBar } from '@/components/ui/progress';

interface ProgressProps {
  total: number;
  reviewed: number;
  known: number;
}

const Progress: React.FC<ProgressProps> = ({ total, reviewed, known }) => {
  const percentageReviewed = Math.round((reviewed / total) * 100);
  const percentageKnown = Math.round((known / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-oab-blue">Progresso</span>
        <span className="text-sm font-medium text-oab-blue">{percentageReviewed}%</span>
      </div>
      <ProgressBar value={percentageReviewed} className="h-2" />
      
      <div className="flex justify-between mt-4 mb-1">
        <span className="text-sm font-medium text-green-600">Você sabe</span>
        <span className="text-sm font-medium text-green-600">{known} de {total} ({percentageKnown}%)</span>
      </div>
      <ProgressBar value={percentageKnown} className="h-2 bg-gray-200 [&>div]:bg-green-500" />
    </div>
  );
};

export default Progress;
