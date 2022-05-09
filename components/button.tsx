import { joinClassNames } from '@libs/client/utils';

interface ButtonProps {
  isLoading?: boolean;
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  isLoading = false,
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={joinClassNames(
        'w-full rounded-md border border-transparent bg-orange-500 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        large ? 'py-3 text-base' : 'py-2 text-sm'
      )}
    >
      {isLoading ? '잠시만 기다려주세요...' : text}
    </button>
  );
}
