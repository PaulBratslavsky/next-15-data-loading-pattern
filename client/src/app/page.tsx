import { ResourceLoader } from "@/components/data-loaders/resource-loader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceProps {
  readonly documentId: string;
  readonly type: "youtube" | "text";
  readonly content: string;
}

const ResourceCard = ({ documentId, type, content }: ResourceProps) => {
  return (
    <Card className="h-[250px]">
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

const renderResource = (props: ResourceProps) => <ResourceCard {...props} />;

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceLoader component={renderResource} />
      </div>
    </div>
  );
}
