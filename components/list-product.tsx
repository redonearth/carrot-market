import Link from "next/link";
import Image from "next/image";
import { formatToTimeAgo, formatToWon } from "@/lib/utils";

interface ListProductProps {
  id: number;
  title: string;
  photo: string;
  price: number;
  created_at: Date;
}

export default function ListProduct({
  id,
  title,
  photo,
  price,
  created_at,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex items-center gap-x-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image fill className="object-cover" src={photo} alt={title} />
      </div>

      <div className="flex flex-col gap-y-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
