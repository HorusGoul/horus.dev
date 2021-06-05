import Auth from '@/components/auth';
import { supabase } from '@/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Admin() {
  const [session, setSession] = useState<Session | null | 'loading'>('loading');
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json());
    });

    return () => {
      data?.unsubscribe();
    };
  }, []);

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
