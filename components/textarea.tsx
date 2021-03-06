import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
  register?: UseFormRegisterReturn;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TextArea({
  register,
  label,
  name,
  placeholder,
  required = false,
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...register}
        id={name}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        rows={4}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
