import { useState } from "react";

import "./UploadResume.css";

function UploadResume({
  resumeUploaded,
  setResumeUploaded
}) {

  const [file, setFile] = useState(null);

  const [uploading, setUploading] = useState(false);


  const handleFileChange = (event) => {

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {

      alert("Please select a PDF file.");

      return;
    }

    setFile(selectedFile);
  };


  const uploadResume = async () => {

    if (!file) {

      alert("Please choose a PDF file.");

      return;
    }

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);


    try {

      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();


      if (data.success) {

        setResumeUploaded(true);

      } else {

        alert(data.message);

      }

    } catch (error) {

      alert("Backend connection failed.");

    } finally {

      setUploading(false);

    }
  };


  return (

    <div className="upload-section">

      <h3>
        ☁️ Upload Resume
      </h3>


      <div className="upload-box">

        <div className="cloud-icon">
          ☁️
        </div>

        <h4>Upload your resume</h4>

        <p>PDF files only</p>


        <div className="file-row">

          <label className="choose-file">

            Choose File

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />

          </label>


          {file && (
            <div className="file-name">

              {file.name}

              <span
                onClick={() => setFile(null)}
              >
                ×
              </span>

            </div>
          )}

        </div>


        <button
          className="upload-button"
          onClick={uploadResume}
          disabled={uploading}
        >

          {uploading
            ? "Uploading..."
            : "Upload Resume"
          }

        </button>

      </div>


      {resumeUploaded && (

        <div className="upload-success">

          <div className="success-icon">
            ✓
          </div>

          <div>
            <strong>
              Resume uploaded successfully!
            </strong>

            <p>
              You can now ask questions.
            </p>
          </div>

        </div>

      )}

    </div>

  );
}

export default UploadResume;