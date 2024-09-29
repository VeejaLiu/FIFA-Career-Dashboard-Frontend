function getToken() {
  return localStorage.getItem('fcd-token');
}

function setToken(token: string) {
  localStorage.setItem('fcd-token', token);
}

function removeToken() {
  localStorage.removeItem('fcd-token');
}
