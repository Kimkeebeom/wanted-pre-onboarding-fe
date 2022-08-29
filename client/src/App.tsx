import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/auth';
import TodoPage from './pages/todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
