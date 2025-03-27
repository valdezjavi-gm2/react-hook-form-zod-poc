import { ErrorIcon, EyeIcon, EyeSlashIcon } from "./icons";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export function FormLabel({ htmlFor, children }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-base font-semibold text-gray-900 mb-2"
    >
      {children}
    </label>
  );
}

interface FormInputProps {
  id: string;
  type?: "text" | "email" | "password" | "number";
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export function FormInput({
  id,
  type = "text",
  placeholder,
  registration,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          {...registration}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm ${
            type === "number" ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" : ""
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <ErrorIcon />
          {error}
        </p>
      )}
    </div>
  );
}

interface FormFieldProps extends FormInputProps {
  label: string;
}

export function FormField({ label, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>
      <FormInput {...inputProps} />
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  const baseStyles = "py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
  };
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = "" }: ButtonGroupProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {children}
    </div>
  );
}
