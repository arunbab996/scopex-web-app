import React, { useState, useEffect } from 'react';

// --- CSS FOR SCROLLBARS, INPUTS, AND ANIMATIONS ---
const styles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] { -moz-appearance: textfield; }

  @keyframes slideUpFade {
    0% { transform: translateY(40px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideUpSheet {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0); }
  }
  @keyframes confettiFall {
    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  /* BRIGHT NEON PULSE WITH NEW BRAND BLUE */
  @keyframes neonPulse {
    0%, 100% { 
        box-shadow: 0 0 0 0 rgba(0, 38, 255, 0); 
        border-color: #e0e7ff; 
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 25px 8px rgba(0, 38, 255, 0.8), inset 0 0 10px 2px rgba(0, 38, 255, 0.15); 
        border-color: #0026FF; 
        background-color: #f0f5ff;
        transform: scale(1.02);
    }
  }
  
  .animate-slide-up {
    opacity: 0;
    animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-sheet-up {
    animation: slideUpSheet 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-fade-in {
    opacity: 0;
    animation: fadeIn 0.3s ease-out forwards;
  }
  .animate-neon-pulse {
    animation: neonPulse 1s ease-in-out 3; /* Pulses 3 times brightly */
  }
  .confetti-piece {
    position: absolute;
    top: -20px;
    z-index: 9999;
    animation: confettiFall linear forwards;
  }
`;

// --- CONFETTI COMPONENT ---
const Confetti = () => {
    const colors = ['#0026FF', '#FF4E50', '#22C55E', '#FFD700', '#A855F7', '#FF7A00'];
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
            {[...Array(60)].map((_, i) => {
                const randomLeft = Math.random() * 100 + "%";
                const randomDuration = (Math.random() * 2 + 1.5) + "s";
                const randomDelay = (Math.random() * 0.2) + "s";
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                return (
                    <div 
                        key={i} 
                        className="confetti-piece w-2.5 h-4 rounded-sm"
                        style={{
                            left: randomLeft,
                            backgroundColor: randomColor,
                            animationDuration: randomDuration,
                            animationDelay: randomDelay
                        }} 
                    />
                );
            })}
        </div>
    );
};

// --- DYNAMIC FONT SIZING ---
const getDynamicFontSize = (value) => {
  const len = value ? value.toString().length : 0;
  if (len > 11) return 'text-[20px]';
  if (len > 9) return 'text-[28px]';
  if (len > 7) return 'text-[36px]';
  return 'text-[44px]'; 
};

// --- ICONS ---
const Icons = {
  Signal: () => <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="4.5" y="5.5" width="3" height="6.5" rx="1" /><rect x="9" y="3" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="12" rx="1" /></svg>,
  Wifi: () => <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><path d="M8.883 12C9.65 12 10.266 11.383 10.266 10.616C10.266 9.85 9.65 9.233 8.883 9.233C8.116 9.233 7.5 9.85 7.5 10.616C7.5 11.383 8.116 12 8.883 12Z" /><path d="M4.683 7.55C6.966 5.266 10.766 5.266 13.083 7.55C13.4 7.866 13.916 7.866 14.233 7.55C14.55 7.233 14.55 6.716 14.233 6.4C11.283 3.45 6.516 3.45 3.533 6.4C3.216 6.716 3.216 7.233 3.533 7.55C3.85 7.866 4.366 7.866 4.683 7.55Z" /><path d="M1.366 4.233C5.516 0.083 12.283 0.083 16.4 4.233C16.716 4.55 17.233 4.55 17.55 4.233C17.866 3.916 17.866 3.4 17.55 3.083C12.766 -1.7 4.966 -1.7 0.216 3.083C-0.100 3.4 -0.100 3.916 0.216 4.233C0.533 4.55 1.05 4.55 1.366 4.233Z" /></svg>,
  Battery: () => <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeWidth="1" /><rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" /><path d="M23.5 4.5C24.328 4.5 25 5.172 25 6C25 6.828 24.328 7.5 23.5 7.5V4.5Z" fill="currentColor" /></svg>,
  XClose: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Promo: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M15 9l-6 6"></path><circle cx="9" cy="9" r="0.5" fill="currentColor"></circle><circle cx="15" cy="15" r="0.5" fill="currentColor"></circle></svg>,
  Bank: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>,
  Receipt: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="12" y2="14"></line><line x1="8" y1="18" x2="16" y2="18"></line></svg>,
  ArrowDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>,
  WalletLine: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M22 10H18C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14H22"></path></svg>,
  BuildingBank: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="5 6 12 3 19 6"></polyline><line x1="4" y1="10" x2="4" y2="21"></line><line x1="20" y1="10" x2="20" y2="21"></line><line x1="8" y1="14" x2="8" y2="17"></line><line x1="12" y1="14" x2="12" y2="17"></line><line x1="16" y1="14" x2="16" y2="17"></line></svg>,
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  InfoCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

const NavIcons = {
  Home: ({ active }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Wallet: ({ active }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  Transfers: ({ active }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Rate: ({ active }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
};

const SidebarIcons = {
  Chat: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
  Gear: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Doc: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
};

const TopNavBar = ({ onMenuOpen }) => (
  <div className="flex justify-between items-center text-white pt-[54px] pb-4 px-6 relative z-30">
      <div onClick={onMenuOpen} className="w-10 h-10 rounded-full flex items-center justify-center border border-white/30 bg-white/10 shadow-sm backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <div className="flex gap-3">
          <button className="flex items-center gap-1.5 bg-white/15 px-3.5 py-2 rounded-full text-[12px] font-semibold border border-white/20 backdrop-blur-sm transition-colors hover:bg-white/25">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Help
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/15 backdrop-blur-sm cursor-pointer hover:bg-white/25 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </div>
      </div>
  </div>
);

// --- FULL SCREEN SPLASH COMPONENT ---
const SplashScreen = () => (
    <div className="absolute inset-0 z-[200] animate-fade-in bg-[#0026FF]">
        <img 
            src="/IMG_1402.jpg" 
            alt="ScopeX Splash" 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.style.display='none'; }} 
        />
    </div>
);

// --- STRICT NATIVE APP WRAPPER (CENTERED & AUTO-SCALING) ---
const AppFrame = ({ children, currentScreen, setScreen, isMenuOpen, setIsMenuOpen, overlayActive, isSplash }) => {
  const showFooter = !isSplash && currentScreen !== 'onboarding' && currentScreen !== 'send';
  
  // Calculate dynamic scale to ensure phone frame always fits perfectly on laptops
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // 852px phone height + 28px border = 880px total expected height
        // Scale it down to fit 95% of the user's viewport height for clean margins
        const availableHeight = window.innerHeight * 0.95;
        const newScale = Math.min(1, availableHeight / 880);
        setScale(newScale);
      } else {
        setScale(1); // Standard scale on native mobile phones
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="fixed inset-0 w-full bg-[#e2e8f0] md:flex md:items-center md:justify-center font-sans select-none overflow-hidden">
        
        {/* MOBILE DEVICE CONTAINER */}
        <div 
            className="w-full h-full md:h-[852px] md:w-[393px] md:border-[14px] md:border-black md:rounded-[50px] md:shadow-2xl bg-black relative overflow-hidden flex flex-col shrink-0"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          
          {/* STATIC STATUS BAR */}
          <div className={`absolute top-0 w-full h-[47px] z-[250] pointer-events-none flex items-end justify-between px-8 pb-[10px] transition-colors duration-300 ${isSplash ? 'text-white' : 'text-black'}`}>
              <span className="text-[15px] font-semibold tracking-wide">9:41</span>
              <div className="hidden md:block absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[35px] bg-black rounded-full z-[70] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                  <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#141414] rounded-full ring-[1px] ring-[#222] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full"></div>
                  </div>
                  <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#111] rounded-full"></div>
              </div>
              <div className="flex items-center gap-[5px] mb-0.5">
                  <Icons.Signal /><Icons.Wifi /><Icons.Battery />
              </div>
          </div>

          {/* APP SCREENS */}
          {isSplash ? <SplashScreen /> : (
            <>
              <div className={`flex-1 w-full h-full bg-white relative ${overlayActive ? 'z-[100]' : 'z-0'}`}>
                {children}
              </div>
              
              {/* FROZEN BOTTOM NAV */}
              {showFooter && (
                <div className={`absolute bottom-4 md:bottom-6 inset-x-0 mx-auto w-[90%] bg-white/95 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-2.5 flex justify-between items-end border border-gray-100/50 backdrop-blur-xl transition-all duration-300 ${overlayActive ? 'opacity-0 translate-y-10 pointer-events-none z-0' : 'opacity-100 translate-y-0 z-[90]'}`}>
                    <NavItem icon={NavIcons.Home} label="Home" active={currentScreen === 'home'} onClick={() => setScreen('home')} />
                    <NavItem icon={NavIcons.Wallet} label="Wallet" active={currentScreen === 'wallet'} onClick={() => setScreen('wallet')} />
                    
                    <div 
                        onClick={() => setScreen('send')} 
                        className="-mt-12 bg-white p-1.5 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    >
                        <div className="w-14 h-14 bg-blue-100 text-[#0026FF] rounded-full flex items-center justify-center text-2xl font-bold border-[3px] border-white shadow-lg">
                            ₹
                        </div>
                    </div>
                    
                    <NavItem icon={NavIcons.Transfers} label="Transfers" active={currentScreen === 'transfers'} onClick={() => setScreen('transfers')} showBadge={true} />
                    <NavItem icon={NavIcons.Rate} label="Rate" active={currentScreen === 'rate'} onClick={() => setScreen('rate')} />
                </div>
              )}

              {/* DRAWER MENU */}
              <div 
                  className={`absolute inset-0 bg-black/50 z-[95] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                  onClick={() => setIsMenuOpen(false)}
              ></div>
              
              <div className={`absolute top-0 left-0 bottom-0 w-[82%] max-w-[320px] bg-white z-[100] flex flex-col shadow-2xl overflow-hidden rounded-r-[2.5rem] transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                  <div className="bg-[#0026FF] pt-[60px] pb-8 px-6 rounded-br-[3.5rem] text-white relative shadow-inner">
                      <div onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center mb-6 cursor-pointer hover:bg-white/20 transition-colors">
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                          <img src="/gavin.jpg" alt="Gavin Belson" className="w-14 h-14 rounded-full border-[2px] border-white object-cover shadow-md bg-white" />
                          <div>
                              <h2 className="text-[17px] font-bold leading-tight">Gavin Belson</h2>
                              <p className="text-blue-200 text-[11px] mt-0.5">Logged in</p>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex-1 bg-white py-5 px-3 flex flex-col gap-1">
                      <SidebarItem icon={<SidebarIcons.Chat />} text="Help center" />
                      <SidebarItem icon={<SidebarIcons.Gear />} text="Settings" />
                      <SidebarItem icon={<SidebarIcons.Doc />} text="Terms & policies" />
                  </div>
              </div>
            </>
          )}

          <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-[120] opacity-30 pointer-events-none"></div>

        </div>
      </div>
    </>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick, showBadge }) => (
    <div onClick={onClick} className={`relative flex flex-col items-center gap-1.5 w-12 cursor-pointer transition-colors ${active ? 'text-[#0026FF]' : 'text-[#94A3B8] hover:text-gray-600'}`}>
        <Icon active={active} />
        <span className="text-[10px] font-bold tracking-wide">{label}</span>
        {showBadge && (
            <div className="absolute -top-1 -right-2 bg-[#FF4E50] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                NEW
            </div>
        )}
    </div>
);

const SidebarItem = ({ icon, text }) => (
    <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors text-gray-800">
        <div className="text-gray-500">{icon}</div>
        <span className="font-semibold text-[14px]">{text}</span>
    </div>
);

// --- DATA LISTS ---
const purposesList = [
  { id: 'family', title: 'Family', desc: 'Send to loved ones', icon: '❤️', color: 'bg-[#FF4E50]' },
  { id: 'rent', title: 'Rent / EMI', desc: 'Property payment', icon: '🏠', color: 'bg-[#0026FF]' },
  { id: 'savings', title: 'Savings', desc: 'Nest egg', icon: '💰', color: 'bg-[#22C55E]' },
  { id: 'emergency', title: 'Emergency', desc: 'Rainy day', icon: '🛡️', color: 'bg-[#A855F7]' }
];

const payeesList = [
  { id: 'mom', name: 'Mom', type: 'avatar', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mom&backgroundColor=ffdfbf', account: '•••• 1234', color: 'bg-pink-100' },
  { id: 'hdfc', name: 'HDFC Bank', type: 'bank', img: '/hdfc.png', account: '•••• 4829', color: 'bg-white border border-gray-100' },
  { id: 'sbi', name: 'SBI', type: 'bank', img: '/sbi.png', account: '•••• 9102', color: 'bg-white border border-gray-100' }
];

const fundingSourcesList = [
  { id: 'wallet', name: 'ScopeX Wallet', balance: '€ 2405', icon: '💳', color: 'bg-blue-50 text-[#0026FF]' },
  { id: 'n26', name: 'N26', balance: '€ 1240', img: '/n26.png', color: 'bg-white border border-gray-100' },
  { id: 'db', name: 'Deutsche Bank', balance: '€ 8500', img: '/deutsche.png', color: 'bg-white border border-gray-100' }
];

// --- SCREEN 1: ONBOARDING ---
const OnboardingScreen = ({ onNext }) => (
  <div className="h-full w-full overflow-y-auto no-scrollbar flex flex-col relative bg-gradient-to-br from-[#FF6B3D] to-[#FF4E50] text-white">
    <div className="pt-24 px-6 text-center z-10">
      <div className="flex justify-center items-center gap-2 mb-8 opacity-90">
           <span className="font-bold text-2xl tracking-tight">Scope<span className="opacity-80">X</span></span>
      </div>
      <h1 className="text-[34px] font-bold leading-none mb-2">Send <span className="text-[#FFD700]">more rupees</span></h1>
      <h1 className="text-[34px] font-bold leading-tight mb-4">Spend <span className="text-[#a3ffa3]">less euros</span></h1>
      <p className="text-white/90 text-[15px] px-8 leading-relaxed">That's more money reaching your loved ones</p>
    </div>
    <div className="flex-1 flex items-center justify-center relative z-0 mt-6 mb-12">
      <div className="w-60 h-60 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(180,83,9,0.3)] relative border-[6px] border-white/20">
          <span className="text-[120px] leading-none filter drop-shadow-md">🐖</span>
          <div className="absolute -top-4 -right-2 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg font-bold text-yellow-700 animate-bounce">€</div>
          <div className="absolute top-12 -left-6 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg font-bold text-yellow-700 animate-bounce delay-100">₹</div>
      </div>
    </div>
    <div className="bg-gradient-to-b from-white to-[#fff5f0] rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10">
      <div className="space-y-6 mb-8 text-gray-900">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl shrink-0">🚫</div>
              <div><p className="font-bold text-[15px]">0% Fees</p><p className="text-gray-500 text-xs">on all transactions forever</p></div>
          </div>
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl shrink-0">⚡</div>
              <div><p className="font-bold text-[15px]">25 Paisa</p><p className="text-gray-500 text-xs">better than Google rates</p></div>
          </div>
      </div>
      <button onClick={onNext} className="w-full py-4 bg-[#0026FF] text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-transform">Get Started</button>
    </div>
  </div>
);

// --- SCREEN 2: HOME ---
const HomeScreen = ({ onMenuOpen, setScreen, setGlobalSendAmount }) => {
  const [eurAmount, setEurAmount] = useState("1000");
  const [isCompareOpen, setIsCompareOpen] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [showNeon, setShowNeon] = useState(true);

  // Stop neon pulse after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowNeon(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fxRate = 107.65; 
  const numericEur = parseFloat(eurAmount) || 0;
  
  const scopexInr = numericEur * fxRate;
  const skrillInr = numericEur * (fxRate - 0.3); 
  const wiseInr = numericEur * (fxRate - 0.5);   
  const extraAmount = scopexInr - wiseInr;

  const inrFormatted = scopexInr > 0 ? scopexInr.toLocaleString('en-IN', {maximumFractionDigits: 0}) : '0';

  return (
    <div className="h-full w-full relative flex flex-col font-sans animate-slide-up bg-[#f8f9fa]">
      <div className="sticky top-0 z-[60] bg-[#0026FF] -mt-[1px] shrink-0">
        <TopNavBar onMenuOpen={onMenuOpen} />
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px] relative">
          <div className="bg-[#0026FF] h-20 relative z-0 -mt-[1px]"></div>

          <div className="px-5 -mt-14 relative z-10">
            <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF004D] rounded-2xl p-6 text-white shadow-[0_10px_20px_rgba(255,0,77,0.2)] h-[140px] relative overflow-hidden flex flex-col justify-center">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 text-white">
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l4-4 4 4-4 4z" /><path d="M12 12l4-4 4 4-4 4z" /></svg>
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-90 mb-1 drop-shadow-sm">Your Wallet Balance</p>
                    <h2 className="text-[42px] font-bold tracking-tight drop-shadow-md">€ 2405</h2>
                </div>
            </div>
          </div>

          {/* FEATURE DISCOVERY BANNER (With Bright Neon Pulse) */}
          <div className="px-5 mt-5 mb-4 relative z-20">
              <div onClick={() => setScreen('transfers')} className={`bg-white border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${showNeon ? 'animate-neon-pulse border-[#0026FF]' : 'border-blue-100 shadow-[0_4px_15px_rgba(0,38,255,0.06)] hover:shadow-[0_6px_20px_rgba(0,38,255,0.12)]'}`}>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl shadow-inner border border-blue-100">🗓️</div>
                      <div>
                          <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-gray-900 text-[14px]">Money Planner</h3>
                              <span className="bg-[#FF4E50] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">New</span>
                          </div>
                          <p className="text-gray-500 text-[11px] leading-tight mt-0.5">Automate your monthly transfers</p>
                      </div>
                  </div>
                  <div className="text-[#0026FF] font-bold">
                      <Icons.ArrowLeft className="rotate-180" />
                  </div>
              </div>
          </div>

          <div className="relative z-20 mt-8">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-[75%] h-12 bg-white rounded-t-[30px] shadow-[0_-5px_15px_rgba(0,0,0,0.03)]"></div>
            <div className="bg-white rounded-t-[32px] px-6 pt-5 pb-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] relative min-h-[460px]">
              
              <div className="absolute -top-1 left-0 right-0 flex justify-center z-30 pointer-events-none transition-all duration-300">
                  <span className="text-[#0026FF] text-[11px] font-extrabold tracking-tight flex items-center gap-1 bg-white px-2 rounded">
                      Sent <span className="text-[#FF4E50] transition-all duration-300">₹{extraAmount > 0 ? extraAmount.toLocaleString('en-IN', {maximumFractionDigits: 0}) : '0'} Extra</span> with ScopeX till date!
                  </span>
              </div>

              <div className="w-full border-b border-gray-100 mt-6 mb-6"></div>

              <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight">1 EUR = {fxRate} INR</h3>
                  <span className="bg-[#0026FF] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-2.5 h-2.5 border border-white rounded-full flex items-center justify-center"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span></span> 
                      Live
                  </span>
              </div>
              <p className="text-[12px] text-gray-400 font-medium mb-6">
                  25 paise better than <span className="font-bold"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></span> Rates
              </p>

              <div className={`flex items-center justify-between mb-6 relative p-3 -mx-3 rounded-2xl transition-colors duration-300 ${isFocused ? 'bg-blue-50/50 ring-1 ring-blue-100' : ''}`}>
                  <div className="flex-1 max-w-[45%]">
                      <label className="text-gray-500 text-[12px] mb-1 block">You send</label>
                      <input 
                          type="number"
                          value={eurAmount}
                          onChange={(e) => setEurAmount(e.target.value)}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className={`${getDynamicFontSize(eurAmount)} font-bold text-gray-800 leading-none tracking-tighter w-full bg-transparent border-none outline-none focus:ring-0 p-0 m-0 transition-all`}
                          placeholder="0"
                      />
                      <div className="text-gray-400 text-[12px] font-bold mt-1 tracking-wide">EUR</div>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 flex flex-col items-center">
                      <div className="w-px h-full bg-gray-100"></div>
                      <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-white text-gray-300 z-10 shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                  </div>

                  <div className="text-right flex-1 max-w-[45%]">
                      <label className="text-gray-500 text-[12px] mb-1 block">Recipient gets</label>
                      <div className={`${getDynamicFontSize(inrFormatted)} font-bold text-[#0026FF] leading-none tracking-tighter truncate transition-all duration-300`}>
                          {inrFormatted}
                      </div>
                      <div className="text-gray-400 text-[12px] font-bold mt-1 tracking-wide">INR</div>
                  </div>
              </div>

              <div className="w-full border-t border-dashed border-gray-200 mb-5"></div>

              <div className="mb-6">
                  <div 
                      className="flex justify-between items-center mb-4 cursor-pointer"
                      onClick={() => setIsCompareOpen(!isCompareOpen)}
                  >
                      <span className="text-[11px] font-bold text-gray-500 transition-all">
                          Sending <span className="text-[#FF4E50]">₹{extraAmount > 0 ? extraAmount.toLocaleString('en-IN', {maximumFractionDigits: 0}) : '0'} Extra</span> only with ScopeX
                      </span>
                      <span className="text-[11px] font-bold text-[#0026FF] flex items-center gap-1">
                          Compare 
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${isCompareOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                      </span>
                  </div>
                  
                  <div className={`space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${isCompareOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="flex items-center gap-3">
                          <div className="w-12 flex justify-center text-[#0026FF]"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l4-4 4 4-4 4z" /><path d="M12 12l4-4 4 4-4 4z" /></svg></div>
                          <div className="flex-1 bg-gradient-to-r from-[#4A6BFF] to-[#0026FF] rounded-r-full h-[30px] flex items-center justify-between px-4 shadow-[0_4px_10px_rgba(0,38,255,0.2)]">
                              <span className="text-white text-[12px] font-bold tracking-wide">₹ {scopexInr.toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
                              <span className="text-white text-[10px] font-bold">₹{extraAmount.toLocaleString('en-IN', {maximumFractionDigits:0})} ↑</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-3 -mt-1">
                          <div className="w-12 text-center text-[12px] font-bold text-[#94A3B8]">Skrill</div>
                          <div className="w-[85%] bg-[#CBD5E1] rounded-r-full h-[26px] flex items-center justify-between px-4">
                              <span className="text-white text-[11px] font-bold tracking-wide">₹ {skrillInr > 0 ? skrillInr.toLocaleString('en-IN', {maximumFractionDigits:0}) : '0'}</span>
                              <span className="text-white text-[10px] font-medium">₹200 ↓</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-3 -mt-1">
                          <div className="w-12 text-center text-[12px] font-bold italic text-[#94A3B8]">Wise</div>
                          <div className="w-[75%] bg-[#E2E8F0] rounded-r-full h-[26px] flex items-center justify-between px-4">
                              <span className="text-[#64748B] text-[11px] font-bold tracking-wide">₹ {wiseInr > 0 ? wiseInr.toLocaleString('en-IN', {maximumFractionDigits:0}) : '0'}</span>
                              <span className="text-[#94A3B8] text-[10px] font-medium">₹0 ↓</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* GRAB THE AMOUNT AND GO TO SEND SCREEN */}
              <button 
                  onClick={() => {
                      if (setGlobalSendAmount) setGlobalSendAmount(eurAmount);
                      setScreen('send');
                  }}
                  className="w-full bg-[#0026FF] text-white font-bold text-[17px] py-3.5 rounded-[18px] shadow-[0_8px_20px_rgba(0,38,255,0.25)] hover:shadow-[0_12px_25px_rgba(0,38,255,0.35)] active:scale-[0.98] transition-all">
                  Send Money
              </button>
              <p className="text-center text-[#0026FF] text-[10px] font-semibold mt-3">Should arrive in 30 mins</p>
              
            </div>
          </div>
      </div>
    </div>
  );
};

// --- SCREEN 3: SEND MONEY ---
const SendScreen = ({ onClose, setOverlayActive, initialSendAmount }) => {
  // Init with the amount passed from Home screen
  const [eurAmount, setEurAmount] = useState(initialSendAmount || "");
  const [activeSheet, setActiveSheet] = useState(null); 

  const fxRate = 107.65;
  const numericEur = parseFloat(eurAmount) || 0;
  const inrAmount = numericEur * fxRate;
  const extraAmount = numericEur * 2.0704; 
  const inrFormatted = inrAmount > 0 ? inrAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00';

  useEffect(() => {
    setOverlayActive(!!activeSheet);
    return () => setOverlayActive(false);
  }, [activeSheet, setOverlayActive]);

  return (
      <div className="h-full w-full relative flex flex-col font-sans animate-fade-in bg-white">
          
          <div className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-50 -mt-[1px] shrink-0">
              <div className="flex justify-between items-center px-6 pt-[54px] pb-4 relative z-10">
                  <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-800 transition-colors">
                      <Icons.XClose />
                  </button>
                  <h1 className="text-[17px] font-bold text-gray-900">Send money</h1>
                  <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF004D] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M4 12l4-4 4 4-4 4z" /><path d="M12 12l4-4 4 4-4 4z" /></svg>
                      <span className="text-white font-bold text-[12px]">€0</span>
                  </div>
              </div>
          </div>

          <div className={`flex-1 overflow-y-auto no-scrollbar pb-[100px] px-6 mt-4 ${activeSheet ? 'overflow-hidden' : ''}`}>
              <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[18px] font-extrabold text-gray-900 tracking-tight">1 EUR = {fxRate} INR</h3>
                  <span className="bg-[#0026FF] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Live
                  </span>
              </div>
              <p className="text-[12px] text-gray-400 font-medium mb-8">
                  25 paise better than <span className="font-bold"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></span> rates
              </p>

              <div className="flex justify-between items-end pb-4 relative">
                  <div className="shrink-0 w-24">
                      <label className="text-gray-500 text-[13px] block mb-1">You send</label>
                      <span className="text-[28px] font-bold text-gray-900">EUR</span>
                  </div>
                  <input 
                      type="number"
                      value={eurAmount}
                      onChange={(e) => setEurAmount(e.target.value)}
                      className={`${getDynamicFontSize(eurAmount)} text-right font-bold text-gray-800 w-full bg-transparent border-none outline-none focus:ring-0 p-0 tracking-tighter transition-all`}
                      placeholder="0"
                  />
              </div>

              <div className="relative flex items-center justify-center my-2">
                  <div className="w-full border-t border-dashed border-gray-200"></div>
                  <div className="absolute w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-300 shadow-sm">
                      <Icons.ArrowDown />
                  </div>
              </div>

              <div className="flex justify-between items-end pt-4 mb-10">
                  <div className="shrink-0 w-24">
                      <label className="text-gray-500 text-[13px] block mb-1">Recipient gets</label>
                      <span className="text-[28px] font-bold text-gray-900">INR</span>
                  </div>
                  <div className={`${getDynamicFontSize(inrFormatted)} text-right font-bold text-[#0026FF] w-full truncate tracking-tighter transition-all`}>
                      {inrFormatted}
                  </div>
              </div>

              <div className="space-y-2 mb-8">
                  <OptionRow 
                      icon={<Icons.Promo/>} title="Got a promo code?" subtitle="Unlock bonus" btnText="Add" 
                      onClick={() => {}} 
                  />
                  <OptionRow 
                      icon={<Icons.Bank/>} title="Paying with" subtitle="Bank transfer" btnText="Change" 
                      onClick={() => setActiveSheet('payment')} 
                  />
                  <OptionRow 
                      icon={<Icons.Receipt/>} title="Transfer breakdown" subtitle={`1 EUR = ${fxRate} INR | 0% Fees`} btnText="View" 
                      onClick={() => setActiveSheet('breakdown')} 
                  />
              </div>

              <div className="flex justify-between items-center mb-6">
                  <span className="text-[12px] font-medium text-gray-500">
                      Sending <span className="text-[#FF4E50] font-bold">₹{extraAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} extra</span> only with ScopeX
                  </span>
                  <span className="text-[12px] font-bold text-[#0026FF] flex items-center gap-1 cursor-pointer">
                      Compare <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  </span>
              </div>

              <button className="w-full bg-[#0026FF] text-white font-bold text-[17px] py-4 rounded-[16px] shadow-[0_8px_20px_rgba(0,38,255,0.25)] hover:shadow-[0_12px_25px_rgba(0,38,255,0.35)] active:scale-[0.98] transition-all">
                  Send money
              </button>
              <p className="text-center text-[#0026FF] text-[11px] font-medium mt-4 opacity-80">Should arrive in 24 hours</p>
          </div>

          {/* ABSOLUTE OVERLAY TO PHONE SHELL */}
          {activeSheet && (
              <div className="absolute inset-0 z-[999] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={() => setActiveSheet(null)}></div>
                  
                  <div className="bg-white rounded-t-3xl pt-6 pb-10 px-6 relative z-10 animate-sheet-up shadow-2xl max-h-[85vh] flex flex-col">
                      <div className="flex justify-between items-start mb-6 shrink-0">
                          <div>
                              <h2 className="text-[18px] font-bold text-gray-900">
                                  {activeSheet === 'payment' ? 'Select a payment method' : 'Transfer breakdown'}
                              </h2>
                              <p className="text-gray-400 text-[13px] mt-0.5">
                                  {activeSheet === 'payment' ? 'Choose how you want to make the transfer' : 'Transparent breakdown for peace of mind'}
                              </p>
                          </div>
                          <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                              <Icons.XClose />
                          </button>
                      </div>

                      <div className="overflow-y-auto no-scrollbar pb-4 flex-1">
                          {activeSheet === 'payment' && (
                              <div className="space-y-4">
                                  <div className="border border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-gray-200 transition-colors">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><Icons.WalletLine /></div>
                                          <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF004D] px-2.5 py-1 rounded-full flex items-center gap-1">
                                              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M4 12l4-4 4 4-4 4z" /><path d="M12 12l4-4 4 4-4 4z" /></svg>
                                              <span className="text-white font-bold text-[10px]">€0</span>
                                          </div>
                                      </div>
                                      <h4 className="font-semibold text-gray-500 text-[15px]">Wallet transfer</h4>
                                      <p className="text-gray-400 text-[12px] leading-snug mt-1">Send directly from your wallet<br/>Reaches your recipient in 30 mins to 12 hours.</p>
                                  </div>

                                  <div className="border border-blue-200 bg-[#F5F8FF] rounded-2xl p-4 cursor-pointer relative overflow-hidden">
                                      <div className="w-8 h-8 rounded-lg bg-[#0026FF] text-white flex items-center justify-center mb-2">
                                          <Icons.BuildingBank />
                                      </div>
                                      <h4 className="font-bold text-gray-900 text-[15px]">Bank transfer</h4>
                                      <p className="text-gray-400 text-[12px] leading-snug mt-1">Transfer to ScopeX via your bank<br/>Reaches your recipient in 30 mins to 3 days.</p>
                                  </div>

                                  <button className="w-full bg-[#0026FF] text-white font-bold py-4 rounded-[16px] mt-6 active:scale-[0.98] transition-transform" onClick={() => setActiveSheet(null)}>
                                      Save payment method
                                  </button>
                              </div>
                          )}

                          {activeSheet === 'breakdown' && (
                              <div className="space-y-4">
                                  <BreakdownRow label="You send exactly" value={`€${numericEur}`} />
                                  <BreakdownRow label="ScopeX adds (Promo)" info value="€0" />
                                  <BreakdownRow label="Our Fees" info value="✨ €0" isHighlight />
                                  <BreakdownRow label="We convert" info value={`€${numericEur}`} />
                                  <BreakdownRow label="ScopeX only rate" info value={`1 EUR = ${fxRate} INR`} boldValue />
                                  <div className="border-t border-dashed border-gray-200 my-2"></div>
                                  <div className="flex justify-between items-center text-gray-900">
                                      <span className="text-[15px] font-medium text-gray-500">Your total</span>
                                      <span className="text-[20px] font-bold">₹ {inrFormatted}</span>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

const OptionRow = ({ icon, title, subtitle, btnText, onClick }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 pb-4">
      <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              {icon}
          </div>
          <div>
              <p className="text-gray-500 text-[11px] leading-tight mb-0.5">{title}</p>
              <p className="text-gray-900 font-bold text-[13px] leading-tight">{subtitle}</p>
          </div>
      </div>
      <button onClick={onClick} className="text-[#0026FF] bg-[#F0F4FF] font-bold text-[12px] px-4 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
          {btnText}
      </button>
  </div>
);

const BreakdownRow = ({ label, info, value, isHighlight, boldValue }) => (
    <div className="flex justify-between items-center">
        <span className="text-[14px] text-gray-400 flex items-center gap-1.5">
            {label}
            {info && <Icons.InfoCircle />}
        </span>
        <span className={`text-[14px] ${isHighlight ? 'text-[#FF7A00] font-bold' : boldValue ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>
            {value}
        </span>
    </div>
);

// --- SCREEN 4: RATE SCREEN ---
const RateScreen = ({ setScreen }) => {
  const [activeTab, setActiveTab] = useState('1D');
  const [dailyOn, setDailyOn] = useState(false);
  const [weeklyOn, setWeeklyOn] = useState(false);

  return (
      <div className="h-full w-full relative flex flex-col font-sans animate-slide-up">
        
        <div className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-50 -mt-[1px] shrink-0">
          <div className="flex items-center px-6 pt-[54px] pb-4 relative z-10">
              <div 
                  onClick={() => setScreen('home')} 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors text-gray-700"
              >
                  <Icons.ArrowLeft />
              </div>
              <h1 className="text-lg font-bold text-gray-900 ml-4 tracking-wide">Rate alerts</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar bg-white pb-[100px]">
            <div className="text-center mt-6 px-6">
                <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">1 EUR = 107.51 INR</h2>
                <div className="text-[13px] font-medium mt-1 flex justify-center items-center gap-2">
                    <span className="text-[#22C55E]">+0.01%</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400">+0.01</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400">Past 1 day</span>
                </div>
            </div>

            <div className="px-6 mt-8 relative h-[140px] flex">
                <div className="flex flex-col justify-between text-[10px] font-medium text-gray-400 h-full pr-3 pb-4 relative z-10">
                    <span>108.00</span>
                    <span>106.00</span>
                    <span>104.00</span>
                    <span>102.00</span>
                </div>
                <div className="flex-1 relative border-b border-gray-100 h-[calc(100%-16px)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0026FF]/20 to-transparent"></div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,5 Q10,7 20,4 T40,8 T60,5 T80,7 T100,5" fill="none" stroke="#0026FF" strokeWidth="1.5" />
                    </svg>
                </div>
            </div>

            <div className="flex justify-between px-6 mt-5">
                {['1D', '1W', '1M', '3M', '1Y', '5Y'].map((time) => (
                    <button 
                        key={time} 
                        onClick={() => setActiveTab(time)}
                        className={`px-[16px] py-1.5 text-[12px] font-bold rounded-full transition-colors ${activeTab === time ? 'bg-[#0026FF] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        {time}
                    </button>
                ))}
            </div>

            <div className="px-6 mt-10 space-y-6 pb-10">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setDailyOn(!dailyOn)}>
                    <div>
                        <h3 className="text-[15px] font-semibold text-gray-900">Daily Updates</h3>
                        <p className="text-[13px] text-gray-500 mt-0.5">Rate update at desired time of the day</p>
                    </div>
                    <div className={`w-[44px] h-[26px] rounded-full relative transition-colors duration-300 ease-in-out ${dailyOn ? 'bg-[#0026FF]' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${dailyOn ? 'translate-x-[18px]' : 'translate-x-0'}`}></div>
                    </div>
                </div>
                <div className="border-t border-dashed border-gray-200"></div>

                <div className="flex justify-between items-center cursor-pointer" onClick={() => setWeeklyOn(!weeklyOn)}>
                    <div>
                        <h3 className="text-[15px] font-semibold text-gray-900">Weekly Updates</h3>
                        <p className="text-[13px] text-gray-500 mt-0.5">Rate update on the desired day of the week</p>
                    </div>
                    <div className={`w-[44px] h-[26px] rounded-full relative transition-colors duration-300 ease-in-out ${weeklyOn ? 'bg-[#0026FF]' : 'bg-gray-200'}`}>
                        <div className={`absolute left-1 top-1 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${weeklyOn ? 'translate-x-[18px]' : 'translate-x-0'}`}></div>
                    </div>
                </div>
                <div className="border-t border-dashed border-gray-200"></div>

                <div className="flex justify-between items-center">
                    <div className="w-[75%]">
                        <h3 className="text-[15px] font-semibold text-gray-900">Threshold alerts</h3>
                        <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">Get notification when EUR - INR hits a desired exchange rate</p>
                    </div>
                    <div className="w-12 h-12 bg-[#0026FF] rounded-full flex items-center justify-center text-white text-2xl font-light shadow-md cursor-pointer hover:bg-blue-700 transition-colors">
                        +
                    </div>
                </div>
                <div className="border-t border-dashed border-gray-200"></div>

                <div className="text-gray-400 text-[13px] pt-1 pb-6 cursor-pointer hover:text-gray-600 transition-colors inline-block">
                    Notification settings
                </div>
            </div>
        </div>
      </div>
  );
};

// --- SUB-SCREENS ---
const WalletScreen = ({ onMenuOpen }) => (
  <div className="h-full w-full relative flex flex-col font-sans animate-slide-up">
    <div className="sticky top-0 z-[60] bg-[#0026FF] -mt-[1px] shrink-0">
        <TopNavBar onMenuOpen={onMenuOpen} />
    </div>
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#f8f9fa] pb-[100px] relative">
        <div className="bg-[#0026FF] pb-8 pt-2 px-6 rounded-b-[2rem] relative z-0 -mt-[1px]">
            <h1 className="text-3xl font-extrabold text-white">Your Wallet</h1>
        </div>
        <div className="px-5 -mt-6 relative z-10">
            <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF004D] rounded-2xl p-6 text-white shadow-[0_10px_20px_rgba(255,0,77,0.2)] h-[140px] relative overflow-hidden flex flex-col justify-center">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 text-white">
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l4-4 4 4-4 4z" /><path d="M12 12l4-4 4 4-4 4z" /></svg>
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-90 mb-1 drop-shadow-sm">Your Wallet Balance</p>
                    <h2 className="text-[42px] font-bold tracking-tight drop-shadow-md">€ 2405</h2>
                </div>
            </div>
        </div>
        <div className="mt-8 px-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Recent Transactions</h3>
                <p className="text-gray-500 text-sm text-center py-4">No recent wallet activity.</p>
            </div>
        </div>
    </div>
  </div>
);

// --- SCREEN 5: TRANSFERS & MONEY PLANNER ---
const TransfersScreen = ({ onMenuOpen, setScreen, setOverlayActive, plannerState, setPlannerState }) => {
  const [flowState, setFlowState] = useState(plannerState.isActive ? 'idle' : 'idle'); 
  const [activeSheet, setActiveSheet] = useState(null); 
  
  const [localPlan, setLocalPlan] = useState({
      allocations: plannerState.allocations || {},
      selectedPurposes: plannerState.selectedPurposes || [],
      currencyLock: plannerState.currencyLock || 'EUR',
      payees: plannerState.payees || {},
      fundingSource: plannerState.fundingSource || 'wallet',
      planFreq: plannerState.planFreq || 'Monthly',
      planExec: plannerState.planExec || 'Smart',
      customDay: plannerState.customDay || '1st',
  });

  useEffect(() => {
    setOverlayActive(!!activeSheet);
    return () => setOverlayActive(false);
  }, [activeSheet, setOverlayActive]);

  const togglePurpose = (id) => {
      setLocalPlan(prev => {
          if (prev.selectedPurposes.includes(id)) {
              const newAlloc = {...prev.allocations};
              delete newAlloc[id];
              return { ...prev, allocations: newAlloc, selectedPurposes: prev.selectedPurposes.filter(p => p !== id) };
          } else {
              return { 
                  ...prev, 
                  allocations: {...prev.allocations, [id]: ""}, 
                  payees: {...prev.payees, [id]: 'mom'}, 
                  selectedPurposes: [...prev.selectedPurposes, id] 
              };
          }
      });
  };

  const handleAllocationChange = (id, val) => {
      setLocalPlan(prev => ({...prev, allocations: {...prev.allocations, [id]: val}}));
  };

  const totalAmount = Object.values(localPlan.allocations).reduce((sum, val) => sum + (Number(val) || 0), 0);

  if (flowState === 'purpose') {
      return (
          <div className="h-full w-full relative flex flex-col font-sans animate-fade-in bg-white">
             <div className="sticky top-0 z-[60] bg-white border-b border-gray-100 -mt-[1px] shrink-0">
                 <div className="flex items-center px-6 pt-[54px] pb-4 relative z-10">
                     <div onClick={() => setFlowState('idle')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                         <Icons.ArrowLeft />
                     </div>
                     <h1 className="text-lg font-bold text-gray-900 ml-4">Money Planner</h1>
                 </div>
             </div>
             
             <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px] px-6 mt-6">
                <h2 className="text-[22px] font-extrabold text-gray-900 mb-6 leading-tight">What are you setting up a plan for?</h2>
                <div className="grid grid-cols-2 gap-4">
                   {purposesList.map(p => (
                      <div key={p.id} onClick={() => togglePurpose(p.id)} className={`p-4 rounded-2xl border-2 transition-colors cursor-pointer flex flex-col items-start gap-3 ${localPlan.selectedPurposes.includes(p.id) ? 'border-[#0026FF] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                         <div className="flex justify-between w-full items-start">
                             <div className="text-3xl">{p.icon}</div>
                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${localPlan.selectedPurposes.includes(p.id) ? 'border-[#0026FF] bg-[#0026FF]' : 'border-gray-300'}`}>
                                 {localPlan.selectedPurposes.includes(p.id) && <Icons.Check />}
                             </div>
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-900 text-[14px] leading-tight">{p.title}</h4>
                             <p className="text-gray-500 text-[11px] mt-1 leading-snug">{p.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
                
                <div className="mt-8">
                    <button disabled={localPlan.selectedPurposes.length === 0} onClick={() => setFlowState('setup')} className="w-full bg-[#0026FF] text-white font-bold text-[16px] py-4 rounded-[16px] disabled:opacity-50 active:scale-95 transition-all">
                        Continue
                    </button>
                </div>
             </div>
          </div>
      );
  }

  if (flowState === 'setup') {
      const activeTitles = localPlan.selectedPurposes.map(id => purposesList.find(p => p.id === id).title).join(' & ');
      return (
          <div className="h-full w-full relative flex flex-col font-sans animate-fade-in bg-white">
             <div className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-100 -mt-[1px] shrink-0">
                 <div className="flex items-center px-6 pt-[54px] pb-4 relative z-10">
                     <div onClick={() => setFlowState('purpose')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                         <Icons.ArrowLeft />
                     </div>
                     <h1 className="text-lg font-bold text-gray-900 ml-4">Plan setup</h1>
                 </div>
             </div>
             
             <div className={`flex-1 overflow-y-auto no-scrollbar pb-[100px] px-6 mt-6 ${activeSheet ? 'overflow-hidden' : ''}`}>
                
                <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                    <button onClick={() => setLocalPlan({...localPlan, currencyLock: 'EUR'})} className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors ${localPlan.currencyLock === 'EUR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Lock send amount (EUR)</button>
                    <button onClick={() => setLocalPlan({...localPlan, currencyLock: 'INR'})} className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors ${localPlan.currencyLock === 'INR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Lock receive amount (INR)</button>
                </div>

                <div className="space-y-6 mb-8">
                    {localPlan.selectedPurposes.map(id => {
                        const p = purposesList.find(x => x.id === id);
                        const selectedPayee = payeesList.find(x => x.id === localPlan.payees[id]);
                        
                        return (
                            <div key={id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{p.icon}</span>
                                        <h4 className="font-bold text-gray-900 text-[15px]">{p.title}</h4>
                                    </div>
                                    
                                    <div onClick={() => setActiveSheet({ type: 'payee', purposeId: id })} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 text-[10px] font-bold ${selectedPayee.color}`}>
                                            {selectedPayee.img ? <img src={selectedPayee.img} className="w-full h-full object-cover" /> : selectedPayee.icon}
                                        </div>
                                        <span className="text-[12px] font-bold text-gray-700">{selectedPayee.name}</span>
                                        <Icons.ArrowDown />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 font-bold text-[24px]">{localPlan.currencyLock === 'EUR' ? '€' : '₹'}</span>
                                    <input 
                                        type="number" 
                                        value={localPlan.allocations[id]} 
                                        onChange={e => handleAllocationChange(id, e.target.value)} 
                                        className={`${getDynamicFontSize(localPlan.allocations[id])} bg-transparent outline-none text-right w-full font-bold text-gray-900 tracking-tighter ml-2 transition-all`} 
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mb-6">
                    <label className="text-gray-900 text-[14px] font-bold block mb-3">Frequency</label>
                    <div className="flex flex-wrap gap-2">
                        {['Monthly', 'Quarterly', 'One-time', 'Custom'].map(freq => (
                            <button key={freq} onClick={() => setLocalPlan({...localPlan, planFreq: freq})} className={`flex-1 min-w-[30%] py-2.5 text-[13px] font-bold rounded-xl border-2 transition-colors ${localPlan.planFreq === freq ? 'bg-[#0026FF] text-white border-[#0026FF]' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'}`}>
                                {freq}
                            </button>
                        ))}
                    </div>
                    {localPlan.planFreq === 'Custom' && (
                        <div className="mt-3 bg-blue-50 p-4 rounded-xl flex items-center justify-between border border-blue-100">
                            <span className="text-[13px] text-gray-700 font-bold">Transfer day</span>
                            <div onClick={() => setActiveSheet({ type: 'day' })} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-blue-200 cursor-pointer">
                                <span className="text-[#0026FF] font-bold text-[13px]">{localPlan.customDay}</span>
                                <Icons.ArrowDown />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label className="text-gray-900 text-[14px] font-bold block mb-3">Pay from</label>
                    {(() => {
                        const selectedSrc = fundingSourcesList.find(x => x.id === localPlan.fundingSource);
                        return (
                            <div onClick={() => setActiveSheet({ type: 'funding' })} className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 font-bold text-[13px] ${selectedSrc.color}`}>
                                        {selectedSrc.img ? <img src={selectedSrc.img} className="w-full h-full object-contain p-1" /> : selectedSrc.icon}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900 text-[13px] leading-tight">{selectedSrc.name}</div>
                                        <div className="text-gray-500 text-[11px] mt-0.5">Bal: {selectedSrc.balance}</div>
                                    </div>
                                </div>
                                <Icons.ArrowDown />
                            </div>
                        )
                    })()}
                </div>

                <div className="mb-8">
                    <label className="text-gray-900 text-[14px] font-bold block mb-3">Execution preference</label>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setLocalPlan({...localPlan, planExec: 'Smart'})} className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all ${localPlan.planExec === 'Smart' ? 'border-[#0026FF] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="font-bold text-gray-900 text-[14px] flex items-center gap-1.5">Smart Auto <span className="text-yellow-500">✨</span></div>
                            <div className="text-gray-500 text-[12px] mt-0.5 leading-snug">We will execute the transfer on the day with the best rate within your chosen week.</div>
                        </button>
                        <button onClick={() => setLocalPlan({...localPlan, planExec: 'Auto'})} className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all ${localPlan.planExec === 'Auto' ? 'border-[#0026FF] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="font-bold text-gray-900 text-[14px]">Send automatically</div>
                            <div className="text-gray-500 text-[12px] mt-0.5 leading-snug">Funds are pulled and sent precisely on the due date.</div>
                        </button>
                        <button onClick={() => setLocalPlan({...localPlan, planExec: 'Notify'})} className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all ${localPlan.planExec === 'Notify' ? 'border-[#0026FF] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="font-bold text-gray-900 text-[14px]">Notify me first</div>
                            <div className="text-gray-500 text-[12px] mt-0.5 leading-snug">We will prompt you to manually approve the transfer.</div>
                        </button>
                    </div>
                </div>

                <button disabled={totalAmount === 0} onClick={() => setFlowState('review')} className="w-full bg-[#0026FF] text-white font-bold text-[16px] py-4 rounded-[16px] disabled:opacity-50 active:scale-95 transition-all">
                    Review plan
                </button>
             </div>

             {/* ABSOLUTE OVERLAYS FOR SETUP */}
             {activeSheet && (
              <div className="absolute inset-0 z-[999] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={() => setActiveSheet(null)}></div>
                  <div className="bg-white rounded-t-3xl pt-6 pb-10 px-6 relative z-10 animate-sheet-up shadow-2xl max-h-[85vh] flex flex-col">
                      
                      <div className="flex justify-between items-start mb-6 shrink-0">
                          <h2 className="text-[18px] font-bold text-gray-900">
                              {activeSheet.type === 'payee' ? 'Select Payee' : activeSheet.type === 'funding' ? 'Select Funding Source' : 'Select Day'}
                          </h2>
                          <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                              <Icons.XClose />
                          </button>
                      </div>

                      <div className="overflow-y-auto no-scrollbar pb-4 space-y-3 flex-1">
                          {activeSheet.type === 'payee' && payeesList.map(payee => (
                              <div key={payee.id} onClick={() => { setLocalPlan({...localPlan, payees: {...localPlan.payees, [activeSheet.purposeId]: payee.id}}); setActiveSheet(null); }} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#0026FF] cursor-pointer transition-colors">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 font-bold text-[18px] ${payee.color}`}>
                                      {payee.img ? <img src={payee.img} className="w-full h-full object-cover" /> : payee.icon}
                                  </div>
                                  <div>
                                      <div className="font-bold text-gray-900 text-[15px]">{payee.name}</div>
                                      <div className="text-gray-400 text-[12px] mt-0.5">{payee.account}</div>
                                  </div>
                              </div>
                          ))}

                          {activeSheet.type === 'funding' && fundingSourcesList.map(src => (
                              <div key={src.id} onClick={() => { setLocalPlan({...localPlan, fundingSource: src.id}); setActiveSheet(null); }} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#0026FF] cursor-pointer transition-colors">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 font-bold text-[16px] shadow-sm ${src.color}`}>
                                      {src.img ? <img src={src.img} className="w-full h-full object-contain p-1" /> : src.icon}
                                  </div>
                                  <div>
                                      <div className="font-bold text-gray-900 text-[15px] leading-tight">{src.name}</div>
                                      <div className="text-gray-500 text-[12px] mt-0.5">Available: {src.balance}</div>
                                  </div>
                              </div>
                          ))}

                          {activeSheet.type === 'day' && (
                              <div className="grid grid-cols-7 gap-2">
                                  {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                      <button key={day} onClick={() => { setLocalPlan({...localPlan, customDay: (day + (day===1||day===21||day===31?'st':day===2||day===22?'nd':day===3||day===23?'rd':'th'))}); setActiveSheet(null); }} className="p-2 text-center rounded-lg hover:bg-blue-50 focus:bg-[#0026FF] focus:text-white text-gray-700 font-medium text-[13px] transition-colors">
                                          {day}
                                      </button>
                                  ))}
                              </div>
                          )}
                      </div>
                  </div>
              </div>
             )}
          </div>
      );
  }

  if (flowState === 'review') {
      const selectedFunding = fundingSourcesList.find(x => x.id === localPlan.fundingSource);
      return (
          <div className="h-full w-full relative flex flex-col font-sans animate-fade-in bg-white">
             <div className="sticky top-0 z-[60] bg-white border-b border-gray-100 -mt-[1px] shrink-0">
                 <div className="flex items-center px-6 pt-[54px] pb-4 relative z-10">
                     <div onClick={() => setFlowState('setup')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                         <Icons.ArrowLeft />
                     </div>
                     <h1 className="text-lg font-bold text-gray-900 ml-4">Review plan</h1>
                 </div>
             </div>
             
             <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px] px-6 mt-6">
                 <div className="text-center mb-8">
                     <p className="text-gray-500 text-[13px] font-semibold mb-1">Total {localPlan.planFreq.toLowerCase()} amount</p>
                     <div className="flex justify-center items-end gap-1 mb-2">
                        <span className="text-[28px] font-bold text-gray-400 mb-1">{localPlan.currencyLock === 'EUR' ? '€' : '₹'}</span>
                        <h2 className={`${getDynamicFontSize(totalAmount)} font-extrabold text-gray-900 leading-none tracking-tighter`}>{totalAmount.toLocaleString('en-IN')}</h2>
                     </div>
                     <p className="text-[#003BFF] font-semibold text-[12px] bg-blue-50 inline-block px-3 py-1.5 rounded-full">Next transfer: 1st of next month</p>
                 </div>

                 <div className="mb-6">
                     <div className="flex w-full h-3 rounded-full overflow-hidden gap-0.5 mb-4 bg-gray-100">
                        {localPlan.selectedPurposes.map(id => {
                            const percent = (Number(localPlan.allocations[id]) / totalAmount) * 100;
                            const color = purposesList.find(p=>p.id === id).color;
                            return percent > 0 ? <div key={id} style={{width: `${percent}%`}} className={`${color} transition-all duration-500`} /> : null;
                        })}
                     </div>
                     
                     <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-6 space-y-4">
                         <h4 className="font-bold text-gray-900 text-[14px] border-b border-gray-100 pb-2">Transfer Details</h4>
                         
                         {localPlan.selectedPurposes.map(id => {
                              const p = purposesList.find(x => x.id === id);
                              const payee = payeesList.find(x => x.id === localPlan.payees[id]);
                              const val = Number(localPlan.allocations[id]) || 0;
                              if(val === 0) return null;
                              return (
                                  <div key={id} className="flex justify-between items-center">
                                      <div className="flex items-center gap-3">
                                          <div className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 text-[12px] font-bold ${payee.color}`}>
                                              {payee.img ? <img src={payee.img} className="w-full h-full object-cover" /> : payee.icon}
                                          </div>
                                          <div>
                                             <div className="text-gray-900 text-[13px] font-bold">{payee.name}</div>
                                             <div className="text-gray-500 text-[11px]">{p.title} • {payee.account}</div>
                                          </div>
                                      </div>
                                      <span className="font-bold text-gray-900 text-[14px]">{localPlan.currencyLock === 'EUR' ? '€' : '₹'}{val.toLocaleString('en-IN')}</span>
                                  </div>
                              )
                         })}
                         
                         <div className="border-t border-dashed border-gray-200 my-2"></div>
                         
                         <div className="flex justify-between items-center text-[12px]">
                             <span className="text-gray-500 font-medium">Paying from</span>
                             <div className="flex items-center gap-1.5">
                                 {selectedFunding.img ? <img src={selectedFunding.img} className="w-4 h-4 rounded-sm object-contain" /> : <span className="text-lg">{selectedFunding.icon}</span>}
                                 <span className="text-gray-900 font-bold">{selectedFunding.name}</span>
                             </div>
                         </div>
                         <div className="flex justify-between items-center text-[12px]">
                             <span className="text-gray-500 font-medium">Frequency</span>
                             <span className="text-gray-900 font-bold">{localPlan.planFreq === 'Custom' ? `Monthly on ${localPlan.customDay}` : localPlan.planFreq}</span>
                         </div>
                         <div className="flex justify-between items-center text-[12px]">
                             <span className="text-gray-500 font-medium">Execution</span>
                             <span className="text-[#0026FF] font-bold">{localPlan.planExec === 'Smart' ? 'Smart Auto ✨' : localPlan.planExec}</span>
                         </div>
                     </div>
                 </div>

                 <p className="text-center text-gray-500 text-[12px] leading-snug px-4">Don't worry, you can easily skip or edit this plan before it executes.</p>
                 
                 <div className="mt-6">
                    <button onClick={() => { 
                        setPlannerState({ isActive: true, ...localPlan, totalAmount });
                        setFlowState('success'); 
                    }} className="w-full bg-[#0026FF] text-white font-bold text-[16px] py-4 rounded-[16px] active:scale-95 transition-all shadow-[0_8px_20px_rgba(0,38,255,0.25)]">
                        Activate plan
                    </button>
                 </div>
             </div>
          </div>
      );
  }

  if (flowState === 'success') {
      return (
          <div className="h-full w-full relative flex flex-col font-sans animate-fade-in bg-white items-center justify-center px-6 text-center">
             
             <Confetti />

             <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm border border-green-100 z-10">🎉</div>
             <h1 className="text-[28px] font-extrabold text-gray-900 mb-2 leading-tight z-10">Your money plan is active!</h1>
             <p className="text-gray-500 text-[15px] mb-10 w-[80%] leading-relaxed z-10">We'll take care of the transfers. You stay in complete control.</p>
             
             <div className="w-full space-y-3 z-10">
                 <button onClick={() => setScreen('send')} className="w-full bg-[#0026FF] text-white font-bold text-[16px] py-4 rounded-[16px] active:scale-95 transition-all shadow-md">
                     Send extra money now
                 </button>
                 <button onClick={() => { setLocalPlan(plannerState); setFlowState('setup'); }} className="w-full bg-blue-50 text-[#0026FF] font-bold text-[16px] py-4 rounded-[16px] active:scale-95 transition-all">
                     Edit plan
                 </button>
             </div>
             <button onClick={() => setFlowState('idle')} className="mt-8 text-gray-400 text-[13px] font-bold hover:text-gray-600 transition-colors z-10">
                 Back to Transfers
             </button>
          </div>
      );
  }

  // --- IDLE STATE ---
  return (
    <div className="h-full w-full relative flex flex-col font-sans animate-fade-in bg-[#f8f9fa]">
      <div className="sticky top-0 z-[60] bg-[#0026FF] -mt-[1px] shrink-0">
          <TopNavBar onMenuOpen={onMenuOpen} />
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px]">
          <div className="bg-[#0026FF] pb-8 pt-2 px-6 rounded-b-[2rem] relative z-0 -mt-[1px]">
              <h1 className="text-3xl font-extrabold text-white">Transfers</h1>
          </div>
          
          <div className="px-5 mt-6 space-y-4">
              
              {!plannerState.isActive ? (
                  <div className="bg-white p-5 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-blue-50 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                      <div className="flex items-center gap-2.5 mb-3 relative z-10">
                          <div className="w-8 h-8 bg-blue-50 text-[#0026FF] rounded-full flex items-center justify-center text-sm shadow-sm border border-blue-100">🗓️</div>
                          <h3 className="font-extrabold text-gray-900 text-[16px]">Money Planner</h3>
                      </div>
                      <p className="text-gray-500 text-[13px] mb-5 leading-relaxed w-[90%] relative z-10">
                          Automate your regular transfers to India and stop worrying about monthly sends.
                      </p>
                      <button onClick={() => setFlowState('purpose')} className="bg-[#0026FF] text-white font-bold text-[13px] py-3 px-6 rounded-xl shadow-[0_4px_12px_rgba(0,38,255,0.2)] active:scale-95 transition-transform">
                          Set up a plan
                      </button>
                  </div>
              ) : (
                  <>
                      <div className="bg-white p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,38,255,0.08)] border border-[#0026FF]/20 relative overflow-hidden">
                          <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 bg-[#0026FF] text-white rounded-full flex items-center justify-center text-sm shadow-md">✨</div>
                                  <div>
                                      <h3 className="font-extrabold text-gray-900 text-[15px] leading-tight">Active Plan</h3>
                                      <p className="text-[#0026FF] text-[11px] font-bold mt-0.5">{plannerState.planExec === 'Smart' ? 'Smart Auto' : plannerState.planExec} Executing</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <p className="text-gray-400 text-[10px] font-bold mb-0.5 uppercase tracking-wide">{plannerState.planFreq === 'Custom' ? 'Custom' : plannerState.planFreq} Send</p>
                                  <p className="text-gray-900 font-extrabold text-[16px]">{plannerState.currencyLock === 'EUR' ? '€' : '₹'}{plannerState.totalAmount.toLocaleString('en-IN')}</p>
                              </div>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-3 flex justify-between items-center mb-4">
                              <div>
                                  <p className="text-gray-500 text-[11px] font-medium">Next transfer</p>
                                  <p className="text-blue-900 font-bold text-[13px]">1st of Next Month</p>
                              </div>
                              <div className="w-px h-8 bg-blue-200"></div>
                              <div>
                                  <p className="text-gray-500 text-[11px] font-medium">Paying from</p>
                                  <p className="text-blue-900 font-bold text-[13px]">{fundingSourcesList.find(x=>x.id === plannerState.fundingSource)?.name}</p>
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <button className="flex-1 bg-gray-50 text-gray-700 font-bold text-[12px] py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">Skip next send</button>
                              <button onClick={() => { setLocalPlan(plannerState); setFlowState('setup'); }} className="flex-1 bg-gray-50 text-gray-700 font-bold text-[12px] py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">Edit Plan</button>
                          </div>
                      </div>
                      
                      {/* Create another plan */}
                      <button onClick={() => { 
                          setLocalPlan({ allocations: {}, selectedPurposes: [], payees: {}, planFreq: 'Monthly', planExec: 'Smart', customDay: '1st', fundingSource: 'wallet', currencyLock: 'EUR' }); 
                          setFlowState('purpose'); 
                      }} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-gray-200 text-[#0026FF] font-bold text-[13px] hover:bg-gray-50 hover:border-blue-200 transition-colors">
                          + Create another plan
                      </button>
                  </>
              )}

              <div className="bg-white pt-10 pb-12 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-50 text-center relative overflow-hidden mt-6">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 bg-blue-50 rounded-full blur-xl"></div>
                      <div className="text-[40px] absolute left-2 top-2 z-10 drop-shadow-sm animate-bounce">💸</div>
                      <div className="text-[50px] absolute right-0 bottom-0 z-20 drop-shadow-md">🗓️</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No past transfers</h3>
                  <p className="text-sm text-gray-500 px-6 leading-relaxed">Your transfer history and active tracking will show up here once you send money.</p>
              </div>
          </div>
      </div>
    </div>
  );
};


// --- MAIN ROUTER ---
export default function App() {
  const [screen, setScreen] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [isSplash, setIsSplash] = useState(true);

  // Global Memory for Send Amount
  const [globalSendAmount, setGlobalSendAmount] = useState("1000");

  // Show splash for 2 seconds on initial load
  useEffect(() => {
     const timer = setTimeout(() => setIsSplash(false), 2000);
     return () => clearTimeout(timer);
  }, []);

  // Global Memory for Planner
  const [plannerState, setPlannerState] = useState({
      isActive: false,
      allocations: {},
      selectedPurposes: [],
      currencyLock: 'EUR',
      payees: {},
      fundingSource: 'wallet',
      planFreq: 'Monthly',
      planExec: 'Smart',
      customDay: '1st',
      totalAmount: 0
  });

  return (
    <AppFrame currentScreen={screen} setScreen={setScreen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} overlayActive={overlayActive} isSplash={isSplash}>
        {screen === 'onboarding' && <OnboardingScreen onNext={() => setScreen('home')} />}
        {screen === 'home' && <HomeScreen onMenuOpen={() => setIsMenuOpen(true)} setScreen={setScreen} setGlobalSendAmount={setGlobalSendAmount} />}
        {screen === 'wallet' && <WalletScreen onMenuOpen={() => setIsMenuOpen(true)} />}
        {screen === 'transfers' && <TransfersScreen onMenuOpen={() => setIsMenuOpen(true)} setScreen={setScreen} setOverlayActive={setOverlayActive} plannerState={plannerState} setPlannerState={setPlannerState} />}
        {screen === 'rate' && <RateScreen setScreen={setScreen} />}
        {screen === 'send' && <SendScreen onClose={() => setScreen('home')} setOverlayActive={setOverlayActive} initialSendAmount={globalSendAmount} />}
    </AppFrame>
  );
}
