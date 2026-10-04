from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

from app.rag import create_vector_database, ask_question


app = FastAPI(
    title="Resume RAG Assistant",
    version="1.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Resume RAG Backend is running"
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "message": "Please upload a PDF file."
        }

    os.makedirs("data", exist_ok=True)

    file_path = "data/resume.pdf"

    contents = await file.read()

    with open(file_path, "wb") as f:
        f.write(contents)

    create_vector_database()

    return {
        "success": True,
        "filename": file.filename,
        "message": "Resume uploaded and vector database created successfully."
    }


@app.post("/ask")
def ask(data: Question):

    answer = ask_question(data.question)

    return {
        "question": data.question,
        "answer": answer
    }