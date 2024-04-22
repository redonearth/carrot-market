"use client";

import { useOptimistic } from "react";

import { dislikePost, likePost } from "@/app/posts/[id]/actions";

import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

export default function LikeButton({
  postId,
  isLiked,
  likeCount,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      };
    }
  );

  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={onClick}
        className={`flex items-center gap-x-2 text-neutral-400 text-sm border border-neutral-400 p-2 rounded-full transition-colors ${isLiked ? "bg-orange-500 text-white border-orange-500" : "hover:bg-neutral-800"}`}
      >
        {state.isLiked ? (
          <SolidHeartIcon className="size-5" />
        ) : (
          <OutlineHeartIcon className="size-5" />
        )}
      </button>

      <span className="font-semibold">좋아요 {state.likeCount}개</span>
    </div>
  );
}
