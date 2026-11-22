
import React, { useEffect, useState } from "react";
import {
  Settings, Mail, Bell, Palette, Shield, UploadCloud, Globe,
  CalendarDays, Server, UserRound, LockKeyhole, Save, RotateCcw,
  CheckCircle2, Eye, EyeOff, X, Info
} from "lucide-react";

import primeSiteLogo from "../../assets/primeSiteLogo.png";
import "./SettingMain.css";

const DEFAULT_LOGO = primeSiteLogo;

const DEFAULT_SETTINGS = {
  siteTitle: "",
  tagline: "",
  timezone: "Asia/Kolkata",
  dateFormat: "DD MMM YYYY",
  fromEmail: "",
  fromName: "",
  smtpHost: "",
  smtpPort: "587",
  smtpUsername: "",
  smtpPassword: "",
  smtpEnabled: true,
  notificationsEnabled: true,
  twoFactorEnabled: false,
  accentColor: "red",
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

function Field({
  label,
  name,
  icon: Icon,
  placeholder,
  type = "text",
  required = false,
  value,
  error,
  onChange,
  rightElement,
  disabled = false,
}) {
  return (
    <div className={`setting-field ${error ? "setting-field-error" : ""}`}>
      <label htmlFor={`setting-${name}`}>
        {label}
        {required && <span className="setting-required"> *</span>}
      </label>

      <div className="setting-input-wrap">
        {Icon && <Icon size={18} className="setting-input-icon" />}

        <input
          id={`setting-${name}`}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          onChange={(e) => onChange(name, e.target.value)}
          autoComplete="off"
        />

        {rightElement}
      </div>

      {error && <span className="setting-error-text">{error}</span>}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="setting-section-header">
      <div className="setting-section-icon">
        <Icon size={21} />
      </div>

      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Toggle({ value, onChange, label, description }) {
  return (
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
}

const SettingMain = () => {
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS }));
  const [originalSettings, setOriginalSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
  }));

  // Prime Site logo is displayed by default.
  const [logo, setLogo] = useState(DEFAULT_LOGO);
  const [favicon, setFavicon] = useState("");
  const [originalLogo, setOriginalLogo] = useState(DEFAULT_LOGO);
  const [originalFavicon, setOriginalFavicon] = useState("");

  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!notification) return undefined;

    const timer = window.setTimeout(() => {
      setNotification(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [notification]);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
  };

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

  const handleImageUpload = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Please select a valid image file.", "error");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      notify("Image size must be less than 2MB.", "error");
      event.target.value = "";
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
        `${type === "logo" ? "Logo" : "Favicon"} preview updated. Click Save Settings to confirm.`
      );
    };

    reader.onerror = () => {
      notify("Unable to read selected image.", "error");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const validateSettings = () => {
    const newErrors = {};

    if (!settings.siteTitle.trim()) {
      newErrors.siteTitle = "Website title is required.";
    }

    if (!settings.fromEmail.trim()) {
      newErrors.fromEmail = "From email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.fromEmail)) {
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

  const handleSave = () => {
    if (!validateSettings()) {
      notify("Please correct the highlighted fields.", "error");
      return;
    }

    setSaving(true);

    try {
      const savedSettings = { ...settings };

      setOriginalSettings(savedSettings);
      setOriginalLogo(logo);
      setOriginalFavicon(favicon);

      notify("Settings saved for this session.");
    } catch {
      notify("Unable to save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({ ...originalSettings });
    setLogo(originalLogo);
    setFavicon(originalFavicon);
    setErrors({});
    setShowPassword(false);

    notify("Unsaved changes have been reset.");
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    const section = document.getElementById(`setting-section-${tabId}`);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={`setting-main accent-${settings.accentColor}`}>
      {/* HEADER */}
      <header className="setting-page-header">
        <div className="setting-header-left">
          <div className="setting-header-icon">
            <Settings size={27} />
          </div>

          <div>
            <h1>Settings</h1>
            <p>Manage your website settings and preferences</p>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="setting-navigation" aria-label="Settings navigation">
        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => handleTabClick(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
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
              value={settings.siteTitle}
              error={errors.siteTitle}
              onChange={updateField}
            />

            <Field
              label="Tagline"
              name="tagline"
              placeholder="Enter website tagline"
              value={settings.tagline}
              onChange={updateField}
            />
          </div>

          {/* LOGO */}
          <div className="setting-upload-group">
            <label className="setting-upload-label">Site Logo</label>

            <div className="setting-upload-row">
              <div className="setting-logo-preview">
                {logo ? (
                  <img src={logo} alt="Prime Site logo preview" />
                ) : (
                  <span className="setting-empty-preview">Logo preview</span>
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

                <small>Recommended size: 200 × 60px · Max 2MB</small>
              </div>
            </div>
          </div>

          {/* FAVICON */}
          <div className="setting-upload-group">
            <label className="setting-upload-label">Favicon</label>

            <div className="setting-upload-row">
              <div className="setting-favicon-preview">
                {favicon ? (
                  <img src={favicon} alt="Favicon preview" />
                ) : (
                  <span className="setting-empty-favicon">32px</span>
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
                  onChange={(e) => handleImageUpload(e, "favicon")}
                />

                <small>Recommended size: 32 × 32px · Max 2MB</small>
              </div>
            </div>
          </div>

          {/* TIMEZONE */}
          <div className="setting-select-group">
            <label htmlFor="setting-timezone">
              <Globe size={16} />
              Timezone
            </label>

            <div className="setting-select-wrap">
              <select
                id="setting-timezone"
                value={settings.timezone}
                onChange={(e) => updateField("timezone", e.target.value)}
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
              <CalendarDays size={16} />
              Date Format
            </label>

            <div className="setting-select-wrap">
              <select
                id="setting-date-format"
                value={settings.dateFormat}
                onChange={(e) => updateField("dateFormat", e.target.value)}
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
              value={settings.fromEmail}
              error={errors.fromEmail}
              onChange={updateField}
            />

            <Field
              label="From Name"
              name="fromName"
              icon={UserRound}
              placeholder="Website name"
              required
              value={settings.fromName}
              error={errors.fromName}
              onChange={updateField}
            />

            <Field
              label="SMTP Host"
              name="smtpHost"
              icon={Server}
              placeholder="smtp.example.com"
              value={settings.smtpHost}
              error={errors.smtpHost}
              onChange={updateField}
              disabled={!settings.smtpEnabled}
            />

            <Field
              label="SMTP Port"
              name="smtpPort"
              icon={CalendarDays}
              placeholder="587"
              value={settings.smtpPort}
              error={errors.smtpPort}
              onChange={updateField}
              disabled={!settings.smtpEnabled}
            />

            <Field
              label="SMTP Username"
              name="smtpUsername"
              icon={UserRound}
              placeholder="Enter SMTP username"
              value={settings.smtpUsername}
              error={errors.smtpUsername}
              onChange={updateField}
              disabled={!settings.smtpEnabled}
            />

            <Field
              label="SMTP Password"
              name="smtpPassword"
              icon={LockKeyhole}
              type={showPassword ? "text" : "password"}
              placeholder="Enter SMTP password"
              value={settings.smtpPassword}
              error={errors.smtpPassword}
              onChange={updateField}
              disabled={!settings.smtpEnabled}
              rightElement={
                <button
                  type="button"
                  className="setting-password-eye"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide SMTP password" : "Show SMTP password"
                  }
                  disabled={!settings.smtpEnabled}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

        {/* NOTIFICATIONS */}
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
            onChange={(value) => updateField("notificationsEnabled", value)}
            label="Enable Notifications"
            description="Get notified about new bookings, enquiries and more"
          />
        </section>

        {/* APPEARANCE */}
        <section
          className="setting-card setting-appearance-card"
          id="setting-section-appearance"
        >
          <SectionHeader
            icon={Palette}
            title="Appearance Settings"
            subtitle="Customize your admin panel accent color"
          />

          <div className="setting-select-group">
            <label htmlFor="setting-accent-color">
              <Palette size={16} />
              Accent Color
            </label>

            <div className="setting-select-wrap">
              <select
                id="setting-accent-color"
                value={settings.accentColor}
                onChange={(e) => updateField("accentColor", e.target.value)}
              >
                <option value="red">Prime Red</option>
                <option value="blue">Ocean Blue</option>
                <option value="green">Forest Green</option>
                <option value="purple">Royal Purple</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECURITY */}
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
            onChange={(value) => updateField("twoFactorEnabled", value)}
            label="Enable Two-Factor Authentication (2FA)"
            description="Add an extra layer of security to your account"
          />
        </section>
      </div>

      {/* ACTION BUTTONS */}
      <div className="setting-actions">
        <button
          type="button"
          className="setting-reset-btn"
          onClick={handleReset}
        >
          <RotateCcw size={18} />
          Reset Settings
        </button>

        <button
          type="button"
          className="setting-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* TOAST */}
      {notification && (
        <div
          className={`setting-toast ${notification.type}`}
          role="status"
          aria-live="polite"
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <Info size={20} />
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
