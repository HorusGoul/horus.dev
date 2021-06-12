import Auth from '@/components/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/utils/useAuth';

function Admin() {
  const router = useRouter();
  const session = useAuth();

  useEffect(() => {
    if (session) {
      router.replace('/admin/dashboard');
    }
  }, [session, router]);

  if (session === 'loading') {
    return <>Loading...</>;
  }

  if (!session) {
    return <Auth />;
  }

  return null;
}

export default Admin;
