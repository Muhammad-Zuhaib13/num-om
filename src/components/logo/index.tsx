import NextLink from 'next/link';

// material-ui
import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';

// project import
// import LogoMain from './LogoMain';
// import LogoIcon from './LogoIcon';
import { Images } from '../../assets';
import { APP_DEFAULT_PATH } from 'utils/config';
import Image from 'next/legacy/image';
// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: string;
  loginIcon?: boolean;
}

const LogoSection = ({ reverse, isIcon, sx, to, loginIcon = false }: Props) => (
  <NextLink href={!to ? APP_DEFAULT_PATH : to} passHref legacyBehavior>
    <ButtonBase disableRipple sx={sx}>
      {loginIcon == true ? <Image src={Images.NumberOMLoginLogo} /> : <Image src={Images.NumOmDashboardLogo} />}
    </ButtonBase>
  </NextLink>
);

export default LogoSection;
