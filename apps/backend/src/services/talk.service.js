const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.proposeTalk = async (speakerId, data) => {
  const parsedStartTime = data.startTime ? new Date(Number(data.startTime)) : null;
  return prisma.talk.create({
    data: {
      ...data,
      startTime: parsedStartTime,
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
      startTime: new Date(Number(startTime)),
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
  const talks = await prisma.talk.findMany({
    where: { speakerId },
    include: {
      room: true,
      favoritedBy: true,
    },
    orderBy: { startTime: "asc" },
  });

  return talks.map(talk => ({
    ...talk,
    isFavorite: talk.favoritedBy.length > 0,
  }));
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

exports.filterTalks = async ({ subject, roomId, level, day }) => {
  let dateFilter = {};
  if (day) {
    const start = new Date(day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    dateFilter = {
      startTime: {
        gte: start,
        lte: end,
      },
    };
  }

  return prisma.talk.findMany({
    where: {
      status: "SCHEDULED",
      subject: subject || undefined,
      roomId: roomId || undefined,
      level: level || undefined,
      ...dateFilter,
    },
    include: {
      room: true,
      speaker: { select: { email: true } },
    },
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

exports.getPendingTalks = async () => {
  return prisma.talk.findMany({
    where: { status: "PENDING" },
    include: { speaker: true },
    orderBy: { startTime: "asc" },
  });
};

exports.getFavoriteTalks = async (userId) => {
  return prisma.talk.findMany({
    where: {
      favoritedBy: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      room: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });
};