/** @format */
import { redirect } from "next/navigation";
import PostList from "../components/posts/post-list";
import { fetchPostsBySearchTerm } from "../db/queries/posts";
interface searchPageProps {
  searchParams: {
    term: string;
  };
}
export default async function SearchPage({ searchParams }: searchPageProps) {
  const { term } = searchParams;
  if (!term) {
    redirect("/");
  }
  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)}></PostList>
    </div>
  );
}
