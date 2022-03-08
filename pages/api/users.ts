import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_app";

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

    if (!Array.isArray(sampleUserData)) {
      throw new Error("Cannot find user data");
    }

    switch (method) {
      case "GET":
        // Get data from your database
        const allUsers = await prisma.user.findMany();
        console.log(allUsers);
        res.status(200).json(allUsers);
        break;
      case "POST":
        // Update or create data in your database
        res.status(200).json({ result: "success" });
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
