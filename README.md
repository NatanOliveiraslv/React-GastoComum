# 💰 Gasto Comum

Uma aplicação web para gerenciar despesas compartilhadas entre grupos de pessoas, permitindo rastrear gastos individuais e débitos coletivos de forma simples e intuitiva.

## 📋 Tabela de Conteúdos

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Guia de Uso](#guia-de-uso)

## 🎯 Visão Geral

**Gasto Comum** é uma aplicação mobile-first desenvolvida em React que permite:
- Registrar despesas pessoais e em grupo
- Dividir custos entre participantes
- Acompanhar débitos e créditos
- Gerenciar grupos de despesas compartilhadas
- Autenticação com JWT e OAuth2 (Google)

## ✨ Funcionalidades

### Autenticação
- Login com email e senha
- Registro de novos usuários
- Autenticação via Google (OAuth2)
- Token JWT com renovação automática
- Logout seguro

### Gerenciamento de Despesas
- Criar despesas individuais com múltiplas categorias
- Adicionar comprovantes (imagem/PDF)
- Dividir despesas entre usuários
- Visualizar detalhes completos de cada despesa
- Histórico de gastos organizados por data

### Gerenciamento de Grupos
- Criar grupos de despesas compartilhadas
- Adicionar múltiplas despesas a um grupo
- Visualizar resumo do grupo
- Rastrear participantes do grupo

### Dashboard
- Resumo do gasto total do mês
- Gráfico de despesas por categoria
- Gastos recentes
- Débitos recentes

### Relatórios
- Visualizar todos os seus gastos
- Acompanhar débitos pendentes
- Resumo detalhado de despesas divididas

## 🛠 Tecnologias

### Frontend
- **React 19** - Framework UI
- **React Router DOM 7** - Roteamento
- **Tailwind CSS 3** - Estilização
- **Axios** - Cliente HTTP
- **JWT Decode** - Decodificação de tokens
- **React Icons** - Ícones

### Backend (Integração)
- API REST em Java/Spring Boot
- Autenticação JWT com refresh tokens
- OAuth2 com Google
- Armazenamento de arquivos para comprovantes

### DevOps
- **Node.js 18+**
- **GitHub Actions** - CI/CD pipeline

## 📦 Instalação

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn
- Acesso à API backend em execução (https://github.com/NatanOliveiraslv/SpringBoot-GastoComum)

### Passos

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd gasto-comum
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_BASE_URL=http://localhost:8080/api
REACT_APP_OAUTH_BACKEND_URL=http://localhost:8080/oauth2/authorization/google
```

| Variável | Descrição |
|----------|-----------|
| `REACT_APP_BASE_URL` | URL base da API backend |
| `REACT_APP_OAUTH_BACKEND_URL` | URL para autenticação OAuth2 com Google |

## 🚀 Scripts Disponíveis

### `npm start`
Executa o app em modo desenvolvimento.
- Abre [http://localhost:3000](http://localhost:3000) no navegador
- A página recarrega quando há mudanças
- Exibe erros de lint no console

```bash
npm start
```

### `npm run build`
Constrói o app para produção na pasta `build`.
- Otimiza o bundle para melhor performance
- Minifica os arquivos
- Adiciona hashes aos nomes dos arquivos

```bash
npm run build
```

### `npm test`
Executa os testes em modo watch.

```bash
npm test
```

### `npm run eject`
⚠️ **Irreversível!** Ejecta a configuração do Create React App.

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── form/                 # Componentes de formulário
│   │   ├── Input.js
│   │   ├── InputFile.js
│   │   ├── TextArea.js
│   │   ├── SubmitButton.js
│   │   └── SubmitButtonWatcher.js
│   └── layout/               # Componentes de layout
│       ├── TopBar.js         # Barra superior com navegação
│       ├── BottomNav.js      # Navegação inferior
│       ├── Container.js
│       ├── Loading.js
│       ├── UserAvatar.js
│       ├── UserSelectCard.js
│       ├── ExpenseSelectCard.js
│       ├── GroupCard.js
│       ├── DetailCard.js
│       ├── FormattedValue.js # Formatação de moeda
│       ├── FormattedDate.js  # Formatação de datas
│       ├── GetIconType.js    # Ícones por categoria
│       ├── SearchButton.js
│       ├── File.js
│       ├── LogoutButton.js
│       └── PrivateLayout.js
├── contexts/
│   └── AuthContext.js        # Contexto de autenticação
├── pages/                    # Páginas (rotas)
│   ├── Login.js             # Tela de login
│   ├── Register.js          # Registro de usuário
│   ├── LoginOauthSuccess.js # Callback OAuth
│   ├── Home.js              # Dashboard
│   ├── AddExpense.js        # Criar despesa
│   ├── AddExpenseToGroup.js # Adicionar despesa a grupo
│   ├── AddUsersToExpense.js # Adicionar participantes
│   ├── MySpending.js        # Lista de gastos
│   ├── MyDebts.js           # Débitos pendentes
│   ├── Expenses.js          # Placeholder
│   ├── ExpenseDetails.js    # Detalhes da despesa
│   ├── CreateGroup.js       # Criar grupo
│   ├── GroupListPage.js     # Lista de grupos
│   ├── GroupDetails.js      # Detalhes do grupo
│   └── NotFoundPage.js      # Página 404
├── routes/
│   └── PrivateRoute.js      # Proteção de rotas
├── services/
│   ├── Api.js               # Cliente Axios com interceptadores
│   └── AuthClientStore.js   # Gerenciamento de tokens
├── App.js                   # Componente raiz
├── index.js                 # Entrada da app
└── index.css                # Estilos globais
```

## 🔐 Fluxo de Autenticação

### Login com Email/Senha

```
User Input → AuthContext.login() → API /auth/sign-in 
→ Save JWT Token → Fetch User Details → Redirect to /home
```

### Login com Google (OAuth2)

```
User Click "Google" → Backend OAuth URL 
→ Google Consent Screen → Redirect /login-success?accessToken=... 
→ Save Token → Fetch User Details → Redirect to /home
```

## 📱 Guia de Uso

### 1. **Registrar-se**
- Acesse a página de registro
- Preencha nome, sobrenome, email e senha
- Ou use a autenticação com Google

### 2. **Fazer Login**
- Use email e senha ou Google
- Será redirecionado para o Dashboard

### 3. **Criar uma Despesa**
- Clique no botão "Adicionar Despesa"
- Preencha título, valor e descrição
- Selecione a categoria
- Adicione comprovante (opcional)
- Selecione participantes
- Confirme

### 4. **Criar um Grupo**
- Acesse "Lista de Grupos"
- Clique "Criar Novo Grupo"
- Defina nome e descrição
- Adicione despesas existentes
- Confirme

### 5. **Consultar Débitos**
- Acesse "Estou Devendo"
- Visualize todas as despesas compartilhadas
- Veja o total pendente

### 6. **Acompanhar Gastos**
- Acesse "Meus Gastos"
- Visualize histórico de despesas
- Clique para ver detalhes
- Veja participantes envolvidos

## 🎨 Categorias de Despesas

O aplicativo suporta as seguintes categorias:

- 🍽️ **Comida**
- 🚗 **Transporte**
- 💡 **Utilitárias**
- 🏠 **Casa**
- 🎉 **Entretenimento**
- 🏥 **Saúde**
- 🛍️ **Shopping**
- 📚 **Educação**
- ✈️ **Viagem**
- 📌 **Outros**


## 📝 Notas Importantes

- A aplicação foi otimizada para **mobile-first**
- Usa **localStorage** para persistir dados de formulário durante preenchimento
- Implementa **debounce** em buscas para otimizar requisições
- Suporta **upload de comprovantes** (imagem/PDF)
- **Tokens JWT** são armazenados de forma segura no localStorage
- **Interceptadores Axios** gerenciam automaticamente a renovação de tokens

---

**Desenvolvido com ❤️ usando React e Tailwind CSS**