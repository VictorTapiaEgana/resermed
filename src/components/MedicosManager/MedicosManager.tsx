/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';

import { 
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  IconButton, Typography, Switch, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, 
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Paper,
  Divider
} from '@mui/material';

import { Add, Edit, Delete, Schedule, Category, CheckBox } from '@mui/icons-material';
import HorariosFormModal from '../HorariosFormModal/HorariosFormModal';

const mockMedicos = [
  { id: 1, nombre: "Dr. Juan Pérez", habilitado: true, categorias: ["Cardiología"], horarios: [] },
  { id: 2, nombre: "Dra. Ana Gómez", habilitado: false, categorias: ["Dermatología"], horarios: [] },
];

export default function MedicosManager() {

  const [medicos, setMedicos] = useState(mockMedicos);
  const [openHorarios, setOpenHorarios] = useState(false);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<any>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingMedico, setEditingMedico] = useState<any>(null);

  const handleToggleEstado = (id: number) => {
    setMedicos(prev =>
      prev.map(m => m.id === id ? { ...m, habilitado: !m.habilitado } : m)      
    );
  };
  

  const handleDelete = (id: number) => {
    setMedicos(prev => prev.filter(m => m.id !== id));
  };
  
  const handleHorarios = (medico: any) => {
    setMedicoSeleccionado(medico);
    setOpenHorarios(true);
  };

  const handleEdit = (medico: any) => {
    setEditingMedico(medico);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setEditingMedico(null);
    setOpenForm(true);
  };

  const handleSave = (nuevoMedico: any) => {
    if (nuevoMedico.id) {
      // Editando existente
      setMedicos(prev => prev.map(m => m.id === nuevoMedico.id ? nuevoMedico : m));
    } else {
      // Creando nuevo
      const nuevo = { ...nuevoMedico, id: Date.now() };
      setMedicos(prev => [...prev, nuevo]);
    }
    setOpenForm(false);
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Gestión de Médicos</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Agregar Médico
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Categorías</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicos.map((medico) => (
            <TableRow key={medico.id}>
              <TableCell>{medico.nombre}</TableCell>
              <TableCell>
                <Switch
                  checked={medico.habilitado}
                  onChange={() => handleToggleEstado(medico.id)}
                />
              </TableCell>
              <TableCell>{medico.categorias.join(", ")}</TableCell>
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton onClick={() => handleEdit(medico)}><Edit /></IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => handleDelete(medico.id)}><Delete /></IconButton>
                </Tooltip>
                <Tooltip title="Horarios">
                <IconButton onClick={() => handleHorarios(medico)}>
                    <Schedule />
                </IconButton>
                </Tooltip>
                {openHorarios && medicoSeleccionado && (
                    <HorariosFormModal
                        medico={medicoSeleccionado}
                        onClose={() => setOpenHorarios(false)}
                        onSave={(medicoActualizado: any) => {
                        setMedicos(prev => prev.map(m => m.id === medicoActualizado.id ? medicoActualizado : m));
                        setOpenHorarios(false);
                        }}
                    />
                    )}
           {/* <Tooltip title="Categorías">
                  <IconButton><Category /></IconButton>
                </Tooltip> */}
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openForm && (
        <MedicoFormModal 
          medico={editingMedico}
          onClose={() => setOpenForm(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}



// Componente Modal para Crear/Editar Médicos
function MedicoFormModal({ medico, onClose, onSave }: any) {
  const [nombre, setNombre] = useState(medico?.nombre || '');
  const [aPaterno, setAPaterno] = useState(medico?.aPaterno || '');
  const [aMaterno, setAMaterno] = useState(medico?.aMaterno || '');
  const [run, setRun] = useState('');  

  const handleSubmit = () => {
    const nuevo = { 
      ...medico, 
      nombre, 
      aPaterno, 
      aMaterno,
      habilitado: medico?.habilitado ?? true, 
      categorias: medico?.categorias || [] 
    };
    onSave(nuevo);
  };

  const handleManualClose = (_event: object, reason: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onClose();
    }
  };

  
  const RUT_REGEX = /^\d{1,2}\.\d{3}\.\d{3}-[0-9Kk]$/;

  return (
    <Dialog open onClose={handleManualClose} disableEscapeKeyDown>
      <Paper sx={{ padding:'15px',margin:'15px', borderRadius:'15px'}} 
                elevation={2} >
        
        <DialogTitle>{medico ? 'Editar registro' : 'Nuevo registro'}</DialogTitle>
          <Divider/>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>

                <TextField
                    type="text"
                    label="Run"
                    placeholder="15.050460-0"
                    value={run}
                    variant="outlined"
                    size="small"
                    onChange={e => setRun(e.target.value)}
                    // inputProps={{
                    //   pattern: "\\d{1,2}\\.\\d{3}\\.\\d{3}-[0-9Kk]"
                    // }}
                    error={run !== '' && !RUT_REGEX.test(run)}
                    helperText={
                      run !== '' && !RUT_REGEX.test(run)
                        ? 'Formato: ##.###.###-A (A = dígito o K)'
                        : ''
                    }
                />


                <TextField
                  type="text"
                  label="Nombres"
                  placeholder="juan, eduardo . . "
                  value={nombre}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setNombre(e.target.value)}
                />

                <TextField
                  type="text"
                  label="Apellido paterno"
                  placeholder="rojas, contreras  . . "
                  value={aPaterno}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setAPaterno(e.target.value)}
                />

                <TextField
                  type="text"
                  label="Apellido materno"
                  placeholder="Tapia, Galleguillos . . "
                  value={aMaterno}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setAMaterno(e.target.value)}
                />
              
            </Box>
          </DialogContent>

      </Paper>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
