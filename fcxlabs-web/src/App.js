import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import LoginPage from './pages/Login';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path="/" exact />
          <Route Component={Main} path="/users" exact />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
