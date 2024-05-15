import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import AnalayticsOverviewCard from 'components/cards/statistics/AnalayticsOverviewCard';
import { useSelector } from 'store';
import { UsersChartData } from 'types/dashbaord-charts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const UsersOverViewChart = () => {
  const theme = useTheme();
  const isLoading = useSelector((state) => state?.common?.loading?.usersChart);
  const areaChartOptions = {
    chart: {
      id: 'total-users-chart',
      sparkline: {
        enabled: true
      },
      height: 100,
      type: 'area',
      toolbar: {
        show: false
      },
      offsetX: -1
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      x: {
        show: false
      }
    },
    grid: {
      show: false
    },
    //@ts-ignore
    colors: [theme?.palette?.chart?.lightgreen]
  };
  const usersChartData = useSelector((state) => state?.chartsSlice?.totalUsersChart) as UsersChartData | null;
  const usersChartDataLength = usersChartData?.nbUserAndAds?.length;
  const [options, setOptions] = useState<ChartProps>(areaChartOptions);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [users, setUsers] = useState<number[]>([]);
  const [nbUsers, setNbUsers] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  useEffect(() => {
    if (usersChartData && usersChartData?.nbUserAndAds) {
      const nbUsers: number[] = [];
      const months: string[] = [];
      usersChartData.nbUserAndAds.forEach((data) => {
        nbUsers.push(data.nbUsers || 0);
        months.push(data.month);
      });
      setNbUsers(nbUsers);
      setMonths(months);
      const initialSeries = [
        {
          name: 'Users',
          //   data: nbUsers
          //   dummy data
          data: [80, 80, 80, 80, 90, 125, 90, 100, 80, 150, 160, 150, 170, 155, 150, 160, 145, 200, 140, 160]
        }
      ];
      setSeries(initialSeries);
    }
  }, [usersChartData]);
  return (
    <AnalayticsOverviewCard
      title={'Active Users'}
      count={usersChartData?.nbUsers}
      percentage={0.73}
      variant={'primary'}
      isLoading={isLoading}
      chartData={usersChartData}
      length={usersChartDataLength}
    >
      <ReactApexChart options={options} series={series} type="area" height={100} width={'99%'} />
    </AnalayticsOverviewCard>
  );
};

export default UsersOverViewChart;
