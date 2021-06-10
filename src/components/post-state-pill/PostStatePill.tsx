import { PostState } from '@/utils/post';

interface PostStatePillProps {
  state: PostState;
}

const bgColorMap: Record<PostState, string> = {
  draft: 'bg-gray-700',
  scheduled: 'bg-orange-600',
  published: 'bg-green-600',
};

function PostStatePill({ state }: PostStatePillProps) {
  return (
    <div
      className={`px-4 py-1 w-24 text-center font-semibold ${bgColorMap[state]} text-white rounded-full text-sm`}
    >
      {state}
    </div>
  );
}

export default PostStatePill;
