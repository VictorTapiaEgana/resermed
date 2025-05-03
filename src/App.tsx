import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Calendar } from './components/Calendar';
import MedicosManager from './components/MedicosManager/MedicosManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>          
        
          <Route path="reservas" element={ <Calendar  date = {new Date()}/> }/> 
          <Route path='medicos' element={<MedicosManager /> }/>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;