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

// chart options
// ... (existing imports)

// chart options
const columnChartOptions = {
  chart: {
    type: 'line',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    },
    min: 0,
    max: 6
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

const MonthChart = () => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode } = useConfig();
  const isLoading = useSelector((state) => state?.chartsSlice?.isLoading);

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const initialSeries = [
    {
      name: 'Active Users',
      data: [180, 90, 135, 114, 120, 145, 150, 60, 45, 78, 150, 168],
      color: '#1890FF'
    },
    {
      name: 'Total Ads',
      data: [120, 45, 78, 150, 168, 99, 120, 45, 78, 150, 168, 99],
      color: '#FAAD14'
    }
  ];

  const [series, setSeries] = useState(initialSeries);

  const [options, setOptions] = useState<ChartProps>(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      //   colors: !(income && cos) && cos ? [primaryMain] : [warning, primaryMain],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      }
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, xsDown]);

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

export default MonthChart;
