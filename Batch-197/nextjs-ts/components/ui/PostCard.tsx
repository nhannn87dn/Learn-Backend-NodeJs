import Link from "next/link";

type Post = {
  id: number;
  title: string;
  views: number;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number
  },
  userId: number
}
// Component hiển thị 1 thẻ bài viết
const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6 flex flex-col justify-between">
      <div>
        {/* Header: User ID & Views */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-50 text-indigo-600 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              {/* User Icon */}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Tác giả #{post.userId}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            {/* Eye Icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{post.views.toLocaleString()} lượt xem</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h2>

        {/* Body */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.body}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Reactions & Action */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm">
          {/* Likes */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
            </svg>
            <span className="font-semibold">{post.reactions.likes}</span>
          </button>

          {/* Dislikes */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
            </svg>
            <span className="font-semibold">{post.reactions.dislikes}</span>
          </button>
        </div>

        {/* Read More */}
        <Link href={`/blog/${post.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1 transition-colors">
          Đọc tiếp 
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard