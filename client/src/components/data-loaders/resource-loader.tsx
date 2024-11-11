import { Suspense } from 'react';
import { getResources } from "@/data/loaders";

interface ResourceLoaderProps<T> {
  component: React.ComponentType<T>;
  path: string;
  query?: Record<string, string>;
  loadingComponent?: React.ComponentType;
}

async function ResourceList<T>({ component: Component, path, query }: ResourceLoaderProps<T>) {
  const resources = await getResources(path, query);
  const data = resources?.data ?? [] as T[];

  if (data.length === 0) return <p>No resources found</p>;

  return (
    <>
      {data.map((resource: T) => (
        <Component key={(resource as any).id} {...resource} />
      ))}
    </>
  );
}

  export function ResourceLoader<T>(props: ResourceLoaderProps<T>) {
  const LoadingComponent = props?.loadingComponent;
  return (
    <Suspense fallback={LoadingComponent ? <LoadingComponent /> : "loading..."}>
      <ResourceList<T> {...props} />
    </Suspense>
  );
}