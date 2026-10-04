import "./Message.css";

function Message({ type, text }) {

  const isUser = type === "user";


  return (

    <div
      className={`message-row ${
        isUser ? "user-row" : "ai-row"
      }`}
    >

      {!isUser && (

        <div className="ai-avatar">
          🤖
        </div>

      )}


      <div>

        <div
          className={`message-bubble ${
            isUser
              ? "user-message"
              : "ai-message"
          }`}
        >

          {text}

        </div>


        <div className="message-time">

          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}

        </div>

      </div>


      {isUser && (

        <div className="user-avatar">
          👤
        </div>

      )}

    </div>

  );
}

export default Message;