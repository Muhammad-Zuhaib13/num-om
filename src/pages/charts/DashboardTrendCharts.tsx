import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Checkbox, FormControl, FormControlLabel, Select, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';
import YearChart from './dashboardtrendcharts/YearChart';
import MonthChart from './dashboardtrendcharts/MonthChart';
import WeekChart from './dashboardtrendcharts/WeekChart';

const DashboardTrendCharts = () => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [filter, setFilter] = useState('this_month');
  const thisYear : number = new Date().getFullYear();
  const handleChangeDisplay = () => {
    switch (filter) {
      case 'year':
        return <YearChart />;
      case 'this_week':
        return <WeekChart />;
      case 'this_month':
        return <MonthChart />;
    }
  };
  return (
    <Stack direction="column" gap={3} mt={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={1.5}>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 500, color: '#262626', fontSize: '16px' }}>
            Analyzing Engagement Trends
          </Typography>
        </Stack>
        <FormControl sx={{ width: xsDown ? 'calc(100vw - 48px)' : 'auto' }}>
          <Select
            id="graphSort"
            name="graphSort"
            value={filter || ''}
            defaultValue="all"
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          >
            {[
              { value: 'year', label: 'This Year' },
              { value: 'this_week', label: 'This Week' },
              { value: 'this_month', label: 'This Month' }
            ]?.map((val: any, index: number) => (
              <MenuItem key={index} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack>{handleChangeDisplay()}</Stack>
    </Stack>
  );
};

export default DashboardTrendCharts;
