import { supabase } from '@/supabaseClient';
import { GetServerSideProps } from 'next';
import { User } from '@supabase/supabase-js';
import { Post } from '.prisma/client';
import prisma from '@/prisma';

interface DashboardProps {
  user: User;
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(context.req);

  if (error || !user) {
    return {
      redirect: { destination: '/admin', permanent: false },
    };
  }

  const posts = await prisma.post.findMany();

  return { props: { user, posts } };
};

function Dashboard({ user, posts }: DashboardProps) {
  return (
    <>
      {user.email}

      <pre>
        <code>{JSON.stringify(posts, null, 2)}</code>
      </pre>
    </>
  );
}

export default Dashboard;
