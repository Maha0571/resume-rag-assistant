import { useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

import "./App.css";

function App() {

  const [resumeUploaded, setResumeUploaded] = useState(false);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const askQuestion = async (question) => {

    if (!resumeUploaded) {
      alert("Please upload your resume first.");
      return;
    }

    if (!question.trim()) {
      return;
    }

    const userMessage = {
      type: "user",
      text: question
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/ask",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            question: question
          })
        }
      );

      const data = await response.json();

      const aiMessage = {
        type: "ai",
        text: data.answer
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      const errorMessage = {
        type: "ai",
        text: "Unable to connect to the RAG backend."
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="app">

      <Sidebar
        resumeUploaded={resumeUploaded}
        setResumeUploaded={setResumeUploaded}
        askQuestion={askQuestion}
      />

      <ChatArea
        messages={messages}
        askQuestion={askQuestion}
        loading={loading}
      />

    </div>

  );
}

export default App;