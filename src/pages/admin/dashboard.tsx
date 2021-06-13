import { User } from '@supabase/supabase-js';
import { Post } from '.prisma/client';
import prisma from '@/prisma';
import Link from 'next/link';
import { authGuard } from '@/utils/auth-guard';
import { createGetServerSideProps } from '@/utils/ssr';
import { getPostCardDetails, getPostState } from '@/utils/post';
import PostStatePill from '@/components/post-state-pill';
import PostCard from '@/components/post-card';
import SubpageContainer from '@/components/subpage-container';
import { useAuth } from '@/utils/useAuth';
import Head from 'next/head';

interface DashboardProps {
  user: User;
  posts: Post[];
}

export const getServerSideProps = createGetServerSideProps<DashboardProps>(
  async (context) => {
    const user = await authGuard(context);
    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return { props: { user, posts } };
  },
);

function Dashboard({ posts }: DashboardProps) {
  useAuth();

  return (
    <SubpageContainer>
      <Head>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <title>🛠️ Dashboard</title>
      </Head>
      <header className="p-4 flex items-center w-full">
        <h1 className="text-3xl">Posts</h1>

        <Link href="/admin/post/new">
          <a
            className="ml-auto px-8 py-2 bg-green-500 text-white 
      rounded-full font-bold flex items-center transition-opacity 
      hover:opacity-90 active:opacity-70"
          >
            Create new post
          </a>
        </Link>
      </header>

      <div className="py-4 p grid -mx-6 gap-4 xsm:gap-8 sm:mx-0 md:pt-6">
        {posts.map((post) => {
          const state = getPostState(post);
          const details = getPostCardDetails(post);

          return (
            <PostCard
              key={post.id}
              title={post.title}
              href={`/admin/post/${post.id}`}
              details={
                <div className="inline-flex">
                  <PostStatePill state={state} />
                  <span className="ml-4">{details}</span>
                </div>
              }
            />
          );
        })}
      </div>
    </SubpageContainer>
  );
}

export default Dashboard;
