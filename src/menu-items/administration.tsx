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

const administration: NavItemType = {
    id: 'system-config',
    title: <FormattedMessage id="Administration" />,
    icon: icons.AppstoreAddOutlined,
    type: 'group',
    children: [
      {
        id: 'sysConfigs',
        title: <FormattedMessage id="Administration" />,
        type: 'collapse',
        icon: icons.CustomerServiceOutlined,
        children: [
          {
            id: 'adminEntityList',
            title: <FormattedMessage id="Entity List" />,
            type: 'item',
            url: '/administration/entity-list'
          },
          {
            id: 'adminCreateEntity',
            title: <FormattedMessage id="Create Entity" />,
            type: 'item',
            url: '/administration/create-entity'
          },
          {
            id: 'adminUserList',
            title: <FormattedMessage id="User List" />,
            type: 'item',
            url: '/administration/user-list'
          },
          {
            id: 'adminCreateUser',
            title: <FormattedMessage id="Create User" />,
            type: 'item',
            url: '/administration/create-user'
          },
          {
            id: 'adminManageEntity',
            title: <FormattedMessage id="Manage Entity Group" />,
            type: 'item',
            url: '/administration/manage-entity-group'
          },
          {
            id: 'adminGroupEntityMaping',
            title: <FormattedMessage id="Group-Entity Mapping" />,
            type: 'item',
            url: '/administration/group-entity-mapping'
          },
          {
            id: 'adminSalesPersonList',
            title: <FormattedMessage id="Sales Person List" />,
            type: 'item',
            url: '/administration/sales-person-list'
          },
          {
            id: 'adminCreateSalesPerson',
            title: <FormattedMessage id="Create sales Person" />,
            type: 'item',
            url: '/administration/create-sales-person'
          },
          {
            id: 'adminSalesPersonEntityMaping',
            title: <FormattedMessage id="Sales Person Entity Maping" />,
            type: 'item',
            url: '/administration/sales-person-entity-maping'
          }
        ]
      }
    ]
  };
  
  export default administration;
  