import { supabase } from '@/supabaseClient';
import { GetServerSideProps } from 'next';
import { User } from '@supabase/supabase-js';

interface DashboardProps {
  user: User;
  posts: PostRow[];
}

interface PostRow {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(context.req);

  if (error || !user) {
    return {
      redirect: { destination: '/admin', permanent: false },
    };
  }

  const posts = await supabase.from<PostRow>('posts');

  return { props: { user, posts: posts.body ?? [] } };
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
