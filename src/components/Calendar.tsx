/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react"
import { Card, CardHeader, CardContent, Typography, Avatar, Chip, Divider, IconButton, Box, Paper, Menu, MenuItem } from "@mui/material"
import { ChevronLeft as ChevronLeftIcon,
         ChevronRight as ChevronRightIcon,
         MoreHoriz as MoreHorizIcon } from "@mui/icons-material"
import NavBar from "./NavBar"


const appointments = [
  {
    id: 1,
    time: "09:15",
    patient: {
      name: "María González",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg",
      initials: "MG",
    },
    type: "Consulta General",
    status: "confirmed",
    duration: 30, 
  },
  {
    id: 2,
    time: "10:30",
    patient: {
      name: "Carlos Rodríguez",
      avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
      initials: "CR",
    },
    type: "Control Rutinario",
    status: "confirmed",
    duration: 45,
  },
  {
    id: 3,
    time: "12:00",
    patient: {
      name: "Ana Martínez",
      avatar: "https://www.lumierebeautyclinic.com.au/wp-content/uploads/2023/05/what-makes-a-face-attractive-Lumiere-Beauty-Clinic-scaled.jpg",
      initials: "AM",
    },
    type: "Examen Físico",
    status: "pending",
    duration: 30,
  },
  {
    id: 4,
    time: "14:45",
    patient: {
      name: "Juan Pérez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JP",
    },
    type: "Seguimiento",
    status: "confirmed",
    duration: 15,
  },
  {
    id: 5,
    time: "16:15",
    patient: {
      name: "Laura Sánchez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LS",
    },
    type: "Consulta Especialista",
    status: "confirmed",
    duration: 45,
  },
  {
    id: 6,
    time: "18:30",
    patient: {
      name: "Test Prueba",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LS",
    },
    type: "Consulta Especialista",
    status: "confirmed",
    duration: 15,
  },
  {
    id: 7,
    time: "13:00",
    patient: {
      name: "cita a las 13:00",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LS",
    },
    type: "Consulta Especialista",
    status: "confirmed",
    duration: 30,
  }

]

const generateTimeSlots = () => {

  const slots = []

  for (let hour = 8; hour <= 18; hour++) {

    for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        slots.push(`${formattedHour}:${formattedMinute}`)
    }

  }

  return slots
  
}

const timeSlots = generateTimeSlots()

const groupedTimeSlots = timeSlots.reduce<{ [hour: string]: string[] }>((acc, time) => {

  const hour = time.split(":")[0]
  
  if (!acc[hour]) {
    acc[hour] = []
  }

  acc[hour].push(time)
  return acc

}, {})

const orderedHours = Array.from({ length: 11 }, (_, i) => (i + 8).toString().padStart(2, "0"))

interface AppointmentCalendarProps {
  date: Date
}

export function Calendar({ date }: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(date)

  const getAppointmentsForTimeSlot = (time: string) => {

    return appointments.filter((appointment) => appointment.time === time)

  }

  const handlePrevDay = () => {

    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)

  }

  const handleNextDay = () => {

    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)

  }

  const renderedSlots = new Set<string>()

  return (
      <>
        <NavBar />
        <Card elevation={2} sx={{ width:'100%', borderRadius:'20px' }}>
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Horario de Citas</Typography>
              <Box>
                <IconButton size="small" onClick={handlePrevDay}>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleNextDay}>
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
          
            {orderedHours.map((hour) => (
              <Box key={hour} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                  {hour}:00
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
                  
                      {groupedTimeSlots[hour].map((timeSlot) => {
                        if (renderedSlots.has(timeSlot)) {
                          return null 
                        }

                        const appointmentsAtTime = getAppointmentsForTimeSlot(timeSlot)
                        const [_, minutes] = timeSlot.split(":")

                        let skipMinutes = 0

                        if (appointmentsAtTime.length > 0) {
                          // Si hay cita en este slot, calcular cuánto dura y bloquear siguientes slots
                          const appointment = appointmentsAtTime[0]
                          skipMinutes = appointment.duration

                          const startTime = new Date(`1970-01-01T${appointment.time}:00`)
                          for (let i = 0; i < skipMinutes; i += 15) {
                            const blockedTime = new Date(startTime.getTime() + i * 60000)
                            const hours = blockedTime.getHours().toString().padStart(2, "0")
                            const mins = blockedTime.getMinutes().toString().padStart(2, "0")
                            renderedSlots.add(`${hours}:${mins}`)
                          }
                        }

                        return (
                          <Box key={timeSlot} sx={{ mb: 1 }}>
                            <Box display="flex" alignItems="center">
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                  width: 40,
                                  fontWeight: minutes === "00" ? 500 : 400,
                                  opacity: minutes === "00" ? 1 : 0.7,
                                }}
                              >
                                {minutes === "00" ? "" : minutes}
                              </Typography>
                              <Divider sx={{ flexGrow: 1, opacity: minutes === "00" ? 1 : 0.5 }} />
                            </Box>

                            {appointmentsAtTime.length > 0 && (
                              <Box ml={5} mt={0.5} mb={1}>
                                {appointmentsAtTime.map((appointment) => (
                                  <Paper
                                    key={appointment.id}
                                    variant="outlined"
                                    sx={{
                                      p: 1.5,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",                                    
                                      "&:hover": { bgcolor: appointment.status === "confirmed" ? '#1e55ec24' : "#ff51004c" },
                                      
                                      borderRadius: 1,
                                      borderLeft: 4,
                                      borderLeftColor: appointment.status === "confirmed" ? "primary.main" : "warning.main",
                                      mb: 1,
                                    }}
                                  >
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                      <Avatar
                                        src={appointment.patient.avatar || "/placeholder.svg"}
                                        alt={appointment.patient.name}
                                        sx={{ width: 32, height: 32 }}
                                      >
                                        {appointment.patient.initials}
                                      </Avatar>
                                      <Box>
                                        <Typography variant="body1">{appointment.patient.name}</Typography>
                                        
                                        <Box display="flex" alignItems="flex-start" flexDirection="column" >
                                          
                                          <Typography variant="caption" color="info" fontWeight={800} >
                                            {appointment.time} - {appointment.duration} min
                                          </Typography>
                                          
                                          <Typography variant="caption" color="textSecondary">
                                            {appointment.type}
                                          </Typography>

                                        </Box>

                                      </Box>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <Chip
                                        label={appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                                        color={appointment.status === "confirmed" ? "primary" : "warning"}
                                        // variant={appointment.status === "confirmed" ? "filled" : "outlined"}
                                        variant="filled"
                                        size="small"
                                      />
                                      <IconButton size="small">
                                        <MoreHorizIcon fontSize="small" />
                                      </IconButton>
                                      <Menu
                                           anchorEl={anchorEl}
                                           open={open}
                                           onClose={handleClose}
                                           anchorOrigin={{
                                             vertical: 'bottom',
                                             horizontal: 'right',
                                           }}
                                           transformOrigin={{
                                             vertical: 'top',
                                             horizontal: 'right',
                                           }}
                                         >
                                           <MenuItem onClick={() => handleOptionClick('Confirmar')}>Confirmar</MenuItem>
                                           <MenuItem onClick={() => handleOptionClick('Cancelar')}>Cancelar</MenuItem>
                                           <MenuItem onClick={() => handleOptionClick('Re-Agendar')}>Re-Agendar</MenuItem>
                                      </Menu>
                                    </Box>
                                  </Paper>
                                ))}
                              </Box>
                            )}
                          </Box>
                        )
                      })}

                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
        </Card>
      </>
  )
}