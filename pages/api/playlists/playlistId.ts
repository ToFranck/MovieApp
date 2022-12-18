// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Playlist, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist>
) {
  if (req.method === "GET") {
    const foundPlaylist = await prisma.playlist.findUnique({
        where: {
            id: Number(req.query.playlistId),
            },
        include: {
            movies: true,
        }
    });
    if (!foundPlaylist) return res.status(404).end();
    res.status(200).json(foundPlaylist);
  }
}
