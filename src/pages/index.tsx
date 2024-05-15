import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import Dashboard from 'pages/dashboard';
import Login from './login';
import Landing from 'sections/landing';
export default function HomePage() {
  return (
    <Page title="Landing">
      <Login />
    </Page>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};
