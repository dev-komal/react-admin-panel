import { Box, Grid, Typography } from '@mui/material'
import PaperComponent from '../../components/Paper'
import { PriceCard } from '../../components/Card'
import SaleChart from '../../components/SaleChart'
import RevenuesChart from '../../components/RevenuesChart'
import { useTranslation } from 'react-i18next'
import TableComponent from '../../components/Table'

function DataChart() {
  const { t } = useTranslation()
  return (
    <Box style={{ marginTop: '14px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <PriceCard
            iconBgColor="grayLight.main"
            title="Total Order"
            price="256.500,000"
            percentage="2.7%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <PriceCard
            iconBgColor="grayLight.main"
            title="Total Sales"
            price="256.500,000"
            percentage="2.7%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <PriceCard
            iconBgColor="grayLight.main"
            title="Total Users"
            price="256.500,000"
            percentage="2.7%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <PriceCard
            iconBgColor="grayLight.main"
            title="Pending"
            price="256.500,000"
            percentage="2.7%"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid  item xs={12} sm={6}>
          <PaperComponent sx={{ width: '100%' }}>
            <Box
              sx={{
                padding: '0px 0 8px 0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 600,
                  fontFamily: 'roboto-bold',
                }}
              >
                {t('common.costs')}
              </Typography>
              <Typography
                sx={{
                  fontSize: '18px',
                  color: '#869295',
                  fontWeight: 500,
                  padding: 0,
                  ml: 2,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'roboto-regular',
                }}
              >
                130.298,00€
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid #ECECEC' }} />
            <Box style={{ height: '260px', width: `calc(100% - 10px)` }}>
              <SaleChart />
            </Box>
          </PaperComponent>
        </Grid>
        <Grid  item xs={12} sm={6}>
          <PaperComponent sx={{ width: '100%' }}>
            <Box
              sx={{
                padding: '0px 0 8px 0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 600,
                  fontFamily: 'roboto-bold',
                }}
              >
                {t('common.costs')}
              </Typography>
              <Typography
                sx={{
                  fontSize: '18px',
                  color: '#869295',
                  fontWeight: 500,
                  padding: 0,
                  ml: 2,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'roboto-regular',
                }}
              >
                130.298,00€
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid #ECECEC' }} />
            <Box style={{ height: '260px', width: `calc(100% - 10px)` }}>
              <RevenuesChart />
            </Box>
          </PaperComponent>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item sx={{ width: '100%' }}>
          <TableComponent
            title="Ricavi"
            total="130.298,00"
            columns={['Category', 'Name']}
            rows={[
              {
                category: 'Category',
                name: '1.230,00',
              },
              {
                category: 'Name',
                name: '1.230,00',
              },
            ]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sx={{ width: '100%' }}>
          <TableComponent
            title="Ricavi"
            total="130.298,00"
            columns={['Category', 'Name']}
            rows={[
              {
                category: 'Category',
                name: '1.230,00',
              },
              {
                category: 'Name',
                name: '1.230,00',
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DataChart
