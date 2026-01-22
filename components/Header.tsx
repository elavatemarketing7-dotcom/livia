
import React, { useState, useEffect, useRef } from 'react';
import { EXPERT_DATA } from '../constants';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll logic for mobile sub-nav (Logradouro superior)
  useEffect(() => {
    const scrollContainer = navScrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let currentScroll = scrollContainer.scrollLeft;
    const speed = 0.3; // Extremamente suave e devagar

    const step = () => {
      if (!isHovered.current && scrollContainer) {
        currentScroll += speed;
        
        // Loop infinito: quando chega na metade (já que duplicamos os itens), volta pro zero
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (currentScroll >= maxScroll) {
          currentScroll = 0;
        }
        
        scrollContainer.scrollLeft = currentScroll;
      } else if (scrollContainer) {
        currentScroll = scrollContainer.scrollLeft;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const handleTouchStart = () => { isHovered.current = true; };
    const handleTouchEnd = () => { isHovered.current = false; };

    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    scrollContainer.addEventListener('mouseenter', handleTouchStart);
    scrollContainer.addEventListener('mouseleave', handleTouchEnd);
    
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('mouseenter', handleTouchStart);
      scrollContainer.removeEventListener('mouseleave', handleTouchEnd);
    };
  }, []);

  const navItems = [
    { label: "Sobre Mim", id: "sobremim" },
    { label: "Resultados", id: "provasvisual" },
    { label: "Harmonização", id: "harmonizacao" },
    { label: "Onde Estamos", id: "ondevamosnos" }
  ];

  // Duplicando itens para o efeito de loop infinito no marquee
  const extendedNavItems = [...navItems, ...navItems];

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'glass py-3 shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Exclusiva */}
        <div className="flex items-center">
          <a href="#" className="group flex flex-col items-start leading-none">
            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-[#d4af37] font-bold mb-0.5">Dra.</span>
            <span className="font-serif text-xl md:text-2xl tracking-tighter text-black flex items-baseline">
              Lívia <span className="italic font-medium ml-1.5 text-gray-800">Polli</span>
              <span className="w-1 h-1 bg-[#d4af37] rounded-full ml-1"></span>
            </span>
          </a>
        </div>
        
        <div className="flex items-center gap-2 md:gap-8">
          {/* Navegação principal - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-black transition-colors whitespace-nowrap relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Botão de Agendamento */}
          <a 
            href={EXPERT_DATA.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-6 md:px-10 bg-black text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#d4af37] hover:text-black transition-all shadow-xl active:scale-95"
          >
            AGENDAR
          </a>
        </div>
      </div>
      
      {/* Logradouro Superior (Mobile) - Auto Passando Devagar */}
      <div 
        ref={navScrollRef}
        className="lg:hidden flex overflow-x-auto gap-10 px-6 py-3 bg-white/60 backdrop-blur-md border-t border-gray-100 no-scrollbar select-none"
      >
        {extendedNavItems.map((item, i) => (
          <a 
            key={`${item.id}-${i}`} 
            href={`#${item.id}`} 
            className="whitespace-nowrap text-[9px] font-black tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors active:text-[#d4af37]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
