import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateLayout from './components/layout/PrivateLayout';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import AddExpense from './pages/AddExpense';
import { PrivateRoute } from './routes/PrivateRoute';
import Expenses from './pages/Expenses';
import MySpending from './pages/MySpending';
import Groups from './pages/Groups';
import ExpenseDetails from './pages/ExpenseDetails';
import AddUsersToExpense from './pages/AddUsersToExpense';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* Rotas Protegidas */}
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

            <Route element={<PrivateLayout title="Detalhes da Despesa" />}>
              <Route path='/expense/:id' element={<ExpenseDetails />} />
            </Route>

            <Route element={<PrivateLayout title={"Adicionar participante"} hideHeader={true} />}>
              <Route path="/add-users-to-expense" element={<AddUsersToExpense />} />
            </Route>

          </Route>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;