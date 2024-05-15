import { ReactElement } from 'react';
import Layout from 'layout';
import UsersTable from 'pages/tables/users-table';
const Users = () => {
  return (
    <>
      <UsersTable />
    </>
  );
};

Users.getLayout = function getLayout(page: ReactElement) {
  return <Layout paddingX={false}>{page}</Layout>;
};

export default Users;
