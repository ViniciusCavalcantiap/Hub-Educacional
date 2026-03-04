# 📚 Hub Educacional

Plataforma de gerenciamento de materiais educacionais com geração automática de descrições e tags via Inteligência Artificial.

A aplicação é totalmente containerizada com Docker Compose, garantindo consistência entre ambientes e persistência de dados.

---

## 🗂️ Estrutura do Projeto

### Frontend

```
frontend/
└── src/
    ├── assets/
    ├── components/         # Componentes de UI isolados
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   ├── ConfirmDeleteModal.jsx
    │   ├── FeedbackModal.jsx
    │   ├── FormInput.jsx
    │   ├── FormTextarea.jsx
    │   ├── Header.jsx
    │   ├── Pagination.jsx
    │   ├── ResourceFormModal.jsx
    │   ├── ResourceList.jsx
    │   └── ResourceToolbar.jsx
    ├── hooks/              # Lógica reutilizável via Custom Hooks
    │   ├── useFeedback.js
    │   ├── useModal.js
    │   ├── usePagination.js
    │   └── useResources.js
    ├── services/           # Chamadas HTTP centralizadas
    │   ├── api.js
    │   └── resourceService.js
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

**Stack:** JavaScript · React · Tailwind CSS

**Padrões adotados:**
- Componentização isolada (UI desacoplada)
- Custom Hooks para lógica reutilizável
- Camada de Services para centralização das chamadas à API
- Separação clara entre estado, interface e comunicação com o backend

### Backend

```
backend/
├── app/
│   ├── routers/            # Endpoints REST
│   ├── services/           # Regras de negócio
│   ├── database.py         # Configuração e sessão do banco
│   ├── models.py           # Estrutura do banco de dados
│   ├── schemas.py          # Contratos da API
│   └── main.py
├── data/
├── tests/
│   ├── conftest.py
│   ├── test_resource.py
│   └── test_smart_assist.py
├── Dockerfile
├── requirements.txt
└── .env
```

**Stack:** Python · FastAPI · SQLite · SQLAlchemy


---

## 🐳 Como Rodar

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Isso irá buildar e subir o backend e o frontend, além de criar o volume para persistência do banco de dados.

### Acessos

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (Swagger UI) | http://localhost:8000/docs |

---

## 🔐 Variáveis de Ambiente

O projeto usa **dois arquivos `.env`** distintos. Nenhum deles deve ser versionado no Git.

### 1. `.env` da raiz — chave da IA

Crie o arquivo na raiz do projeto, no mesmo nível do `docker-compose.yml`:

```
Hub-educacional/
├── .env              ← AQUI
├── backend/
├── frontend/
└── docker-compose.yml
```

Conteúdo:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Essa variável é injetada automaticamente no container do backend via Docker Compose.

### 2. `frontend/.env` — URL da API

Crie o arquivo dentro da pasta `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

Define a URL base da API consumida pelo frontend. No ambiente Docker, a comunicação entre os serviços já está configurada no `docker-compose.yml`.

---

## 🗄️ Persistência de Dados

O banco SQLite fica salvo em `backend/data/database.db`. Como há um volume Docker configurado, **reiniciar o container não apaga os dados**.

---

## 🧪 Testes

Execute os testes dentro do container do backend:

```bash
docker compose exec backend pytest
```

Saída esperada: **5 passed**

---

## 🎨 Qualidade de Código

Verificação de formatação com Black:

```bash
docker compose exec backend black --check .
```

---

## ✨ Destaques Técnicos

- Arquitetura modular no backend e no frontend
- Integração com LLM (Google Gemini)
- Testes automatizados
- Containerização completa com Docker Compose
