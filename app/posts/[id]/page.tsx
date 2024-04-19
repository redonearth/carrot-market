import { notFound } from "next/navigation";
import Image from "next/image";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";

import {
  EyeIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

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

const getCachedPost = getPost;
// const getCachedPost = nextCache(getPost, ["post-detail"], {
//   tags: ["post-detail"],
//   revalidate: 60,
// });

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

  const likePost = async () => {
    "use server";

    try {
      const session = await getSession();

      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });

      revalidateTag(`like-status-${id}`);
    } catch (error) {}
  };

  const dislikePost = async () => {
    "use server";

    try {
      const session = await getSession();

      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });

      revalidateTag(`like-status-${id}`);
    } catch (error) {}
  };

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-x-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />

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

        <form action={isLiked ? dislikePost : likePost}>
          <div className="flex items-center gap-x-2">
            <button
              className={`flex items-center gap-x-2 text-neutral-400 text-sm border border-neutral-400 p-2 rounded-full transition-colors ${isLiked ? "bg-orange-500 text-white border-orange-500" : "hover:bg-neutral-800"}`}
            >
              {isLiked ? (
                <SolidHeartIcon className="size-5" />
              ) : (
                <OutlineHeartIcon className="size-5" />
              )}
            </button>

            <span className="font-semibold">좋아요 {likeCount}개</span>
          </div>
        </form>
      </div>
    </div>
  );
}
