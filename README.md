# 📋 Feedback Óticas Visão

> Sistema de pesquisa de satisfação para a rede **Óticas Visão** — coleta, armazena e exibe os principais motivos de compra dos clientes em tempo real.

---

## 🌐 Acesso ao Sistema

| Ambiente | URL |
|---|---|
| **Formulário público** | [`https://mktvisaoce26.github.io/feedback-oticas-visao/`](https://mktvisaoce26.github.io/feedback-oticas-visao/) |
| **Painel administrativo** | [`https://mktvisaoce26.github.io/feedback-oticas-visao/#/admin`](https://mktvisaoce26.github.io/feedback-oticas-visao/#/admin) |

---

## ✨ Funcionalidades

### Formulário de Feedback (Página Pública)
- Exibe os **5 principais motivos de compra** em cards interativos com animações suaves
- Ao selecionar uma opção, a resposta é enviada automaticamente para o Google Sheets
- Tela de agradecimento com countdown automático para reiniciar o formulário
- **Fallback** para `localStorage` em caso de falha de conexão

### Painel Administrativo
- Login protegido por usuário e senha
- Visualização em tempo real das respostas coletadas via **Google Sheets**
- **Gráfico de barras** (Recharts) com total de votos por motivo
- **Cards de estatísticas**: total de respostas, motivo mais citado e percentual do topo
- **Barra de progresso** proporcional para cada motivo

---

## 🛠️ Stack de Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework UI | [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/) |
| Animações | [Framer Motion](https://www.framer.com/motion/) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Gráficos | [Recharts](https://recharts.org/) |
| Roteamento | [React Router DOM v6](https://reactrouter.com/) |
| Backend / BD | [Google Sheets + Apps Script](https://developers.google.com/apps-script) |
| Deploy | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

---

## 🗂️ Estrutura do Projeto

```
feedback-oticas-visao/
├── .github/
│   └── workflows/
│       └── static.yml         # CI/CD — build + deploy automático no GitHub Pages
├── public/
├── src/
│   ├── assets/
│   │   ├── logo.png           # Logo da Óticas Visão
│   │   └── diretor.jpeg       # Foto exibida na tela de agradecimento
│   ├── components/
│   │   ├── FeedbackForm.jsx   # Formulário público de votação
│   │   ├── AdminLogin.jsx     # Tela de login do painel
│   │   └── AdminDashboard.jsx # Painel com gráficos e estatísticas
│   ├── services/
│   │   └── db.js              # Camada de acesso ao Google Sheets (POST/GET)
│   ├── App.jsx                # Definição de rotas (HashRouter)
│   ├── main.jsx               # Entry point React
│   └── index.css              # Estilos globais + Tailwind
├── index.html
├── vite.config.js             # Base path configurado para /feedback-visao/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Rodando Localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# 1. Clone o repositório
git clone https://github.com/mktvisaoce26/feedback-oticas-visao.git
cd feedback-oticas-visao

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: **[http://localhost:5173/feedback-visao/](http://localhost:5173/feedback-visao/)**

---

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`. O deploy é feito automaticamente via GitHub Actions a cada push na branch `main`.

---

## ⚙️ Integração com Google Sheets

As respostas são salvas em uma planilha do Google via **Apps Script** como Web App (endpoint REST).

- **POST** → Salva uma nova resposta na planilha
- **GET** → Retorna todas as respostas para o painel administrativo

O endpoint está configurado em `src/services/db.js`. Em caso de falha de rede, as respostas são salvas temporariamente no `localStorage` do navegador.

---

## 🔄 Deploy Automático (CI/CD)

Cada push na branch `main` dispara o workflow `.github/workflows/static.yml` que:

1. Faz o checkout do código
2. Configura o Node.js 20
3. Instala dependências (`npm install`)
4. Gera o build de produção (`npm run build`)
5. Publica a pasta `dist/` no GitHub Pages

---

## 📊 Opções de Votação

| # | Motivo | ID |
|---|---|---|
| 1 | Preço | `preco` |
| 2 | Atendimento | `atendimento` |
| 3 | Promoções e Ofertas | `promocoes` |
| 4 | Produtos e Grifes | `produtos_grifes` |
| 5 | Confiança na Marca | `confianca_marca` |

---

## 🔐 Acesso Administrativo

As credenciais de acesso ao painel estão definidas em `AdminLogin.jsx`. Recomenda-se mover para variáveis de ambiente (`.env`) em produção sensível.

---

## 📄 Licença

Uso interno — Grupo Visão © 2026. Todos os direitos reservados.
