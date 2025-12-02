# PDF RAG Chatbot

A full-stack Retrieval-Augmented Generation (RAG) application that allows you to upload PDF documents and ask questions about their content.

This project consists of two main components:
- **Client**: A modern frontend built with **Next.js**.
- **Server**: A robust backend API built with **FastAPI**, **Pinecone**, and **Hugging Face** models.

---

## 📂 Project Structure

- **`Client/`**: Contains the frontend source code (Next.js, React, Tailwind CSS).
- **`RAG_PDF_QnA_Chatbot/`**: Contains the backend source code (FastAPI, Python scripts).

---

## 🚀 Getting Started

Follow these instructions to set up and run both the backend and frontend locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Pinecone API Key** (Sign up at [pinecone.io](https://www.pinecone.io/))

---

### 1️⃣ Backend Setup (Server)

1.  **Navigate to the server directory:**
    ```bash
    cd RAG_PDF_QnA_Chatbot
    ```

2.  **Create and activate a virtual environment (optional but recommended):**
    ```bash
    # Windows
    python -m venv venv
    venv\Scripts\activate

    # macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the `RAG_PDF_QnA_Chatbot` directory and add your Pinecone API key:
    ```env
    PINECONE_API_KEY=your_pinecone_api_key_here
    ```

5.  **Start the Backend Server:**
    ```bash
    uvicorn main:app --reload
    ```
    The server will start at `http://localhost:8000`.
    - API Docs: `http://localhost:8000/docs`

---

### 2️⃣ Frontend Setup (Client)

1.  **Open a new terminal and navigate to the client directory:**
    ```bash
    cd Client
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Start the Frontend Development Server:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 🛠 Architecture & Tech Stack

### Backend (Server)
-   **Framework**: FastAPI
-   **Vector DB**: Pinecone
-   **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
-   **LLM**: `google/flan-t5-base`
-   **PDF Processing**: pypdf

### Frontend (Client)
-   **Framework**: Next.js, Typescript
-   **Styling**: Tailwind CSS
-   **UI Components**: Radix UI / Shadcn UI

---

## ✨ Features

-   **PDF Ingestion**: Upload PDF files to extract text and chunk it for processing.
-   **Vector Search**: Uses Pinecone to store and retrieve relevant text chunks based on semantic similarity.
-   **Question Answering**: Generates answers using the `google/flan-t5-base` LLM, grounded in the retrieved context.
-   **Interactive UI**: Chat interface to interact with your documents easily.

---

## 🐳 Docker Setup (Optional)

You can run the backend using Docker.

1.  **Build the image:**
    ```bash
    cd RAG_PDF_QnA_Chatbot
    docker build -t pdf-rag-app .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 8000:8000 --env-file .env pdf-rag-app
    ```