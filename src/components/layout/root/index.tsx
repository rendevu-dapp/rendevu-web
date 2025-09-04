// react
import { FC, Fragment, PropsWithChildren } from 'react';

// layout components
import Navbar from './navigation';
import Footer from './footer';
import ProfileSetupNotification from '@/components/shared/profile-setup-notification';

export const AppRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <ProfileSetupNotification />
      {children}
      <Footer />
    </Fragment>
  );
};
