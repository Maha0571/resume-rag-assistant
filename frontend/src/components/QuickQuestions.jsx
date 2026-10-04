import "./QuickQuestions.css";

function QuickQuestions({ askQuestion }) {

  const questions = [
    {
      icon: "💻",
      text: "What are the technical skills?"
    },
    {
      icon: "💼",
      text: "What projects are mentioned?"
    },
    {
      icon: "🎓",
      text: "What is the educational qualification?"
    }
  ];


  return (

    <div className="quick-section">

      <h3>
        ⚡ Quick Questions
      </h3>


      {questions.map((item, index) => (

        <button
          className="quick-question"
          key={index}
          onClick={() => askQuestion(item.text)}
        >

          <span className="quick-icon">
            {item.icon}
          </span>

          <span>
            {item.text}
          </span>

          <span className="arrow">
            ›
          </span>

        </button>

      ))}

    </div>

  );
}

export default QuickQuestions;