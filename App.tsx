
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PriceList from './components/PriceList';
import Footer from './components/Footer';
import TermsModal from './components/TermsModal';
import Auth from './components/Auth';
import SupportBot from './components/SupportBot';
import { sendOrderToTelegram } from './services/telegramService';
import { OrderData, DiamondPackage } from './types';
import { PAYMENT_METHODS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState(1); // 1: PriceList, 2: ID Info, 3: Payment/Confirm
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Order state
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(null);
  const [mlbbId, setMlbbId] = useState('');
  const [serverId, setServerId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('tk_current_user');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleAuthSuccess = (username: string) => {
    setUser(username);
    localStorage.setItem('tk_current_user', username);
  };

  const handleLogout = () => {
    if (confirm("Logout လုပ်မှာ သေချာပါသလား?")) {
      setUser(null);
      localStorage.removeItem('tk_current_user');
      resetForm();
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedPackage(null);
    setMlbbId('');
    setServerId('');
    setScreenshot(null);
    setPreviewUrl(null);
    setOrderSuccess(false);
  };

  const handlePackageSelect = (pkg: DiamondPackage) => {
    setSelectedPackage(pkg);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mlbbId.trim() && serverId.trim()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot || !selectedPackage) return;

    setIsSubmitting(true);
    const orderData: OrderData = {
      mlbbId,
      serverId,
      package: `${selectedPackage.name} - ${selectedPackage.price} Ks`,
      screenshot,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const success = await sendOrderToTelegram(orderData);
      if (success) {
        setOrderSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Submitting failed. Please check your internet or contact K supports.");
      }
    } catch (err) {
      alert("Error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-10">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
            step === s ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 
            step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            {step > s ? <i className="fa-solid fa-check"></i> : s}
          </div>
          {s < 3 && <div className={`w-10 h-1.5 rounded-full mx-1 transition-all duration-500 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
        </div>
      ))}
    </div>
  );

  if (!user) {
    return (
      <Layout>
        <Auth onAuthSuccess={handleAuthSuccess} />
        <SupportBot />
      </Layout>
    );
  }

  if (orderSuccess) {
    return (
      <Layout>
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 text-center animate-in zoom-in duration-500 max-w-lg mx-auto mt-10 border border-gray-50">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner animate-bounce">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">Order Success!</h2>
          <p className="text-gray-500 mb-10 leading-relaxed font-medium">လူကြီးမင်း၏ Order ကို လက်ခံရရှိပါပြီ။ <br/>K Support များမှ ၅ မိနစ်မှ ၃၀ မိနစ်အတွင်း စစ်ဆေးပေးပါမည်။</p>
          <button 
            onClick={resetForm}
            className="w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            မူလစာမျက်နှာသို့ ပြန်သွားမည်
          </button>
        </div>
        <SupportBot />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Professional Top Navbar-like Header */}
      <div className="flex justify-between items-center mb-10 px-5 py-4 bg-white shadow-xl rounded-3xl border border-gray-100 ring-1 ring-black/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-100 ring-4 ring-indigo-50">
              {user[0].toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Welcome Back</p>
            <span className="font-extrabold text-gray-800 text-lg tracking-tight">{user}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 active:scale-95 group"
        >
          <span>Logout</span>
          <i className="fa-solid fa-right-from-bracket group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StepIndicator />

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-800 text-center mb-8 tracking-tight">Select Your Diamonds</h2>
            <PriceList onSelect={handlePackageSelect} />
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 animate-in slide-in-from-right duration-400 border border-gray-50">
            <button onClick={() => setStep(1)} className="text-indigo-600 font-black text-sm flex items-center gap-2 mb-8 group">
              <i className="fa-solid fa-chevron-left transition-transform group-hover:-translate-x-1"></i> Back to Prices
            </button>
            <h2 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">Player Details</h2>
            <div className="p-6 bg-indigo-50/50 rounded-3xl mb-8 flex items-center justify-between border border-indigo-100/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <i className="fa-solid fa-gem text-indigo-600"></i>
                </div>
                <span className="font-black text-gray-800 text-lg">{selectedPackage?.name}</span>
              </div>
              <span className="font-black text-indigo-600 text-xl">{selectedPackage?.price.toLocaleString()} Ks</span>
            </div>
            <form onSubmit={handleIdSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">MLBB Player ID</label>
                <input
                  type="text"
                  required
                  placeholder="123456789"
                  value={mlbbId}
                  onChange={(e) => setMlbbId(e.target.value)}
                  className="w-full px-6 py-5 rounded-[1.5rem] bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-xl placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Server ID</label>
                <input
                  type="text"
                  required
                  placeholder="1234"
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  className="w-full px-6 py-5 rounded-[1.5rem] bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-xl placeholder:text-gray-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-indigo-600 text-white font-black text-xl rounded-[1.5rem] shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-indigo-100 active:scale-[0.98]"
              >
                Next to Payment <i className="fa-solid fa-chevron-right text-sm"></i>
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 animate-in slide-in-from-right duration-400 border border-gray-50">
            <button onClick={() => setStep(2)} className="text-indigo-600 font-black text-sm flex items-center gap-2 mb-8 group">
              <i className="fa-solid fa-chevron-left transition-transform group-hover:-translate-x-1"></i> Back to Player Info
            </button>
            <h2 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">Secure Payment</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-gray-50/80 rounded-3xl border border-gray-100">
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2">Selected Package</p>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-gem text-indigo-500"></i>
                  <p className="font-black text-gray-800">{selectedPackage?.name}</p>
                </div>
              </div>
              <div className="p-5 bg-gray-50/80 rounded-3xl border border-gray-100">
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2">Player Account</p>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-user-gear text-indigo-500"></i>
                  <p className="font-black text-gray-800">{mlbbId} <span className="text-gray-400 font-bold ml-1">({serverId})</span></p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-[2rem] p-8 mb-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2 opacity-80">
                <i className="fa-solid fa-credit-card"></i> Transfer to
              </h4>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-sm font-bold opacity-80 uppercase tracking-wider">Account Name</span>
                  <span className="text-lg font-black tracking-tight">{PAYMENT_METHODS.accountName}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-sm font-bold opacity-80 uppercase tracking-wider">Phone / ID</span>
                  <span className="text-2xl font-black tracking-widest">{PAYMENT_METHODS.phoneNumber}</span>
                </div>
                <div className="pt-2 text-[11px] font-bold opacity-70 leading-relaxed italic">
                  * KBZPay နှင့် WavePay နှစ်မျိုးလုံး အသုံးပြုနိုင်ပါသည်။
                </div>
              </div>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Proof of Payment</label>
                <div className={`relative border-2 border-dashed rounded-[2rem] transition-all duration-300 p-8 text-center cursor-pointer group ${previewUrl ? 'border-green-300 bg-green-50/30' : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'}`}>
                  <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleFileChange} />
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img src={previewUrl} alt="Preview" className="h-56 w-auto mx-auto rounded-2xl shadow-xl border-4 border-white object-cover" />
                      <p className="text-xs font-black text-green-600 uppercase tracking-widest">Screenshot Uploaded ✓</p>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 group-hover:text-indigo-500 transition-colors"></i>
                      </div>
                      <p className="text-lg font-black text-gray-800">ငွေလွှဲပြီးပုံ တင်ပေးပါ</p>
                      <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-tighter">Tap to upload your transaction receipt</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-1"></i>
                <p className="text-xs font-bold text-amber-900 leading-relaxed">
                  သေချာစွာ စစ်ဆေးပြီးမှ Confirm နှိပ်ပါ။ ID / Server မှားယွင်းပါက Diamond ပြန်မရနိုင်ပါ။
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 rounded-[1.5rem] font-black text-xl text-white shadow-2xl transition-all transform active:scale-[0.97] flex items-center justify-center gap-4 ${
                  isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 shadow-green-100'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Order <i className="fa-solid fa-paper-plane text-sm"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <Footer onShowTerms={() => setShowTerms(true)} />
        <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
        <SupportBot />
      </div>
    </Layout>
  );
};

export default App;
