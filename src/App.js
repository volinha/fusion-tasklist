import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Routes from './routes';
import Header from "./components/Header/Header";

import store from './components/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
        <Header title="Lista de Tarefas" />        
      </Router>
    </Provider>
  )
}

export default App;