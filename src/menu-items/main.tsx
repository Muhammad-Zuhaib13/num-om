// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Icons } from '../assets';
import {
  BuildOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  BuildOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  HomeOutlined,
  PlusCircleOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const main: NavItemType = {
  id: 'main-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.HomeOutlined,
      outlinedIcon: Icons.HomeOutlined,
      filledIcon: Icons.HomeFilled,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: <FormattedMessage id="Users" />,
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined,
      outlinedIcon: Icons.UsersOutlined,
      filledIcon: Icons.UsersFilled,
      breadcrumbs: false
    },
    {
      id: 'ads',
      title: <FormattedMessage id="Ads" />,
      type: 'item',
      url: '/ads',
      icon: icons.PlusCircleOutlined,
      outlinedIcon: Icons.AdsOutlined,
      filledIcon: Icons.AdsFilled,
      breadcrumbs: false
    }
  ]
};

export default main;
