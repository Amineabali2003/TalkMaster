const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const START_HOUR = 9;
const END_HOUR = 19;
const PAUSE_START = 12;
const PAUSE_END = 13;
const DURATIONS = [30, 60, 90];

function toUTC2(date) {
  const utc = new Date(date);
  utc.setHours(utc.getHours() + 2);
  return utc;
}

function getNextThreeDates() {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }
  return dates;
}

function generateSlotsForDay(date, duration) {
  const slots = [];
  const start = new Date(date);
  start.setHours(START_HOUR, 0, 0, 0);
  const end = new Date(date);
  end.setHours(END_HOUR, 0, 0, 0);

  for (let d = new Date(start); d < end; d = new Date(d.getTime() + 30 * 60 * 1000)) {
    const hour = d.getHours();
    if (hour >= PAUSE_START && hour < PAUSE_END) continue;
    const endTime = new Date(d.getTime() + duration * 60 * 1000);
    if (endTime > end) continue;
    slots.push(d);
  }

  return slots;
}

exports.getAvailableSlots = async () => {
  const rooms = await prisma.room.findMany();
  const dates = getNextThreeDates();
  const available = [];

  for (const date of dates) {
    for (const room of rooms) {
      for (const duration of DURATIONS) {
        const slots = generateSlotsForDay(date, duration);
        for (const startTime of slots) {
          const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

          const conflict = await prisma.talk.findFirst({
            where: {
              roomId: room.id,
              startTime: {
                lt: endTime,
              },
              status: "SCHEDULED",
            },
          });

          if (!conflict) {
            available.push({
              date: date.toISOString().split("T")[0],
              startTime,
              duration,
              roomId: room.id,
              roomName: room.name,
            });
          }
        }
      }
    }
  }

  return available;
};

exports.reserveSlot = async ({
  title,
  subject,
  description,
  duration,
  level,
  speakerId,
  roomId,
  startTime,
}) => {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60000);

  const conflict = await prisma.talk.findFirst({
    where: {
      roomId,
      startTime: {
        lt: end,
      },
      status: "SCHEDULED",
    },
  });

  if (conflict) throw new Error("Créneau déjà occupé");

  return await prisma.talk.create({
    data: {
      title,
      subject,
      description,
      duration,
      level,
      status: "SCHEDULED",
      speakerId,
      roomId,
      startTime,
    },
  });
};

exports.generateSchedule = async () => {
  const acceptedTalks = await prisma.talk.findMany({
    where: { status: "ACCEPTED" },
  });

  const rooms = await prisma.room.findMany();
  const days = getNextThreeDates();

  for (const talk of acceptedTalks) {
    let scheduled = false;
    for (const day of days) {
      for (const room of rooms) {
        const slots = generateSlotsForDay(day, talk.duration);
        for (const slot of slots) {
          const end = new Date(slot.getTime() + talk.duration * 60000);

          const conflict = await prisma.talk.findFirst({
            where: {
              roomId: room.id,
              startTime: {
                lt: end,
              },
              status: "SCHEDULED",
            },
          });

          if (!conflict) {
            await prisma.talk.update({
              where: { id: talk.id },
              data: {
                startTime: slot,
                roomId: room.id,
                status: "SCHEDULED",
              },
            });
            scheduled = true;
            break;
          }
        }
        if (scheduled) break;
      }
      if (scheduled) break;
    }
  }

  return prisma.talk.findMany({
    where: { status: "SCHEDULED" },
    include: { room: true },
    orderBy: { startTime: "asc" },
  });
};
