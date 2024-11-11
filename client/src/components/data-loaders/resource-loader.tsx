import React from "react";
import { getResources } from "@/data/loaders";
import { ThrowClientError } from "@/components/custom/throw-client-error";

async function loader() {
  const resources = await getResources();
  console.log(resources, "resources");
  return resources?.data ?? [];
}

interface ResourceLoaderProps {
  readonly component: React.ElementType;
}

export async function ResourceLoader({ component }: ResourceLoaderProps) {
  try {
    const resources = await loader();
    const Component = component;

    if (!Component) throw new Error("Component is required");
    if (resources.length === 0) return <>No resources found</>;

    return resources.map((resource: any) => (
      <Component key={resource.id} {...resource} />
    ));
  } catch (error) {
    return (
      <ThrowClientError
        error={error instanceof Error ? error : new Error(String(error))}
      />
    );
  }
}
