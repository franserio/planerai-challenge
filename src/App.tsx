import { useEffect, useMemo, useState } from 'react'
import { Box, Grid, ThemeProvider, createTheme } from '@mui/material'
import { constructArrayFromRange, getCalenderWeekFromDate, getQuantityByDateAndDataset, getWeeklyWastedActualQuantities, getWeeklyWastedRecommendedQuantities } from './utils/utils'
import Chart from './components/Chart'
import ReportForm from './components/ReportForm'
import { Store, Product, FilteredData } from './types'
import recommendations from './data/recommendations.json'
import deliveries from './data/deliveries.json'
import sales from './data/sales.json'
import './App.css'
import ReportDetail from './components/ReportDetail'
import Header from './components/Header'

const theme = createTheme({
  palette: {
    background: {
      paper: '#FFF',
    },
    text: {
      primary: '#22313E',
      secondary: '#009FB2',
    },
    success: {
      main: '#4CBE1F',
    }
  }
})

const initialFilteredData: FilteredData = {
  recommendationsData: [],
  deliveriesData: [],
  salesData: []
}

const firstTransaction = deliveries.at(0).target_date
const lastTransaction = deliveries.at(-1).target_date
const calenderWeeks = constructArrayFromRange(getCalenderWeekFromDate(firstTransaction), getCalenderWeekFromDate(lastTransaction), 1)

function App() {
  const [selectedStore, setSelectedStore] = useState<null | number>(null)
  const [selectedProduct, setSelectedProduct] = useState<null | number>(null)
  const [selectedCalenderWeek, setSelectedCalenderWeek] = useState<null | string>(null)
  const [filteredData, setFilteredData] = useState(initialFilteredData)

  useEffect(() => {
    if (!selectedStore || !selectedProduct || !selectedCalenderWeek) return

    const filteredRecommendations = recommendations.filter(item => item.id_store === selectedStore && item.id_product === selectedProduct && getCalenderWeekFromDate(item.target_date).toString() === selectedCalenderWeek)
    const filteredDeliveries = deliveries.filter(item => item.id_store === selectedStore && item.id_product === selectedProduct && getCalenderWeekFromDate(item.target_date).toString() === selectedCalenderWeek)
    const filteredSales = sales.filter(item => item.id_store === selectedStore && item.id_product === selectedProduct && getCalenderWeekFromDate(item.target_date).toString() === selectedCalenderWeek)

    const newFilteredData = {
      recommendationsData: filteredRecommendations,
      deliveriesData: filteredDeliveries,
      salesData: filteredSales
    }

    setFilteredData(newFilteredData)
  }, [selectedStore, selectedProduct, selectedCalenderWeek])

  const selectStoreHandler = (_e: React.SyntheticEvent, value: Store) => {
    setSelectedStore(value.id_store)
  }

  const selectProductHandler = (_e: React.SyntheticEvent, value: Product) => {
    setSelectedProduct(value?.id_product)
  }

  const selectCalenderWeekHandler = (_e: React.SyntheticEvent, value: string) => {
    setSelectedCalenderWeek(value)
  }

  const filteredDataForChart = getQuantityByDateAndDataset(filteredData)

  const weeklyQuantityWastedRecommended = useMemo(() => getWeeklyWastedRecommendedQuantities(filteredData), [filteredData])
  const weeklyQuantityWastedActual = useMemo(() => getWeeklyWastedActualQuantities(filteredData), [filteredData])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        m: 2,
        p: 2,
        height: 1,
        border: 0,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: 'background.paper'
      }}>
        <Header />
        <ReportForm selectStoreHandler={selectStoreHandler} selectProductHandler={selectProductHandler} selectCalenderWeekHandler={selectCalenderWeekHandler} calenderWeeks={calenderWeeks} />
        <Grid container spacing={2} p={2}>
          <Chart dataset={filteredDataForChart} />
          <Grid container md={4}>
            <Grid container md={12} justifyContent={'space-around'}>
              <ReportDetail value={weeklyQuantityWastedRecommended} legend={'possible unsold products'} />
              <ReportDetail value={weeklyQuantityWastedActual} legend={'actual unsold products'} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider >
  )
}

export default App