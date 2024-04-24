import { notFound } from "next/navigation";
import Image from "next/image";
import { unstable_cache as nextCache } from "next/cache";

import LikeButton from "@/components/like-button";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";

import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number) {
  const session = await getSession();

  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

function getCachedLikeStatus(postId: number) {
  const cachedOperation = getLikeStatus;
  // const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
  //   tags: [`like-status-${postId}`],
  // });
  return cachedOperation(postId);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-x-3 mb-2">
        <div className="size-10 rounded-full overflow-hidden">
          {post.user.avatar !== null ? (
            <Image
              width={28}
              height={28}
              src={post.user.avatar!}
              alt={post.user.username}
            />
          ) : (
            <UserIcon className="bg-gray-600" />
          )}
        </div>

        <div>
          <span>{post.user.username}</span>
          <div>
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>

      <div className="flex flex-col gap-y-5 items-start">
        <div className="flex gap-x-2 items-center text-sm text-neutral-400">
          <EyeIcon className="size-5" />
          <span className="font-semibold">조회 {post.views}</span>
        </div>

        <LikeButton postId={id} isLiked={isLiked} likeCount={likeCount} />
      </div>
    </div>
  );
}
