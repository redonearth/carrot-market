import React from 'react';

interface InputProps {
  name: string;
  label: string;
  kind?: 'text' | 'phone' | 'price';
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  [key: string]: any;
}

export default function Input({
  name,
  label,
  kind = 'text',
  type,
  placeholder,
  required = false,
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      {kind === 'text' ? (
        <input
          id={name}
          type={type}
          required={required}
          {...rest}
          className="w-full appearance-none rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        />
      ) : null}
      {kind === 'phone' ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id={name}
            type={type}
            required={required}
            {...rest}
            className="w-full appearance-none rounded-md rounded-l-none border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>
      ) : null}
      {kind === 'price' ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">₩</span>
          </div>
          <input
            id={name}
            type={type}
            required={required}
            {...rest}
            className="w-full appearance-none rounded-md border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-gray-500">원</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
