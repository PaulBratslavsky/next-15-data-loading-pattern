"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ResourceProps {
  readonly documentId: string;
  readonly type: "youtube" | "text";
  readonly content: string;
}

export const ResourceCardClient = ({ documentId, type, content }: ResourceProps) => {
  return (
    <Card className="h-[250px] bg-indigo-300">
      <CardHeader>
        <CardTitle className="text-lg">{documentId}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[100px]">
          <p className="text-sm text-muted-foreground">
            {type === "youtube" ? "Video Resource" : "Text Resource"}
          </p>
          <p className="mt-2">{content}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => {
            alert("Button Clicked");
          }}
        >
          Click me
        </Button>
      </CardFooter>
    </Card>
  );
};

export const renderResourceCardClient = (props: ResourceProps) => (
  <ResourceCardClient {...props} />
);
