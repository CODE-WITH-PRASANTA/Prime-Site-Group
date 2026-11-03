import React, { useEffect, useRef, useState } from "react";
import "./CareerFour.css";
import primeCareerImage from "../../assets/prime-four.png";

const careerJobs = [
  {
    id: 1,
    title: "Operations Executive",
    location: "Bhubaneswar, Odisha",
    type: "Full-time",
    department: "Operations",
    description:
      "Oversee day-to-day operations, coordinate with teams, and ensure reliable service delivery for our clients.",
  },
  {
    id: 2,
    title: "Security Supervisor",
    location: "Bhubaneswar, Odisha",
    type: "Full-time",
    department: "Security Services",
    description:
      "Lead and manage security personnel, maintain compliance, and ensure a safe and secure working environment.",
  },
  {
    id: 3,
    title: "Facility Operations Manager",
    location: "Bhubaneswar, Odisha",
    type: "Full-time",
    department: "Facility Management",
    description:
      "Manage facility services, vendor coordination, and operational efficiency across client locations.",
  },
];

const CareerFour = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
  });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handlePositionChange = (event) => {
    const value = event.target.value;

    setSelectedPosition(value);

    setFormData((previous) => ({
      ...previous,
      position: value,
    }));

    setErrors((previous) => ({
      ...previous,
      position: "",
    }));

    setSuccessMessage("");
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    setSuccessMessage("");

    if (!file) {
      setFormData((previous) => ({
        ...previous,
        resume: null,
      }));

      setResumeName("");
      return;
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;
    const maxFileSize = 5 * 1024 * 1024;

    if (!allowedExtensions.test(file.name)) {
      setErrors((previous) => ({
        ...previous,
        resume: "Please upload a PDF, DOC, or DOCX file.",
      }));

      event.target.value = "";
      setResumeName("");

      setFormData((previous) => ({
        ...previous,
        resume: null,
      }));

      return;
    }

    if (file.size > maxFileSize) {
      setErrors((previous) => ({
        ...previous,
        resume: "Your resume must be smaller than 5 MB.",
      }));

      event.target.value = "";
      setResumeName("");

      setFormData((previous) => ({
        ...previous,
        resume: null,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      resume: file,
    }));

    setResumeName(file.name);

    setErrors((previous) => ({
      ...previous,
      resume: "",
    }));
  };

  const scrollToApplication = (position = "") => {
    if (position) {
      setSelectedPosition(position);

      setFormData((previous) => ({
        ...previous,
        position,
      }));
    }

    setSuccessMessage("");

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.position) {
      newErrors.position = "Please select a position.";
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload your resume.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      /*
       * Frontend-only demonstration:
       * Connect this FormData to your backend API to actually
       * submit applications and upload resumes to your server.
       */

      const applicationData = new FormData();

      applicationData.append("fullName", formData.fullName.trim());
      applicationData.append("email", formData.email.trim());
      applicationData.append("phone", formData.phone.trim());
      applicationData.append("position", formData.position);
      applicationData.append("resume", formData.resume);

      // Connect your application API here before deploying.
      // Example:
      // await API.post("/career/apply", applicationData);

      console.info(
        "Application validated. Connect the backend API to submit it.",
        {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          position: formData.position,
          resume: formData.resume.name,
        }
      );

      setSuccessMessage(
        "Your application details are valid! Connect the backend API to submit your application."
      );
    } catch (error) {
      console.error("Application error:", error);

      setSuccessMessage(
        "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`CareerFour ${
        isVisible ? "CareerFour--visible" : ""
      }`}
      aria-label="Prime Site career opportunities"
    >
      <div className="CareerFour__container">
        {/* SECTION 1: CURRENT OPENINGS */}

        <div className="CareerFour__heading">
          <div className="CareerFour__eyebrow">
            <span className="CareerFour__eyebrowLine" />
            <span>Current Openings</span>
          </div>

          <h2 className="CareerFour__sectionTitle">
            Explore Career{" "}
            <span>Opportunities</span>
          </h2>

          <p className="CareerFour__sectionDescription">
            Discover roles that match your skills and become part
            of Prime Site&apos;s growing team.
          </p>
        </div>

        <div className="CareerFour__jobs">
          {careerJobs.map((job, index) => (
            <article
              className="CareerFour__jobCard"
              key={job.id}
              style={{ "--CareerFour-delay": `${index * 130}ms` }}
            >
              <div className="CareerFour__jobTop">
                <div className="CareerFour__jobIcon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="14"
                      rx="2"
                    />
                    <path d="M8 7V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V7" />
                    <path d="M3 12h18M10 12v2h4v-2" />
                  </svg>
                </div>

                <span className="CareerFour__jobType">
                  {job.type}
                </span>
              </div>

              <h3 className="CareerFour__jobTitle">
                {job.title}
              </h3>

              <div className="CareerFour__jobLocation">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <span>{job.location}</span>
              </div>

              <p className="CareerFour__jobDescription">
                {job.description}
              </p>

              <div className="CareerFour__jobFooter">
                <span className="CareerFour__department">
                  {job.department}
                </span>

                <button
                  type="button"
                  className="CareerFour__applyButton"
                  onClick={() => scrollToApplication(job.title)}
                  aria-label={`Apply for ${job.title}`}
                >
                  <span>View &amp; Apply</span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* SECTION 2: APPLICATION IMAGE + FORM */}

        <div
          ref={formRef}
          className="CareerFour__application"
          id="career-application"
        >
          <div className="CareerFour__imageColumn">
            <div className="CareerFour__imageFrame">
              <img
                src={primeCareerImage}
                alt="Prime Site corporate workplace and career opportunities"
                className="CareerFour__image"
                loading="lazy"
              />

              <div className="CareerFour__imageOverlay" />

              <div className="CareerFour__imageBadge">
                <span className="CareerFour__badgeIcon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3 14.7 8.3 20.5 9.1 16.3 13.2 17.3 19 12 16.2 6.7 19 7.7 13.2 3.5 9.1 9.3 8.3 12 3Z" />
                  </svg>
                </span>

                <div>
                  <strong>Grow With Prime Site</strong>
                  <span>Your next chapter starts here.</span>
                </div>
              </div>
            </div>

            <div className="CareerFour__imageAccent" />
          </div>

          <div className="CareerFour__formColumn">
            <div className="CareerFour__eyebrow">
              <span className="CareerFour__eyebrowLine" />
              <span>Apply Now</span>
            </div>

            <h2 className="CareerFour__formTitle">
              Take the <span>Next Step</span>
            </h2>

            <p className="CareerFour__formDescription">
              Tell us about yourself. Our recruitment team can
              review your profile when you submit your application.
            </p>

            <form
              className="CareerFour__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="CareerFour__formGrid">
                {/* FULL NAME */}

                <div className="CareerFour__field">
                  <label htmlFor="CareerFour-fullName">
                    Full Name <span>*</span>
                  </label>

                  <div
                    className={`CareerFour__inputWrap ${
                      errors.fullName
                        ? "CareerFour__inputWrap--error"
                        : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                    </svg>

                    <input
                      id="CareerFour-fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName
                          ? "CareerFour-fullName-error"
                          : undefined
                      }
                    />
                  </div>

                  {errors.fullName && (
                    <span
                      className="CareerFour__error"
                      id="CareerFour-fullName-error"
                    >
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* EMAIL */}

                <div className="CareerFour__field">
                  <label htmlFor="CareerFour-email">
                    Email Address <span>*</span>
                  </label>

                  <div
                    className={`CareerFour__inputWrap ${
                      errors.email
                        ? "CareerFour__inputWrap--error"
                        : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m3 7 9 6 9-6" />
                    </svg>

                    <input
                      id="CareerFour-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email
                          ? "CareerFour-email-error"
                          : undefined
                      }
                    />
                  </div>

                  {errors.email && (
                    <span
                      className="CareerFour__error"
                      id="CareerFour-email-error"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* PHONE */}

                <div className="CareerFour__field">
                  <label htmlFor="CareerFour-phone">
                    Phone Number <span>*</span>
                  </label>

                  <div
                    className={`CareerFour__inputWrap ${
                      errors.phone
                        ? "CareerFour__inputWrap--error"
                        : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2.1Z" />
                    </svg>

                    <input
                      id="CareerFour-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone
                          ? "CareerFour-phone-error"
                          : undefined
                      }
                    />
                  </div>

                  {errors.phone && (
                    <span
                      className="CareerFour__error"
                      id="CareerFour-phone-error"
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* POSITION */}

                <div className="CareerFour__field">
                  <label htmlFor="CareerFour-position">
                    Position of Interest <span>*</span>
                  </label>

                  <div
                    className={`CareerFour__inputWrap ${
                      errors.position
                        ? "CareerFour__inputWrap--error"
                        : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="7"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
                    </svg>

                    <select
                      id="CareerFour-position"
                      name="position"
                      value={selectedPosition}
                      onChange={handlePositionChange}
                      aria-invalid={Boolean(errors.position)}
                      aria-describedby={
                        errors.position
                          ? "CareerFour-position-error"
                          : undefined
                      }
                    >
                      <option value="">
                        Select a position
                      </option>

                      {careerJobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}

                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {errors.position && (
                    <span
                      className="CareerFour__error"
                      id="CareerFour-position-error"
                    >
                      {errors.position}
                    </span>
                  )}
                </div>
              </div>

              {/* RESUME UPLOAD */}

              <div className="CareerFour__resumeField">
                <label htmlFor="CareerFour-resume">
                  Upload Resume <span>*</span>
                </label>

                <div
                  className={`CareerFour__resumeWrap ${
                    errors.resume
                      ? "CareerFour__inputWrap--error"
                      : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21.4 11.1 12.2 20.3a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
                  </svg>

                  <input
                    ref={fileInputRef}
                    id="CareerFour-resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                    aria-invalid={Boolean(errors.resume)}
                    aria-describedby={
                      errors.resume
                        ? "CareerFour-resume-error"
                        : "CareerFour-resume-help"
                    }
                  />
                </div>

                <div className="CareerFour__resumeBottom">
                  <span
                    className="CareerFour__resumeName"
                    title={resumeName}
                  >
                    {resumeName || "No file chosen"}
                  </span>

                  <span
                    className="CareerFour__resumeHelp"
                    id="CareerFour-resume-help"
                  >
                    Accepted: PDF, DOC, DOCX (Max 5 MB)
                  </span>
                </div>

                {errors.resume && (
                  <span
                    className="CareerFour__error"
                    id="CareerFour-resume-error"
                  >
                    {errors.resume}
                  </span>
                )}
              </div>

              {/* SUBMIT */}

              <div className="CareerFour__submitArea">
                <button
                  type="submit"
                  className="CareerFour__submitButton"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting
                      ? "Processing..."
                      : "Submit Application"}
                  </span>

                  {!isSubmitting && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                </button>

                <span className="CareerFour__requiredNote">
                  <span>*</span> Required fields
                </span>
              </div>

              {successMessage && (
                <div
                  className="CareerFour__message"
                  role="status"
                  aria-live="polite"
                >
                  {successMessage}
                </div>
              )}
            </form>

            <div className="CareerFour__privacyNote">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2"
                />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <span>
                Your information should be handled securely and
                used only for recruitment purposes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerFour;