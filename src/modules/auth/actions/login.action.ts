import { reserApi } from "@/api/reserApi";
import type { AuthResponse, User } from "../interface";
import { isAxiosError } from "axios";

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const LoginActions = async (
  email: string,
  password: string
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await reserApi.post<AuthResponse>('/users/login', {
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrecta',
      };
    }
    console.error('Error en LoginActions:', error);
    throw new Error('No se pudo realizar la petición');
  }
};
