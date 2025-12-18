
import React from 'react';
import { DIAMOND_PACKAGES } from '../constants';
import { DiamondPackage } from '../types';

interface PriceListProps {
  onSelect: (pkg: DiamondPackage) => void;
}

const PriceList: React.FC<PriceListProps> = ({ onSelect }) => {
  return (
    <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <i className="fa-solid fa-gem text-indigo-600 text-xl"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Price List</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {DIAMOND_PACKAGES.map((pkg) => (
          <button 
            key={pkg.id} 
            onClick={() => onSelect(pkg)}
            className="group flex justify-between items-center p-5 rounded-2xl bg-gray-50 border border-transparent transition-all duration-300 hover:shadow-lg hover:bg-white hover:border-indigo-100 active:scale-[0.98] text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-diamond text-xs"></i>
              </div>
              <span className="font-bold text-gray-700 text-lg group-hover:text-gray-900">{pkg.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-black text-indigo-600 text-xl">{pkg.price.toLocaleString()} Ks</span>
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Buy Now</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PriceList;
