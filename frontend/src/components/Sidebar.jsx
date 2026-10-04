import UploadResume from "./UploadResume";
import QuickQuestions from "./QuickQuestions";

import "./Sidebar.css";

function Sidebar({
  resumeUploaded,
  setResumeUploaded,
  askQuestion
}) {

  return (

    <aside className="sidebar">

      {/* Logo */}

      <div className="brand">

        <div className="brand-icon">
          📄
        </div>

        <div>
          <h2>Resume RAG</h2>
          <p>AI Document Assistant</p>
        </div>

      </div>


      {/* Chat Button */}

      <div className="sidebar-menu active">
        <span>⌂</span>
        <span>Chat</span>
      </div>


      {/* Upload */}

      <UploadResume
        resumeUploaded={resumeUploaded}
        setResumeUploaded={setResumeUploaded}
      />


      {/* Quick Questions */}

      <QuickQuestions
        askQuestion={askQuestion}
      />


      {/* Backend */}

      <div className="backend-status">

        <div className="status-dot"></div>

        <div>
          <strong>Backend Connected</strong>
          <p>FastAPI + ChromaDB + Ollama</p>
        </div>

      </div>

    </aside>

  );
}

export default Sidebar;