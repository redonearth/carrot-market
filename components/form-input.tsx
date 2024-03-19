import { HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        type={type}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-500 p-3"
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
