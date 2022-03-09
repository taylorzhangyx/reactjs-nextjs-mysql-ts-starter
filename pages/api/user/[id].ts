import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_app";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id },
      body: user,
      method,
    } = _req;

    if (Array.isArray(id)) {
      throw new Error("only take id and name as string not array");
    }

    switch (method) {
      case "GET":
        // Get data from your database
        const matchUser = await prisma.user.findUnique({
          where: { id: +id },
        });
        res.status(200).json(matchUser);
        break;
      case "PUT":
        // update the given user with id
        const upsertUser = await prisma.user.upsert({
          where: {
            id: +id,
          },
          update: {
            name: user.name,
            email: user.email,
          },
          create: {
            id: +id,
            name: user.name,
            email: user.email,
          },
        });
        res.status(200).json(upsertUser);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
