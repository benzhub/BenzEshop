export function getAuthToken() {
  const authToken = localStorage.getItem("token");
  if (!authToken) throw new Error("Credential invalidated!");
  return authToken;
}
