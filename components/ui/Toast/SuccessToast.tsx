import { Check, X } from "lucide-react";
import type { Toast } from "react-hot-toast";
import toast from "react-hot-toast";

interface SuccessToastProps {
  t: Toast;
  title: string;
  description?: string;
}

export const SuccessToast = ({ t, title, description }: SuccessToastProps) => {
  return (
    <div
      className={`
        pointer-events-auto
        flex w-[360px] items-start gap-3
        rounded-card
        border border-default
        bg-card
        px-4 py-3.5
        shadow-card
        transition-all duration-200 ease-out
        ${t.visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}
      `}
    >
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
        <Check size={16} strokeWidth={2.5} className="text-success" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-5 text-primary">{title}</p>

        {description && (
          <p className="mt-0.5 text-xs leading-5 text-secondary">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => toast.dismiss(t.id)}
        aria-label="Dismiss notification"
        className="
          flex size-7 shrink-0 items-center justify-center
          rounded-md
          text-secondary
          transition-fast
          hover:bg-secondary
          hover:text-primary
        "
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
};
