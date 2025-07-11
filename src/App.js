import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import PrivateLayout from './components/layout/PrivateLayout';
import Register from './pages/Register';
import AddExpense from './pages/AddExpense';

import { PrivateRoute } from './routes/PrivateRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>

          <Route element={<PrivateLayout title="Home" />}>
            <Route path='/home' element={<Home />} />
          </Route>
          
          <Route element={<PrivateLayout title="Adicionar despesa" />}>
            <Route path='/addExpense' element={<AddExpense />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;