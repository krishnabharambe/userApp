import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import './../styles/nprogress.css';
import './../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { wrapper } from '../store/store';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete', NProgress.done);
    Router.events.on('routeChangeError', NProgress.done);
  }, []);

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export default wrapper.withRedux(MyApp);
