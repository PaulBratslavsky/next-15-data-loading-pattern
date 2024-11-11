import { Suspense } from 'react';
import { getResources } from "@/data/loaders";

interface Resource {
  readonly id: string;
  readonly documentId: string;
}

interface ResourceLoaderProps<T extends Resource> {
  component: React.ComponentType<T>;
  path: string;
  query?: Record<string, string>;
}

async function ResourceList<T extends Resource>({ component: Component, path, query }: ResourceLoaderProps<T>) {
  const resources = await getResources(path, query);
  const data = resources?.data ?? [];

  if (data.length === 0) return <p>No resources found</p>;

  return (
    <>
      {data.map((resource: T) => (
        <Component key={resource.id} {...resource} />
      ))}
    </>
  );
}

export function ResourceLoader<T extends Resource>(props: ResourceLoaderProps<T>) {
  return (
    <Suspense fallback={<div>Loading resources...</div>}>
      <ResourceList {...props} />
    </Suspense>
  );
}