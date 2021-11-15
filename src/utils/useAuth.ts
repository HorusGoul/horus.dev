import { supabase } from '@/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [session, setSession] = useState<Session | null | 'loading'>(() =>
    supabase.auth.session(),
  );
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      data?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    let mounted = true;

    async function callApiAuth() {
      try {
        await fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event: 'SIGNED_IN', session }),
        }).then((res) => res.json());

        if (!mounted) {
          return;
        }

        setCookie(true);
      } catch {
        return;
      }
    }

    callApiAuth();

    return () => {
      mounted = false;
    };
  }, [session]);

  return [session, cookie];
}
