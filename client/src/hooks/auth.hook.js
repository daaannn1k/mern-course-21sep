import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const logIn = useCallback((jwtToken, Id) => {
    setToken(jwtToken);
    setUserId(Id);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: Id,
        token: jwtToken,
      })
    );
  }, []);
  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      logIn(data.token, data.userId);
    }
    setReady(true);
  }, [logIn]);

  return { logIn, logOut, token, userId, ready };
};
