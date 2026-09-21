import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  views: number;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number
  }
  userId: number
}

export default function PostDetail({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation quay lại danh sách */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mb-6 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách
        </Link>

        {/* Nội dung chính bài viết */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Thông tin Tác giả & Views */}
          <div className="p-6 sm:p-8 pb-4 border-b border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                  U{post.userId}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">Tác giả #{post.userId}</h4>
                  <p className="text-xs text-gray-400">Bài viết #{post.id}</p>
                </div>
              </div>

              <span className="flex items-center text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views?.toLocaleString()} lượt xem
              </span>
            </div>

            {/* Tiêu đề */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-2 mb-4">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Body bài viết */}
          <div className="p-6 sm:p-8 text-gray-700 text-lg leading-relaxed whitespace-pre-line border-b border-gray-100">
            {post.body}
          </div>

          {/* Chỉ số Likes / Dislikes */}
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white text-gray-700 border border-gray-200">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
                </svg>
                <span>{post.reactions?.likes}</span>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white text-gray-700 border border-gray-200">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
                </svg>
                <span>{post.reactions?.dislikes}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}