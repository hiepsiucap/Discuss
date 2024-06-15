/** @format */

import type { Post } from "@prisma/client";

interface PostShowProps {
  post: Post;
}

export default async function PostShow({ post }: PostShowProps) {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
