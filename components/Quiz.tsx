
import React, { useState, useEffect } from 'react';
import { EXPERT_DATA, QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  onFinish: (answers: Record<number, string>) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onFinish, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalSteps = QUIZ_QUESTIONS.length;

  const handleAnswer = (option: string) => {
    const newAnswers = { ...answers, [QUIZ_QUESTIONS[currentStep].id]: option };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      startAnalysis(newAnswers);
    }
  };

  const startAnalysis = (finalAnswers: Record<number, string>) => {
    setAnalyzing(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => onFinish(finalAnswers), 800);
      }
    }, 30);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/95 backdrop-blur-md overflow-y-auto">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <h1 className="text-[20vh] font-serif font-bold text-black whitespace-nowrap leading-none transform -rotate-12 translate-y-1/2">
          {EXPERT_DATA.name.toUpperCase()}
        </h1>
      </div>

      <div className="w-full max-w-sm relative z-10 py-8">
        {/* Floating Hero Frame */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4">
             <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full animate-pulse"></div>
             <img 
               src={EXPERT_DATA.images.hero} 
               alt={EXPERT_DATA.name} 
               className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10" 
             />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase">Dra. {EXPERT_DATA.name}</span>
        </div>

        {!analyzing ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Progress */}
            <div className="flex justify-between items-end mb-2">
               <span className="text-[10px] font-bold text-gray-400 uppercase">Pergunta {currentStep + 1} de {totalSteps}</span>
               <span className="text-[10px] font-bold text-[#d4af37]">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-[#d4af37] transition-all duration-500" 
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>

            <h2 className="text-2xl font-serif mb-8 text-center leading-tight">
              {QUIZ_QUESTIONS[currentStep].text}
            </h2>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full py-4 px-6 bg-white border border-gray-100 rounded-xl text-center font-medium text-gray-700 hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-lg transition-all active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>

            <button 
               onClick={onCancel}
               className="mt-10 w-full text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-black"
            >
              Pular para o site &rarr;
            </button>
          </div>
        ) : (
          <div className="text-center animate-in fade-in duration-500">
             <div className="w-full bg-gray-100 h-2 rounded-full mb-4 overflow-hidden max-w-[200px] mx-auto">
                <div 
                  className="h-full bg-[#d4af37] transition-all" 
                  style={{ width: `${progress}%` }}
                ></div>
             </div>
             <p className="text-sm font-bold tracking-widest text-[#d4af37] animate-pulse">ANALISANDO SEU PERFIL...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
