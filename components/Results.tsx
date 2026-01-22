
import React from 'react';
import { EXPERT_DATA } from '../constants';

interface ResultsProps {
  answers: Record<number, string>;
  onContinue: () => void;
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ answers, onContinue, onBack }) => {
  const generateWAMessage = (type: 'avaliar' | 'sem_compromisso') => {
    let text = "";
    if (type === 'avaliar') {
      text = `Olá Dra. Lívia! Acabei de fazer o teste de perfil ideal no seu site.\n\nMinhas respostas:\n`;
      Object.entries(answers).forEach(([id, answer]) => {
        text += `- ${answer}\n`;
      });
      text += `\nGostaria de uma avaliação detalhada.`;
    } else {
      text = `Olá Dra. Lívia! Vi seu site e gostaria de tirar algumas dúvidas sobre harmonização, sem compromisso.`;
    }
    return `${EXPERT_DATA.whatsapp}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 opacity-40 grayscale">
         <img src={EXPERT_DATA.images.hero} alt="" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-sm w-full animate-in slide-in-from-bottom-12 duration-1000">
        <div className="bg-[#d4af37] text-black text-[10px] font-bold px-4 py-1 rounded-full inline-block mb-4 tracking-widest uppercase">
          Perfil Compatível
        </div>
        
        <h2 className="text-4xl font-serif text-white mb-4 leading-tight">Você é a Paciente ideal.</h2>
        
        <p className="text-gray-300 text-sm mb-10 leading-relaxed">
          Com base nas suas respostas, o Método da <span className="text-white font-bold">Dra. {EXPERT_DATA.name}</span> consegue entregar exatamente a naturalidade e segurança que você procura.
        </p>

        <div className="space-y-4">
          <a 
            href={generateWAMessage('avaliar')}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 px-6 bg-[#d4af37] text-black font-bold rounded-2xl text-sm shadow-xl animate-pulse hover:scale-105 transition-transform"
          >
            1 - ENVIAR MINHA AVALIAÇÃO À DRA.
          </a>

          <a 
            href={generateWAMessage('sem_compromisso')}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 px-6 border border-[#25D366] text-[#25D366] font-bold rounded-2xl text-sm hover:bg-[#25D366]/10 transition-colors"
          >
            2 - CHAMAR NO WHATSAPP SEM COMPROMISSO
          </a>

          <button 
            onClick={onContinue}
            className="block w-full py-5 px-6 border border-white/20 text-white/60 font-bold rounded-2xl text-sm hover:text-white transition-colors"
          >
            3 - NÃO ENVIAR E CONTINUAR NO SITE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
