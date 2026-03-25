import { useCallback } from 'react';
import {
  createUser,
  deleteUser,
  updateUser,
  userLogin,
  getUser,
} from '../services/userServices';
export function useUser(setUser, setError) {
  const removeUser = useCallback(async () => {
    try {
      await deleteUser();
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      setError?.(err.message);
    }
  }, [setUser, setError]);
  const userdata = useCallback(async () => {
    try {
      const user = await getUser();
      if (!user) return;
      setUser(user);
    } catch (err) {
      setError(err.message);
    }
  }, [setError, setUser]);
  const login = useCallback(
    async (userdata) => {
      try {
        const data = await userLogin(userdata);
        localStorage.setItem('token', data.token);
        try {
          const user = await getUser();
          if (!user) return;
          setUser(user);
        } catch (err) {
          setError(err.message);
        }
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
        localStorage.setItem('token', data.token);
        try {
          const user1 = await getUser();
          setUser(user1);
        } catch (err) {
          setError(err.message);
        }
      } catch (err) {
        setError(err.message);
      }
    },
    [setUser, setError]
  );
  const editUser = useCallback(
    async (data) => {
      try {
        const updatedUser = await updateUser(data);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (err) {
        setError?.(err.message);
      }
    },
    [setUser, setError]
  );
  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, [setUser]);

  return { removeUser, editUser, logoutUser, login, addUser, userdata };
}
