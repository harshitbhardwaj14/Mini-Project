import { useState } from "react";

interface PopoverProps {
  buttonText: string;
  popoverTitle: string;
  popoverContent: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const GenericPopover: React.FC<PopoverProps> = ({
  buttonText,
  popoverTitle,
  popoverContent,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      {/* Button with dynamic text and click handler */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        disabled={disabled}
        aria-busy={isLoading}
        aria-live="polite"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : buttonText}
      </button>

      {/* Popover Content */}
      {isVisible && (
        <div
          role="tooltip"
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-10 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-400 dark:border-gray-600 dark:bg-[#171717] transition-opacity duration-400"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-[#171717] ">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {popoverTitle} <span className="bg-blue-100 text-blue-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">New</span>
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>{popoverContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericPopover;