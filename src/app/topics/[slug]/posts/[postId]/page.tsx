/** @format */

import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/app/db";
import PostShow from "@/app/components/posts/post-show";
import CommentList from "@/app/components/comments/comment-list";
import PostShowLoading from "@/app/components/posts/post-show.loading";
import CommentCreateForm from "@/app/components/comments/comment-create-form";
import { paths } from "@/path";
import { Suspense } from "react";
interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  const post = await db.post.findUnique({
    where: { id: postId },
  });

  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShowPath(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading></PostShowLoading>}>
        <PostShow post={post} />
      </Suspense>
      <CommentCreateForm postId={postId} />
      <CommentList comments={comments} />
    </div>
  );
}

export async function generateStaticParams() {
  const topics = await db.topic.findMany({
    include: { posts: { select: { id: true } } },
  });

  return topics.flatMap((topic) => {
    return topic.posts.map((post) => {
      return {
        postId: post.id,
        slug: topic.slug,
      };
    });
  });
}
