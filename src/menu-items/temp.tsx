// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ChromeOutlined, DeploymentUnitOutlined, DollarOutlined, QuestionOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined,
  DollarOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support: NavItemType = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: <FormattedMessage id="login" />,
      type: 'item',
      url: '/auth/login',
      icon: icons.ChromeOutlined
    },
   
  ]
};

export default support;
