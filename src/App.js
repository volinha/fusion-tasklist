import { Provider } from "react-redux";
import MainRoutes from "./routes";
import Dialog from "./components/Dialog/Dialog";

import store from "./components/store";

const App = () => {
  return (
    <Provider store={store}>
      <MainRoutes />
      <Dialog />
    </Provider>
  );
};

export default App;
