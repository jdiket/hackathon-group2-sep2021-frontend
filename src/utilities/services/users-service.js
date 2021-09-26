import * as usersAPI from '../apis/users-api';

export async function signUp(userData) {
  try {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
  } catch {
    throw new Error('Invalid Sign Up');
  }
}

export async function login(credentials) {
  try {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
  } catch {
    throw new Error('Bad Credentials');
  }
}

export function logOut() {
  localStorage.removeItem('token');
}

export function checkToken() {
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(Buffer.from(token.split('.')[1], 'base64')).user : null;
    //DEPRECATED VERSION => return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}