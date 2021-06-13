import { supabase } from '@/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [session, setSession] = useState<Session | null | 'loading'>('loading');
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      data?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event: 'SIGNED_IN', session }),
    })
      .then((res) => res.json())
      .then(() => setCookie(true));
  }, [session]);

  return [session, cookie];
}
