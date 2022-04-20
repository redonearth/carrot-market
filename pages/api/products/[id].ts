import client from '@libs/server/client';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  console.log(product);
  res.json({
    ok: true,
    product,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
