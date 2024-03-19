import Link from "next/link";
import Image from "next/image";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />

      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github/start"
        >
          <span>
            <Image
              className="size-6 dark:invert"
              src="/github.svg"
              alt="GitHub Logo"
              width={180}
              height={37}
            />
          </span>
          <span>Continue with GitHub</span>
        </Link>

        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
