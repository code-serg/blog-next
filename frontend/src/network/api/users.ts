import api from '@/network/axiosInstance';
import { User } from '@/models/user';

interface SignupValues {
  username: string;
  email: string;
  password: string;
}

export async function signup(crendentials: SignupValues) {
  const response = await api.post<User>('/users/signup', crendentials);
  return response.data;
}

interface LoginValues {
  username: string;
  password: string;
}

export async function login(crendentials: LoginValues) {
  const response = await api.post<User>('/users/login', crendentials);
  return response.data;
}

export async function getAuthenticatedUser() {
  const me = await api.get<User>('/users/me');
  return me.data;
}

export async function logout() {
  await api.post('/users/logout');
}
