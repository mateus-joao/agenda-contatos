import { useCallback } from 'react';
import {
  createUser,
  deleteUser,
  updateUser,
  userLogin,
} from '../services/userServices';
export function useUser(setUser, setError) {
  const removeUser = useCallback(
    async (userId) => {
      try {
        await deleteUser(userId);
        localStorage.removeItem('user');
        setUser(null);
      } catch (err) {
        setError?.(err.message);
      }
    },
    [setUser, setError]
  );
  const login = useCallback(
    async (user) => {
      try {
        const data = await userLogin(user);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    },
    [setUser, setError]
  );
  const addUser = useCallback(
    async (newUser) => {
      try {
        const data = await createUser(newUser);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    },
    [setUser, setError]
  );
  const editUser = useCallback(
    async (userId, data) => {
      try {
        const updatedUser = await updateUser(userId, data);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (err) {
        setError?.(err.message);
      }
    },
    [setUser, setError]
  );
  const logoutUser = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, [setUser]);

  return { removeUser, editUser, logoutUser, login, addUser };
}
