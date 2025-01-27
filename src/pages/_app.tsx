import { useEffect, useState, ReactElement, ReactNode } from 'react';

// scroll bar
import 'simplebar/dist/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// apex-chart
import 'styles/apex-chart.css';
import 'styles/react-table.css';

// next
import { NextPage } from 'next';
// import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project import
import ThemeCustomization from 'themes';

// import Loader from 'components/Loader';
import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';
import RTLLayout from 'components/RTLLayout';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

import { ConfigProvider } from 'contexts/ConfigContext';
import { store, persister, dispatch } from 'store';
// import { fetchMenu } from 'store/reducers/menu';

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
  pageProps: any;
}

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   dispatch(fetchMenu()).then(() => {
  //     setLoading(false);
  //   });
  // }, []);

  // if (loading) return <Loader />;

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <ScrollTop>
                  {/* <SessionProvider session={pageProps.session} refetchInterval={0}> */}
                    <>
                      <Notistack>
                        <Snackbar />
                        {getLayout(<Component {...pageProps} />)}
                      </Notistack>
                    </>
                  {/* </SessionProvider> */}
                </ScrollTop>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
