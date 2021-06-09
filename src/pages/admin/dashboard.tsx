import { supabase } from '@/supabaseClient';
import { GetServerSideProps } from 'next';
import { User } from '@supabase/supabase-js';
import { Post } from '.prisma/client';
import prisma from '@/prisma';
import Link from 'next/link';

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
    <div className="flex flex-col">
      {user.email}

      <header className="flex justify-between">
        <h1 className="text-3xl">Posts</h1>

        <Link href="/admin/post/new">
          <a
            className="px-8 py-2 bg-green-500 text-white 
              rounded-full font-bold flex items-center transition-opacity 
              hover:opacity-90 active:opacity-70"
          >
            Create new post
          </a>
        </Link>
      </header>

      <pre>
        <code>{JSON.stringify(posts, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Dashboard;
