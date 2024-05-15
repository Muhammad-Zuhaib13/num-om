import { ReactNode } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import AuthBackground from './AuthBackground';
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => (
  <Box sx={{ minHeight: '100vh', background: '#EDF6FF' }}>
    {/* <AuthBackground /> */}
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      {/* <Grid item xs={12} sx={{ ml: 3, mt: 3, backgroundColor: 'red' }}>
        <Logo loginIcon={true} />
      </Grid> */}
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)', flexDirection:'column' } }}
        >
          <Grid item>
            <Logo loginIcon={true} />
          </Grid>
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
