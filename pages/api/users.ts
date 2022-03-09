import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_app";

type User = {
  id: number;
  name: string;
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = _req;

    switch (method) {
      case "GET":
        // Get all users from your database
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
