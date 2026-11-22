import React, { useCallback, useEffect, useState } from "react";
import API from "../../api/axios";
import "./CareerApplications.css";

const STATUSES = ["New", "Reviewed", "Shortlisted", "Rejected"];

const CareerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/applications", {
        params: { page, limit: 10, search: query, status },
      });
      setApplications(data.data || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load applications.");
    } finally {
      setLoading(false);
    }
  }, [page, query, status]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  };

  const viewResume = async (id) => {
    try {
      const res = await API.get(`/applications/${id}/resume`, { responseType: "blob" });
      window.open(URL.createObjectURL(res.data), "_blank");
    } catch {
      alert("Could not open the resume.");
    }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      const { data } = await API.patch(`/applications/${id}/status`, { status: newStatus });
      setApplications((list) => list.map((a) => (a.id === id ? data.data : a)));
    } catch {
      alert("Could not update the status.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this application and its resume?")) return;
    try {
      await API.delete(`/applications/${id}`);
      load();
    } catch {
      alert("Could not delete the application.");
    }
  };

  return (
    <div className="CareerApps">
      <div className="CareerApps__header">
        <h1>Career Applications</h1>
        <span>{pagination.total} total</span>
      </div>

      <div className="CareerApps__toolbar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search name, email, phone, position"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && <div className="CareerApps__error">{error}</div>}

      <div className="CareerApps__tableWrap">
        <table className="CareerApps__table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan="6">No applications found.</td></tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <strong>{app.fullName}</strong>
                    <br />
                    <small>{app.email}</small>
                  </td>
                  <td>{app.phone}</td>
                  <td>{app.position}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) => changeStatus(app.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="CareerApps__actions">
                    <button type="button" onClick={() => viewResume(app.id)}>View Resume</button>
                    <button type="button" className="danger" onClick={() => remove(app.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="CareerApps__pager">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CareerApplications;