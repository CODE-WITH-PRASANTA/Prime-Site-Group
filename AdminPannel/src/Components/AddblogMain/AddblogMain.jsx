
import React, { useRef, useState, useEffect } from "react";
import "./AddblogMain.css";

const CATEGORIES = [
  "Food & Dining",
  "Technology",
  "Travel",
  "Lifestyle",
  "Business",
  "Health & Fitness",
  "Education",
  "Entertainment",
  "News & Updates",
  "Other",
];

const AddblogMain = ({ onPublish }) => {
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    shortDescription: "",
    tags: "",
    author: "",
    location: "",
    publishImmediately: true,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [editorFullscreen, setEditorFullscreen] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__addBlogToast);

    window.__addBlogToast = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(window.__addBlogToast);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleImage = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      showToast("Please upload JPG, PNG or WebP image.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB.", "error");
      return;
    }

    setImage(file);

    const preview = URL.createObjectURL(file);
    setImagePreview((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return preview;
    });

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const removeImage = (e) => {
    e.stopPropagation();

    setImage(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleImage(file);
  };

  // Rich text editor toolbar
  const executeCommand = (command, value = null) => {
    if (sourceMode) return;

    editorRef.current?.focus();

    if (command === "createLink") {
      const url = window.prompt("Enter link URL:");

      if (!url) return;

      if (!/^https?:\/\//i.test(url)) {
        showToast("Please enter a valid URL starting with http:// or https://", "error");
        return;
      }

      document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, value);
    }

    syncEditor();
  };

  const syncEditor = () => {
    if (editorRef.current) {
      setSourceCode(editorRef.current.innerHTML);
    }
  };

  const insertImageInEditor = () => {
    const url = window.prompt("Enter image URL:");

    if (!url) return;

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid URL");
      }

      executeCommand(
        "insertImage",
        parsed.href
      );
    } catch {
      showToast("Please enter a valid image URL.", "error");
    }
  };

  const insertVideo = () => {
    const url = window.prompt("Enter YouTube video URL:");

    if (!url) return;

    try {
      const parsed = new URL(url);
      let videoId = "";

      if (
        parsed.hostname === "youtu.be" ||
        parsed.hostname === "www.youtu.be"
      ) {
        videoId = parsed.pathname.slice(1);
      } else if (
        parsed.hostname.includes("youtube.com")
      ) {
        videoId = parsed.searchParams.get("v") || "";

        if (parsed.pathname.startsWith("/embed/")) {
          videoId = parsed.pathname.split("/embed/")[1];
        }
      }

      if (!/^[\w-]{11}$/.test(videoId)) {
        throw new Error("Invalid video");
      }

      editorRef.current?.focus();

      document.execCommand(
        "insertHTML",
        false,
        `<div class="blog-video-embed">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${videoId}"
            title="Embedded YouTube video"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div><p><br></p>`
      );

      syncEditor();
    } catch {
      showToast("Please enter a valid YouTube video URL.", "error");
    }
  };

  const toggleSource = () => {
    if (!sourceMode) {
      setSourceCode(editorRef.current?.innerHTML || "");
      setSourceMode(true);
    } else {
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceCode;
      }

      setSourceMode(false);
    }
  };

  const handleSourceChange = (value) => {
    setSourceCode(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Blog title is required.";
    }

    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    if (!image) {
      newErrors.image = "Please upload a blog image.";
    }

    if (!form.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required.";
    }

    if (!editorRef.current?.innerText.trim()) {
      if (!sourceMode || !sourceCode.replace(/<[^>]*>/g, "").trim()) {
        newErrors.description = "Blog content is required.";
      }
    }

    if (!form.author.trim()) {
      newErrors.author = "Author name is required.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    const content = sourceMode
      ? sourceCode
      : editorRef.current?.innerHTML || "";

    const blogData = {
      ...form,
      description: content,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      image,
      status: form.publishImmediately ? "Published" : "Draft",
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      if (onPublish) {
        await onPublish(blogData);
      }

      showToast(
        form.publishImmediately
          ? "Blog published successfully!"
          : "Blog saved as draft successfully!"
      );

      resetForm();
    } catch (error) {
      showToast(
        error?.message || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      shortDescription: "",
      tags: "",
      author: "",
      location: "",
      publishImmediately: true,
    });

    setImage(null);
    setImagePreview("");
    setErrors({});
    setSourceMode(false);
    setSourceCode("");

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setEditorFullscreen(false);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all blog details?"
    );

    if (confirmed) {
      resetForm();
      showToast("Form has been reset.");
    }
  };

  const toolbarButtons = [
    {
      label: "Bold",
      icon: <strong>B</strong>,
      command: "bold",
    },
    {
      label: "Italic",
      icon: <i>I</i>,
      command: "italic",
    },
    {
      label: "Underline",
      icon: <u>U</u>,
      command: "underline",
    },
    {
      label: "Strikethrough",
      icon: <s>S</s>,
      command: "strikeThrough",
    },
    {
      separator: true,
    },
    {
      label: "Bullet List",
      icon: <Icon name="list" />,
      command: "insertUnorderedList",
    },
    {
      label: "Numbered List",
      icon: <Icon name="numbered" />,
      command: "insertOrderedList",
    },
    {
      label: "Align Left",
      icon: <Icon name="align-left" />,
      command: "justifyLeft",
    },
    {
      label: "Align Center",
      icon: <Icon name="align-center" />,
      command: "justifyCenter",
    },
    {
      label: "Insert Link",
      icon: <Icon name="link" />,
      command: "createLink",
    },
    {
      label: "Insert Image",
      icon: <Icon name="image" />,
      action: insertImageInEditor,
    },
    {
      label: "Insert Video",
      icon: <Icon name="video" />,
      action: insertVideo,
    },
    {
      label: "HTML Source",
      icon: <Icon name="code" />,
      action: toggleSource,
    },
    {
      label: "Fullscreen",
      icon: <Icon name="fullscreen" />,
      action: () => setEditorFullscreen((prev) => !prev),
    },
  ];

  return (
    <section className="addblog-page">
      <form
        ref={formRef}
        className="addblog-card"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* HEADER */}
        <div className="addblog-header">
          <div className="addblog-header-icon">
            <Icon name="edit" />
          </div>

          <div className="addblog-header-content">
            <h2>Add Blog</h2>
            <p>Create and publish a new blog post</p>
          </div>
        </div>

        {/* MAIN FORM */}
        <div className="addblog-form-body">

          {/* FIRST TWO COLUMNS */}
          <div className="addblog-top-grid">

            <div className="addblog-column">

              {/* BLOG TITLE */}
              <div className="addblog-field">
                <label htmlFor="blog-title">
                  Blog Title <span>*</span>
                </label>

                <div className={`addblog-input-wrap ${errors.title ? "has-error" : ""}`}>
                  <Icon name="text" />

                  <input
                    id="blog-title"
                    type="text"
                    placeholder="Enter blog title..."
                    value={form.title}
                    onChange={(e) =>
                      updateField("title", e.target.value)
                    }
                  />
                </div>

                {errors.title && (
                  <small className="addblog-error">{errors.title}</small>
                )}
              </div>

              {/* IMAGE UPLOAD */}
              <div className="addblog-field addblog-upload-field">
                <label>
                  Upload Image <span>*</span>
                </label>

                <div
                  className={`addblog-upload-box ${
                    dragging ? "is-dragging" : ""
                  } ${imagePreview ? "has-image" : ""} ${
                    errors.image ? "has-error" : ""
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Blog preview"
                        className="addblog-image-preview"
                      />

                      <div className="addblog-image-overlay">
                        <Icon name="upload" />
                        <strong>Change Image</strong>
                        <span>{image?.name}</span>
                      </div>

                      <button
                        type="button"
                        className="addblog-image-remove"
                        onClick={removeImage}
                        aria-label="Remove image"
                      >
                        <Icon name="close" />
                      </button>
                    </>
                  ) : (
                    <div className="addblog-upload-content">
                      <Icon name="cloud-upload" />

                      <strong>Click to upload image</strong>

                      <span>or drag and drop</span>

                      <small>
                        Supports: JPG, PNG, WebP (Max 5MB)
                      </small>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => handleImage(e.target.files?.[0])}
                />

                {errors.image && (
                  <small className="addblog-error">{errors.image}</small>
                )}
              </div>
            </div>

            <div className="addblog-column">

              {/* CATEGORY */}
              <div className="addblog-field">
                <label htmlFor="blog-category">
                  Category <span>*</span>
                </label>

                <div className={`addblog-input-wrap addblog-select-wrap ${
                  errors.category ? "has-error" : ""
                }`}>
                  <Icon name="category" />

                  <select
                    id="blog-category"
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>

                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <Icon name="chevron" />
                </div>

                {errors.category && (
                  <small className="addblog-error">{errors.category}</small>
                )}
              </div>

              {/* SHORT DESCRIPTION */}
              <div className="addblog-field addblog-short-field">
                <label htmlFor="blog-short-description">
                  Short Description <span>*</span>
                </label>

                <div className={`addblog-textarea-wrap ${
                  errors.shortDescription ? "has-error" : ""
                }`}>
                  <textarea
                    id="blog-short-description"
                    placeholder="Enter short description..."
                    maxLength={200}
                    value={form.shortDescription}
                    onChange={(e) =>
                      updateField("shortDescription", e.target.value)
                    }
                  />

                  <span className="addblog-character-count">
                    {form.shortDescription.length}/200
                  </span>
                </div>

                {errors.shortDescription && (
                  <small className="addblog-error">
                    {errors.shortDescription}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION EDITOR */}
          <div className={`addblog-field addblog-description-field ${
            editorFullscreen ? "editor-fullscreen" : ""
          }`}>
            <label>
              Description (Text Editor) <span>*</span>
            </label>

            <div className={`addblog-editor ${
              errors.description ? "has-error" : ""
            }`}>
              <div className="addblog-toolbar">
                {toolbarButtons.map((item, index) => {
                  if (item.separator) {
                    return (
                      <span
                        className="addblog-toolbar-divider"
                        key={`divider-${index}`}
                      />
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      type="button"
                      title={item.label}
                      aria-label={item.label}
                      className={`addblog-tool-button ${
                        item.command === "createLink" ? "addblog-link-tool" : ""
                      } ${
                        item.action === toggleSource && sourceMode
                          ? "active"
                          : ""
                      } ${
                        item.label === "Fullscreen" && editorFullscreen
                          ? "active"
                          : ""
                      }`}
                      onMouseDown={(e) => {
                        if (item.command) e.preventDefault();
                      }}
                      onClick={() => {
                        if (item.command) {
                          executeCommand(item.command);
                        } else {
                          item.action();
                        }
                      }}
                    >
                      {item.icon}
                    </button>
                  );
                })}
              </div>

              {sourceMode ? (
                <textarea
                  className="addblog-source-editor"
                  value={sourceCode}
                  onChange={(e) => handleSourceChange(e.target.value)}
                  placeholder="HTML source code..."
                  spellCheck={false}
                />
              ) : (
                <div
                  ref={editorRef}
                  className="addblog-editable"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Write your blog content here..."
                  onInput={syncEditor}
                  onBlur={syncEditor}
                />
              )}
            </div>

            {errors.description && (
              <small className="addblog-error">{errors.description}</small>
            )}

            {editorFullscreen && (
              <button
                type="button"
                className="addblog-exit-fullscreen"
                onClick={() => setEditorFullscreen(false)}
              >
                <Icon name="close" />
                Exit Fullscreen
              </button>
            )}
          </div>

          {/* BOTTOM THREE FIELDS */}
          <div className="addblog-bottom-grid">

            {/* TAGS */}
            <div className="addblog-field">
              <label htmlFor="blog-tags">Tags</label>

              <div className="addblog-input-wrap">
                <Icon name="tag" />

                <input
                  id="blog-tags"
                  type="text"
                  placeholder="Enter tags (comma separated)..."
                  value={form.tags}
                  onChange={(e) =>
                    updateField("tags", e.target.value)
                  }
                />
              </div>
            </div>

            {/* AUTHOR */}
            <div className="addblog-field">
              <label htmlFor="blog-author">
                Author Name <span>*</span>
              </label>

              <div className={`addblog-input-wrap ${
                errors.author ? "has-error" : ""
              }`}>
                <Icon name="user" />

                <input
                  id="blog-author"
                  type="text"
                  placeholder="Enter author name..."
                  value={form.author}
                  onChange={(e) =>
                    updateField("author", e.target.value)
                  }
                />
              </div>

              {errors.author && (
                <small className="addblog-error">{errors.author}</small>
              )}
            </div>

            {/* LOCATION */}
            <div className="addblog-field">
              <label htmlFor="blog-location">
                Location <span>*</span>
              </label>

              <div className={`addblog-input-wrap ${
                errors.location ? "has-error" : ""
              }`}>
                <Icon name="location" />

                <input
                  id="blog-location"
                  type="text"
                  placeholder="Enter location..."
                  value={form.location}
                  onChange={(e) =>
                    updateField("location", e.target.value)
                  }
                />
              </div>

              {errors.location && (
                <small className="addblog-error">{errors.location}</small>
              )}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="addblog-footer">

            <label className="addblog-toggle">
              <input
                type="checkbox"
                checked={form.publishImmediately}
                onChange={(e) =>
                  updateField("publishImmediately", e.target.checked)
                }
              />

              <span className="addblog-toggle-slider" />

              <span className="addblog-toggle-text">
                Publish Immediately
              </span>
            </label>

            <div className="addblog-actions">

              <button
                type="button"
                className="addblog-reset-button"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                <Icon name="reset" />
                Reset
              </button>

              <button
                type="submit"
                className="addblog-publish-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="addblog-spinner" />
                ) : (
                  <Icon name="send" />
                )}

                {isSubmitting
                  ? "Processing..."
                  : form.publishImmediately
                    ? "Publish Blog"
                    : "Save Draft"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* TOAST MESSAGE */}
      {toast && (
        <div className={`addblog-toast ${
          toast.type === "error" ? "toast-error" : ""
        }`}>
          <span className="addblog-toast-icon">
            {toast.type === "error" ? "!" : "✓"}
          </span>

          {toast.message}
        </div>
      )}
    </section>
  );
};

// Reusable SVG icon component
const Icon = ({ name }) => {
  const icons = {
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z"/></>,
    text: <><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></>,
    upload: <><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v4h16v-4"/></>,
    "cloud-upload": <><path d="M20 16.2A4.5 4.5 0 0 0 18 7.5h-1.3A7 7 0 0 0 3 11.5a5 5 0 0 0 1 9.5h4"/><path d="M12 12v9"/><path d="m8 16 4-4 4 4"/></>,
    category: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M11 3v18M15 3v18M19 3v18M3 7h18M3 11h18M3 15h18M3 19h18"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
    numbered: <><path d="M10 6h11M10 12h11M10 18h11"/><path d="M4 5h1v4M4 9h2M4 14c0-1 2-1 2 0 0 1-2 2-2 3h2M4 18h2"/></>,
    "align-left": <><path d="M3 6h18M3 12h12M3 18h18"/></>,
    "align-center": <><path d="M3 6h18M6 12h12M3 18h18"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 2.93l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    video: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/></>,
    code: <><path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16"/></>,
    fullscreen: <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    tag: <><path d="M20.59 13.41 11 3.83V3H4v7l9.59 9.59a2 2 0 0 0 2.82 0l4.18-4.18a2 2 0 0 0 0-2.82Z"/><circle cx="7.5" cy="7.5" r="1"/></>,
    user: <><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
  };

  return (
    <svg
      className={`addblog-icon icon-${name}`}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

export default AddblogMain;
