import { ReactElement, useEffect } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project import
import Layout from 'layout';
import Page from 'components/Page';
import { useTheme } from '@mui/material/styles';
import DashboardTrendCharts from 'pages/charts/DashboardTrendCharts';
import DashboardOverViewCharts from 'pages/charts/DashboardOverViewCharts';
import { useDispatch, useSelector } from 'store';
import {
  getChartDataLastWeek,
  getChartDataLastMonth,
  getChartDataCurrentYear,
  getChartDataTotalUsers,
  getChartDataTotalAds
} from 'store/reducers/charts';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChartDataLastWeek());
    dispatch(getChartDataLastMonth());
    dispatch(getChartDataCurrentYear());
    dispatch(getChartDataTotalUsers());
    dispatch(getChartDataTotalAds());
  }, []);
  const theme = useTheme();
  return (
    <Page title="Dashboard">
      <Grid container rowSpacing={0} columnSpacing={5} style={{ marginLeft: '-20px' }}>
        <Grid container sx={{ mt: 0 }} style={{ borderRadius: '4px', border: `0.5px solid ${theme.palette.grey.A800}` }} direction={'row'}>
          <DashboardOverViewCharts />
        </Grid>
        <Grid rowSpacing={2.75} container sx={{ mt: 0 }} direction={'row'}>
          <Grid item xs={12} md={12} lg={12} sx={{ width: '100%' }}>
            <DashboardTrendCharts />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
