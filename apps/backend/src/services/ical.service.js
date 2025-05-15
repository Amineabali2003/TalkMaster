const { PrismaClient } = require("@prisma/client");
const createIcal = require("ical-generator").default;
const prisma = new PrismaClient();

exports.generateICal = async (talkId) => {
  const talk = await prisma.talk.findUnique({
    where: { id: talkId },
    include: { room: true },
  });

  if (!talk || !talk.startTime || !talk.room) {
    throw new Error("Talk non planifié");
  }

  const calendar = createIcal({ name: "TalkMaster" });

  calendar.createEvent({
    start: new Date(talk.startTime),
    end: new Date(talk.startTime.getTime() + talk.duration * 60000),
    summary: talk.title,
    description: talk.description,
    location: talk.room.name,
  });

  return calendar.toString();
};