"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, loading, onCancel]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4"
          onClick={() => !loading && onCancel()}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onCancel}
              disabled={loading}
              aria-label="Close"
              className="focus-ring absolute right-4 top-4 text-ink-soft/50 transition-colors hover:text-ink disabled:opacity-40"
            >
              <X size={18} />
            </button>

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                variant === "danger" ? "bg-red-50 text-red-600" : "bg-amber/15 text-amber-dark"
              }`}
            >
              <AlertTriangle size={20} />
            </div>

            <h2 id="confirm-dialog-title" className="mt-4 font-display text-xl font-bold text-ink">
              {title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{description}</p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="focus-ring flex-1 rounded-lg border border-ink/15 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-bone-soft disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`focus-ring flex-1 rounded-lg py-2.5 text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-60 ${
                  variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-moss hover:bg-moss-dark"
                }`}
              >
                {loading ? "Please wait..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}