import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
import { prisma } from "../../_app";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: user, method } = _req;

    switch (method) {
      case "GET":
        // Get all users from your database
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;
      case "POST":
        const postUser = user as User;
        // Update or create data in your database
        const newUser = await prisma.user.create({
          data: {
            name: postUser.name,
            email: postUser.email,
          },
        });
        res.status(200).json({ result: newUser });
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
