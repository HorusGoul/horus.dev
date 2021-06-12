import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { supabase } from '@/supabaseClient';
import { User } from '@supabase/gotrue-js';
import { endApiHandler, RedirectResult } from './ssr';

export async function authGuard(
  context: Pick<GetServerSidePropsContext, 'req'>,
): Promise<User> {
  const { user, error } = await supabase.auth.api.getUserByCookie(context.req);

  if (error || !user) {
    throw new RedirectResult({ destination: '/admin', permanent: false });
  }

  return user;
}

export async function apiAuthGuard(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<User> {
  const { user, error } = await supabase.auth.api.getUserByCookie(req);

  if (error || !user) {
    res.status(403).send({ message: 'Unauthorized' });
    throw endApiHandler();
  }

  return user;
}
