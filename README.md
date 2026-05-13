# Biy.ae — My Personal Local AI Assistant (WIP)

Biy.ae is my ongoing attempt to build a fully local, privacy‑first AI assistant that I can own, extend, and evolve over time. I use large language models every day, but I also believe in building my own tools — tools I understand, control, and can shape around my workflow. This project is my personal ecosystem for research, organization, and experimentation with LLMs and agent‑like systems.

This is an evolving project, not a one‑off build. I expect it to grow, change, and gain new capabilities as I learn and as my needs shift.

---

## Current Status

The project is in its early development phase.  
Right now, the repository contains **only the frontend**, while the backend and LLM service are being built in parallel.

I’ve finalized the backend direction:  
- **Backend Framework:** Python + FastAPI  
- **LLM Service:** Local inference (Ollama, llama.cpp, vLLM, etc.)  
- **Frontend:** React

Dockerized deployment is planned, but **not implemented yet**.

---

## Architecture Overview

Biy.ae is structured around four core services, each running independently and eventually orchestrated through Docker for portability and clean separation.

### 1. Frontend (React)
- Built with React  
- Served through Apache or another lightweight web server in production  
- Provides the UI for:
  - Chat interactions  
  - Research tools  
  - Templates  
  - User data and settings  
- Long‑term goal: expand beyond the browser into desktop and mobile applications

### 2. Backend (FastAPI — Python)
- Acts as the API layer between the frontend, LLM engine, and database  
- Handles:
  - Authentication  
  - Routing  
  - Business logic  
  - Model orchestration  
- FastAPI chosen for:
  - Strong async performance  
  - Clean API design  
  - Excellent Python ecosystem support  

### 3. LLM Service
Runs locally using engines such as:
- Ollama  
- llama.cpp  
- vLLM  
- Other inference backends

Responsibilities:
- Model loading and inference  
- Prompt routing  
- Custom logic for how the model handles requests  

Future direction:
- A “programmatic model” system similar to DeepSeek’s function logic  
- Optional agent‑like behavior if interfaces allow  

### 4. Database Layer
I am still deciding on the exact database stack, but I expect to use two types of storage:

**Primary Database**
- User accounts (if multi‑user mode is ever needed)  
- Conversation history  
- System metadata  

**Secondary / Extended Storage**
- Larger structured data (contacts, notes, research artifacts)  
- Templates and user‑defined resources  
- Potential vector storage for embeddings  

---

## Planned Features

### Core
- Local LLM chat  
- Organized conversation history  
- Research assistance  
- Information structuring and templating  
- Modular backend logic for custom workflows  

### Future
- Speech‑to‑text input using open‑source models  
- Agent‑like behavior (tool use, function calling)  
- Desktop and mobile applications  
- Plugin or extension system  
- Multi‑user support (optional)  
- Research automation pipelines  

---

## Philosophy

I believe in building my own tools. While I rely on LLMs, I want to understand them, control them, and shape them into something that fits my workflow instead of the other way around.

Biy.ae is meant to be:
- Local  
- Private  
- Extensible  
- Modular  
- Evolving  

This is a long‑term project that will grow as I grow.

---

## Setup (Current — Frontend Only)

The backend and LLM services are not yet included in this repository.  
For now, you can run the **frontend** locally:

### 1. Clone the repository
```bash
git clone https://github.com/Number-68/Biy-ae.git
cd Biy-ae
```

### 2. Install Node dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The frontend will run on your local machine (usually at `http://localhost:5173` or similar depending on your setup).

As the backend and LLM service are added, this section will expand with full environment setup, API configuration, and eventually Docker instructions.

---

## Deployment (Future)

I plan to containerize everything using Docker so the system can run on:
- Linux  
- Windows  
- macOS  

The goal is a plug‑and‑play local AI assistant that can be deployed anywhere with minimal setup.

---

## Use Cases

- Personal research assistant  
- Information organization  
- Local privacy‑first AI chat  
- Experimentation with LLMs and agent logic  
- Custom automation workflows  
- Template‑based writing and documentation  
