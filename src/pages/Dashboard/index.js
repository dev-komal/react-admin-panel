import { Box, Typography } from '@mui/material'
import React from 'react'
import DataChart from './dataChart'
import Title from '../../components/Title'

const Dashboard = () => {
  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      <Box
        sx={{
          mt: 2,
          pt: 5,
          pb: 2
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            fontFamily: 'roboto-bold',
          }}
        >
          Dashboard
        </Typography>
      </Box>
      <DataChart />
    </Box>
  )
}

export default Dashboard
