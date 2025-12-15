# Qualifica Leads

A customer service tool for lead qualification built with Next.js, React, and Python.

## Project Structure

```
qualifica-leads/
├── src/                    # Next.js frontend
│   ├── app/               # App router pages
│   └── components/        # React components
├── backend/               # Python FastAPI backend
│   ├── main.py           # FastAPI application
│   └── requirements.txt  # Python dependencies
└── README.md
```

## Getting Started

### Frontend (Next.js)

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Backend (Python FastAPI)

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the API server:
```bash
python main.py
```

The API will be available at [http://localhost:8000](http://localhost:8000)

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Ant Design, Tailwind CSS
- **Backend**: Python, FastAPI, Uvicorn
- **Development**: ESLint, TypeScript

## Features

- Modern React with Next.js App Router
- Ant Design UI components with custom theme
- FastAPI backend with CORS configuration
- TypeScript for type safety
- Responsive design with Tailwind CSS