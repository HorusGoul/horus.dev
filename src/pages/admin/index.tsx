import Auth from '@/components/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/utils/useAuth';
import { createGetServerSideProps } from '@/utils/ssr';
import { authGuard } from '@/utils/auth-guard';
import AdminContainer from '@/components/admin-container';
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
  const session = useAuth();

  useEffect(() => {
    if (session) {
      router.replace('/admin/dashboard');
    }
  }, [session, router]);

  if (session === 'loading') {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        Loading...
      </>
    );
  }

  if (!session) {
    return (
      <AdminContainer>
        <Auth />
      </AdminContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
    </>
  );
}

export default Admin;
