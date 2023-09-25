import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';
import stores from '../data/stores.json'
import products from '../data/products.json'
import { Product, Store } from '../types';

type ReportFormProps = {
  selectStoreHandler: (_e: React.SyntheticEvent, value: Store) => void
  selectProductHandler: (_e: React.SyntheticEvent, value: Product) => void
  selectCalenderWeekHandler: (_e: React.SyntheticEvent, value: string) => void
  calenderWeeks: string[]
}

export default function ReportForm({
  selectStoreHandler,
  selectProductHandler,
  selectCalenderWeekHandler,
  calenderWeeks }: ReportFormProps) {
  return (
    <Grid container spacing={2} p={2} color='text.primary'>
      <Grid container md={12} columnGap={2}>
        <Grid md={5}>
          <Autocomplete
            disablePortal
            onChange={selectStoreHandler}
            options={stores}
            getOptionLabel={(option) => option.store_label}
            sx={{ width: 1 }}
            disableClearable={true}
            renderInput={(params) => <TextField {...params} label="Store" />}
          />
        </Grid>
        <Grid md={3}>
          <Autocomplete
            disablePortal
            onChange={selectProductHandler}
            options={products}
            getOptionLabel={(option) => option.name_product}
            sx={{ width: 1 }}
            disableClearable={true}
            renderInput={(params) => <TextField {...params} label="Product" />}
          />
        </Grid>
        <Grid md={3}>
          <Autocomplete
            disablePortal
            onChange={selectCalenderWeekHandler}
            options={calenderWeeks}
            sx={{ width: 1 }}
            disableClearable={true}
            renderInput={(params) => <TextField {...params} label="Calender week" />}
          />
        </Grid>
      </Grid >
    </Grid>
  )
}