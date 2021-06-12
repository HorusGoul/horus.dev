import { supabase } from '@/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [session, setSession] = useState<Session | null | 'loading'>('loading');

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

  return session;
}
