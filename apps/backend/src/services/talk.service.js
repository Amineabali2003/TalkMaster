const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.proposeTalk = async (speakerId, data) => {
  return prisma.talk.create({
    data: {
      ...data,
      status: "PENDING",
      speakerId,
    },
  });
};

exports.updateStatus = async (id, status) => {
  return prisma.talk.update({
    where: { id },
    data: { status },
  });
};

exports.scheduleTalk = async (id, { startTime, roomId }) => {
  return prisma.talk.update({
    where: { id },
    data: {
      status: "SCHEDULED",
      startTime: new Date(startTime),
      roomId,
    },
  });
};

exports.updateTalk = async (id, speakerId, data) => {
  return prisma.talk.updateMany({
    where: { id, speakerId },
    data,
  });
};

exports.deleteTalk = async (id, speakerId) => {
  return prisma.talk.deleteMany({
    where: { id, speakerId },
  });
};

exports.getTalksBySpeaker = async (speakerId) => {
  return prisma.talk.findMany({
    where: { speakerId },
    orderBy: { startTime: "asc" },
  });
};

exports.getAllTalks = async () => {
  return prisma.talk.findMany({
    orderBy: { startTime: "asc" },
  });
};

exports.getPublicSchedule = async () => {
  return prisma.talk.findMany({
    where: { status: "SCHEDULED" },
    include: { room: true, speaker: { select: { email: true } } },
    orderBy: { startTime: "asc" },
  });
};

exports.filterTalks = async ({ subject, roomId, level }) => {
  return prisma.talk.findMany({
    where: {
      status: "SCHEDULED",
      subject: subject || undefined,
      roomId: roomId || undefined,
      level: level || undefined,
    },
    include: { room: true },
    orderBy: { startTime: "asc" },
  });
};

exports.toggleFavorite = async (userId, talkId) => {
  const fav = await prisma.favorite.findUnique({
    where: { userId_talkId: { userId, talkId } },
  });
  if (fav) {
    return prisma.favorite.delete({ where: { userId_talkId: { userId, talkId } } });
  } else {
    return prisma.favorite.create({ data: { userId, talkId } });
  }
};