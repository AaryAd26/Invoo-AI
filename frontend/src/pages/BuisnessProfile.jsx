import React, { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react';
import { businessProfileStyles, iconColors, customStyles } from '../assets/dummyStyles';

const API_BASE = "http://localhost:4000";

// Icons
const UploadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const ImageIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const DeleteIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const SaveIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const ResetIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const BuildingIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const PaletteIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);
const TagIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

function resolveImageUrl(url) {
  if (!url) return null;
  const s = String(url).trim();
  if (s.startsWith("blob:") || s.startsWith("data:")) return s;
  if (/^https?:\/\//i.test(s)) {
    try {
      const parsed = new URL(s);
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
        const path = parsed.pathname + (parsed.search || "") + (parsed.hash || "");
        return `${API_BASE.replace(/\/+$/, "")}${path}`;
      }
      return parsed.href;
    } catch (e) {}
  }
  return `${API_BASE.replace(/\/+$/, "")}/${s.replace(/^\/+/, "")}`;
}

// ---- Reusable Upload Box ----
function UploadBox({ label, hint, preview, onPick, onRemove, previewClass, iconSlot }) {
  const inputRef = React.useRef();
  return (
    <div>
      {!preview ? (
        <div
          className={businessProfileStyles.uploadArea}
          onClick={() => inputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <div className="text-center">
            <div className={businessProfileStyles.uploadIconContainer}>
              {iconSlot || <UploadIcon className="w-6 h-6" />}
            </div>
            <p className={`mt-3 ${businessProfileStyles.uploadTextTitle}`}>{label}</p>
            <p className={businessProfileStyles.uploadTextSubtitle}>{hint}</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => { if (e.target.files?.[0]) onPick(e.target.files[0]); }}
          />
        </div>
      ) : (
        <div className={businessProfileStyles.imagePreviewContainer}>
          <div className={previewClass}>
            <img src={preview} alt={label} className="w-full h-full object-contain" />
          </div>
          <div className={businessProfileStyles.buttonGroup}>
            <label className={businessProfileStyles.changeButton} style={{ cursor: 'pointer' }}>
              <UploadIcon className="w-4 h-4" />
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => { if (e.target.files?.[0]) onPick(e.target.files[0]); }}
              />
            </label>
            <button type="button" onClick={onRemove} className={businessProfileStyles.removeButton}>
              <DeleteIcon className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const BuisnessProfile = () => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const [meta, setMeta] = useState({});
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState({ logo: null, stamp: null, signature: null });
  const [previews, setPreviews] = useState({ logo: null, stamp: null, signature: null });

  async function getAuthToken() {
    if (typeof getToken !== "function") return null;
    try {
      let t = await getToken({ template: "default" }).catch(() => null);
      if (!t) t = await getToken({ forceRefresh: true }).catch(() => null);
      return t;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      if (!isSignedIn) return;
      const token = await getAuthToken();
      if (!token) {
        console.warn("No auth token available — cannot fetch BusinessProfile");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/business-profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          if (res.status !== 204 && res.status !== 401)
            console.error("Failed to fetch business profile:", res.status);
          return;
        }

        const json = await res.json().catch(() => null);
        const data = json?.data;
        if (!data || !mounted) return;

        const serverMeta = {
          businessName: data.businessName ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          gst: data.gst ?? "",
          logoUrl: data.logoUrl ?? null,
          stampUrl: data.stampUrl ?? null,
          signatureUrl: data.signatureUrl ?? null,
          signatureOwnerName: data.signatureOwnerName ?? "",
          signatureOwnerTitle: data.signatureOwnerTitle ?? "",
          defaultTaxPercent: data.defaultTaxPercent ?? 18,
          notes: data.notes ?? "",
          profileId: data._id ?? data.id ?? null,
        };

        setMeta(serverMeta);
        setPreviews((p) => ({
          ...p,
          logo: resolveImageUrl(serverMeta.logoUrl),
          stamp: resolveImageUrl(serverMeta.stampUrl),
          signature: resolveImageUrl(serverMeta.signatureUrl),
        }));
      } catch (err) {
        console.error("Error fetching business profile:", err);
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
      Object.values(previews).forEach((u) => {
        if (u && typeof u === "string" && u.startsWith("blob:")) {
          URL.revokeObjectURL(u);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, getToken]);

  function updateMeta(field, value) {
    setMeta((m) => ({ ...m, [field]: value }));
  }

  function handleLocalFilePick(kind, file) {
    if (!file) return;
    const prev = previews[kind];
    if (prev && typeof prev === "string" && prev.startsWith("blob:")) {
      URL.revokeObjectURL(prev);
    }
    const objUrl = URL.createObjectURL(file);
    setFiles((f) => ({ ...f, [kind]: file }));
    setPreviews((p) => ({ ...p, [kind]: objUrl }));
    updateMeta(
      kind === "logo" ? "logoUrl" : kind === "stamp" ? "stampUrl" : "signatureUrl",
      objUrl
    );
  }

  function removeLocalFile(kind) {
    const prev = previews[kind];
    if (prev && typeof prev === "string" && prev.startsWith("blob:")) {
      URL.revokeObjectURL(prev);
    }
    setFiles((f) => ({ ...f, [kind]: null }));
    setPreviews((p) => ({ ...p, [kind]: null }));
    updateMeta(
      kind === "logo" ? "logoUrl" : kind === "stamp" ? "stampUrl" : "signatureUrl",
      null
    );
  }

  async function handleSave(e) {
    e?.preventDefault();
    setSaving(true);

    try {
      const token = await getAuthToken();
      if (!token) {
        alert("You must be signed in to save your business profile.");
        return;
      }

      const fd = new FormData();
      fd.append("businessName", meta.businessName || "");
      fd.append("email", meta.email || "");
      fd.append("address", meta.address || "");
      fd.append("phone", meta.phone || "");
      fd.append("gst", meta.gst || "");
      fd.append("defaultTaxPercent", String(meta.defaultTaxPercent ?? 18));
      fd.append("signatureOwnerName", meta.signatureOwnerName || "");
      fd.append("signatureOwnerTitle", meta.signatureOwnerTitle || "");
      fd.append("notes", meta.notes || "");

      if (files.logo) fd.append("logoName", files.logo);
      else if (meta.logoUrl) fd.append("logoUrl", meta.logoUrl);

      if (files.stamp) fd.append("stampName", files.stamp);
      else if (meta.stampUrl) fd.append("stampUrl", meta.stampUrl);

      if (files.signature) fd.append("signatureNameMeta", files.signature);
      else if (meta.signatureUrl) fd.append("signatureUrl", meta.signatureUrl);

      const profileId = meta.profileId;
      const url = profileId
        ? `${API_BASE}/api/business-profile/${profileId}`
        : `${API_BASE}/api/business-profile`;
      const method = profileId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = json?.message || `Save failed (${res.status})`;
        throw new Error(msg);
      }

      const saved = json?.data || json;
      const merged = {
        ...meta,
        businessName: saved.businessName ?? meta.businessName,
        email: saved.email ?? meta.email,
        address: saved.address ?? meta.address,
        phone: saved.phone ?? meta.phone,
        gst: saved.gst ?? meta.gst,
        logoUrl: saved.logoUrl ?? meta.logoUrl,
        stampUrl: saved.stampUrl ?? meta.stampUrl,
        signatureUrl: saved.signatureUrl ?? meta.signatureUrl,
        signatureOwnerName: saved.signatureOwnerName ?? meta.signatureOwnerName,
        signatureOwnerTitle: saved.signatureOwnerTitle ?? meta.signatureOwnerTitle,
        defaultTaxPercent: saved.defaultTaxPercent ?? meta.defaultTaxPercent,
        notes: saved.notes ?? meta.notes,
        profileId: saved._id ?? meta.profileId ?? saved.id ?? meta.profileId,
      };

      setMeta(merged);

      if (saved.logoUrl) setPreviews((p) => ({ ...p, logo: resolveImageUrl(saved.logoUrl) }));
      if (saved.stampUrl) setPreviews((p) => ({ ...p, stamp: resolveImageUrl(saved.stampUrl) }));
      if (saved.signatureUrl) setPreviews((p) => ({ ...p, signature: resolveImageUrl(saved.signatureUrl) }));

      alert(`Profile ${profileId ? "updated" : "created"} successfully.`);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert(err?.message || "Failed to save profile. See console for details.");
    } finally {
      setSaving(false);
    }
  }

  function handleClearProfile() {
    if (!confirm("Clear current profile data? This will remove local changes and previews.")) return;
    Object.values(previews).forEach((u) => {
      if (u && typeof u === "string" && u.startsWith("blob:")) {
        URL.revokeObjectURL(u);
      }
    });
    setMeta({});
    setFiles({ logo: null, stamp: null, signature: null });
    setPreviews({ logo: null, stamp: null, signature: null });
  }

  return (
    <div className={businessProfileStyles.pageContainer}>
      {/* Page Header */}
      <div className={businessProfileStyles.headerContainer}>
        <h1 className={businessProfileStyles.headerTitle}>Business Profile</h1>
        <p className={businessProfileStyles.headerSubtitle}>
          Configure your company details, branding assets and invoice defaults
        </p>
      </div>

      {/* ── Section 1: Business Information ── */}
      <div className={businessProfileStyles.cardContainer}>
        <div className={businessProfileStyles.cardHeaderContainer}>
          <div className={`${businessProfileStyles.cardIconContainer} ${iconColors.business}`}>
            <BuildingIcon className="w-5 h-5" />
          </div>
          <h2 className={businessProfileStyles.cardTitle}>Business Information</h2>
        </div>

        <div className={businessProfileStyles.gridCols2}>
          {/* Business Name */}
          <div>
            <label className={businessProfileStyles.label}>Business Name</label>
            <input
              type="text"
              className={businessProfileStyles.input}
              placeholder="Enter your business name"
              value={meta.businessName || ""}
              onChange={e => updateMeta("businessName", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className={businessProfileStyles.label}>Email</label>
            <input
              type="email"
              className={businessProfileStyles.input}
              placeholder="business@email.com"
              value={meta.email || ""}
              onChange={e => updateMeta("email", e.target.value)}
            />
          </div>

          {/* Address - full width */}
          <div className={businessProfileStyles.gridColSpan2}>
            <label className={businessProfileStyles.label}>Address</label>
            <textarea
              rows={3}
              className={businessProfileStyles.textarea}
              placeholder="Enter your business address"
              value={meta.address || ""}
              onChange={e => updateMeta("address", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className={businessProfileStyles.label}>Phone</label>
            <input
              type="tel"
              className={businessProfileStyles.input}
              placeholder="+1 (555) 123-4567"
              value={meta.phone || ""}
              onChange={e => updateMeta("phone", e.target.value)}
            />
          </div>

          {/* GST Number */}
          <div>
            <label className={businessProfileStyles.label}>GST Number</label>
            <input
              type="text"
              className={businessProfileStyles.input}
              placeholder="27AAAPL1234C1ZV"
              value={meta.gst || ""}
              onChange={e => updateMeta("gst", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Branding & Defaults ── */}
      <div className={businessProfileStyles.cardContainer}>
        <div className={businessProfileStyles.cardHeaderContainer}>
          <div className={`${businessProfileStyles.cardIconContainer} ${iconColors.branding}`}>
            <PaletteIcon className="w-5 h-5" />
          </div>
          <h2 className={businessProfileStyles.cardTitle}>Branding &amp; Defaults</h2>
        </div>

        <div className={businessProfileStyles.gridCols2}>
          {/* Company Logo */}
          <div>
            <label className={businessProfileStyles.label}>Company Logo</label>
            <UploadBox
              label="Upload Logo"
              hint="PNG, JPG up to 5MB"
              preview={previews.logo}
              onPick={f => handleLocalFilePick("logo", f)}
              onRemove={() => removeLocalFile("logo")}
              previewClass={businessProfileStyles.logoPreview}
              iconSlot={<UploadIcon className="w-6 h-6" />}
            />
          </div>

          {/* Tax Settings */}
          <div>
            <label className={businessProfileStyles.label}>Tax Settings</label>
            <div className={businessProfileStyles.taxContainer}>
              <p className="text-sm font-medium text-gray-700 mb-3">Default Tax Percentage</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className={businessProfileStyles.taxInput}
                  value={meta.defaultTaxPercent ?? 18}
                  onChange={e => updateMeta("defaultTaxPercent", Number(e.target.value))}
                />
                <span className={customStyles.taxPercentage}>%</span>
              </div>
              <p className={businessProfileStyles.taxHelpText}>
                This tax rate will prefill in new invoices. You can adjust it per invoice as needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Digital Assets ── */}
      <div className={businessProfileStyles.cardContainer}>
        <div className={businessProfileStyles.cardHeaderContainer}>
          <div className={`${businessProfileStyles.cardIconContainer} ${iconColors.assets}`}>
            <TagIcon className="w-5 h-5" />
          </div>
          <h2 className={businessProfileStyles.cardTitle}>Digital Assets</h2>
        </div>

        <div className={businessProfileStyles.gridCols2}>
          {/* Digital Stamp */}
          <div>
            <label className={businessProfileStyles.label}>Digital Stamp</label>
            <UploadBox
              label="Upload Stamp"
              hint="PNG with transparent background"
              preview={previews.stamp}
              onPick={f => handleLocalFilePick("stamp", f)}
              onRemove={() => removeLocalFile("stamp")}
              previewClass={businessProfileStyles.stampPreview}
              iconSlot={<ImageIcon className="w-6 h-6" />}
            />
          </div>

          {/* Digital Signature */}
          <div className="space-y-4">
            <div>
              <label className={businessProfileStyles.label}>Digital Signature</label>
              <UploadBox
                label="Upload Signature"
                hint="PNG with transparent background"
                preview={previews.signature}
                onPick={f => handleLocalFilePick("signature", f)}
                onRemove={() => removeLocalFile("signature")}
                previewClass={businessProfileStyles.signaturePreview}
                iconSlot={<UserIcon className="w-6 h-6" />}
              />
            </div>

            {/* Signature Owner Name */}
            <div>
              <label className={businessProfileStyles.label}>Signature Owner Name</label>
              <input
                type="text"
                className={businessProfileStyles.input}
                placeholder="John Doe"
                value={meta.signatureOwnerName || ""}
                onChange={e => updateMeta("signatureOwnerName", e.target.value)}
              />
            </div>

            {/* Signature Title */}
            <div>
              <label className={businessProfileStyles.label}>Signature Title / Designation</label>
              <input
                type="text"
                className={businessProfileStyles.input}
                placeholder="Director / CEO"
                value={meta.signatureOwnerTitle || ""}
                onChange={e => updateMeta("signatureOwnerTitle", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Bar ── */}
      <div className={businessProfileStyles.actionContainer}>
        <div className={businessProfileStyles.actionInnerContainer}>
          <p className="text-sm text-gray-500">
            All changes are saved to your account and reflected on new invoices.
          </p>
          <div className={businessProfileStyles.actionButtonGroup}>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className={businessProfileStyles.saveButton}
            >
              <SaveIcon className="w-4 h-4" />
              {saving ? "Saving…" : "Save Profile"}
            </button>
            <button
              type="button"
              onClick={handleClearProfile}
              className={businessProfileStyles.resetButton}
            >
              <ResetIcon className="w-4 h-4" />
              Clear Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuisnessProfile;