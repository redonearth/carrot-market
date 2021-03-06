import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id!,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          curiosities: true,
        },
      },
    },
  });
  const isCurious = Boolean(
    await client.curiosity.findFirst({
      where: {
        postId: post?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  if (!post) {
    res.status(404).json({
      ok: false,
      error: '게시글을 찾을 수 없습니다!',
    });
  }
  res.json({
    ok: true,
    post,
    isCurious,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
