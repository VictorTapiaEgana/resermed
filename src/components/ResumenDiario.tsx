import { Card, CardHeader, CardContent, Typography, Grid, Paper } from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
  Person as UserCheckIcon,
  // Cancel as XCircleIcon,
} from "@mui/icons-material"

export function ResumenDiario() {
  return (
    <Card elevation={2} sx={{minWidth:'240px',maxWidth:'240px', height:'340px', borderRadius:'20px'}}>

      <CardHeader title={
          <Typography variant="h5">Resumen del Día</Typography>
          } sx={{ pb: 1 }} />
      <CardContent>

        <Grid container spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >

          <Grid >
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                height: "100%",
              }}
            >
              <UserCheckIcon sx={{ mb: 0.5, color: "primary.main" }} fontSize="small" />
              <Typography variant="h5" fontWeight="bold">
                11
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Total Citas
              </Typography>
            </Paper>
          </Grid>

          <Grid >
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                height: "100%",
              }}
            >
              <CheckCircleIcon sx={{ mb: 0.5, color: "success.main" }} fontSize="small" />
              <Typography variant="h5" fontWeight="bold">
                8
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Confirmadas
              </Typography>
            </Paper>
          </Grid>

          <Grid >
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                height: "100%",
                marginTop:'25px'
              }}
            >
              <ClockIcon sx={{ mb: 0.5, color: "warning.main" }} fontSize="small" />
              <Typography variant="h5" fontWeight="bold">
                3
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Pendientes
              </Typography>
            </Paper>
          </Grid>

          {/* <Grid >
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                height: "100%",
                marginTop:'25px'
              }}
            >
              <XCircleIcon sx={{ mb: 0.5, color: "error.main" }} fontSize="small" />
              <Typography variant="h5" fontWeight="bold">
                1
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Canceladas
              </Typography>
            </Paper>
          </Grid> */}

        </Grid>

      </CardContent>

    </Card>
  )
}
