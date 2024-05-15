// material-ui
import { Box, ChipProps, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

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
}

const AnalyticsDataCard = ({ color, title, variant, count, percentage, isLoss, children }: Props) => (
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
    </Box>
  </MainCard>
);

AnalyticsDataCard.defaultProps = {
  color: 'primary'
};

export default AnalyticsDataCard;
