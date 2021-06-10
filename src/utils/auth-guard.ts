import { GetServerSidePropsContext } from 'next';
import { supabase } from '@/supabaseClient';
import { User } from '@supabase/gotrue-js';
import { RedirectResult } from './ssr';

export async function authGuard(
  context: Pick<GetServerSidePropsContext, 'req'>,
): Promise<User> {
  const { user, error } = await supabase.auth.api.getUserByCookie(context.req);

  if (error || !user) {
    throw new RedirectResult({ destination: '/admin', permanent: false });
  }

  return user;
}
