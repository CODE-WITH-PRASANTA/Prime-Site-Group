import React, { useEffect, useMemo, useState } from "react";
import "./CareermanagementMain.css";

const INITIAL_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    subtitle: "Join our innovative tech team and build engaging digital experiences.",
    location: "New York",
    salary: "$60k – $80k",
    experience: "2–5 Years",
    type: "Full Time",
    status: "Active",
    posted: "20 Nov 2025",
    time: "10:30 AM",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=85",
    company: "Prime Digital",
    department: "Technology",
    vacancies: 3,
    description: "We are looking for a creative Frontend Developer to build fast, accessible and responsive web experiences. You will work closely with designers, product managers and backend engineers.",
    requirements: "Strong React and JavaScript skills; understanding of responsive design, REST APIs, Git and modern frontend tooling.",
    recruiter: "Olivia Martin",
    recruiterRole: "Talent Acquisition Manager",
    recruiterPhoto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=160&auto=format&fit=crop&q=80",
    email: "careers@primedigital.com"
  },
  {
    id: 2,
    title: "Project Manager",
    subtitle: "Lead projects and deliver outstanding results with our team.",
    location: "London",
    salary: "$70k – $90k",
    experience: "5+ Years",
    type: "Full Time",
    status: "Active",
    posted: "18 Nov 2025",
    time: "02:15 PM",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&auto=format&fit=crop&q=85",
    company: "Prime Digital",
    department: "Operations",
    vacancies: 2,
    description: "Own project plans from discovery through delivery. Coordinate cross-functional teams, manage timelines and communicate progress to stakeholders.",
    requirements: "Five or more years of project delivery experience, excellent communication and strong planning skills.",
    recruiter: "James Wilson",
    recruiterRole: "Senior HR Partner",
    recruiterPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    email: "jobs@primedigital.com"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    subtitle: "Design amazing experiences that people love to use.",
    location: "Dubai",
    salary: "$50k – $70k",
    experience: "2–4 Years",
    type: "Part Time",
    status: "Active",
    posted: "15 Nov 2025",
    time: "11:20 AM",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=85",
    company: "Prime Creative",
    department: "Design",
    vacancies: 1,
    description: "Create thoughtful user journeys, wireframes and polished interfaces for web and mobile products while collaborating with product and engineering.",
    requirements: "A strong portfolio, Figma expertise, visual design fundamentals and a user-centred approach.",
    recruiter: "Sophia Chen",
    recruiterRole: "Creative Recruitment Lead",
    recruiterPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    email: "designjobs@primecreative.com"
  },
  {
    id: 4,
    title: "Marketing Specialist",
    subtitle: "Grow our brand globally and connect with new audiences.",
    location: "Singapore",
    salary: "$45k – $65k",
    experience: "1–3 Years",
    type: "Full Time",
    status: "Active",
    posted: "12 Nov 2025",
    time: "04:45 PM",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format&fit=crop&q=85",
    company: "Prime Digital",
    department: "Marketing",
    vacancies: 2,
    description: "Plan and execute digital campaigns, create engaging content and analyse campaign performance across our marketing channels.",
    requirements: "Experience with digital campaigns, analytics, social media and clear written communication.",
    recruiter: "Daniel Brooks",
    recruiterRole: "People & Culture",
    recruiterPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
    email: "marketing@primedigital.com"
  },
  {
    id: 5,
    title: "SEO Executive",
    subtitle: "Optimise and improve our online presence across search.",
    location: "India",
    salary: "$30k – $50k",
    experience: "1–2 Years",
    type: "Part Time",
    status: "Active",
    posted: "10 Nov 2025",
    time: "09:30 AM",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=85",
    company: "Prime Digital",
    department: "Marketing",
    vacancies: 1,
    description: "Improve organic visibility through keyword research, on-page optimisation, technical audits and performance reporting.",
    requirements: "Knowledge of SEO tools, keyword research, Google Analytics and Search Console.",
    recruiter: "Ava Patel",
    recruiterRole: "Talent Acquisition",
    recruiterPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
    email: "careers@primedigital.com"
  }
];

const EMPTY_FORM = {
  title: "",
  subtitle: "",
  location: "",
  salary: "",
  experience: "",
  type: "Full Time",
  status: "Active",
  company: "Prime Digital",
  department: "",
  vacancies: "1",
  description: "",
  requirements: "",
  image: "",
  recruiter: "",
  recruiterRole: "Recruiter",
  recruiterPhoto: "",
  email: ""
};

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };

  const paths = {
    briefcase: <>
      <rect x="3" y="7" width="18" height="14" rx="2"/>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>
    </>,
    search: <>
      <circle cx="11" cy="11" r="7"/>
      <path d="m20 20-4-4"/>
    </>,
    reset: <>
      <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/>
      <path d="M3 3v5h5"/>
    </>,
    pin: <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
      <circle cx="12" cy="10" r="2.5"/>
    </>,
    calendar: <>
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M16 3v4M8 3v4M3 10h18"/>
    </>,
    eye: <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
      <circle cx="12" cy="12" r="3"/>
    </>,
    edit: <>
      <path d="m15 5 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15l0 5Z"/>
    </>,
    trash: <>
      <path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m4 4v7m6-7v7"/>
    </>,
    plus: <path d="M12 5v14M5 12h14"/>,
    close: <path d="m18 6-12 12M6 6l12 12"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    down: <path d="m6 9 6 6 6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </>,
    users: <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6"/>
    </>,
    mail: <>
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </>,
    briefcaseSmall: <>
      <rect x="3" y="7" width="18" height="14" rx="2"/>
      <path d="M8 7V5h8v2"/>
    </>,
    warning: <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>
      <path d="M12 9v4M12 17h.01"/>
    </>,
    shield: <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
      <path d="m9 12 2 2 4-4"/>
    </>,
    checkCircle: <>
      <circle cx="12" cy="12" r="10"/>
      <path d="m8 12 3 3 5-6"/>
    </>
  };

  return <svg {...common}>{paths[name] || paths.briefcase}</svg>;
}

export default function CareermanagementMain() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Job Types");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  /* DELETE ANIMATION STATES */
  const [deleteSerial, setDeleteSerial] = useState(1);
  const [delClosing, setDelClosing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [toast, setToast] = useState("");

  const pageSize = 5;

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const term = search.trim().toLowerCase();

    const matchesSearch = !term || [
      job.title,
      job.subtitle,
      job.company,
      job.department
    ].some(value => (value || "").toLowerCase().includes(term));

    return matchesSearch &&
      (location === "All Locations" || job.location === location) &&
      (jobType === "All Job Types" || job.type === jobType);
  }), [jobs, search, location, jobType]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleJobs = filteredJobs.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const locations = [
    "All Locations",
    ...new Set(jobs.map(job => job.location))
  ];

  const start = filteredJobs.length
    ? (safePage - 1) * pageSize + 1
    : 0;

  const end = Math.min(
    safePage * pageSize,
    filteredJobs.length
  );

  const resetFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setJobType("All Job Types");
    setPage(1);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModal("form");
  };

  const openEdit = job => {
    setEditingId(job.id);
    setForm({
      ...EMPTY_FORM,
      ...job,
      vacancies: String(job.vacancies || 1)
    });
    setFormError("");
    setModal("form");
  };

  /* ---------- DELETE ---------- */

  const openDelete = (job, serial) => {
    setSelected(job);
    setDeleteSerial(serial);
    setDelClosing(false);
    setModal("delete");
  };

  const closeDelete = () => {
    if (deleting) return;
    setDelClosing(true);
    setTimeout(() => {
      setModal("");
      setSelected(null);
      setDelClosing(false);
    }, 250);
  };

  const confirmDelete = () => {
    if (!selected || deleting) return;

    const id = selected.id;
    setDeleting(true);

    setTimeout(() => {
      setDeleting(false);
      setDelClosing(true);

      setTimeout(() => {
        setModal("");
        setSelected(null);
        setDelClosing(false);
        setRemovingId(id);

        setTimeout(() => {
          setJobs(current => current.filter(job => job.id !== id));
          setRemovingId(null);
          setToast("Career deleted successfully");
        }, 450);
      }, 250);
    }, 900);
  };

  /* Esc key closes delete modal */
  useEffect(() => {
    if (modal !== "delete") return;
    const onKey = e => e.key === "Escape" && closeDelete();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [modal, deleting]);

  /* Toast auto hide */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const updateField = event => {
    setForm(current => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const saveJob = event => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.salary.trim() ||
      !form.description.trim()
    ) {
      setFormError(
        "Please complete the job title, location, salary and description."
      );
      return;
    }

    const existingJob = jobs.find(job => job.id === editingId);

    const next = {
      ...form,
      vacancies: Math.max(1, Number(form.vacancies) || 1),
      posted: existingJob?.posted || "21 Nov 2026",
      time: existingJob?.time || "11:00 AM"
    };

    if (editingId) {
      setJobs(current =>
        current.map(job =>
          job.id === editingId
            ? { ...job, ...next }
            : job
        )
      );
    } else {
      setJobs(current => [
        { ...next, id: Date.now() },
        ...current
      ]);
    }

    setPage(1);
    setModal("");
    setEditingId(null);
  };

  const openView = job => {
    setSelected(job);
    setModal("view");
  };

  return (
    <main className="career-page">
      <section className="career-shell">

        {/* HEADER */}
        <header className="career-header">
          <div className="career-heading">
            <div className="career-heading-icon">
              <Icon name="briefcase" size={27} />
            </div>

            <div>
              <h1>Career Management</h1>
              <p>Manage job postings and career opportunities</p>
            </div>
          </div>

          <button
            className="career-primary-btn"
            onClick={openAdd}
          >
            <Icon name="plus" />
            Add New Career
          </button>
        </header>

        {/* SEARCH AND FILTERS */}
        <section className="career-toolbar">
          <label className="career-search">
            <Icon name="search" size={20} />

            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by job title..."
              aria-label="Search careers"
            />
          </label>

          <label className="career-select-wrap">
            <select
              value={location}
              onChange={e => {
                setLocation(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by location"
            >
              {locations.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <Icon name="down" size={16} />
          </label>

          <label className="career-select-wrap">
            <select
              value={jobType}
              onChange={e => {
                setJobType(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by job type"
            >
              {[
                "All Job Types",
                "Full Time",
                "Part Time",
                "Contract",
                "Remote",
                "Internship"
              ].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <Icon name="down" size={16} />
          </label>

          <button
            className="career-primary-btn career-search-btn"
            onClick={() => setPage(1)}
          >
            <Icon name="search" />
            Search
          </button>

          <button
            className="career-reset-btn"
            onClick={resetFilters}
          >
            <Icon name="reset" />
            Reset
          </button>
        </section>

        {/* CAREER TABLE */}
        <div className="career-table-wrap">
          <table className="career-table">
            <thead>
              <tr>
                <th className="career-number-col">#</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Experience</th>
                <th>Job Type</th>
                <th>Status</th>
                <th>Posted Date</th>
                <th className="career-actions-head">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleJobs.map((job, index) => (
                <tr
                  key={job.id}
                  className={removingId === job.id ? "cd-row-removing" : ""}
                >
                  <td className="career-number-col">
                    {start + index}
                  </td>

                  <td>
                    <div className="career-job-cell">
                      <img
                        className="career-job-thumb"
                        src={
                          job.image ||
                          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400"
                        }
                        alt={`${job.title} workplace`}
                      />

                      <div className="career-job-copy">
                        <strong>{job.title}</strong>
                        <span>{job.subtitle}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="career-location">
                      <Icon name="pin" size={17} />
                      {job.location}
                    </span>
                  </td>

                  <td>
                    <strong className="career-salary">
                      {job.salary}
                    </strong>
                    <small className="career-per-year">
                      / year
                    </small>
                  </td>

                  <td className="career-experience">
                    {job.experience}
                  </td>

                  <td>
                    <span
                      className={`career-type-badge ${job.type
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      <Icon name="briefcaseSmall" size={14} />
                      {job.type}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`career-status ${job.status.toLowerCase()}`}
                    >
                      <i />
                      {job.status}
                    </span>
                  </td>

                  <td>
                    <span className="career-date">
                      <Icon name="calendar" size={17} />

                      <span>
                        {job.posted}
                        <small>{job.time}</small>
                      </span>
                    </span>
                  </td>

                  <td>
                    <div className="career-actions">
                      <button
                        className="career-icon-btn view"
                        title="View details"
                        aria-label={`View ${job.title}`}
                        onClick={() => openView(job)}
                      >
                        <Icon name="eye" />
                      </button>

                      <button
                        className="career-icon-btn edit"
                        title="Edit career"
                        aria-label={`Edit ${job.title}`}
                        onClick={() => openEdit(job)}
                      >
                        <Icon name="edit" />
                      </button>

                      <button
                        className="career-icon-btn delete"
                        title="Delete career"
                        aria-label={`Delete ${job.title}`}
                        onClick={() => openDelete(job, start + index)}
                      >
                        <Icon name="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!visibleJobs.length && (
                <tr>
                  <td colSpan="9">
                    <div className="career-empty">
                      <span>
                        <Icon name="search" size={25} />
                      </span>

                      <strong>No career postings found</strong>

                      <p>
                        Try changing your search or filters.
                      </p>

                      <button onClick={resetFilters}>
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <footer className="career-table-footer">
          <p>
            Showing <strong>{start} to {end}</strong> of{" "}
            <strong>{filteredJobs.length}</strong> entries
          </p>

          <div className="career-pagination">
            <button
              aria-label="Previous page"
              disabled={safePage <= 1}
              onClick={() =>
                setPage(p => Math.max(1, p - 1))
              }
            >
              <Icon name="chevron" size={17} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map(number => (
              <button
                key={number}
                className={safePage === number ? "active" : ""}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              aria-label="Next page"
              disabled={safePage >= totalPages}
              onClick={() =>
                setPage(p => Math.min(totalPages, p + 1))
              }
            >
              <Icon name="chevron" size={17} />
            </button>
          </div>
        </footer>
      </section>

      {/* PREMIUM DELETE CONFIRMATION MODAL */}
      {modal === "delete" && selected && (
        <div
          className={`cd-overlay ${delClosing ? "out" : ""}`}
          onMouseDown={e => {
            if (e.target === e.currentTarget) closeDelete();
          }}
        >
          <section
            className={`cd-modal ${delClosing ? "out" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-delete-title"
          >
            <div className="cd-topbar" />
            <span className="cd-corner" />

            <button
              type="button"
              className="cd-close"
              onClick={closeDelete}
              aria-label="Close"
            >
              <Icon name="close" size={16} />
            </button>

            <div className="cd-icon-wrap">
              <span className="cd-pulse p1" />
              <span className="cd-pulse p2" />
              <div className="cd-icon">
                <Icon name="trash" size={30} />
              </div>
            </div>

            <p className="cd-tag">DELETE CONFIRMATION</p>
            <h2 className="cd-title" id="career-delete-title">
              Are you absolutely sure?
            </h2>
            <p className="cd-text">
              You're about to permanently delete this career posting.
              <br />
              This action cannot be undone.
            </p>

            <div className="cd-user">
              <img
                src={selected.recruiterPhoto || selected.image}
                alt={selected.title}
                onError={e => {
                  e.currentTarget.src = selected.image;
                }}
              />
              <div>
                <strong>{selected.title}</strong>
                <span>
                  {selected.location} · {selected.type}
                </span>
              </div>
              <em>#{deleteSerial}</em>
            </div>

            <div className="cd-warn">
              <Icon name="warning" size={18} />
              This career and its associated details will be removed.
            </div>

            <div className="cd-btns">
              <button
                type="button"
                className="cd-keep"
                onClick={closeDelete}
                disabled={deleting}
              >
                Keep Career
              </button>

              <button
                type="button"
                className="cd-confirm"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="cd-spinner" /> Deleting...
                  </>
                ) : (
                  <>
                    <Icon name="trash" size={16} /> Delete Permanently
                  </>
                )}
              </button>
            </div>

            <p className="cd-note">
              <Icon name="shield" size={14} />
              Please confirm before removing this record
            </p>
          </section>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {toast && (
        <div className="cd-toast">
          <Icon name="checkCircle" size={18} /> {toast}
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {modal === "view" && selected && (
        <div
          className="career-overlay"
          onMouseDown={e => {
            if (e.target === e.currentTarget) {
              setModal("");
            }
          }}
        >
          <section
            className="career-view-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-view-title"
          >
            <div className="career-view-cover">
              <img
                src={selected.image}
                alt={`${selected.title} workplace`}
              />

              <div className="career-cover-shade" />

              <button
                className="career-view-close"
                onClick={() => setModal("")}
                aria-label="Close"
              >
                <Icon name="close" />
              </button>

              <div className="career-cover-title">
                <span>CAREER OPPORTUNITY</span>

                <h2 id="career-view-title">
                  {selected.title}
                </h2>

                <p>
                  <Icon name="pin" size={16} />
                  {selected.location}
                  <b>•</b>
                  {selected.type}
                </p>
              </div>
            </div>

            <div className="career-view-content">
              <div className="career-view-tags">
                <span
                  className={`career-type-badge ${selected.type
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {selected.type}
                </span>

                <span
                  className={`career-status ${selected.status.toLowerCase()}`}
                >
                  <i />
                  {selected.status}
                </span>
              </div>

              <div className="career-detail-grid">
                <div>
                  <small>Salary range</small>
                  <strong>{selected.salary}</strong>
                </div>

                <div>
                  <small>Experience</small>
                  <strong>{selected.experience}</strong>
                </div>

                <div>
                  <small>Open positions</small>
                  <strong>{selected.vacancies}</strong>
                </div>

                <div>
                  <small>Department</small>
                  <strong>{selected.department || "General"}</strong>
                </div>
              </div>

              <div className="career-detail-section">
                <h3>About this role</h3>
                <p>{selected.description}</p>
              </div>

              <div className="career-detail-section">
                <h3>Requirements</h3>
                <p>
                  {selected.requirements ||
                    "Please contact the recruitment team for role requirements."}
                </p>
              </div>

              <div className="career-recruiter-card">
                <img
                  src={selected.recruiterPhoto}
                  alt={selected.recruiter}
                />

                <div className="career-recruiter-info">
                  <small>YOUR RECRUITMENT CONTACT</small>
                  <strong>{selected.recruiter}</strong>
                  <span>{selected.recruiterRole}</span>
                </div>

                <a href={`mailto:${selected.email}`}>
                  <Icon name="mail" size={16} />
                  Contact
                </a>
              </div>

              <div className="career-view-footer">
                <span>
                  <Icon name="calendar" size={16} />
                  Posted {selected.posted} · {selected.time}
                </span>

                <button onClick={() => openEdit(selected)}>
                  <Icon name="edit" size={16} />
                  Edit Posting
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ADD / EDIT CAREER MODAL */}
      {modal === "form" && (
        <div
          className="career-overlay"
          onMouseDown={e => {
            if (e.target === e.currentTarget) {
              setModal("");
            }
          }}
        >
          <section
            className="career-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-form-title"
          >
            <div className="career-form-heading">
              <div>
                <span>CAREER MANAGEMENT</span>

                <h2 id="career-form-title">
                  {editingId ? "Edit Career" : "Add New Career"}
                </h2>

                <p>
                  Fill in the details below to publish a career opportunity.
                </p>
              </div>

              <button
                className="career-modal-close"
                onClick={() => setModal("")}
                aria-label="Close"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={saveJob}>
              <div className="career-form-grid">
                <label className="career-field full">
                  <span>Job title *</span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={updateField}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </label>

                <label className="career-field full">
                  <span>Short description</span>
                  <input
                    name="subtitle"
                    value={form.subtitle}
                    onChange={updateField}
                    placeholder="A short introduction to this role"
                  />
                </label>

                <label className="career-field">
                  <span>Location *</span>
                  <input
                    name="location"
                    value={form.location}
                    onChange={updateField}
                    placeholder="e.g. New York"
                  />
                </label>

                <label className="career-field">
                  <span>Salary range *</span>
                  <input
                    name="salary"
                    value={form.salary}
                    onChange={updateField}
                    placeholder="e.g. $60k – $80k"
                  />
                </label>

                <label className="career-field">
                  <span>Experience</span>
                  <input
                    name="experience"
                    value={form.experience}
                    onChange={updateField}
                    placeholder="e.g. 2–5 Years"
                  />
                </label>

                <label className="career-field">
                  <span>Job type</span>
                  <select
                    name="type"
                    value={form.type}
                    onChange={updateField}
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                    <option>Internship</option>
                  </select>
                </label>

                <label className="career-field">
                  <span>Status</span>
                  <select
                    name="status"
                    value={form.status}
                    onChange={updateField}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Draft</option>
                  </select>
                </label>

                <label className="career-field">
                  <span>Department</span>
                  <input
                    name="department"
                    value={form.department}
                    onChange={updateField}
                    placeholder="e.g. Technology"
                  />
                </label>

                <label className="career-field">
                  <span>Number of vacancies</span>
                  <input
                    type="number"
                    min="1"
                    name="vacancies"
                    value={form.vacancies}
                    onChange={updateField}
                  />
                </label>

                <label className="career-field">
                  <span>Company</span>
                  <input
                    name="company"
                    value={form.company}
                    onChange={updateField}
                  />
                </label>

                <label className="career-field full">
                  <span>Job image URL</span>
                  <input
                    name="image"
                    value={form.image}
                    onChange={updateField}
                    placeholder="https://..."
                  />
                </label>

                <label className="career-field full">
                  <span>Job description *</span>
                  <textarea
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={updateField}
                    placeholder="Describe the role and responsibilities..."
                  />
                </label>

                <label className="career-field full">
                  <span>Requirements</span>
                  <textarea
                    name="requirements"
                    rows="3"
                    value={form.requirements}
                    onChange={updateField}
                    placeholder="Skills, qualifications and experience..."
                  />
                </label>

                <div className="career-form-divider">
                  Recruiter information
                </div>

                <label className="career-field">
                  <span>Recruiter name</span>
                  <input
                    name="recruiter"
                    value={form.recruiter}
                    onChange={updateField}
                    placeholder="Full name"
                  />
                </label>

                <label className="career-field">
                  <span>Recruiter role</span>
                  <input
                    name="recruiterRole"
                    value={form.recruiterRole}
                    onChange={updateField}
                    placeholder="Recruitment Manager"
                  />
                </label>

                <label className="career-field">
                  <span>Recruiter photo URL</span>
                  <input
                    name="recruiterPhoto"
                    value={form.recruiterPhoto}
                    onChange={updateField}
                    placeholder="https://..."
                  />
                </label>

                <label className="career-field">
                  <span>Contact email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="careers@example.com"
                  />
                </label>
              </div>

              {formError && (
                <p className="career-form-error">{formError}</p>
              )}

              <div className="career-form-actions">
                <button
                  type="button"
                  className="career-cancel-btn"
                  onClick={() => setModal("")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="career-primary-btn"
                >
                  <Icon name="check" />
                  {editingId ? "Save Changes" : "Publish Career"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}