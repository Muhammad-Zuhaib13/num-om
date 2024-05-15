

// material-ui
import { Theme } from '@mui/material/styles';
import {  useMediaQuery } from '@mui/material';
// project import
// import Search from './Search';
import Profile from './Profile';
// import Customization from './Customization';
import MobileSection from './MobileSection';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';

// type
import { MenuOrientation } from 'types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
