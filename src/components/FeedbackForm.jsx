import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Headphones, 
  Tag, 
  ShoppingBag, 
  ShieldCheck, 
  Shield, 
  Award, 
  Smile 
} from 'lucide-react';
import { Io } from '../services/db';

// Importando imagens locais processadas pelo Vite
import logo from '../assets/logo.png';
import directorPhoto from '../assets/diretor.jpeg';

const options = [
  { id: 'preco', label: 'Preço', icon: DollarSign },
  { id: 'atendimento', label: 'Atendimento', icon: Headphones },
  { id: 'promocoes', label: 'Promoções\ne Ofertas', icon: Tag },
  { id: 'produtos_grifes', label: 'Produtos\ne Grifes', icon: ShoppingBag },
  { id: 'confianca_marca', label: 'Confiança\nna Marca', icon: ShieldCheck }
];

export default function FeedbackForm() {
  const [screen, setScreen] = useState('question');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (screen === 'thank_you') {
      setCountdown(4);
      const timer = setInterval(() => {
        setCountdown((c) => (c <= 1 ? (clearInterval(timer), 0) : c - 1));
      }, 1000);

      const timeout = setTimeout(() => {
        setScreen('question');
      }, 4000);

      return () => {
        clearTimeout(timeout);
        clearInterval(timer);
      };
    }
  }, [screen]);

  const handleSelect = async (option) => {
    setScreen('thank_you');
    try {
      await Io.entities.Resposta.create({
        motivo: option.label.replace('\n', ' '),
        motivo_id: option.id
      });
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#f8f8f8' }}>
      <AnimatePresence mode="wait">
        {screen === 'question' ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* Header / Question Section */}
            <div className="relative flex items-center justify-center pt-6 pb-2 px-16 flex-1">
              {/* Dots Decorative Grid */}
              <div className="absolute left-8 top-8 grid grid-cols-5 gap-2 opacity-10 pointer-events-none">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-black"></div>
                ))}
              </div>
              
              {/* Background cover image (Director/Store theme layout) */}
              <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=700&q=80" 
                  alt="" 
                  className="h-full w-full object-cover object-center grayscale" 
                  style={{
                    maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)'
                  }}
                />
              </div>

              {/* Main Text Content */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                <img 
                  src={logo} 
                  alt="Grupo Visão" 
                  className="h-24 md:h-28 object-contain mb-5" 
                />
                <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-black max-w-3xl">
                  Na sua percepção, qual é o principal motivo que leva nossos clientes a comprar em nossas lojas?
                </h1>
                <div className="w-14 h-1 rounded-full mt-3 mb-4 bg-black"></div>
                <p className="text-base font-medium text-gray-500">
                  Sua opinião nos ajuda a melhorar cada vez mais! ♡
                </p>
              </div>
            </div>

            {/* Voting Options Grid */}
            <div className="px-10 pb-3">
              <div className="grid grid-cols-5 gap-4">
                {options.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleSelect(option)}
                      className="flex flex-col items-center focus:outline-none"
                    >
                      <div 
                        className="w-full bg-white rounded-2xl flex flex-col items-center py-7 px-3 gap-4"
                        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      >
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{ background: '#f0f0f0' }}
                        >
                          <Icon className="w-10 h-10 text-black" strokeWidth={1.5} />
                        </div>
                        <div className="w-8 h-0.5 rounded-full bg-black"></div>
                      </div>
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center -mt-4 z-10 font-bold text-base bg-black text-white"
                        style={{ border: '3px solid #f8f8f8' }}
                      >
                        {index + 1}
                      </div>
                      <p className="mt-2 text-center font-semibold text-sm leading-snug whitespace-pre-line text-black">
                        {option.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer Trust Indicators */}
            <div 
              className="flex justify-around items-center py-4 px-8 mt-2"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              {[
                { icon: Shield, title: 'Compra segura', sub: 'Seus dados protegidos' },
                { icon: Award, title: 'Qualidade garantida', sub: 'Produtos originais' },
                { icon: Smile, title: 'Clientes satisfeitos', sub: 'Nossa maior recompensa' }
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-3">
                  <Icon className="w-8 h-8 shrink-0 text-gray-700" strokeWidth={1.5} />
                  <div className="text-left">
                    <p className="font-bold text-sm text-black">{title}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thank_you"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 items-center justify-center bg-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-3xl w-full px-6 md:px-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 120, damping: 18 }}
                className="flex flex-col gap-3 text-center md:text-left items-center md:items-start"
              >
                <h2 className="text-4xl md:text-6xl font-extrabold text-black">Obrigado!</h2>
                <p className="text-lg md:text-xl font-medium text-gray-700 font-sans">
                  Sua resposta foi enviada com sucesso.
                </p>
                <p className="text-sm font-semibold text-gray-400 mt-2">
                  Voltando em {countdown}s...
                </p>
                {/* Progress bar loader */}
                <div className="w-48 h-1.5 rounded-full overflow-hidden bg-gray-200 mt-2">
                  <motion.div 
                    className="h-full rounded-full bg-black"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 4, ease: 'linear' }}
                  />
                </div>
              </motion.div>

              <motion.img
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}
                src={directorPhoto}
                alt="Diretor"
                className="rounded-2xl object-cover shrink-0 w-48 h-48 md:w-72 md:h-72"
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
