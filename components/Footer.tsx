
import React from 'react';
import { CONTACT_LINKS } from '../constants';

interface FooterProps {
  onShowTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowTerms }) => {
  return (
    <footer className="mt-12 text-center pb-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-gray-800 font-bold mb-4">ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ရန်</h3>
        
        <div className="flex flex-col gap-3">
          <a 
            href={CONTACT_LINKS.channel} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-100"
          >
            <i className="fa-brands fa-telegram text-xl"></i>
            Join Our Telegram Channel
          </a>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {CONTACT_LINKS.supports.map((support, idx) => (
              <a 
                key={idx}
                href={support.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 border border-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all"
              >
                <i className="fa-solid fa-headset"></i>
                {support.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button 
          onClick={onShowTerms}
          className="text-indigo-600 text-sm font-semibold underline hover:text-indigo-800"
        >
          Terms & Conditions
        </button>
      </div>
      
      <p className="mt-6 text-gray-400 text-xs">© 2025 TK Game Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
