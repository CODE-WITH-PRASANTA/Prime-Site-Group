import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import DashboardOne from "../../Components/DashboardOne/DashboardOne";
import DashboardTwo from "../../Components/DashboardTwo/DashboardTwo";
import DashboardThree from "../../Components/DashboardThree/DashboardThree";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatRelativeTime = (isoDate) => {
  if (!isoDate) return "Recently";
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const mins = Math.max(1, Math.floor(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};

const formatDisplayDate = (dateStr, fallbackIso) => {
  const raw = fallbackIso || dateStr;
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(dateStr || "");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const buildMonthlySeries = (items, monthsCount) => {
  const now = new Date();
  const buckets = [];
  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: MONTH_NAMES[d.getMonth()],
      value: 0,
    });
  }

  items.forEach((item) => {
    const raw = item.createdAt || item.date;
    if (!raw) return;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return;
    const match = buckets.find((b) => b.year === d.getFullYear() && b.month === d.getMonth());
    if (match) match.value += 1;
  });

  return buckets.map(({ label, value }) => ({ label, value }));
};

const buildSparkPoints = (items) => {
  const series = buildMonthlySeries(items, 7).map((b) => b.value);
  return series.some((v) => v > 0) ? series : [0, 0, 0, 0, 0, 0, 0];
};

const calcGrowthPercent = (items) => {
  const series = buildMonthlySeries(items, 2);
  const prev = series[0]?.value || 0;
  const curr = series[1]?.value || 0;
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.max(0, Math.round(((curr - prev) / prev) * 100));
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [careers, setCareers] = useState([]);
  const [careersTotal, setCareersTotal] = useState(0);

  const fetchDashboardData = useCallback(async () => {
    const [bookingsRes, enquiriesRes, blogsRes, careersRes] = await Promise.allSettled([
      API.get("/service-bookings?all=true"),
      API.get("/contact?all=true"),
      API.get("/blogs?all=true"),
      API.get("/careers?limit=50"),
    ]);

    if (bookingsRes.status === "fulfilled" && bookingsRes.value?.data?.data) {
      setBookings(bookingsRes.value.data.data);
    }
    if (enquiriesRes.status === "fulfilled" && enquiriesRes.value?.data?.data) {
      setEnquiries(enquiriesRes.value.data.data);
    }
    if (blogsRes.status === "fulfilled" && blogsRes.value?.data?.data) {
      setBlogs(blogsRes.value.data.data);
    }
    if (careersRes.status === "fulfilled" && careersRes.value?.data) {
      const cData = careersRes.value.data.data || [];
      setCareers(cData);
      setCareersTotal(careersRes.value.data.pagination?.total ?? cData.length);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = useMemo(
    () => [
      {
        key: "bookings",
        title: "Total Bookings",
        value: bookings.length,
        change: calcGrowthPercent(bookings),
        theme: "rose",
        points: buildSparkPoints(bookings),
      },
      {
        key: "enquiries",
        title: "Total Enquiries",
        value: enquiries.length,
        change: calcGrowthPercent(enquiries),
        theme: "red",
        points: buildSparkPoints(enquiries),
      },
      {
        key: "blogs",
        title: "Total Blogs",
        value: blogs.length,
        change: calcGrowthPercent(blogs),
        theme: "red",
        points: buildSparkPoints(blogs),
      },
      {
        key: "careers",
        title: "Total Careers",
        value: careersTotal,
        change: calcGrowthPercent(careers),
        theme: "orange",
        points: buildSparkPoints(careers),
      },
    ],
    [bookings, enquiries, blogs, careers, careersTotal]
  );

  const chartData = useMemo(
    () => ({
      3: buildMonthlySeries(bookings, 3),
      6: buildMonthlySeries(bookings, 6),
      12: buildMonthlySeries(bookings, 12),
    }),
    [bookings]
  );

  const recentBookings = useMemo(
    () =>
      bookings.slice(0, 5).map((b) => ({
        id: b.id,
        name: b.name,
        service: b.service,
        date: formatDisplayDate(b.date, b.createdAt),
        status: b.status === "Resolved" ? "confirmed" : "pending",
      })),
    [bookings]
  );

  const recentActivities = useMemo(() => {
    const list = [
      ...bookings.slice(0, 4).map((b) => ({
        id: `b-${b.id}`,
        type: "booking",
        title: "New booking received",
        text: `${b.name} booked ${b.service}`,
        time: formatRelativeTime(b.createdAt),
        href: "/service-booking",
        ts: new Date(b.createdAt || 0).getTime(),
      })),
      ...enquiries.slice(0, 4).map((e) => ({
        id: `e-${e.id}`,
        type: "enquiry",
        title: "New enquiry received",
        text: `From ${e.name}`,
        time: formatRelativeTime(e.createdAt),
        href: "/enquiry",
        ts: new Date(e.createdAt || 0).getTime(),
      })),
      ...blogs.slice(0, 4).map((bl) => ({
        id: `bl-${bl.id}`,
        type: "blog",
        title: bl.status === "Published" ? "New blog published" : "Blog draft saved",
        text: bl.title,
        time: formatRelativeTime(bl.createdAt),
        href: "/blog",
        ts: new Date(bl.createdAt || 0).getTime(),
      })),
    ];

    return list.sort((a, b) => b.ts - a.ts).slice(0, 5);
  }, [bookings, enquiries, blogs]);

  const handleStatusChange = async (booking, nextKey) => {
    const nextStatus = nextKey === "confirmed" ? "Resolved" : "In Progress";
    try {
      await API.patch(`/service-bookings/${booking.id}/status`, { status: nextStatus });
      fetchDashboardData();
    } catch (err) {
      console.error("Failed to update booking status:", err);
    }
  };

  const handleDeleteBooking = async (booking) => {
    try {
      await API.delete(`/service-bookings/${booking.id}`);
      fetchDashboardData();
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  const handleViewWebsite = () => {
    const url = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <DashboardOne stats={stats} />
      <DashboardTwo data={chartData} onViewWebsite={handleViewWebsite} />
      <DashboardThree
        bookings={recentBookings}
        activities={recentActivities}
        onViewAll={() => navigate("/service-booking")}
        onViewBooking={() => navigate("/service-booking")}
        onStatusChange={handleStatusChange}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
};

export default Dashboard;
