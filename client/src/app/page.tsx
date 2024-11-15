import { Spinner } from "@/components/ui/Spinner";

import { ResourceLoader } from "@/components/data-loaders/resource-loader";

import { renderResourceCard } from "@/components/custom/resource-card";
import { renderResourceCardClient } from "@/components/custom/resource-card-client";
import { renderResourcePostCard } from "@/components/custom/resource-post-card";

function renderSpinner({ height = "250px" }: { height?: string }) {
  return <Spinner height={height} />;
}

interface Resource {
  readonly id: string;
  readonly documentId: string;
  readonly type: "text" | "youtube";
  readonly content: string;
}

interface ResourcePost {
  readonly id: string;
  readonly documentId: string;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly createdAt: string;
}

export default function HomeRoute() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceLoader<Resource>
          path="resources"
          component={renderResourceCard}
        />
        <ResourceLoader<Resource>
          path="resources"
          component={renderResourceCardClient}
          loadingComponent={renderSpinner}
        />
        <ResourceLoader<ResourcePost>
          path="posts"
          component={renderResourcePostCard}
        />
      </div>
    </div>
  );
}
