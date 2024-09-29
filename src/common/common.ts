export function getToken() {
  return localStorage.getItem('fcd-token');
}

export function setToken(token: string) {
  localStorage.setItem('fcd-token', token);
}

export function removeToken() {
  localStorage.removeItem('fcd-token');
}
