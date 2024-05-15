// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id:'main-dashboard',
  type:'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.PhoneOutlined,
      target: true
    },
    {
      id: 'users',
      title: <FormattedMessage id="users" />,
      type: 'item',
      url: '/users',
      icon: icons.DollarOutlined
    },
    {
      id: 'ads-list',
      title: <FormattedMessage id="ads-list" />,
      type: 'item',
      url: '/ads-list',
      icon: icons.DollarOutlined
    }
  ]
};

export default pages;
