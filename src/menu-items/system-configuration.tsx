// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined
};


// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const systemConfiguration: NavItemType = {
    id: 'system-config',
    title: <FormattedMessage id="SysConfig" />,
    icon: icons.AppstoreAddOutlined,
    type: 'group',
    children: [
      {
        id: 'sysConfigs',
        title: <FormattedMessage id="System Configuration" />,
        type: 'collapse',
        icon: icons.CustomerServiceOutlined,
        children: [
          {
            id: 'sysCongifLogs',
            title: <FormattedMessage id="logs" />,
            type: 'item',
            url: '/system-configuration/logs'
          },
          {
            id: 'sysConfigHistory',
            title: <FormattedMessage id="history" />,
            type: 'item',
            url: '/system-configuration/history'
          }
        ]
      }
    ]
  };
  
  export default systemConfiguration;
  