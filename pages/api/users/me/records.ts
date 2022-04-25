import client from '@libs/server/client';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import { Kind } from '@prisma/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;
  const findItem = async (kind: Kind) => {
    const item = await client.record.findMany({
      where: {
        userId: user?.id,
        kind,
      },
      include: {
        product: {
          include: {
            _count: {
              select: {
                favorites: true,
              },
            },
          },
        },
      },
    });
    return item;
  };
  const items = await findItem(kind as unknown as Kind);
  res.json({
    ok: true,
    items,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
