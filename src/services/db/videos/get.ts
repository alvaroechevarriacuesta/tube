import { prisma } from "../prisma";

export const getVideo = async (id: string) => {
  return await prisma.video.findUnique({
    where: { id },
  });
};

