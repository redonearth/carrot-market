import client from '@libs/server/client';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    session: { user },
  } = req;
  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    reviews,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
