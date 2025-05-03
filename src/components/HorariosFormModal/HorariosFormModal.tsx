/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, 
  Box, MenuItem, TextField, IconButton, Typography 
} from '@mui/material';

import { Delete } from '@mui/icons-material';

const diasSemana = [  
  { label: 'Lunes', value: 1 },
  { label: 'Martes', value: 2 },
  { label: 'Miércoles', value: 3 },
  { label: 'Jueves', value: 4 },
  { label: 'Viernes', value: 5 },
  { label: 'Sábado', value: 6 },
  { label: 'Domingo', value: 7 },
];

export default function HorariosFormModal({ medico, onClose, onSave }: any) {
  const [horarios, setHorarios] = useState(medico?.horarios || []);

  const agregarHorario = () => {
    setHorarios([...horarios, { dia_semana: 1, hora_inicio: '09:00', hora_fin: '17:00' }]);
  };

  const actualizarHorario = (index: number, campo: string, valor: any) => {
    const nuevos = [...horarios];
    nuevos[index][campo] = valor;
    setHorarios(nuevos);
  };

  const eliminarHorario = (index: number) => {
    const nuevos = horarios.filter((_, i) => i !== index);
    setHorarios(nuevos);
  };

  const handleGuardar = () => {
    onSave({ ...medico, horarios });
  };

  const handleManualClose = (_event: object, reason: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onClose();
    }
  };

  return (
    <Dialog 
      open 
      onClose={handleManualClose} 
      maxWidth="sm" 
      fullWidth 
      disableEscapeKeyDown
    >
      <DialogTitle>Configurar Horarios</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {horarios.map((horario: any, index: number) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <TextField
                select
                label="Día"
                value={horario.dia_semana}
                onChange={(e) => actualizarHorario(index, 'dia_semana', parseInt(e.target.value))}
                sx={{ minWidth: 120 }}
              >
                {diasSemana.map(dia => (
                  <MenuItem key={dia.value} value={dia.value}>
                    {dia.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Hora inicio"
                type="time"
                value={horario.hora_inicio}
                onChange={(e) => actualizarHorario(index, 'hora_inicio', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Hora fin"
                type="time"
                value={horario.hora_fin}
                onChange={(e) => actualizarHorario(index, 'hora_fin', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <IconButton color="error" onClick={() => eliminarHorario(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          {horarios.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No hay horarios configurados.
            </Typography>
          )}
          <Button onClick={agregarHorario}>Agregar Horario</Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleGuardar}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
