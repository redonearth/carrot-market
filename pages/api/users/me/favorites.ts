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
  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });
  res.json({
    ok: true,
    favorites,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);