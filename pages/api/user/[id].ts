import { NextApiRequest, NextApiResponse } from "next";

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
        res.status(200).json("user");
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
