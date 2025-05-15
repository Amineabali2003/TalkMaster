import api from "./api"

export async function loginUser(email, password) {
  await api.post("/auth/login", { email, password })
}

export async function registerUser(email, password) {
  await api.post("/auth/register", { email, password })
}

export async function logoutUser() {
  await api.post("/auth/logout")
}

export async function getCurrentUser() {
  const res = await api.get("/auth/me")
  return res.data
}