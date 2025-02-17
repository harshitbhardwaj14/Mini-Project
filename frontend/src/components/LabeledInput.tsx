import { ChangeEvent } from "react";

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    icon?: string;
  }
  
  function LabelledInput({
    label,
    placeholder,
    onChange,
    type = "text",
    icon,
  }: LabelledInputType) {
    return (
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          id={label.replace(/\s+/g, "-").toLowerCase()} // Generate unique ID
          onChange={onChange}
          placeholder=" " // Required for floating label
          className="peer block w-full px-2.5 pb-2.5 pt-4 text-sm text-white bg-transparent rounded-lg border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
          required
        />
        <label
          htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-800 dark:bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
        >
          {label}
        </label>
      </div>
    );
  }
  
  export default LabelledInput;
  