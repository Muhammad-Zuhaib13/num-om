import { useEffect, useState, ChangeEvent } from 'react';

// next
import dynamic from 'next/dynamic';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  Grid,
  CircularProgress
} from '@mui/material';

// project import
import useConfig from 'hooks/useConfig';

// third-party
import { Props as ChartProps } from 'react-apexcharts';

// types
import { ThemeMode } from 'types/config';
import MainCard from 'components/MainCard';
import { useSelector } from 'store';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WeekChart = () => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode } = useConfig();
  const isLoading = useSelector((state) => state?.chartsSlice?.isLoading);
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  const columnChartOptions = {
    chart: {
      type: 'line',
      height: 430,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: [secondary, secondary, secondary, secondary, secondary, secondary]
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: [secondary]
        },
        formatter: (val: any) => {
          return `$${val}`;
        }
      }
    },
    grid: {
      borderColor: line
    },
    colors: ['#1890FF'],
    theme: {
      mode: mode === ThemeMode.DARK ? 'dark' : 'light'
    },
    plotOptions: {
      line: {
        markers: {
          size: 6
        }
      },
      bar: {
        columnWidth: xsDown ? '60%' : '30%'
      }
    },
    legend: {
      show: true
    }
  };
  const initialSeries = [
    {
      name: 'Active Users',
      data: [190, 90, 135, 114, 120, 145, 150],
      color: '#1890FF'
    },
    {
      name: 'Total Ads',
      data: [120, 45, 78, 150, 168, 99, 120],
      color: '#FAAD14'
    }
  ];

  const [series, setSeries] = useState(initialSeries);

  const [options, setOptions] = useState<ChartProps>(columnChartOptions);

  return (
    <MainCard content="false">
      <Box id="chart" sx={{ bgcolor: 'transparent' }}>
        {isLoading ? (
          <Grid sx={{ minHeight: '50vh' }} justifyContent="center" alignItems="center" container>
            <Grid item>
              <CircularProgress color="primary" size={40} />
            </Grid>
          </Grid>
        ) : (
          <ReactApexChart options={options} series={series} type="line" height={360} />
        )}
      </Box>
    </MainCard>
  );
};

export default WeekChart;
