import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import PrivateLayout from './components/layout/PrivateLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import AddExpense from './pages/AddExpense';
import { PrivateRoute } from './routes/PrivateRoute';
import Expenses from './pages/Expenses';
import MySpending from './pages/MySpending';
import GroupListPage from './pages/GroupListPage';
import ExpenseDetails from './pages/ExpenseDetails';
import AddUsersToExpense from './pages/AddUsersToExpense';
import CreateGroup from './pages/CreateGroup';
import AddExpenseToGroup from './pages/AddExpenseToGroup';

function AppRoutes() {
  const { authInitialized } = useAuth();

  if (!authInitialized) {
    return null; // Ou <Loading />
  }

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />

      {/* Rotas Protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout title="Home" />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<PrivateLayout title="Adicionar despesa" />}>
          <Route path="/add-expense" element={<AddExpense />} />
        </Route>

        <Route element={<PrivateLayout title="Minhas despesas" />}>
          <Route path="/expenses" element={<Expenses />} />
        </Route>

        <Route element={<PrivateLayout title="Lista de gastos" />}>
          <Route path="/my-spending" element={<MySpending />} />
        </Route>

        <Route element={<PrivateLayout title="Lista de grupos" />}>
          <Route path="/groups" element={<GroupListPage />} />
        </Route>

        <Route element={<PrivateLayout title="Detalhes da Despesa" />}>
          <Route path="/expense/:id" element={<ExpenseDetails />} />
        </Route>

        <Route element={<PrivateLayout title="Adicionar participante" hideHeader={true} bottomNav={false} />}>
          <Route path="/add-users-to-expense" element={<AddUsersToExpense />} />
        </Route>

        <Route element={<PrivateLayout title="Criar novo grupo" hideHeader={true} />}>
          <Route path="/create-group" element={<CreateGroup />} />
        </Route>

        <Route element={<PrivateLayout title="Adicionar despesas ao grupo" hideHeader={true} bottomNav={false}/>}>
          <Route path="/add-expense-to-group" element={<AddExpenseToGroup />} />
        </Route>  

      </Route>

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
