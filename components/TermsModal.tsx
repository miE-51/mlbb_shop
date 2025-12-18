
import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">📜 Terms & Conditions</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto text-sm leading-relaxed text-gray-600 space-y-3">
          <p>• Customer များသည် MLBB ID နှင့် Server ID ကို မှန်ကန်စွာ ထည့်သွင်းရပါမည်။</p>
          <p>• ID / Server မှားယွင်းပါက Diamond ပြန်မပေးနိုင်ပါ။</p>
          <p>• Payment Screenshot မပါသော Order များကို မစစ်ဆေးပါ။</p>
          <p>• Diamond Top‑Up အချိန်သည် ၅ မိနစ်မှ မိနစ် ၃၀ အတွင်း ဖြစ်ပါသည်။</p>
          <p>• Scam order များကို blacklist ပြုလုပ်မည် ဖြစ်ပါသည်။</p>
          <p>• တရားမဝင် ရရှိထားသော Diamonds များ အသုံးပြုခြင်းကြောင့် ဖြစ်ပေါ်လာသော Game Account ပြဿနာများအား တာဝန်ယူမည်မဟုတ်ပါ။</p>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
