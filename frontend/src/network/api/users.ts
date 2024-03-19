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

export async function getUserByUsername(username: string) {
  const response = await api.get<User>(`/users/profile/${username}`);
  return response.data;
}

export async function logout() {
  await api.post('/users/logout');
}

interface UpdateUserValues {
  username?: string;
  displayName?: string;
  about?: string;
  profileImage?: File;
}

export async function updateUser(input: UpdateUserValues) {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    // Append only the defined values, can accept falsy values such as boolean false
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await api.patch<User>('/users/me/', formData);
  return response.data;
}
