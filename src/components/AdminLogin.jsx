import React, { useState } from 'react';
import logo from '../assets/logo.png';

const ADMIN_USER = 'oticasvisaoce';
const ADMIN_PASS = '#Grupovisao@2026.5';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ebf3fa 0%, #f6f9fd 50%, #e4eef6 100%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 mx-4 w-full max-w-sm flex flex-col items-center gap-6" style={{ boxShadow: '0 10px 25px -5px rgba(15, 41, 99, 0.08), 0 8px 16px -6px rgba(15, 41, 99, 0.08)' }}>
        <img src={logo} alt="Grupo Visão" className="h-12 object-contain" />
        <h2 className="text-xl font-bold text-[#0f2963]">Painel Administrativo</h2>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5c728e]">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2963] text-[#0f2963] bg-white"
              placeholder="Digite o usuário"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5c728e]">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2963] text-[#0f2963] bg-white"
              placeholder="Digite a senha"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-white text-base mt-1 transition hover:opacity-90 bg-[#0f2963]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
