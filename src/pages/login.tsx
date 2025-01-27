import { ReactElement, useEffect } from 'react';

// next
import { NextPageContext } from 'next';
import NextLink from 'next/link';
import { getProviders, getCsrfToken } from 'next-auth/react';

// material-ui
import { Grid, Link, Stack, Typography } from '@mui/material';
import { useSelector } from 'store';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import { useRouter } from 'next/router';

export default function SignIn({ providers, csrfToken }: any) {
  const router = useRouter();
  const loggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  // const token=useSelector((state)=>state.auth.token) || localStorage.getItem('token')
  useEffect(() => {
    if (loggedIn) {
      router.push('/dashboard');
    }
  }, [loggedIn, router]);
  return (
    <Page title="Login">
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Sign in</Typography>
              {/* <NextLink href="/register" passHref legacyBehavior>
                <Link variant="body1" color="primary">
                  Don&apos;t have an account?
                </Link>
              </NextLink> */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthLogin providers={providers} csrfToken={csrfToken} />
          </Grid>
        </Grid>
      </AuthWrapper>
    </Page>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="auth">{page}</Layout>;
};

// export async function getServerSideProps(context: NextPageContext) {
//   const providers = await getProviders();
//   const csrfToken = await getCsrfToken(context);

//   return {
//     props: { providers, csrfToken }
//   };
// }
