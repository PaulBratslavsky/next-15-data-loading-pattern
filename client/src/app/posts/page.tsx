import { ResourcePostCard } from '@/components/custom/resource-post-card';
import { getResources } from '@/data/loaders';
import React from 'react'

async function loader(path: string, query?: Record<string, string>) {
  const resources = await getResources(path, query);
  return resources?.data ?? [];
} 

export default async function PostsRoute() {
  const resources = await loader("posts");
  return (
    <div>
      {resources.map((resource: any, index: number  ) => (
        <ResourcePostCard key={index} {...resource} />
      ))}
    </div>
  )
}
