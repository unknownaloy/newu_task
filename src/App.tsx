import HomeScreen from "./components/HomeScreen";

import { AuthProvider } from "./features/authentication/authContext";

function App() {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
}

export default App;
