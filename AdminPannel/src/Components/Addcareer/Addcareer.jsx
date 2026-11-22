
import React, { useRef, useState } from "react";
import "./Addcareer.css";

const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Freelance",
  "Remote",
];

const EXPERIENCE_LEVELS = [
  "Fresher",
  "0–1 Years",
  "1–2 Years",
  "2–3 Years",
  "3–5 Years",
  "5–8 Years",
  "8–10 Years",
  "10+ Years",
];

const INITIAL_FORM = {
  jobTitle: "",
  location: "",
  salary: "",
  experience: "",
  jobType: "",
  description: "",
};

const Icon = ({ name, size = 21 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    rupee: (
      <>
        <path d="M6 4h12M6 9h12M8 4c5 0 7 2 7 5s-2 5-7 5l9 7M6 14h12" />
      </>
    ),
    hourglass: (
      <>
        <path d="M6 2h12M6 22h12M7 2v5l5 5-5 5v5M17 2v5l-5 5 5 5v5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    bold: <path d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z" />,
    italic: <path d="M19 4h-9M14 20H5M15 4 9 20" />,
    underline: (
      <>
        <path d="M6 3v7a6 6 0 0 0 12 0V3M4 21h16" />
      </>
    ),
    strike: (
      <>
        <path d="M5 5c4-3 12-2 12 2 0 2-2 3-5 4M4 19c4 3 12 2 12-2 0-2-2-3-5-4M3 12h18" />
      </>
    ),
    bullet: (
      <>
        <path d="M9 6h12M9 12h12M9 18h12" />
        <circle cx="4" cy="6" r="1" fill="currentColor" />
        <circle cx="4" cy="12" r="1" fill="currentColor" />
        <circle cx="4" cy="18" r="1" fill="currentColor" />
      </>
    ),
    ordered: (
      <>
        <path d="M10 6h11M10 12h11M10 18h11M3 5h2v3M3 12h2l-2 2h2M3 17h2v3H3" />
      </>
    ),
    alignLeft: (
      <>
        <path d="M4 5h16M4 9h11M4 13h16M4 17h11" />
      </>
    ),
    alignCenter: (
      <>
        <path d="M4 5h16M7 9h10M4 13h16M7 17h10" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m10 9 5 3-5 3z" fill="currentColor" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
      </>
    ),
    fullscreen: (
      <>
        <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" />
      </>
    ),
    alignRight: (
      <>
        <path d="M4 5h16M9 9h11M4 13h16M9 17h11" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
};

const Addcareer = ({ onSubmit }) => {
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setNotification(null);
  };

  const handleEditorInput = () => {
    const value = editorRef.current?.innerHTML || "";

    setFormData((prev) => ({
      ...prev,
      description: value,
    }));

    setErrors((prev) => ({
      ...prev,
      description: "",
    }));

    setNotification(null);
  };

  // Rich text editor commands
  const executeCommand = (command, value = null) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    document.execCommand(command, false, value);

    handleEditorInput();
  };

  const insertLink = () => {
    const url = window.prompt("Enter the link URL:");

    if (url && /^https?:\/\//i.test(url)) {
      executeCommand("createLink", url);
    } else if (url) {
      window.alert("Please enter a valid URL starting with https:// or http://");
    }
  };

  const insertImage = () => {
    const url = window.prompt("Enter the image URL:");

    if (url && /^https?:\/\//i.test(url)) {
      editorRef.current?.focus();
      document.execCommand("insertImage", false, url);
      handleEditorInput();
    } else if (url) {
      window.alert("Please enter a valid image URL.");
    }
  };

  const insertVideo = () => {
    const url = window.prompt("Enter the video URL:");

    if (url && /^https?:\/\//i.test(url)) {
      editorRef.current?.focus();

      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">Watch job-related video</a>`;

      document.execCommand("insertHTML", false, link);
      handleEditorInput();
    } else if (url) {
      window.alert("Please enter a valid video URL.");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Please enter a job title.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please enter the job location.";
    }

    if (!formData.salary.trim()) {
      newErrors.salary = "Please enter the salary.";
    }

    if (!formData.experience) {
      newErrors.experience = "Please select experience level.";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Please select a job type.";
    }

    const plainDescription =
      editorRef.current?.innerText?.trim() || "";

    if (!plainDescription) {
      newErrors.description = "Please enter the job description.";
    } else if (plainDescription.length < 20) {
      newErrors.description =
        "Job description must contain at least 20 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setNotification(null);

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    setIsFullscreen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please complete all required fields correctly.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const careerData = {
        ...formData,
        description: editorRef.current?.innerHTML || "",
      };

      if (onSubmit) {
        await onSubmit(careerData);
      }

      setNotification({
        type: "success",
        message: onSubmit
          ? "Career opportunity submitted successfully!"
          : "Form validated successfully. Connect your API to publish this career.",
      });

      if (onSubmit) {
        setFormData(INITIAL_FORM);
        setErrors({});

        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Unable to post career. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <span className="addcareer-error">{errors[field]}</span>
    ) : null;

  const toolbarButton = (name, label, command, value = null) => (
    <button
      type="button"
      className="addcareer-toolbar-btn"
      title={label}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => executeCommand(command, value)}
    >
      <Icon name={name} size={19} />
    </button>
  );

  return (
    <section className="addcareer-page">
      <div className="addcareer-card">

        {/* Header */}
        <div className="addcareer-header">
          <div className="addcareer-header-icon">
            <Icon name="calendar" size={27} />
          </div>

          <div className="addcareer-heading-content">
            <h2>Add Career</h2>
            <p>Post a new job opportunity</p>
          </div>
        </div>

        {/* Form */}
        <form
          className="addcareer-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="addcareer-fields-grid">

            {/* Job Title */}
            <div className="addcareer-field">
              <label htmlFor="addcareer-title">
                Job Title <span>*</span>
              </label>

              <div className={`addcareer-input-wrapper ${errors.jobTitle ? "has-error" : ""}`}>
                <Icon name="briefcase" />

                <input
                  id="addcareer-title"
                  name="jobTitle"
                  type="text"
                  placeholder="Enter job title..."
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>

              {renderError("jobTitle")}
            </div>

            {/* Location */}
            <div className="addcareer-field">
              <label htmlFor="addcareer-location">
                Location <span>*</span>
              </label>

              <div className={`addcareer-input-wrapper ${errors.location ? "has-error" : ""}`}>
                <Icon name="location" />

                <input
                  id="addcareer-location"
                  name="location"
                  type="text"
                  placeholder="Enter location..."
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {renderError("location")}
            </div>

            {/* Salary */}
            <div className="addcareer-field">
              <label htmlFor="addcareer-salary">
                Salary <span>*</span>
              </label>

              <div className={`addcareer-input-wrapper ${errors.salary ? "has-error" : ""}`}>
                <Icon name="rupee" />

                <input
                  id="addcareer-salary"
                  name="salary"
                  type="text"
                  placeholder="Enter salary (e.g. 5L – 8L PA)..."
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {renderError("salary")}
            </div>

            {/* Experience */}
            <div className="addcareer-field">
              <label htmlFor="addcareer-experience">
                Experience <span>*</span>
              </label>

              <div className={`addcareer-input-wrapper addcareer-select-wrapper ${errors.experience ? "has-error" : ""}`}>
                <Icon name="hourglass" />

                <select
                  id="addcareer-experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select experience level...
                  </option>

                  {EXPERIENCE_LEVELS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <span className="addcareer-chevron">
                  <Icon name="chevron" size={19} />
                </span>
              </div>

              {renderError("experience")}
            </div>

            {/* Job Type */}
            <div className="addcareer-field">
              <label htmlFor="addcareer-jobtype">
                Job Type <span>*</span>
              </label>

              <div className={`addcareer-input-wrapper addcareer-select-wrapper ${errors.jobType ? "has-error" : ""}`}>
                <Icon name="clock" />

                <select
                  id="addcareer-jobtype"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select job type...
                  </option>

                  {JOB_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <span className="addcareer-chevron">
                  <Icon name="chevron" size={19} />
                </span>
              </div>

              {renderError("jobType")}
            </div>

          </div>

          {/* Job Description */}
          <div className="addcareer-field addcareer-description-field">
            <label>
              Job Description <span>*</span>
            </label>

            <div
              ref={editorContainerRef}
              className={`addcareer-editor-container ${isFullscreen ? "addcareer-editor-fullscreen" : ""} ${errors.description ? "has-error" : ""}`}
            >

              {/* Toolbar */}
              <div className="addcareer-toolbar">

                {toolbarButton("bold", "Bold", "bold")}
                {toolbarButton("italic", "Italic", "italic")}
                {toolbarButton("underline", "Underline", "underline")}
                {toolbarButton("strike", "Strikethrough", "strikeThrough")}

                <span className="addcareer-toolbar-divider" />

                {toolbarButton("bullet", "Bullet List", "insertUnorderedList")}
                {toolbarButton("ordered", "Numbered List", "insertOrderedList")}

                <span className="addcareer-toolbar-divider" />

                {toolbarButton("alignLeft", "Align Left", "justifyLeft")}
                {toolbarButton("alignCenter", "Align Center", "justifyCenter")}
                {toolbarButton("alignRight", "Align Right", "justifyRight")}

                <span className="addcareer-toolbar-divider" />

                <button
                  type="button"
                  className="addcareer-toolbar-btn"
                  title="Insert Link"
                  aria-label="Insert Link"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={insertLink}
                >
                  <Icon name="link" size={19} />
                </button>

                <button
                  type="button"
                  className="addcareer-toolbar-btn"
                  title="Insert Image"
                  aria-label="Insert Image"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={insertImage}
                >
                  <Icon name="image" size={19} />
                </button>

                <button
                  type="button"
                  className="addcareer-toolbar-btn"
                  title="Insert Video Link"
                  aria-label="Insert Video Link"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={insertVideo}
                >
                  <Icon name="video" size={19} />
                </button>

                <button
                  type="button"
                  className="addcareer-toolbar-btn"
                  title="Code Block"
                  aria-label="Code Block"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => executeCommand("formatBlock", "pre")}
                >
                  <Icon name="code" size={20} />
                </button>

                <span className="addcareer-toolbar-divider" />

                <button
                  type="button"
                  className={`addcareer-toolbar-btn ${isFullscreen ? "active" : ""}`}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  aria-label="Toggle Fullscreen"
                  onClick={toggleFullscreen}
                >
                  <Icon name="fullscreen" size={20} />
                </button>

              </div>

              {/* Editable Area */}
              <div
                ref={editorRef}
                className="addcareer-editor"
                contentEditable
                suppressContentEditableWarning
                role="textbox"
                aria-label="Job description editor"
                aria-multiline="true"
                data-placeholder="Write job description here..."
                onInput={handleEditorInput}
                onBlur={handleEditorInput}
              />
            </div>

            {renderError("description")}
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`addcareer-notification addcareer-notification-${notification.type}`}
              role="status"
              aria-live="polite"
            >
              <span className="addcareer-notification-dot" />
              {notification.message}
            </div>
          )}

          {/* Actions */}
          <div className="addcareer-actions">

            <button
              type="button"
              className="addcareer-reset-btn"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              <Icon name="reset" size={23} />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              className="addcareer-submit-btn"
              disabled={isSubmitting}
            >
              <Icon name="send" size={24} />
              <span>
                {isSubmitting ? "Publishing..." : "Post Career"}
              </span>
            </button>

          </div>
        </form>
      </div>
    </section>
  );
};

export default Addcareer;
