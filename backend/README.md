# Backend (FastAPI)

## Setup

1. Create virtual environment and install dependencies:

```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell
pip install -r backend/requirements.txt
```

2. Environment variables:

- `GRIQ_API_KEY` (optional for MVP fallback). If not set, the backend will produce deterministic text without external calls.

3. Run server:

```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints
- `POST /generate_resume` -> `{ resume: string }`
- `POST /generate_cover_letter` -> `{ cover_letter: string }`
- `POST /export` -> `{ filename, media_type, data }` where `data` is hex-encoded file bytes
