import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Checkbox, FormControl, FormControlLabel, Select, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';
import YearChart from './dashboardcharts/YearChart';
import MonthChart from './dashboardcharts/MonthChart';
import WeekChart from './dashboardcharts/WeekChart';

const DashboardBarChart = () => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [filter, setFilter] = useState('year');

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
              { value: 'year', label: 'Year 2024' },
              { value: 'lastweek', label: 'Last Week' },
              { value: 'lastmonth', label: 'Last Month' }
            ]?.map((val: any, index: number) => (
              <MenuItem key={index} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack>
        <WeekChart />
        <MonthChart />
        <YearChart />
      </Stack>
    </Stack>
  );
};

export default DashboardBarChart;
