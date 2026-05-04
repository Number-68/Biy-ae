# Biy.ae — My Personal Local AI Assistant (WIP)

Biy.ae is my ongoing attempt to build a fully local, privacy‑first AI assistant that I can own, extend, and evolve over time. I use large language models every day, but I also believe in building my own tools — tools I understand, control, and can shape around my workflow. This project is my personal ecosystem for research, organization, and experimentation with LLMs and agent‑like systems.

This is an evolving project, not a one‑off build. I expect it to grow, change, and gain new capabilities as I learn and as my needs shift.

---

## Current Status
Right now, I am focused on building the frontend and establishing the foundation for the backend and LLM services. Most of the architecture is still in planning, but the direction is clear.

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

### 2. Backend (Python)
- Acts as the API layer between the frontend, LLM engine, and database
- Handles:
  - Authentication
  - Routing
  - Business logic
  - Model orchestration
- Python chosen for flexibility, speed of development, and strong AI ecosystem

### 3. LLM Service
- Runs locally using engines such as:
  - Ollama
  - Other inference engines (llama.cpp, vLLM, etc.)
- Responsibilities:
  - Model loading and inference
  - Prompt routing
  - Custom logic for how the model handles requests
- Future direction:
  - A “programmatic model” system similar to DeepSeek’s function logic
  - Optional agent behavior if interfaces allow

### 4. Database Layer
I am still deciding on the exact database stack, but I expect to use two types of storage:

#### Primary Database
- User accounts (if multi‑user mode is ever needed)
- Conversation history
- System metadata

#### Secondary / Extended Storage
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

---


## Contributions
This is currently a personal project, but I may open it up to contributions once the architecture stabilizes.

