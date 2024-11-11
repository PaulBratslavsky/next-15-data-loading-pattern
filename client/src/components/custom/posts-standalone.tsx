import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getResources } from "@/data/loaders";
import Link from "next/link";

async function loader(path: string, query?: Record<string, string>) {
  const resources = await getResources(path, query);
  return resources?.data ?? [];
}

export const ResourcePostCard = async () => {
  const resources = await loader("posts");
  return (
    <div>
      {resources.map((resource: any, index: number) => {
        const { documentId, title, slug, content, createdAt } = resource;
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
      })}
    </div>
  );
};
