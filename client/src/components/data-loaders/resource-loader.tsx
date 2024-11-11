import React, { Suspense } from "react";
import { getResources } from "@/data/loaders";
import { ThrowClientError } from "@/components/custom/throw-client-error";

async function loader(path: string, query?: Record<string, string>) {
  const resources = await getResources(path, query);
  console.log(resources, "resources");
  return resources?.data ?? [];
}

interface ResourceLoaderProps {
  readonly component: React.ElementType;
  readonly path: string;
  readonly query?: Record<string, string>;
}

export async function ResourceLoader({ component, path, query }: ResourceLoaderProps) {
  const Component = component;
  if (!Component) throw new Error("Component is required");
  if (!path) throw new Error("Path is required");

  try {
    const resources = await loader(path, query);

    if (resources.length === 0) return <>No resources found</>;

    return <Suspense fallback={<div>Loading...</div>}>
      {resources.map((resource: any) => (
        <Component key={resource.id} {...resource} />
      ))}
    </Suspense>;
    
  } catch (error) {
    return (
      <ThrowClientError
        error={error instanceof Error ? error : new Error(String(error))}
      />
    );
  }
}
