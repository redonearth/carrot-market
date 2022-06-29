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
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: +id!,
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    stream,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
