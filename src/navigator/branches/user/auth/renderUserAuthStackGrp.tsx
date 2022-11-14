import React from 'react';
import { UserStack } from '../UserStackNav';
import UserResetPwScrn from '../../../../screens/user/auth/UserResetPwScrn';
import UserSignInScrn from '../../../../screens/user/auth/UserSignInScrn';
import UserSignUpScrn from '../../../../screens/user/auth/UserSignUpScrn';

const renderUserAuthStackGrp = () => (
    <>
      <UserStack.Screen name="UserSignInScrn" component={UserSignInScrn} />
      <UserStack.Screen name="UserSignUpScrn" component={UserSignUpScrn} />
      <UserStack.Screen name="UserResetPwScrn" component={UserResetPwScrn} />
    </>
  );

export default renderUserAuthStackGrp;
