import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de autenticação
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col font-['Inter']">
      
      {/* Cabeçalho Superior no Login */}
      <header className="w-full bg-[#161b22] py-4 px-8 border-b border-[#30363d] flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xl">🛡️</span>
          <h1 className="text-[#f0f6fc] font-bold text-lg tracking-tight">
            Sistema de Inventário de Infraestrutura
          </h1>
        </div>
        
        {/* Botão à esquerda (ou direita, conforme sua preferência de layout) */}
        <button 
          onClick={() => navigate('/home')}
          className="text-sm font-medium text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] px-4 py-2 rounded-lg hover:bg-[#30363d]/30 transition-all"
        >
          Acessar como Visitante →
        </button>
      </header>

      {/* Container Central do Formulário */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#161b22] p-10 rounded-xl border border-[#30363d] w-full max-w-[400px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-fadeIn">
          <h2 className="text-[#f0f6fc] text-center text-2xl font-bold mb-8 tracking-tight">
            Acesso Restrito
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#8b949e] text-sm font-medium">Usuário (E-mail)</label>
              <input 
                type="email" 
                className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] outline-none focus:border-[#58a6ff] focus:ring-3 focus:ring-[#58a6ff]/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#8b949e] text-sm font-medium">Senha</label>
              <input 
                type="password" 
                className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] outline-none focus:border-[#58a6ff] focus:ring-3 focus:ring-[#58a6ff]/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg font-semibold transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Autenticando...' : 'Autenticar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}