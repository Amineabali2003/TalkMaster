import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
})

export default api

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${api.defaults.baseURL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body,
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || "Erreur API")
  }

  return res.json()
}

export async function getMyTalks() {
  const res = await api.get("/talks/mine")
  return res.data
}

export async function acceptTalk(id) {
  await api.post(`/talks/${id}/accept`)
}

export async function rejectTalk(id) {
  await api.post(`/talks/${id}/reject`)
}

export async function downloadIcal(id) {
  const res = await api.get(`/talks/${id}/ical`, { responseType: "blob" })
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const a = document.createElement("a")
  a.href = url
  a.download = "talk.ics"
  a.click()
  a.remove()
}

export async function getAvailableSlots() {
  const res = await api.get("/schedule/available")
  return res.data
}

export async function getAllTalks() {
  const res = await api.get("/talks")
  return res.data
}

export async function getPendingTalks() {
  const res = await api.get("/talks/pending")
  return res.data
}

export async function scheduleTalk(talkId, { startTime, roomId }) {
  const res = await api.patch(`/talks/${talkId}/schedule`, {
    startTime,
    roomId,
  })
  return res.data
}