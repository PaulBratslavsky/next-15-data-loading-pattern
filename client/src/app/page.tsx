import { ResourceLoader } from "@/components/data-loaders/resource-loader";

import { renderResourceCard } from "@/components/custom/resource-card";
import { renderResourceCardClient } from "@/components/custom/resource-card-client";
import { renderResourcePostCard } from "@/components/custom/resource-post-card";

export default function HomeRoute() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceLoader component={renderResourceCard} path="resources" />
        <ResourceLoader component={renderResourcePostCard} path="posts" />
        <ResourceLoader component={renderResourceCardClient} path="resources" />
      </div>
    </div>
  );
}
