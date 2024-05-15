import { ReactElement } from 'react';
import Layout from 'layout';
import AdsTable from 'pages/tables/ads-table';
const Ads = () => {
  return (
    <>
      <AdsTable />
    </>
  );
};

Ads.getLayout = function getLayout(page: ReactElement) {
  return <Layout paddingX={false}>{page}</Layout>;
};

export default Ads;
