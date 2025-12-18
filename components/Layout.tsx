
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Dynamic Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <header className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 text-white py-12 px-4 text-center shadow-xl relative overflow-hidden">
        {/* Animated Ornaments */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-300 rounded-full translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <i className="fa-solid fa-bolt-lightning text-3xl text-yellow-300"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-md">TK Game Shop</h1>
          <div className="h-1 w-12 bg-yellow-400 rounded-full mb-3"></div>
          <p className="text-indigo-50 max-w-md mx-auto font-medium opacity-90 leading-relaxed px-4">
            မြန်မာနိုင်ငံအတွင်း ယုံကြည်စိတ်ချရဆုံးနှင့် အမြန်ဆန်ဆုံး <br/>
            MLBB Diamond Top‑Up ဝန်ဆောင်မှု
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-8 relative z-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
