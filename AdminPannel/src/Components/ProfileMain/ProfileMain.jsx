
import React, { useEffect, useState } from "react";
import {
  UserRound,
  Phone,
  Info,
  Mail,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  Star,
  Camera,
  LockKeyhole,
  Save,
  RotateCcw,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  ShieldCheck,
  Building2,
  Globe,
  KeyRound,
  Activity,
} from "lucide-react";

import "./ProfileMain.css";

/* =========================================
   EMPTY PROFILE
========================================= */

// New storage key prevents old prefilled data
// from automatically appearing in the form.
const STORAGE_KEY = "primeAdminProfile_v2";

const DEFAULT_PROFILE = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  location: "",
  bio: "",
  website: "",
  company: "",
  department: "",
  memberSince: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  status: true,
};

const INITIAL_PASSWORD = {
  current: "",
  newPassword: "",
  confirm: "",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces";

/* =========================================
   STORAGE HELPERS
========================================= */

const getSavedProfile = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved
      ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) }
      : { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};

const getSavedImage = () => {
  try {
    return (
      localStorage.getItem("primeAdminProfileImage") ||
      DEFAULT_IMAGE
    );
  } catch {
    return DEFAULT_IMAGE;
  }
};

/* =========================================
   REUSABLE FIELD COMPONENT
   Declared OUTSIDE ProfileMain
========================================= */

const Field = ({
  label,
  name,
  icon: Icon,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
  value,
  onChange,
  error,
}) => {
  return (
    <div
      className={`profile-field ${
        multiline ? "profile-field--textarea" : ""
      } ${error ? "profile-field-error" : ""}`}
    >
      <label htmlFor={`profile-${name}`}>
        {label}
        {required && <span className="required-star"> *</span>}
      </label>

      <div
        className={`profile-input-wrap ${
          multiline ? "textarea-wrap" : ""
        }`}
      >
        {Icon && (
          <Icon className="profile-field-icon" size={19} />
        )}

        {multiline ? (
          <textarea
            id={`profile-${name}`}
            value={value || ""}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
            rows={4}
          />
        ) : (
          <input
            id={`profile-${name}`}
            type={type}
            value={value || ""}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
          />
        )}
      </div>

      {error && (
        <span className="profile-error-text">{error}</span>
      )}
    </div>
  );
};

/* =========================================
   MAIN COMPONENT
========================================= */

const ProfileMain = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const [profile, setProfile] = useState(getSavedProfile);

  const [originalProfile, setOriginalProfile] =
    useState(getSavedProfile);

  const [profileImage, setProfileImage] =
    useState(getSavedImage);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [showPasswords, setShowPasswords] = useState(false);

  const [password, setPassword] = useState(INITIAL_PASSWORD);

  const [notification, setNotification] = useState(null);

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  /* =========================================
     TOAST TIMER
  ========================================= */

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  /* =========================================
     NOTIFICATION
  ========================================= */

  const notify = (message, type = "success") => {
    setNotification({ message, type });
  };

  /* =========================================
     UPDATE FIELD
  ========================================= */

  const updateField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* =========================================
     PROFILE IMAGE UPLOAD
  ========================================= */

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Please select a valid image.", "error");
      e.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      notify("Image size must be less than 3MB.", "error");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        localStorage.setItem(
          "primeAdminProfileImage",
          reader.result
        );

        setProfileImage(reader.result);

        notify("Profile photo updated successfully!");
      } catch {
        notify(
          "Unable to save image. Please select a smaller image.",
          "error"
        );
      }
    };

    reader.onerror = () => {
      notify("Unable to read the selected image.", "error");
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  /* =========================================
     PROFILE VALIDATION
  ========================================= */

  const validateProfile = () => {
    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!profile.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^[0-9+\-\s()]{10,16}$/.test(profile.phone.trim())
    ) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!profile.designation.trim()) {
      newErrors.designation = "Designation is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================
     UPDATE PROFILE
  ========================================= */

  const handleUpdate = () => {
    if (saving) return;

    if (!validateProfile()) {
      notify("Please correct the highlighted fields.", "error");
      return;
    }

    setSaving(true);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profile)
      );

      setOriginalProfile({ ...profile });

      notify("Your profile has been updated successfully!");
    } catch {
      notify("Unable to save profile. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     RESET UNSAVED CHANGES
  ========================================= */

  const handleReset = () => {
    setProfile({ ...originalProfile });
    setErrors({});

    notify("Changes have been reset.");
  };

  /* =========================================
     CHANGE PASSWORD
  ========================================= */

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (
      !password.current ||
      !password.newPassword ||
      !password.confirm
    ) {
      notify("Please fill in all password fields.", "error");
      return;
    }

    if (password.newPassword.length < 8) {
      notify(
        "New password must contain at least 8 characters.",
        "error"
      );
      return;
    }

    if (password.newPassword !== password.confirm) {
      notify("New passwords do not match.", "error");
      return;
    }

    // Actual password change requires authentication API.
    setPassword(INITIAL_PASSWORD);
    setShowPasswordModal(false);

    notify(
      "Password validated. Connect your authentication API to save it.",
      "success"
    );
  };

  /* =========================================
     REUSABLE FIELD PROPS
  ========================================= */

  const renderField = (props) => (
    <Field
      {...props}
      value={profile[props.name]}
      onChange={updateField}
      error={errors[props.name]}
    />
  );

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="profile-main">

      {/* HEADER */}

      <div className="profile-page-header">
        <div className="profile-header-left">
          <div className="profile-header-icon">
            <UserRound size={30} strokeWidth={2.5} />
          </div>

          <div>
            <h1>My Profile</h1>
            <p>Manage your profile information</p>
          </div>
        </div>

        <button
          className="profile-password-btn"
          onClick={() => setShowPasswordModal(true)}
        >
          <LockKeyhole size={17} />
          Change Password
        </button>
      </div>

      {/* MAIN LAYOUT */}

      <div className="profile-layout">

        {/* SIDEBAR */}

        <aside className="profile-sidebar">

          <div className="profile-user-section">

            <div className="profile-avatar-wrapper">

              <div className="profile-avatar-ring">
                <img
                  src={profileImage}
                  alt="Admin profile"
                  className="profile-avatar"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
              </div>

              <label
                htmlFor="profile-image-upload"
                className="profile-camera-btn"
                title="Change profile photo"
              >
                <Camera size={19} />
              </label>

              <input
                type="file"
                id="profile-image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />

            </div>

            <h2>{profile.name || "Admin User"}</h2>

            <span className="profile-designation">
              {profile.designation || "Super Admin"}
            </span>

            <div className="profile-member-divider" />

            <div className="profile-member-info">
              <CalendarDays size={18} />

              <div>
                <span>Member Since</span>
                <strong>{profile.memberSince || "Not specified"}</strong>
              </div>
            </div>

            <div
              className={`profile-status-pill ${
                profile.status ? "active" : "inactive"
              }`}
            >
              <span />
              {profile.status ? "Active" : "Inactive"}
            </div>

          </div>

          {/* QUICK INFO */}

          <div className="profile-quick-info">

            <h3>
              <Star size={18} fill="currentColor" />
              Quick Info
            </h3>

            <div className="profile-info-row">
              <span>Total Blogs</span>
              <strong>24</strong>
            </div>

            <div className="profile-info-row">
              <span>Total Bookings</span>
              <strong>156</strong>
            </div>

            <div className="profile-info-row">
              <span>Total Enquiries</span>
              <strong>89</strong>
            </div>

          </div>
        </aside>

        {/* RIGHT CONTENT */}

        <main className="profile-content">

          {/* TABS */}

          <div className="profile-tabs">

            <button
              className={activeTab === "personal" ? "active" : ""}
              onClick={() => setActiveTab("personal")}
            >
              <UserRound size={19} />
              Personal Information
            </button>

            <button
              className={activeTab === "contact" ? "active" : ""}
              onClick={() => setActiveTab("contact")}
            >
              <Phone size={18} />
              Contact Details
            </button>

            <button
              className={activeTab === "additional" ? "active" : ""}
              onClick={() => setActiveTab("additional")}
            >
              <Info size={18} />
              Additional Info
            </button>

          </div>

          {/* PERSONAL INFORMATION */}

          {activeTab === "personal" && (
            <div className="profile-form-content">

              <div className="profile-form-grid">

                {renderField({
                  label: "Full Name",
                  name: "name",
                  icon: UserRound,
                  placeholder: "Enter full name",
                  required: true,
                })}

                {renderField({
                  label: "Email Address",
                  name: "email",
                  icon: Mail,
                  placeholder: "Enter email address",
                  type: "email",
                  required: true,
                })}

                {renderField({
                  label: "Phone Number",
                  name: "phone",
                  icon: Phone,
                  placeholder: "Enter phone number",
                  required: true,
                })}

                {renderField({
                  label: "Designation",
                  name: "designation",
                  icon: BriefcaseBusiness,
                  placeholder: "Enter designation",
                  required: true,
                })}

                {renderField({
                  label: "Location",
                  name: "location",
                  icon: MapPin,
                  placeholder: "Enter your location",
                })}

                {renderField({
                  label: "Bio / About Me",
                  name: "bio",
                  placeholder: "Write something about yourself...",
                  multiline: true,
                })}

              </div>

              <div className="profile-status-control">

                <label>Profile Status</label>

                <div className="profile-toggle-row">

                  <button
                    type="button"
                    className={`profile-toggle ${
                      profile.status ? "checked" : ""
                    }`}
                    onClick={() =>
                      updateField("status", !profile.status)
                    }
                    aria-label="Toggle profile status"
                    aria-pressed={profile.status}
                  >
                    <span />
                  </button>

                  <span>
                    {profile.status ? "Active" : "Inactive"}
                  </span>

                </div>
              </div>

            </div>
          )}

          {/* CONTACT DETAILS */}

          {activeTab === "contact" && (
            <div className="profile-form-content">

              <div className="profile-form-grid">

                {renderField({
                  label: "Email Address",
                  name: "email",
                  icon: Mail,
                  placeholder: "Enter email address",
                  type: "email",
                  required: true,
                })}

                {renderField({
                  label: "Phone Number",
                  name: "phone",
                  icon: Phone,
                  placeholder: "Enter phone number",
                  required: true,
                })}

                {renderField({
                  label: "Location",
                  name: "location",
                  icon: MapPin,
                  placeholder: "Enter location",
                })}

                {renderField({
                  label: "Website",
                  name: "website",
                  icon: Globe,
                  placeholder: "Enter website",
                })}

                {renderField({
                  label: "LinkedIn Profile",
                  name: "linkedin",
                  icon: Globe,
                  placeholder: "LinkedIn URL",
                })}

                {renderField({
                  label: "Instagram Profile",
                  name: "instagram",
                  icon: Globe,
                  placeholder: "Instagram URL",
                })}

                {renderField({
                  label: "Facebook Profile",
                  name: "facebook",
                  icon: Globe,
                  placeholder: "Facebook URL",
                })}

              </div>

            </div>
          )}

          {/* ADDITIONAL INFORMATION */}

          {activeTab === "additional" && (
            <div className="profile-form-content">

              <div className="profile-form-grid">

                {renderField({
                  label: "Designation",
                  name: "designation",
                  icon: BriefcaseBusiness,
                  placeholder: "Enter designation",
                  required: true,
                })}

                {renderField({
                  label: "Company",
                  name: "company",
                  icon: Building2,
                  placeholder: "Company name",
                })}

                {renderField({
                  label: "Department",
                  name: "department",
                  icon: ShieldCheck,
                  placeholder: "Department",
                })}

                {renderField({
                  label: "Member Since",
                  name: "memberSince",
                  icon: CalendarDays,
                  placeholder: "Member since",
                })}

              </div>

              <div className="profile-extra-card">

                <div className="profile-extra-icon">
                  <Activity size={22} />
                </div>

                <div>
                  <h3>Account Overview</h3>

                  <p>
                    Manage your administrator account and profile information.
                  </p>

                  <span>
                    <CheckCircle2 size={15} />
                    {profile.status
                      ? "Account currently active"
                      : "Account currently inactive"}
                  </span>
                </div>

              </div>

            </div>
          )}

          {/* ACTION BUTTONS */}

          <div className="profile-actions">

            <button
              className="profile-reset-btn"
              onClick={handleReset}
            >
              <RotateCcw size={19} />
              Reset Changes
            </button>

            <button
              className="profile-update-btn"
              onClick={handleUpdate}
              disabled={saving}
            >
              <Save size={19} />
              {saving ? "Saving..." : "Update Profile"}
            </button>

          </div>

        </main>
      </div>

      {/* NOTIFICATION */}

      {notification && (
        <div className={`profile-toast ${notification.type}`}>

          {notification.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <Info size={20} />
          )}

          <span>{notification.message}</span>

          <button
            onClick={() => setNotification(null)}
            aria-label="Close notification"
          >
            <X size={17} />
          </button>

        </div>
      )}

      {/* PASSWORD MODAL */}

      {showPasswordModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowPasswordModal(false);
              setShowPasswords(false);
            }
          }}
        >

          <div className="profile-password-modal">

            <div className="profile-modal-header">

              <div className="profile-modal-heading">

                <div className="profile-modal-icon">
                  <LockKeyhole size={23} />
                </div>

                <div>
                  <h2>Change Password</h2>
                  <p>Update your account password</p>
                </div>

              </div>

              <button
                className="profile-modal-close"
                onClick={() => {
                  setShowPasswordModal(false);
                  setShowPasswords(false);
                }}
                aria-label="Close modal"
              >
                <X size={21} />
              </button>

            </div>

            <form onSubmit={handlePasswordUpdate}>

              {[
                ["current", "Current Password"],
                ["newPassword", "New Password"],
                ["confirm", "Confirm New Password"],
              ].map(([key, label]) => (

                <div className="profile-password-field" key={key}>

                  <label htmlFor={`password-${key}`}>
                    {label}
                  </label>

                  <div>
                    <KeyRound size={18} />

                    <input
                      id={`password-${key}`}
                      type={showPasswords ? "text" : "password"}
                      value={password[key]}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      onChange={(e) =>
                        setPassword((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => !prev)
                      }
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                </div>

              ))}

              <div className="profile-password-note">
                <ShieldCheck size={17} />
                Use at least 8 characters for your new password.
              </div>

              <div className="profile-modal-actions">

                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword(INITIAL_PASSWORD);
                    setShowPasswords(false);
                  }}
                  className="profile-modal-cancel"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-modal-submit"
                >
                  <LockKeyhole size={17} />
                  Update Password
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileMain;
