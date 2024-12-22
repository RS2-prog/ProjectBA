import React from 'react'

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, message, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => onCancel}
    >
      <div
        className="bg-white rounded shadow-lg p-6 w-1/3 animate-fade-in"
        onClick={(e) => e.stopPropagation()} 
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-sky-600 text-gray-50 rounded hover:bg-sky-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertModal