import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import PrivateLayout from './components/layout/privateLayout';

import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;