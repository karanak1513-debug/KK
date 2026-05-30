'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] rounded-lg shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
        <h3 className="font-serif text-xl text-[#D32F2F] mb-2">{title}</h3>
        <p className="font-sans text-sm text-[#8C6239] mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 font-sans text-xs uppercase tracking-widest font-medium text-[#3E2723] bg-[#F5F5F5] hover:bg-[#E0E0E0] rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 font-sans text-xs uppercase tracking-widest font-medium text-[#FFFFFF] bg-[#D32F2F] hover:bg-[#B71C1C] rounded transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
