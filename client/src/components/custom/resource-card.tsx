import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceProps {
  readonly documentId: string;
  readonly type: "youtube" | "text";
  readonly content: string;
}



export const ResourceCard = ({ documentId, type, content }: ResourceProps) => {
  return (
    <Card className="h-[250px] bg-pink-200">
      <CardHeader>
        <CardTitle className="text-lg">{documentId}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px]">
          <p className="text-sm text-muted-foreground">
            {type === "youtube" ? "Video Resource" : "Text Resource"}
          </p>
          <p className="mt-2">{content}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const renderResourceCard = (props: ResourceProps) => <ResourceCard {...props} />;
