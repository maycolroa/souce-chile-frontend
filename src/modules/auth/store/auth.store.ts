import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interface';
import { LoginActions } from '../actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.UnAuthenticate);
  const user = ref<User | undefined>();

  const login = async (email: string, password: string) => {
    try {
      const response = await LoginActions(email, password);

      if (!response.ok) {
        logout();
        return false;
      }

      user.value = response.user; // Almacenar el usuario retornado
      authStatus.value = AuthStatus.Authenticated; // Marcar al usuario como autenticado

      console.log('Usuario autenticado:', user.value);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      logout();
      return false;
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.UnAuthenticate;
    user.value = undefined;
  };

  return {
    user,
    authStatus,
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    login,
    logout,
  };
});
