
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Gallery from './Gallery';
import { EXPERT_DATA } from '../constants';

const LandingPage: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // Auto-scroll logic for reviews - Slow & Smooth
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let currentScroll = scrollContainer.scrollLeft;
    const speed = 0.5; // Ajuste para deixar mais lento ou mais rápido

    const step = () => {
      if (!isHovered.current && scrollContainer) {
        currentScroll += speed;
        
        // Verifica se chegou ao fim para resetar (loop)
        // Como duplicamos os itens, o loop fica visualmente infinito
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (currentScroll >= maxScroll) {
          currentScroll = 0;
        }
        
        scrollContainer.scrollLeft = currentScroll;
      } else if (scrollContainer) {
        // Sincroniza a posição interna se o usuário scrollar manualmente
        currentScroll = scrollContainer.scrollLeft;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const handleMouseEnter = () => { isHovered.current = true; };
    const handleMouseLeave = () => { isHovered.current = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicando a lista de reviews para efeito de loop infinito
  const reviewsList = [...EXPERT_DATA.reviews, ...EXPERT_DATA.reviews];

  return (
    <div className="animate-in fade-in duration-1000 bg-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-40 md:pt-48 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-3/5 text-center md:text-left z-10">
              <span className="inline-block text-[#d4af37] font-bold text-xs tracking-[0.4em] uppercase mb-4">Exclusividade & Naturalidade</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.1]">
                Redefinindo a <br />
                <span className="italic">sua melhor versão.</span>
              </h1>
              <p className="text-lg text-gray-500 mb-10 max-w-lg font-light leading-relaxed">
                Olá, eu sou a Dra. Lívia Polli. Minha abordagem une ciência e sensibilidade para entregar resultados que respeitam sua identidade única.
              </p>
              <div className="space-y-4">
                <a 
                  href={EXPERT_DATA.whatsapp}
                  className="inline-flex items-center justify-center w-full md:w-auto py-5 px-12 bg-black text-white font-bold rounded-full hover:bg-[#d4af37] transition-all shadow-2xl group"
                >
                  AGENDAR CONSULTA NO WHATSAPP
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase text-center md:text-left">Sem compromisso • Atendimento VIP</p>
              </div>
            </div>
            
            <div className="w-full md:w-2/5 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-b-[12px] border-[#d4af37]">
                <img src={EXPERT_DATA.images.hero} alt={EXPERT_DATA.name} className="w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO PRESENTATION */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-full md:w-1/2">
               <div className="aspect-[9/16] md:aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black group relative">
                 <video 
                   src={EXPERT_DATA.videoIntro} 
                   autoPlay 
                   muted 
                   loop 
                   playsInline 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
               </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-serif mb-8 leading-snug">Beleza com propósito e técnica apurada.</h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light mb-8 italic">
                "Descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito. Resultados naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial."
              </p>
              <a 
                href={EXPERT_DATA.whatsapp}
                className="inline-block border-b-2 border-black pb-1 font-bold text-sm tracking-widest hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
              >
                SAIBER MAIS SOBRE O MÉTODO &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUEM SOU EU */}
      <section id="sobremim" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-4 mb-12">
               <img src={EXPERT_DATA.images.authority1} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" alt="" />
               <img src={EXPERT_DATA.images.authority2} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg -ml-12" alt="" />
            </div>
            <h2 className="text-4xl font-serif mb-8">Dra. Lívia Polli</h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
              <p>Com formação sólida e um olhar artístico apurado, dedico minha carreira a entregar resultados que não apenas embelezam, mas restauram a autoconfiança.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-8">
                 <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-black mb-2 tracking-wide uppercase text-xs">Acompanhamento VIP</h4>
                    <p className="text-sm">Você terá contato direto comigo durante todo o seu processo de transformação.</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-black mb-2 tracking-wide uppercase text-xs">Inovação Tecnológica</h4>
                    <p className="text-sm">Utilizamos apenas os produtos mais seguros e renomados do mercado mundial.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS - GALERIA PREMIUM */}
      <section id="provasvisual" className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-bold text-xs tracking-[0.5em] uppercase mb-4 block">Portfólio</span>
            <h2 className="text-5xl font-serif mb-4">Resultados Reais</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto uppercase tracking-tighter opacity-50">Resultados variam conforme o organismo. Imagens meramente ilustrativas.</p>
          </div>
          <Gallery images={EXPERT_DATA.results} columns={2} />
        </div>
      </section>

      {/* HARMONIZACAO DE CORACAO */}
      <section id="harmonizacao" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 italic text-[#d4af37]">Harmonização de ❤️</h2>
            <p className="text-gray-500 font-light">Momentos de cuidado e conexão real.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {EXPERT_DATA.deCoracao.map((img, i) => (
               <div key={i} className="group relative overflow-hidden rounded-[2.5rem] shadow-xl">
                  <img src={img} className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - AUTO PASSANDO LENTO E CLICÁVEL */}
      <section className="py-24 bg-[#FAF9F6] overflow-hidden">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl font-serif text-center mb-16 italic">Experiências de quem já viveu a transformação</h2>
           <div 
             ref={scrollRef}
             className="flex overflow-x-auto gap-8 pb-10 no-scrollbar snap-x cursor-grab active:cursor-grabbing"
           >
              {reviewsList.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedReview(img)}
                  className="min-w-[280px] md:min-w-[350px] snap-center bg-white p-2 rounded-[2rem] shadow-lg cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                >
                  <img src={img} className="w-full rounded-[1.8rem]" alt="Review" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Review Lightbox */}
      {selectedReview && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedReview(null)}
        >
          <button className="absolute top-6 right-6 text-white text-3xl font-light hover:text-[#d4af37] transition-colors">&times;</button>
          <img src={selectedReview} alt="Review Zoom" className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
        </div>
      )}

      {/* LOCALIZACAO */}
      <section id="ondevamosnos" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-4xl font-serif mb-6">Onde nos Encontrar</h2>
                   <p className="text-gray-500 mb-8 leading-relaxed">
                     Atendimento exclusivo em ambiente privativo e luxuoso para o seu total conforto.
                   </p>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm">📍</div>
                        <span className="text-sm font-bold">Unidade Premium Dra. Lívia Polli</span>
                      </div>
                      <a 
                        href={EXPERT_DATA.maps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-[#d4af37] font-bold border-b border-[#d4af37] pb-1"
                      >
                        VER ROTA NO MAPS &rarr;
                      </a>
                   </div>
                </div>
                <div className="w-full h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4398144215266!2d-46.66631622377284!3d-23.55234586071066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59cd3e53610b%3A0x6b1076f6b593259b!2sR.%20Bela%20Cintra%2C%20São%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Sua jornada de beleza <br /><span className="text-[#d4af37]">começa agora.</span></h2>
          <a 
            href={EXPERT_DATA.whatsapp}
            className="inline-block py-6 px-16 bg-[#d4af37] text-black font-bold rounded-full text-xl hover:scale-110 transition-transform shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
          >
            QUERO AGENDAR MEU PROCEDIMENTO
          </a>
          <p className="mt-8 text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">Primeira consulta sob agendamento</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-gray-100 text-center">
        <div className="container mx-auto px-6">
           <span className="text-4xl font-serif italic mb-4 block text-[#d4af37]">{EXPERT_DATA.name}</span>
           <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-10">{EXPERT_DATA.profession}</p>
           <div className="flex justify-center gap-8 mb-10">
              <a href={EXPERT_DATA.instagram} className="text-gray-400 hover:text-black font-bold text-xs tracking-widest uppercase transition-colors">Instagram</a>
              <a href={EXPERT_DATA.whatsapp} className="text-gray-400 hover:text-black font-bold text-xs tracking-widest uppercase transition-colors">WhatsApp</a>
           </div>
           <p className="text-[10px] text-gray-300 uppercase tracking-widest">&copy; {new Date().getFullYear()} • Premium Experience Landing Page</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
