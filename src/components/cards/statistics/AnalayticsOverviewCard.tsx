// material-ui
import { Box, ChipProps, CircularProgress, Stack, Typography, Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import NotFound from 'components/NotFound';
// // assets
// import { RiseOutlined, FallOutlined } from '@ant-design/icons';

import { CaretDownOutlined } from '@ant-design/icons';
// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
  title: string;
  count: string | number | undefined;
  percentage?: number;
  isLoss?: boolean;
  color?: ChipProps['color'];
  children?: any;
  variant?: any;
  isLoading?: boolean;
  length?: number;
  chartData?: any;
}

const AnalayticsOverviewCard = ({ color, title, variant, count, percentage, isLoss, children, isLoading, length, chartData }: Props) => (
  <MainCard content={false} border={false}>
    <Box sx={{ p: 2.25 }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          <CaretDownOutlined style={{ color: variant == 'primary' ? '#52C41A' : variant === 'secondary' ? '#57C9F5' : 'red' }} />
          {percentage}%
        </Typography>
      </Stack>
      {isLoading ? (
        <Grid minHeight="20vh" justifyContent="center" alignItems="center" container>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress color="primary" />
          </Box>
        </Grid>
      ) : length === 0 || !chartData ? (
        <Grid minHeight="20vh" justifyContent="center" alignItems="center" container>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <NotFound height={'20vh'} />
          </Box>
        </Grid>
      ) : (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box sx={{ width: '50%' }}>
            <Typography variant="h5" color="textPrimary">
              {count}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              0.00.009
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>{children}</Box>
        </Stack>
      )}
    </Box>
  </MainCard>
);

AnalayticsOverviewCard.defaultProps = {
  color: 'primary'
};

export default AnalayticsOverviewCard;
