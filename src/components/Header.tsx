import { Box, Grid, Typography } from "@mui/material";

export default function Header() {
  return (
    <Grid md={12} mb={3}>
      <Box sx={{ backgroundColor: 'text.primary', display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, pr: 2, pl: 2, borderRadius: 2 }}>
        <Typography component="h2" variant="h2" sx={{ color: 'background.paper' }}>Report</Typography>
        <img
          src='https://baeckerai.de/wp-content/uploads/2022/01/baeckerai-logo-1.png'
          alt='BäckerAI Logo'
          loading="lazy"
          style={{ height: "40px" }}
        />
      </Box>
    </Grid>
  )
}