import React from 'react';
import { useRouter } from 'found';
import getContext from 'recompose/getContext';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { func, shape } from 'prop-types';
import LoadingPage from '../../../component/LoadingPage';
import { userShape } from '../../../util/shapes';
import setUser from '../../../action/userActions';

const Page = props => {
  const { router } = useRouter();
  const { user, executeAction } = props;

  if (!user.notLogged) {
    executeAction(setUser, { notLogged: true });
  }

  if (user.notLogged === true) {
    router.replace('/');
  }

  return <LoadingPage />;
};

Page.propTypes = {
  user: shape(userShape),
  executeAction: func.isRequired
};

const SuccessLogout = connectToStores(
  getContext({
    executeAction: func.isRequired
  })(Page),
  ['UserStore'],
  context => ({
    user: context.getStore('UserStore').getUser()
  })
);

export default SuccessLogout;
