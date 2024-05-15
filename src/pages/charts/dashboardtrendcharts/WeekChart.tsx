import { useEffect, useState, ChangeEvent } from 'react';
// next
import dynamic from 'next/dynamic';
import { useSelector } from 'store';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery, CircularProgress, Grid } from '@mui/material';
// project import
import useConfig from 'hooks/useConfig';
// third-party
import { Props as ChartProps } from 'react-apexcharts';
import NotFound from 'components/NotFound';
// types
import { ThemeMode } from 'types/config';
import MainCard from 'components/MainCard';
import { WeekChartData } from 'types/dashbaord-charts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const WeekChart = () => {
  const isLoading = useSelector((state) => state?.common?.loading?.charts);
  const theme = useTheme();
  const weekChartData = useSelector((state) => state.chartsSlice.lastWeek) as WeekChartData | null;
  const weekChartDataLength = weekChartData?.nbUserAndAds?.length;
  const [days, setDays] = useState<string[]>([]);
  const [nbUsers, setNbUsers] = useState<number[]>([]);
  const [nbAds, setNbAds] = useState<number[]>([]);
  const [series, setSeries] = useState<
    {
      name: string;
      data: number[];
      color: string;
    }[]
  >([]);
  useEffect(() => {
    if (weekChartData && weekChartData.nbUserAndAds) {
      const days: string[] = [];
      const nbUsers: number[] = [];
      const nbAds: number[] = [];

      weekChartData.nbUserAndAds.forEach((data) => {
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
  }, [weekChartData]);

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode } = useConfig();

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
      categories: weekChartData?.nbUserAndAds?.map((item: any) => item.day),
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
    <MainCard content="false">
      <Box id="chart" sx={{ bgcolor: 'transparent' }}>
        {isLoading ? (
          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
            <CircularProgress color="primary" />
          </Grid>
        ) : weekChartDataLength === 0 || !weekChartData ? (
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

export default WeekChart;
