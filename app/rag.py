from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_chroma import Chroma

import os
import shutil


PDF_PATH = "data/resume.pdf"
DB_PATH = "chroma_db"


def create_vector_database():

    print("Loading PDF...")

    loader = PyPDFLoader(PDF_PATH)

    documents = loader.load()

    print("PDF loaded.")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    print("Creating embeddings...")

    embeddings = OllamaEmbeddings(
        model="nomic-embed-text"
    )

    # Delete old database
    if os.path.exists(DB_PATH):
        shutil.rmtree(DB_PATH)

    Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=DB_PATH
    )

    print("Vector database created successfully.")


def ask_question(question: str):

    embeddings = OllamaEmbeddings(
        model="nomic-embed-text"
    )

    vectorstore = Chroma(
        persist_directory=DB_PATH,
        embedding_function=embeddings
    )

    results = vectorstore.similarity_search(
        question,
        k=3
    )

    context = "\n\n".join(
        doc.page_content
        for doc in results
    )

    prompt = f"""
You are a helpful Resume RAG Assistant.

Answer the question using only the information
available in the provided context.

If the answer is not available in the context,
say that the information is not available
in the uploaded resume.

Context:
{context}

Question:
{question}

Answer:
"""

    llm = OllamaLLM(
        model="llama3.2"
    )

    answer = llm.invoke(prompt)

    return answer
