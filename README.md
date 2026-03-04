# 📚 Hub Educacional

Plataforma para gerenciamento de materiais educacionais com geração automática de descrições e tags utilizando Inteligência Artificial.

A aplicação é totalmente containerizada e executada via Docker Compose, garantindo consistência entre ambientes e persistência de dados.

# 🖥️ Arquitetura do Frontend

Estrutura baseada em separação clara de responsabilidades:

```
frontend/
└── src/
    ├── assets/
    ├── components/
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
    │
    ├── hooks/
    │   ├── useFeedback.js
    │   ├── useModal.js
    │   ├── usePagination.js
    │   └── useResources.js
    │
    ├── services/
    │   ├── api.js
    │   └── resourceService.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## Padrões Utilizados

* **Componentização isolada** (UI desacoplada)
* **Custom Hooks** para lógica reutilizável
* **Camada de Services** para centralização de chamadas HTTP
* Separação clara entre estado, interface e comunicação com API

---

# ⚙️ Arquitetetura do Backend

```
backend/
├── app/
│   ├── routers/
│   ├── services/
│   ├── __init__.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── schemas.py
│
├── data/
│
├── tests/
│   ├── conftest.py
│   ├── test_resource.py
│   └── test_smart_assist.py
│
├── .dockerignore
├── .env
├── .flake8
├── database.db
├── Dockerfile
├── requirements.txt
└── test.db
```

## Arquitetura modular seguindo boas práticas:

* models → estrutura do banco
* schemas → contratos da API
* routes → endpoints REST
* database → configuração e sessão

Banco utilizado: SQLite via SQLAlchemy.

Persistência garantida via volume Docker.

---

# 🐳 Como Rodar o Projeto

Na raiz do projeto:

```bash
docker compose up --build
```

Isso irá:

* Buildar o backend
* Buildar o frontend
* Criar volume para persistência do banco
* Subir os containers

---

## 🔗 Acessos

Backend (Swagger UI):

```
http://localhost:8000/docs
```

Frontend:

```
http://localhost:3000
```

---

# 🔐 Configuração de Variáveis de Ambiente

O projeto utiliza DOIS arquivos `.env` distintos.

---

## 1️⃣ .env da Raiz (Chave da IA)

Crie um arquivo `.env` na RAIZ do projeto (mesmo nível do docker-compose.yml):

```
Hub-educacional/
├── .env   ← AQUI
├── backend/
├── frontend/
└── docker-compose.yml
```

Conteúdo:

```
GEMINI_API_KEY=sua_chave_aqui
```

Essa variável será injetada no container do backend via Docker Compose.

⚠️ Nunca suba esse arquivo para o GitHub.

---

## 2️⃣ .env do Frontend

Dentro da pasta frontend, crie outro `.env`:

```
frontend/
└── .env   ← AQUI
```

Exemplo de conteúdo:

```
VITE_API_URL=http://localhost:8000
```

Essa variável define a URL base da API consumida pelo frontend.

No ambiente Docker, o frontend se comunica corretamente com o backend via serviço interno definido no docker-compose.

---

# 🗄 Persistência de Dados

O banco SQLite é salvo em:

```
backend/data/database.db
```

Como há volume Docker configurado:

* Reiniciar container NÃO apaga os dados
* Os materiais permanecem salvos

---

# 🧪 Testes Automatizados

Para rodar os testes dentro do backend:

```bash
docker compose exec backend pytest
```

Saída esperada:

```
5 passed
```

---

# 🎨 Padronização de Código

Verificação com Black:

```bash
docker compose exec backend black --check .
```

---

# 📈 Diferenciais Técnicos

* Arquitetura modular backend e frontend
* Separação clara de camadas
* Integração com LLM
* Testes automatizados
* Containerização completa