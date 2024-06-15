/** @format */

import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/app/db";
import { paths } from "@/path";
export default async function ListOfTopic() {
  const topics = await db.topic.findMany();
  const renderedTopic = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShowPath(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });
  return <div className=" flex flex-row gap-2 flex-wrap">{renderedTopic}</div>;
}
