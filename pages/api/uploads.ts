import withHandler, { IResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v2/direct_upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        },
      }
    )
  ).json();
  res.json({
    ok: true,
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
