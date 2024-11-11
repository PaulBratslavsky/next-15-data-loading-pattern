'use client';

import { ResourcePostCard } from '@/components/custom/resource-post-card';
import { getResources } from '@/data/loaders';
import React, { useEffect, useState } from 'react'

export default function PostsRoute() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const resources = await getResources("posts");
      setResources(resources?.data ?? []);
    };

    fetchResources();
  }, []);

  return (
    <div>
      {resources.map((resource: any, index: number) => (
        <ResourcePostCard key={index} {...resource} />
      ))}
    </div>
  )
}
