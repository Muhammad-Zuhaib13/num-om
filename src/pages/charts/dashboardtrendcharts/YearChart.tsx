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
import NotFound from 'components/NotFound';
import { YearChartData } from 'types/dashbaord-charts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const YearChart = () => {
  const isLoading = useSelector((state) => state?.common?.loading?.charts);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode } = useConfig();
  const yearChartData = useSelector((state) => state.chartsSlice.currentYear) as YearChartData | null;
  const yearChartDataLength = yearChartData?.nbUserAndAds?.length;
  const [months, setMonths] = useState<string[]>([]);
  const [nbUsers, setNbUsers] = useState<number[]>([]);
  const [nbAds, setNbAds] = useState<number[]>([]);
  const [series, setSeries] = useState<{ name: string; data: number[]; color: string }[]>([]);
  const [options, setOptions] = useState<ChartProps>({});
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  useEffect(() => {
    if (yearChartData && yearChartData.nbUserAndAds) {
      const months: string[] = [];
      const nbUsers: number[] = [];
      const nbAds: number[] = [];

      yearChartData.nbUserAndAds.forEach((data) => {
        months.push(data.month);
        nbUsers.push(data.nbUsers || 0);
        nbAds.push(data.nbAds || 0);
      });

      setMonths(months);
      setNbUsers(nbUsers);
      setNbAds(nbAds);

      const initialSeries = [
        {
          name: 'Active Users',
          data: nbUsers,
          color: '#1890FF'
        },
        {
          name: 'Total Ads',
          data: nbAds,
          color: '#FAAD14'
        }
      ];

      setSeries(initialSeries);

      const columnChartOptions = {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: months,
          labels: {
            style: {
              colors: [secondary]
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: [secondary]
            },
            formatter: (val: any) => {
              return `${val}`;
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
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
            borderRadius: 1,
            markers: {
              size: 6
            }
          }
        },
        legend: {
          show: true
        }
      };

      setOptions(columnChartOptions);
    }
  }, [yearChartData]);

  return (
    <MainCard content="false">
      <Box id="chart" sx={{ bgcolor: 'transparent' }}>
        {isLoading ? (
          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
            <CircularProgress color="primary" />
          </Grid>
        ) : yearChartDataLength === 0 || !yearChartData ? (
          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
            <NotFound />
          </Grid>
        ) : (
          <ReactApexChart options={options} series={series} type="bar" height={360} />
        )}
      </Box>
    </MainCard>
  );
};

export default YearChart;
