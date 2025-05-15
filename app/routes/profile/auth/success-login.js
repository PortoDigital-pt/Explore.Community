import React from 'react';
import { useRouter } from 'found';
import getContext from 'recompose/getContext';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { shape } from 'prop-types';
import LoadingPage from '../../../component/LoadingPage';
import { userShape } from '../../../util/shapes';

const Page = props => {
  const { router } = useRouter();
  const { user } = props;

  if (user.name) {
    router.replace('/profile');
  }

  return <LoadingPage />;
};

Page.propTypes = {
  user: shape(userShape)
};

const SuccessLogin = connectToStores(
  getContext()(Page),
  ['UserStore'],
  context => ({
    user: context.getStore('UserStore').getUser()
  })
);

export default SuccessLogin;
