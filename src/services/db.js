// Simulação do SDK da Base44 utilizando localStorage
// Isso garante que o projeto rode 100% no GitHub Pages sem a necessidade de backend.
// Caso queira conectar a um banco de dados real, basta substituir esta implementação.

const STORAGE_KEY = 'feedback_grupo_visao_respostas';

// Respostas padrão (mock inicial para não iniciar vazio)
const defaultResponses = [
  { id: '1', motivo: 'Atendimento', motivo_id: 'atendimento', created_date: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: '2', motivo: 'Preço', motivo_id: 'preco', created_date: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: '3', motivo: 'Promoções e Ofertas', motivo_id: 'promocoes', created_date: new Date(Date.now() - 3600000 * 1).toISOString() },
  { id: '4', motivo: 'Confiança na Marca', motivo_id: 'confianca_marca', created_date: new Date(Date.now() - 1800000).toISOString() },
  { id: '5', motivo: 'Produtos e Grifes', motivo_id: 'produtos_grifes', created_date: new Date(Date.now() - 900000).toISOString() }
];

const getStoredData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultResponses));
    return defaultResponses;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultResponses;
  }
};

const setStoredData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const Io = {
  entities: {
    Resposta: {
      create: async (payload) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const currentData = getStoredData();
            const newRecord = {
              id: Math.random().toString(36).substring(2, 9),
              motivo: payload.motivo,
              motivo_id: payload.motivo_id,
              created_date: new Date().toISOString()
            };
            currentData.push(newRecord);
            setStoredData(currentData);
            resolve(newRecord);
          }, 400); // Pequeno delay simulando rede
        });
      },
      list: async (sortParam = '-created_date', limit = 1000) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            let currentData = [...getStoredData()];
            
            // Tratamento simplificado de ordenação por data de criação
            if (sortParam.startsWith('-')) {
              const field = sortParam.substring(1);
              currentData.sort((a, b) => new Date(b[field]) - new Date(a[field]));
            } else {
              currentData.sort((a, b) => new Date(a[sortParam]) - new Date(b[sortParam]));
            }
            
            // Limitando quantidade de registros
            resolve(currentData.slice(0, limit));
          }, 300); // Pequeno delay simulando rede
        });
      }
    }
  }
};
