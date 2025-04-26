import { Grid } from '@mui/material'
import './App.css'
import { Calendar } from './components/Calendar'
import { ResumenDiario } from './components/ResumenDiario'
import { NavBar } from './components/NavBar'

function App() {
  
  return (
    <>
      <NavBar />
      <Grid sx={{display:'flex',gap:'10px'}}>
        
          
        <Calendar date={new Date()}/>      
        
        <ResumenDiario />      

    </Grid>    

    </>
    
    
  )

}

export default App
