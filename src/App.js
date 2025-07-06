import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Container from './components/layout/container';
import NavBar from './components/layout/navbar';
import Login from './pages/login';
import Footer from './components/layout/footer';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  return (
    <Router>  
      <NavBar />
      <Container customClass="min-heigth">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;