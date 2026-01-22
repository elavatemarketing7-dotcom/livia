
import React, { useState } from 'react';
import { AppFlow } from './types';
import { EXPERT_DATA } from './constants';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [flow, setFlow] = useState<AppFlow>(AppFlow.INTRO);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleStartQuiz = () => setFlow(AppFlow.QUIZ);
  const handleGoToSite = () => setFlow(AppFlow.MAIN_SITE);
  
  const handleQuizFinish = (quizAnswers: Record<number, string>) => {
    setAnswers(quizAnswers);
    setFlow(AppFlow.RESULTS);
  };

  if (flow === AppFlow.INTRO) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden font-serif">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={EXPERT_DATA.images.hero} 
            alt="" 
            className="w-full h-full object-cover object-[center_25%] opacity-30 grayscale brightness-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        </div>

        {/* Floating Decorative Elements - Minimalist */}
        <div className="absolute top-5 left-5 w-20 h-20 border border-[#d4af37]/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-40 h-40 border border-[#d4af37]/5 rounded-full"></div>

        <div className="z-10 max-w-xs w-full space-y-4 md:space-y-6 animate-in fade-in zoom-in duration-1000">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-20 rounded-full"></div>
            <img 
              src={EXPERT_DATA.images.hero} 
              alt={EXPERT_DATA.name} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-2 border-[#d4af37]/50 mb-2 object-cover object-[center_20%] shadow-[0_0_40px_rgba(212,175,55,0.2)] relative z-10"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-1">Exclusive Experience</span>
            <h1 className="text-white text-4xl md:text-5xl mb-2 leading-tight tracking-tight">
              Dra. <span className="italic">{EXPERT_DATA.name}</span>
            </h1>
            <div className="w-8 h-[1px] bg-[#d4af37] mx-auto mb-4"></div>
            <p className="text-gray-400 font-sans text-[11px] uppercase tracking-[0.2em] max-w-[250px] mx-auto leading-relaxed">
              Harmonização Facial • Cirurgiã Dentista <br/> 
              <span className="opacity-60">Excelência em Naturalidade</span>
            </p>
          </div>
          
          <div className="space-y-3 pt-4 font-sans">
            <button 
              onClick={handleStartQuiz}
              className="group relative w-full py-4 px-8 bg-[#d4af37] text-black font-black rounded-full overflow-hidden transition-all active:scale-95 shadow-[0_15px_30px_rgba(212,175,55,0.15)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 text-[11px] tracking-widest uppercase flex items-center justify-center gap-2">
                Iniciar Avaliação Privada
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </button>
            
            <button 
              onClick={handleGoToSite}
              className="w-full py-4 px-8 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-[11px] tracking-widest uppercase active:scale-95"
            >
              Conhecer o Método
            </button>

            <a 
              href={EXPERT_DATA.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[#25D366] font-bold text-[10px] tracking-[0.2em] uppercase hover:underline"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar via WhatsApp
            </a>
          </div>
        </div>

        {/* Footer info - Compact */}
        <div className="absolute bottom-6 left-0 w-full text-center">
           <p className="text-gray-600 text-[9px] tracking-[0.3em] uppercase font-sans">Private Aesthetic • 2024</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      {flow === AppFlow.QUIZ && (
        <Quiz onFinish={handleQuizFinish} onCancel={() => setFlow(AppFlow.INTRO)} />
      )}
      
      {flow === AppFlow.RESULTS && (
        <Results 
          answers={answers} 
          onContinue={() => setFlow(AppFlow.MAIN_SITE)} 
          onBack={() => setFlow(AppFlow.INTRO)}
        />
      )}

      {flow === AppFlow.MAIN_SITE && (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
