import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material"
import { memo } from "react"

type ReportDetailProps = {
  value: number | string,
  unit?: string,
  legend?: string,
}

const ReportDetail = memo(({ value, unit = "", legend = "" }: ReportDetailProps) => {
  return (
    <Grid md={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 200,
          },
        }}
      >
        <Paper elevation={2} sx={{ borderRadius: '16px', p: '16px' }}>
          <Grid>
            <Typography variant="h3">{value ? `${value} ${unit}` : <Skeleton animation={false} />}</Typography>
            <Typography variant="subtitle1">{value ? `${legend}` : <Skeleton animation={false} />}</Typography>
          </Grid>
        </Paper>
      </Box >
    </Grid>
  )
})

export default ReportDetail