import { useEffect, useState, ChangeEvent } from 'react';
import NotFound from 'components/NotFound';
// next
import dynamic from 'next/dynamic';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery, CircularProgress, Grid } from '@mui/material';

// project import
import useConfig from 'hooks/useConfig';

// third-party
import { Props as ChartProps } from 'react-apexcharts';
import { useSelector } from 'store';
// types
import { ThemeMode } from 'types/config';
import MainCard from 'components/MainCard';
import { MonthChartData, NbUserAndAds } from 'types/dashbaord-charts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MonthChart = () => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode } = useConfig();
  const monthChartData = useSelector((state) => state.chartsSlice.lastMonth) as MonthChartData | null;
  const monthChartDataLength = monthChartData?.nbUserAndAds?.length;
  const [days, setDays] = useState<number[]>([]);
  const [nbUsers, setNbUsers] = useState<number[]>([]);
  const [nbAds, setNbAds] = useState<number[]>([]);
  const [series, setSeries] = useState<{ name: string; data: number[]; color: string }[]>([]);
  const isLoading = useSelector((state) => state.common.loading?.charts);
  useEffect(() => {
    if (monthChartData && monthChartData?.nbUserAndAds) {
      const days: number[] = [];
      const nbUsers: number[] = [];
      const nbAds: number[] = [];

      monthChartData.nbUserAndAds.forEach((data: NbUserAndAds) => {
        days.push(data.day);
        nbUsers.push(data.nbUsers || 0);
        nbAds.push(data.nbAds || 0);
      });

      setDays(days);
      setNbUsers(nbUsers);
      setNbAds(nbAds);

      const initialSeries: {
        name: string;
        data: number[];
        color: string;
      }[] = [
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

      const updatedOptions = {
        ...columnChartOptions,
        xaxis: {
          ...columnChartOptions.xaxis,
          categories: days
        }
      };

      setOptions(updatedOptions);
    }
  }, [monthChartData]);
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const columnChartOptions = {
    chart: {
      type: 'line',
      height: 430,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: monthChartData?.nbUserAndAds.map((item: any) => item.day),
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
    plotOptions: {
      line: {
        markers: {
          size: 6
        }
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    legend: {
      show: true
    }
  };

  const [options, setOptions] = useState<ChartProps>(columnChartOptions);

  return (
    <MainCard content={false}>
      <Box id="chart" sx={{ bgcolor: 'transparent', pt: 3 }}>
        {isLoading ? (
          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
            <CircularProgress color="primary" />
          </Grid>
        ) : monthChartDataLength === 0 || !monthChartData ? (
          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
            <NotFound />
          </Grid>
        ) : (
          <ReactApexChart options={options} series={series} type="line" height={360} />
        )}
      </Box>
    </MainCard>
  );
};

export default MonthChart;
