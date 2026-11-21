
import React, { useEffect, useState } from "react";
import {
  Settings,
  Mail,
  Bell,
  Palette,
  Shield,
  UploadCloud,
  Globe,
  CalendarDays,
  Server,
  UserRound,
  LockKeyhole,
  Save,
  RotateCcw,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  Info,
  Image as ImageIcon,
  Clock,
} from "lucide-react";

import "./SettingMain.css";

const DEFAULT_SETTINGS = {
  siteTitle: "Prime Site",
  tagline: "Innovation for a Better Tomorrow",
  timezone: "Asia/Kolkata",
  dateFormat: "DD MMM YYYY",

  fromEmail: "info@primesite.com",
  fromName: "Prime Site",
  smtpHost: "smtp.gmail.com",
  smtpPort: "587",
  smtpUsername: "info@primesite.com",
  smtpPassword: "primepassword123",
  smtpEnabled: true,

  notificationsEnabled: true,
  twoFactorEnabled: false,
};

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (UTC +05:30)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (UTC +04:00)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (UTC +08:00)" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "Europe/Paris", label: "Europe/Paris" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "UTC", label: "UTC" },
];

const DATE_FORMATS = [
  "DD MMM YYYY",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "YYYY-MM-DD",
  "DD-MM-YYYY",
];

const TABS = [
  { id: "general", label: "General", icon: Settings },
  { id: "email", label: "Email", icon: Mail },
  { id: "notification", label: "Notification", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

const SettingMain = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("primeWebsiteSettings");
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  });

  const [originalSettings, setOriginalSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("primeWebsiteSettings");
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  });

  const [logo, setLogo] = useState(() => {
    try {
      return localStorage.getItem("primeWebsiteLogo") || "";
    } catch {
      return "";
    }
  });

  const [favicon, setFavicon] = useState(() => {
    try {
      return localStorage.getItem("primeWebsiteFavicon") || "";
    } catch {
      return "";
    }
  });

  const [originalLogo, setOriginalLogo] = useState(() => {
    try {
      return localStorage.getItem("primeWebsiteLogo") || "";
    } catch {
      return "";
    }
  });

  const [originalFavicon, setOriginalFavicon] = useState(() => {
    try {
      return localStorage.getItem("primeWebsiteFavicon") || "";
    } catch {
      return "";
    }
  });

  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3200);

    return () => clearTimeout(timer);
  }, [notification]);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
  };

  // UPDATE SETTINGS
  const updateField = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Please select a valid image file.", "error");
      e.target.value = "";
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      notify("Image size must be less than 2MB.", "error");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (type === "logo") {
        setLogo(reader.result);
      } else {
        setFavicon(reader.result);
      }

      notify(
        `${type === "logo" ? "Logo" : "Favicon"} preview updated. Click Save Settings to save it.`
      );
    };

    reader.onerror = () => {
      notify("Unable to read selected image.", "error");
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // VALIDATION
  const validateSettings = () => {
    const newErrors = {};

    if (!settings.siteTitle.trim()) {
      newErrors.siteTitle = "Website title is required.";
    }

    if (!settings.fromEmail.trim()) {
      newErrors.fromEmail = "From email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.fromEmail)
    ) {
      newErrors.fromEmail = "Enter a valid email address.";
    }

    if (!settings.fromName.trim()) {
      newErrors.fromName = "From name is required.";
    }

    if (settings.smtpEnabled) {
      if (!settings.smtpHost.trim()) {
        newErrors.smtpHost = "SMTP host is required.";
      }

      if (
        !settings.smtpPort.trim() ||
        !/^\d{1,5}$/.test(settings.smtpPort) ||
        Number(settings.smtpPort) < 1 ||
        Number(settings.smtpPort) > 65535
      ) {
        newErrors.smtpPort = "Enter a valid port (1-65535).";
      }

      if (!settings.smtpUsername.trim()) {
        newErrors.smtpUsername = "SMTP username is required.";
      }

      if (!settings.smtpPassword.trim()) {
        newErrors.smtpPassword = "SMTP password is required.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SAVE SETTINGS
  const handleSave = () => {
    if (!validateSettings()) {
      notify("Please correct the highlighted fields.", "error");
      return;
    }

    setSaving(true);

    try {
      localStorage.setItem(
        "primeWebsiteSettings",
        JSON.stringify(settings)
      );

      localStorage.setItem("primeWebsiteLogo", logo);
      localStorage.setItem("primeWebsiteFavicon", favicon);

      setOriginalSettings({ ...settings });
      setOriginalLogo(logo);
      setOriginalFavicon(favicon);

      notify("Website settings saved successfully!");
    } catch {
      notify(
        "Unable to save settings. Please use smaller images or clear browser storage.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // RESET SETTINGS
  const handleReset = () => {
    setSettings({ ...originalSettings });
    setLogo(originalLogo);
    setFavicon(originalFavicon);
    setErrors({});

    notify("Unsaved changes have been reset.");
  };

  // NAVIGATION
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "appearance") {
      notify(
        "Appearance settings are not included in the supplied reference layout.",
        "info"
      );
      return;
    }

    const section = document.getElementById(
      `setting-section-${tabId}`
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // REUSABLE FIELD
  const Field = ({
    label,
    name,
    icon: Icon,
    placeholder,
    type = "text",
    required = false,
    rightElement,
  }) => (
    <div
      className={`setting-field ${
        errors[name] ? "setting-field-error" : ""
      }`}
    >
      <label htmlFor={`setting-${name}`}>
        {label}
        {required && <span className="setting-required"> *</span>}
      </label>

      <div className="setting-input-wrap">
        {Icon && <Icon size={18} className="setting-input-icon" />}

        <input
          id={`setting-${name}`}
          type={type}
          value={settings[name] || ""}
          placeholder={placeholder}
          onChange={(e) => updateField(name, e.target.value)}
        />

        {rightElement}
      </div>

      {errors[name] && (
        <span className="setting-error-text">{errors[name]}</span>
      )}
    </div>
  );

  // REUSABLE SECTION HEADER
  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="setting-section-header">
      <div className="setting-section-icon">
        <Icon size={23} />
      </div>

      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  // REUSABLE TOGGLE
  const Toggle = ({
    value,
    onChange,
    label,
    description,
  }) => (
    <div className="setting-toggle-box">
      <button
        type="button"
        className={`setting-switch ${value ? "enabled" : ""}`}
        onClick={() => onChange(!value)}
        aria-label={`Toggle ${label}`}
        aria-pressed={value}
      >
        <span />
      </button>

      <div className="setting-toggle-text">
        <strong>{label}</strong>
        {description && <p>{description}</p>}
      </div>
    </div>
  );

  return (
    <div className="setting-main">

      {/* HEADER */}
      <header className="setting-page-header">

        <div className="setting-header-left">
          <div className="setting-header-icon">
            <Settings size={29} strokeWidth={2.5} />
          </div>

          <div>
            <h1>Settings</h1>
            <p>Manage your website settings and preferences</p>
          </div>
        </div>

      </header>

      {/* NAVIGATION */}
      <nav className="setting-navigation">

        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              className={
                activeTab === tab.id ? "active" : ""
              }
              onClick={() => handleTabClick(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}

      </nav>

      {/* SETTINGS GRID */}
      <div className="setting-grid">

        {/* GENERAL SETTINGS */}
        <section
          className="setting-card setting-general-card"
          id="setting-section-general"
        >

          <SectionHeader
            icon={Settings}
            title="General Settings"
            subtitle="Configure basic website information"
          />

          <div className="setting-general-fields">

            <Field
              label="Site Title"
              name="siteTitle"
              placeholder="Enter website title"
              required
            />

            <Field
              label="Tagline"
              name="tagline"
              placeholder="Enter website tagline"
            />

          </div>

          {/* LOGO UPLOAD */}
          <div className="setting-upload-group">

            <label className="setting-upload-label">
              Site Logo
            </label>

            <div className="setting-upload-row">

              <div className="setting-logo-preview">
                {logo ? (
                  <img src={logo} alt="Website logo preview" />
                ) : (
                  <div className="setting-default-logo">
                    <span className="setting-logo-symbol">P</span>
                    <div>
                      <strong>Prime Site</strong>
                      <small>Your Trusted Partner</small>
                    </div>
                  </div>
                )}
              </div>

              <div className="setting-upload-controls">

                <label
                  htmlFor="setting-logo-upload"
                  className="setting-upload-btn"
                >
                  <UploadCloud size={17} />
                  Change Logo
                </label>

                <input
                  type="file"
                  id="setting-logo-upload"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(e, "logo")}
                />

                <small>Recommended size: 200x60px</small>

              </div>
            </div>
          </div>

          {/* FAVICON UPLOAD */}
          <div className="setting-upload-group">

            <label className="setting-upload-label">
              Favicon
            </label>

            <div className="setting-upload-row">

              <div className="setting-favicon-preview">
                {favicon ? (
                  <img src={favicon} alt="Favicon preview" />
                ) : (
                  <span>P</span>
                )}
              </div>

              <div className="setting-upload-controls">

                <label
                  htmlFor="setting-favicon-upload"
                  className="setting-upload-btn"
                >
                  <UploadCloud size={17} />
                  Change Favicon
                </label>

                <input
                  type="file"
                  id="setting-favicon-upload"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleImageUpload(e, "favicon")
                  }
                />

                <small>Recommended size: 32x32px</small>

              </div>
            </div>
          </div>

          {/* TIMEZONE */}
          <div className="setting-select-group">

            <label htmlFor="setting-timezone">
              <Globe size={17} />
              Timezone
            </label>

            <div className="setting-select-wrap">
              <select
                id="setting-timezone"
                value={settings.timezone}
                onChange={(e) =>
                  updateField("timezone", e.target.value)
                }
              >
                {TIMEZONES.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* DATE FORMAT */}
          <div className="setting-select-group">

            <label htmlFor="setting-date-format">
              <CalendarDays size={17} />
              Date Format
            </label>

            <div className="setting-select-wrap">
              <select
                id="setting-date-format"
                value={settings.dateFormat}
                onChange={(e) =>
                  updateField("dateFormat", e.target.value)
                }
              >
                {DATE_FORMATS.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </section>

        {/* EMAIL SETTINGS */}
        <section
          className="setting-card setting-email-card"
          id="setting-section-email"
        >

          <SectionHeader
            icon={Mail}
            title="Email Settings"
            subtitle="Configure email related settings"
          />

          <div className="setting-email-grid">

            <Field
              label="From Email"
              name="fromEmail"
              icon={Mail}
              placeholder="info@example.com"
              required
            />

            <Field
              label="From Name"
              name="fromName"
              icon={UserRound}
              placeholder="Website name"
              required
            />

            <Field
              label="SMTP Host"
              name="smtpHost"
              icon={Server}
              placeholder="smtp.example.com"
            />

            <Field
              label="SMTP Port"
              name="smtpPort"
              icon={CalendarDays}
              placeholder="587"
            />

            <Field
              label="SMTP Username"
              name="smtpUsername"
              icon={UserRound}
              placeholder="Username"
            />

            <Field
              label="SMTP Password"
              name="smtpPassword"
              icon={LockKeyhole}
              type={showPassword ? "text" : "password"}
              placeholder="Enter SMTP password"
              rightElement={
                <button
                  type="button"
                  className="setting-password-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle SMTP password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
            />

          </div>

          <Toggle
            value={settings.smtpEnabled}
            onChange={(value) => updateField("smtpEnabled", value)}
            label="Enable SMTP Email"
            description="Turn on to send emails from your website"
          />

        </section>

        {/* NOTIFICATION SETTINGS */}
        <section
          className="setting-card setting-notification-card"
          id="setting-section-notification"
        >

          <SectionHeader
            icon={Bell}
            title="Notification Settings"
            subtitle="Manage notification preferences"
          />

          <Toggle
            value={settings.notificationsEnabled}
            onChange={(value) =>
              updateField("notificationsEnabled", value)
            }
            label="Enable Notifications"
            description="Get notified about new bookings, enquiries and more"
          />

        </section>

        {/* SECURITY SETTINGS */}
        <section
          className="setting-card setting-security-card"
          id="setting-section-security"
        >

          <SectionHeader
            icon={Shield}
            title="Security Settings"
            subtitle="Enhance your website security"
          />

          <Toggle
            value={settings.twoFactorEnabled}
            onChange={(value) =>
              updateField("twoFactorEnabled", value)
            }
            label="Enable Two-Factor Authentication (2FA)"
            description="Add an extra layer of security to your account"
          />

        </section>

      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="setting-actions">

        <button
          type="button"
          className="setting-reset-btn"
          onClick={handleReset}
        >
          <RotateCcw size={19} />
          Reset Settings
        </button>

        <button
          type="button"
          className="setting-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={19} />
          {saving ? "Saving..." : "Save Settings"}
        </button>

      </div>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div
          className={`setting-toast ${
            notification.type === "error"
              ? "error"
              : notification.type === "info"
              ? "info"
              : "success"
          }`}
        >

          {notification.type === "error" ? (
            <Info size={20} />
          ) : notification.type === "info" ? (
            <Info size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}

          <span>{notification.message}</span>

          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="Close notification"
          >
            <X size={17} />
          </button>

        </div>
      )}

    </div>
  );
};

export default SettingMain;
