import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface ResourceProps {
  readonly documentId: string;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly createdAt: string;

}

import { ResourcePostCard as PostStandalone } from "@/components/custom/posts-standalone";


export const ResourcePostCard = ({ documentId, title, slug, content, createdAt }: ResourceProps) => {
  return (
    <Card className="h-[250px] bg-blue-300" key={documentId}>
      <CardHeader>
        <CardTitle className="text-lg">
          <Link
            href={`/posts/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px]">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span>Posted: {createdAt}</span>
            <span>•</span>
          </p>
          <p className="mt-2">{content}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const renderResourcePostCard = (props: ResourceProps) => <ResourcePostCard {...props} />;
