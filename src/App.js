import AppRouter from "routing/AppRouter";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <AppRouter />
      <Toaster
        toastOptions={{
          className: "text-sm",
        }}
      />
    </div>
  );
};

export default App;
