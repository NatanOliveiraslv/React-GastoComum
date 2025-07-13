import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import PrivateLayout from './components/layout/PrivateLayout';
import Register from './pages/Register';
import AddExpense from './pages/AddExpense';

import { PrivateRoute } from './routes/PrivateRoute';
import Expenses from './pages/Expenses';
import MySpending from './pages/MySpending';
import Groups from './pages/Groups';

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
          
          <Route element={<PrivateLayout title="Minhas despesas" />}>
            <Route path='/expenses' element={<Expenses />} />
          </Route>

          <Route element={<PrivateLayout title="Lista de gastos" />}>
            <Route path='/my-spending' element={<MySpending />} />
          </Route>

          <Route element={<PrivateLayout title="Lista de gastos" />}>
            <Route path='/groups' element={<Groups />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;