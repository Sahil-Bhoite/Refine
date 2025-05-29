# Refine - AI Resume Optimizer

Refine is a full-stack web application that leverages the power of AI to help users evaluate and optimize their resumes based on specific job descriptions. Users can upload their resume (in LaTeX format) and a job description, receive a detailed evaluation with scores and feedback for different sections, and get a refined version of their resume aimed at better alignment with the job requirements.

## Features

*   **Resume Evaluation:** Get a score and detailed feedback on how well your resume matches a job description across various categories (Experience, Skills, Projects, Education, etc.).
*   **AI-Powered Refinement:** Receive an optimized version of your resume (in LaTeX format) with content adjusted to better highlight relevant experience and skills based on the job description and evaluation feedback.
*   **Step-by-Step Process:** A clear, guided workflow from uploading your documents to viewing the refined resume.

## Technologies Used

**Backend:**

*   Python
*   FastAPI
*   OpenAI API

**Frontend:**

*   React
*   TypeScript
*   Vite
*   Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:

*   Python 3.7+
*   pip (Python package installer)
*   Node.js (LTS version recommended)
*   npm or yarn (Node.js package manager)
*   Git

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sahil-Bhoite/Refine.git
    cd Refine
    ```

2.  **Backend Setup:**
    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Install the required Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    *   Create a `.env` file in the `backend` directory.
    *   Add your OpenAI API key to the `.env` file:
        ```env
        OPENAI_API_KEY="your_openai_api_key_here"
        ```
        Replace `"your_openai_api_key_here"` with your actual OpenAI API key.

3.  **Frontend Setup:**
    *   Navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    *   Install the required Node.js dependencies:
        ```bash
        npm install
        # or yarn install
        ```
    *   (Optional) If your backend is running on a different URL than `http://localhost:8000`, create a `.env` file in the `frontend` directory and add the backend API base URL:
        ```env
        VITE_API_BASE_URL="your_backend_api_url"
        ```

## Running the Application

You need to run both the backend and the frontend concurrently.

1.  **Run the Backend:**
    *   Open a new terminal window.
    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Start the FastAPI server:
        ```bash
        uvicorn app.main:app --reload
        ```
    The backend will run on `http://127.0.0.1:8000` by default.

2.  **Run the Frontend:**
    *   Open another terminal window.
    *   Navigate to the `frontend` directory:
        ```bash
        cd frontend
        ```
    *   Start the Vite development server:
        ```bash
        npm run dev
        # or yarn dev
        ```
    The frontend will typically run on `http://localhost:5173/`. Open this URL in your web browser to access the application.

---

Powered by OpenAI
Refine
Beta
