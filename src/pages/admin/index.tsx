import Auth from '@/components/auth';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/utils/useAuth';
import { createGetServerSideProps } from '@/utils/ssr';
import { authGuard } from '@/utils/auth-guard';
import SubpageContainer from '@/components/subpage-container';
import Head from 'next/head';

export const getServerSideProps = createGetServerSideProps(async (context) => {
  const user = await authGuard(context).catch(() => null);

  if (user) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

function Admin() {
  const router = useRouter();
  const [session, cookie] = useAuth();

  useEffect(() => {
    if (cookie) {
      router.replace('/admin/dashboard');
    }
  }, [cookie, router]);

  if (session === 'loading') {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <meta name="robots" content="noindex" />
        </Head>
        Loading...
      </>
    );
  }

  if (!session) {
    return (
      <SubpageContainer>
        <Auth />
      </SubpageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Loading...</title>
        <meta name="robots" content="noindex" />
      </Head>
    </>
  );
}

export default Admin;
