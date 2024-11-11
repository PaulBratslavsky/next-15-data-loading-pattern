Not sure how I feel about this.

```jsx

import { ResourceLoader } from "@/components/data-loaders/resource-loader";

import { renderResourceCard } from "@/components/custom/resource-card";
import { renderResourceCardClient } from "@/components/custom/resource-card-client";
import { renderResourcePostCard } from "@/components/custom/resource-post-card";

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

const ResourceCardLoader = () => <ResourceLoader<Resource> component={renderResourceCard} path="resources" />
const ResourceCardClientLoader = () => <ResourceLoader<Resource> component={renderResourceCardClient} path="resources" />
const ResourcePostLoader = () => <ResourceLoader<ResourcePost> component={renderResourcePostCard} path="posts" />

export default function HomeRoute() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceCardLoader />
        <ResourceCardClientLoader />
        <ResourcePostLoader />
      </div>
    </div>
  );
}
```
