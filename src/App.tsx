import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Calendar } from './components/Calendar';
// import Home from './pages/Home';
// import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="reservas" element={ <Calendar  date = {new Date()}/> }/> 
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;