import React from 'react'

const StatusBadge = ({ status, size = "default", showIcon = false }) => {
  const styles = {
    Paid: "bg-green-100 text-green-700 border border-green-200",
    Unpaid: "bg-amber-100 text-amber-700 border border-amber-200",
    Overdue: "bg-red-100 text-red-700 border border-red-200",
    Draft: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  const icons = {
    Paid: "✓",
    Unpaid: "○",
    Overdue: "!",
    Draft: "~",
  };

  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClass} ${styles[status] || styles.Draft}`}>
      {showIcon && <span>{icons[status] || icons.Draft}</span>}
      {status || "Draft"}
    </span>
  );
};

export default StatusBadge;