import { useEffect, useState, ChangeEvent } from 'react';
// next
import dynamic from 'next/dynamic';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Checkbox, FormControl, FormControlLabel, Select, MenuItem, Stack, Typography, useMediaQuery, Grid } from '@mui/material';
// project import
import useConfig from 'hooks/useConfig';

// third-party
import { Props as ChartProps } from 'react-apexcharts';

// types
import { ThemeMode } from 'types/config';
import MainCard from 'components/MainCard';
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';
import OverviewChart from 'sections/charts/OverviewChart';
import DashboardOverviewChart from './dashbaordoverviewcharts/DashboardOverViewChart';
import UsersOverViewChart from './dashbaordoverviewcharts/UsersOverViewChart';
import AdsOverViewChart from './dashbaordoverviewcharts/AdsOverViewChart';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const DashboardOverViewCharts = () => {
  const theme = useTheme();
  const activeUsersData = {
    chartData: [80, 80, 80, 80, 90, 125, 90, 100, 80, 150, 160, 150, 170, 155, 150, 160, 145, 200, 140, 160],
    title: 'Active Users',
    count: '2000',
    precentage: 0.73,
    variantCard: 'primary',
    variantChart: 'green'
  };
  const totalAdsData = {
    chartData: [80, 80, 80, 80, 90, 125, 90, 100, 80, 150, 160, 150, 170, 155, 150, 160, 145, 200, 140, 160],
    title: 'Total Ads',
    count: '2000',
    precentage: 0.73,
    variantCard: 'red',
    variantChart: 'red'
  };
  const featuredAdsData = {
    chartData: [80, 80, 80, 80, 90, 125, 90, 100, 80, 150, 160, 150, 170, 155, 150, 160, 145, 200, 140, 160],
    title: 'Featured Ads',
    count: '2000',
    precentage: 0.73,
    variantCard: 'secondary',
    variantChart: 'blue'
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        {/* <DashboardOverviewChart areaChartData={activeUsersData} /> */}
        <UsersOverViewChart />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            width: '0.5px',
            height: '50%',
            top: '25%',
            left: 0,
            backgroundColor: theme.palette.grey.A800,
            zIndex: 1
          }}
        ></div>
        <AdsOverViewChart />
        {/* <DashboardOverviewChart areaChartData={totalAdsData} /> */}
        <div
          style={{
            position: 'absolute',
            width: '0.5px',
            height: '50%',
            top: '25%',
            right: 0,
            backgroundColor: theme.palette.grey.A800,
            zIndex: 1
          }}
        ></div>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4} lg={4}>
        <DashboardOverviewChart areaChartData={featuredAdsData} />
      </Grid> */}
    </>
  );
};

export default DashboardOverViewCharts;
