import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
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

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
