import { useCallback } from 'react';
import { forgotPassword, resetPassword } from '../services/userServices';
export function useAccountRecovery(setError) {
  const requestRecovery = useCallback(
    async (email) => {
      try {
        const data = await forgotPassword(email);
        alert(data.message);
      } catch (err) {
        setError?.(err.message);
      }
    },
    [setError]
  );
  const changePassword = useCallback(
    async (token, password) => {
      try {
        const data = await resetPassword(token, password);
        alert(data.message);
      } catch (err) {
        setError(err.message);
      }
    },
    [setError]
  );
  return { requestRecovery, changePassword };
}
