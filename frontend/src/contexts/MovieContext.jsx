import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();

        if (data.success) {
          setUserId(data.user_id);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId, loading }}>
      {children}
    </UserContext.Provider>
  );
};
