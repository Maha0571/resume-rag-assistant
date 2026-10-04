import { useState } from "react";

import Message from "./Message";

import "./ChatArea.css";

function ChatArea({
  messages,
  askQuestion,
  loading
}) {

  const [question, setQuestion] = useState("");


  const handleSubmit = (event) => {

    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    askQuestion(question);

    setQuestion("");
  };


  return (

    <main className="chat-area">


      {/* Header */}

      <header className="chat-header">

        <div>

          <h1>
            Resume AI Assistant
          </h1>

          <p>
            Ask a question and get answers from your resume using RAG
          </p>

        </div>


        <div className="profile-icon">
          👤
        </div>

      </header>


      {/* Chat */}

      <div className="chat-container">

        {messages.length === 0 && (

          <div className="welcome">

            <div className="welcome-icon">
              🤖
            </div>

            <h2>
              Resume AI Assistant
            </h2>

            <p>
              Upload your resume and start asking questions.
            </p>

          </div>

        )}


        {messages.map((message, index) => (

          <Message
            key={index}
            type={message.type}
            text={message.text}
          />

        ))}


        {loading && (

          <Message
            type="ai"
            text="Thinking..."
          />

        )}

      </div>


      {/* Input */}

      <form
        className="question-form"
        onSubmit={handleSubmit}
      >

        <button
          type="button"
          className="attach-button"
        >
          📎
        </button>


        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your resume..."
        />


        <button
          type="submit"
          className="send-button"
          disabled={loading}
        >
          ➤
        </button>

      </form>

    </main>

  );
}

export default ChatArea;