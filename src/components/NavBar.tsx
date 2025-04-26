import { AppBar, Toolbar, IconButton, InputBase, Button, Box, useMediaQuery, useTheme, Paper } from "@mui/material"
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Today as TodayIcon } from "@mui/icons-material"

interface NavBarProps {
  onSidebarToggle: () => void
}

// export function NavBar({ onSidebarToggle }: NavBarProps) {
export default function NavBar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        zIndex: theme.zIndex.drawer + 1,
        marginBottom:'20px'
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2, minHeight: 56 }}> 
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>{}} size="medium">
              <MenuIcon />
          </IconButton> */}

          <Paper
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              width: isMobile ? 150 : 250,
              borderRadius: 1,
              px: 1,
              py: 0.5,
              bgcolor: "background.default",
            }}
            elevation={0}
            variant="outlined"
          >
            <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Buscar citas o pacientes..."
              fullWidth
              sx={{ fontSize: 14 }}
              inputProps={{ "aria-label": "buscar" }}
            />
          </Paper>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={isMobile ? null : <TodayIcon fontSize="small" />}
            sx={{ minWidth: isMobile ? 0 : undefined, px: isMobile ? 1 : undefined }}
          >
            {isMobile ? <TodayIcon fontSize="small" /> : "Hoy"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={isMobile ? null : <AddIcon fontSize="small" />}
            sx={{ minWidth: isMobile ? 0 : undefined, px: isMobile ? 1 : undefined }}
          >
            {isMobile ? <AddIcon fontSize="small" /> : "Nueva Cita"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
