import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import AnalayticsOverviewCard from 'components/cards/statistics/AnalayticsOverviewCard';
import { useSelector } from 'store';
import { AdsChartData } from 'types/dashbaord-charts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const AdsOverViewChart = () => {
  const theme = useTheme();
  const isLoading = useSelector((state) => state?.common?.loading?.adsChart);
  const areaChartOptions = {
    chart: {
      id: 'total-ads-chart',
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
    colors: [theme?.palette?.chart?.lightred]
  };
  const adsChartData = useSelector((state) => state?.chartsSlice?.totalAdsChart) as AdsChartData | null;
  const adsChartDataLength = adsChartData?.nbUserAndAds?.length;
  const [options, setOptions] = useState<ChartProps>(areaChartOptions);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [users, setUsers] = useState<number[]>([]);
  const [nbAds, setNbAds] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  useEffect(() => {
    if (adsChartData && adsChartData?.nbUserAndAds) {
      const nbAds: number[] = [];
      const months: string[] = [];
      adsChartData.nbUserAndAds.forEach((data) => {
        nbAds.push(data.nbAds || 0);
        months.push(data.month);
      });
      setNbAds(nbAds);
      setMonths(months);
      const initialSeries = [
        {
          name: 'Ads',
          //   data: nbAds
          //   dummy data
          data: [80, 80, 80, 80, 90, 125, 90, 100, 80, 150, 160, 150, 170, 155, 150, 160, 145, 200, 140, 160]
        }
      ];
      setSeries(initialSeries);
    }
  }, [adsChartData]);
  return (
    <AnalayticsOverviewCard
      title={'Total Ads'}
      count={adsChartData?.nbAds}
      percentage={0.73}
      variant={'red'}
      isLoading={isLoading}
      chartData={adsChartData}
      length={adsChartDataLength}
    >
      <ReactApexChart options={options} series={series} type="area" height={100} width={'99%'} />
    </AnalayticsOverviewCard>
  );
};

export default AdsOverViewChart;
