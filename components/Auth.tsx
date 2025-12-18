
import React, { useState } from 'react';

interface AuthProps {
  onAuthSuccess: (username: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validatePhone = (p: string) => {
    // Basic Myanmar phone validation (09...)
    return /^09\d{7,11}$/.test(p);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }
    
    if (!isLogin && !validatePhone(phone)) {
      setError("Please enter a valid Myanmar phone number (e.g., 09xxxxxxxxx).");
      return;
    }

    // Dynamic User Management using LocalStorage
    const storedUsers = localStorage.getItem('tk_registered_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (isLogin) {
      const user = users.find((u: any) => 
        u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );
      if (user) {
        onAuthSuccess(user.username);
      } else {
        setError("Invalid username or password. If you don't have an account, please register.");
      }
    } else {
      const exists = users.some((u: any) => u.username.toLowerCase() === username.toLowerCase());
      if (exists) {
        setError("This username is already taken. Please choose another.");
        return;
      }
      
      const newUser = { username, password, phone, createdAt: new Date().toISOString() };
      users.push(newUser);
      localStorage.setItem('tk_registered_users', JSON.stringify(users));
      
      // Auto login after registration
      onAuthSuccess(username);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md mx-auto animate-in slide-in-from-bottom duration-500 mt-10 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
          <i className="fa-solid fa-shield-halved text-white text-2xl"></i>
        </div>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-gray-500 text-sm mt-2">
          {isLogin ? 'Sign in to access TK Game Shop' : 'Join our community for faster top-ups'}
        </p>
      </div>

      <div className="flex p-1.5 bg-gray-100 rounded-2xl mb-8">
        <button 
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${isLogin ? 'bg-white shadow-md text-indigo-600 scale-100' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => { setIsLogin(true); setError(null); }}
        >
          Login
        </button>
        <button 
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${!isLogin ? 'bg-white shadow-md text-indigo-600 scale-100' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => { setIsLogin(false); setError(null); }}
        >
          Register
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700 text-xs font-semibold animate-shake">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
          <div className="relative">
            <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium"
              placeholder="Username"
            />
          </div>
        </div>
        
        {!isLogin && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <i className="fa-solid fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium"
                placeholder="09..."
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
        >
          {isLogin ? 'Sign In' : 'Join Now'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
