import { prisma } from '../prisma';

// TODO(aec) implement this correctly
export const listVideos = async () => {
  return await prisma.video.findMany();
};
