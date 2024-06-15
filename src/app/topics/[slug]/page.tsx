/** @format */

import PostList from "@/app/components/posts/post-list";
import { fetchPostsByTopicSLug } from "@/app/db/queries/posts";
interface TopicShowPageProps {
  params: {
    slug: string;
  };
}
import PostCreateForm from "@/app/components/posts/create-form";
export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  return (
    <div className=" grid grid-cols-4 gap-4 p-4">
      <div className=" col-span-3">
        <h1 className=" text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSLug(slug)}></PostList>
      </div>
      <div>
        <PostCreateForm slug={slug}></PostCreateForm>
      </div>
    </div>
  );
}
