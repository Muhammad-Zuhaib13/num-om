import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { ProfileOutlined, LogoutOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Modals } from 'components/modals';
import { clearUser } from 'store/reducers/auth';
import { useDispatch } from 'store';
// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

// interface Props {
//   handleLogout: () => void;
// }

const ProfileTab = ({ handleLogout, handleToggle }: any) => {
  const dispatch = useDispatch();
  const logutAdmin = () => {
    dispatch(clearUser());
  }
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
  };
  const [modalFlags, setModalFlag] = useState({
    viewAccountDetails: false,
    changePasswordModal: false,
    logoutBox: false
  });
  const updateModalFlag = (key: string, value: boolean) => {
    setModalFlag((prevFlags) => ({
      ...prevFlags,
      [key]: value
    }));
  };
  const handleAccountSettings = () => {
    updateModalFlag('viewAccountDetails', true);
  };
  const handleAccountLogout = () => {
    updateModalFlag('logoutBox', true);
  };
  const handleChangePassword = () => {
    updateModalFlag('changePasswordModal', true);
  };
  const listItemButtonStyle = {
    padding: '8px 18px !important',
    height: '50px !important'
  };

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton
          selected={selectedIndex === 1}
          sx={listItemButtonStyle}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            handleAccountSettings();
            handleListItemClick(event, 1);
          }}
        >
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            handleChangePassword();
            handleListItemClick(event, 2);
          }}
        >
          <ListItemIcon>
            <LockOutlined />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItemButton>
        <ListItemButton
          sx={listItemButtonStyle}
          selected={selectedIndex === 3}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            handleAccountLogout();
            handleListItemClick(event, 3);
          }}
        >
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      <Modals.AccountSettingModal modalFlags={modalFlags} updateModalFlag={updateModalFlag} handleToggle={handleToggle} />
      <Modals.ChangePasswordModal modalFlags={modalFlags} updateModalFlag={updateModalFlag} handleToggle={handleToggle} />
      <Modals.LogoutModal
        modalFlags={modalFlags}
        updateModalFlag={updateModalFlag}
        handleToggle={handleToggle}
        handleLogout={handleLogout}
        logutAdmin={logutAdmin}
      />
    </>
  );
};

export default ProfileTab;
