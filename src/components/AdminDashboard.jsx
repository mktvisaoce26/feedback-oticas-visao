import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  LogOut, 
  ClipboardList, 
  TrendingUp, 
  Percent, 
  Award 
} from 'lucide-react';
import { Io } from '../services/db';
import AdminLogin from './AdminLogin';
import logo from '../assets/logo.png';

const colors = {
  preco: '#333333',
  atendimento: '#1a1a1a',
  promocoes: '#555555',
  produtos_grifes: '#777777',
  confianca_marca: '#999999'
};

const labelsMap = {
  preco: 'Preço',
  atendimento: 'Atendimento',
  promocoes: 'Promoções e Ofertas',
  produtos_grifes: 'Produtos e Grifes',
  confianca_marca: 'Confiança na Marca'
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('feedback_visao_authenticated') === 'true';
  });
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('feedback_visao_authenticated', 'true');
      loadData();
    } else {
      localStorage.removeItem('feedback_visao_authenticated');
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await Io.entities.Resposta.list('-created_date', 1000);
      setResponses(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Processamento de dados estatísticos
  const counts = responses.reduce((acc, current) => {
    acc[current.motivo_id] = (acc[current.motivo_id] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(labelsMap).map(([id, label]) => ({
    id,
    label,
    total: counts[id] || 0
  }));

  const totalResponses = responses.length;
  
  // Encontrar o motivo mais citado
  const topMotive = chartData.reduce((max, current) => {
    return current.total >= max.total ? current : max;
  }, chartData[0] || { label: '—', total: 0 });

  const topPercentage = totalResponses > 0 
    ? Math.round((topMotive.total / totalResponses) * 100) 
    : 0;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Grupo Visão" className="h-10 object-contain" />
          <div className="border-l border-gray-200 pl-4">
            <h1 className="text-2xl font-extrabold text-black">
              Dashboard — Pesquisa de Satisfação
            </h1>
            <p className="text-sm text-gray-400">
              Resultados coletados em tempo real (armazenamento local)
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-80 bg-black text-white"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                <ClipboardList className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Total de Respostas</p>
                <p className="text-3xl font-extrabold text-black">{totalResponses}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                <Award className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Motivo mais citado</p>
                <p className="text-xl font-extrabold leading-tight text-black">
                  {totalResponses > 0 ? topMotive.label : '—'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                <Percent className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">% do top motivo</p>
                <p className="text-3xl font-extrabold text-black">{topPercentage}%</p>
              </div>
            </div>
          </div>

          {/* Graphics Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Recharts BarChart Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold mb-5 text-black">Respostas por Motivo</h2>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData} 
                    margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="label" 
                      tick={{ fill: '#666', fontSize: 11, fontWeight: 600 }}
                      angle={-20}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis tick={{ fill: '#666', fontSize: 11 }} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: 10, 
                        border: 'none', 
                        background: '#fff', 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                      }} 
                      formatter={(val) => [val, 'Respostas']}
                    />
                    <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry) => (
                        <Cell key={entry.id} fill={colors[entry.id] || '#333'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* List Detail Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold mb-5 text-black">Detalhamento</h2>
              <div className="flex flex-col gap-3">
                {chartData
                  .sort((a, b) => b.total - a.total)
                  .map((item) => {
                    const percentage = totalResponses > 0 
                      ? Math.round((item.total / totalResponses) * 100) 
                      : 0;
                    return (
                      <div key={item.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-semibold text-black">{item.label}</span>
                          <span className="text-sm font-bold text-gray-600">
                            {item.total}{' '}
                            <span className="font-normal text-xs text-gray-400">
                              ({percentage}%)
                            </span>
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2.5 rounded-full overflow-hidden bg-gray-100">
                          <div 
                            className="h-full rounded-full transition-all duration-700"
                            style={{ 
                              width: `${percentage}%`, 
                              background: colors[item.id] || '#333' 
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
