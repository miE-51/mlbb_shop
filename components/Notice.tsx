
import React from 'react';

const Notice: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <i className="fa-solid fa-triangle-exclamation text-red-600"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-800">သတိပေးချက်များ</h2>
      </div>
      <div className="space-y-4 text-sm text-gray-600">
        <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
          <h3 className="font-bold text-gray-800 mb-1">💳 ငွေလွှဲပေးချေမှု</h3>
          <p>Transfer Note တွင် သင်၏ MLBB ID ကို ထည့်ရေးပေးပါ။ Screenshot မပါလျှင် Order စစ်ဆေးမည်မဟုတ်ပါ။</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-amber-500">
          <h3 className="font-bold text-gray-800 mb-1">⏰ ကြာမြင့်ချိန်</h3>
          <p>Diamond ရရှိရန် ပုံမှန်အားဖြင့် ၅ မိနစ်မှ မိနစ် ၃၀ ခန့် ကြာမြင့်နိုင်ပါသည်။</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-red-500">
          <h3 className="font-bold text-gray-800 mb-1">❌ သတိပြုရန်</h3>
          <p>ID / Server မှားယွင်းမှုအတွက် တာဝန်ယူမည်မဟုတ်ပါ။ Scam order များကို အပြီးအပိုင် Blacklist ပြုလုပ်ပါမည်။</p>
        </div>
      </div>
    </section>
  );
};

export default Notice;
