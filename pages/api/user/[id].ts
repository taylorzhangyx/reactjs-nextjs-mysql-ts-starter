import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_app";

type User = {
  id: number;
  name: string;
};

const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
];

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id, name },
      body: users,
      method,
    } = _req;

    if (Array.isArray(id) || Array.isArray(name)) {
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
      case "POST":
        // Update or create data in your database
        const user = await prisma.user.create({
          data: {
            name: "Alice",
            email: "alice@prisma.io",
            posts: {
              create: { title: "Hello World" },
            },
            profile: {
              create: { bio: "I like turtles" },
            },
          },
        });
        res.status(200).json({ result: user });
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
