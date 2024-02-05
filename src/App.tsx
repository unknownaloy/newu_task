import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";

import { getUserId } from "./features/authentication/service/authService";
import { setUserId } from "./features/authentication/store/authSlice";

import HomeScreen from "./shared/HomeScreen";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Retrieving the user ID from local storage
    const userId = getUserId();

    // Saving userId to store
    dispatch(setUserId(userId));
  }, [dispatch]);

  return <HomeScreen />;
}

export default App;
