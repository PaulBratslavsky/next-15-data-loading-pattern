'use client'

import { useEffect } from 'react'

export function ThrowClientError({ error }: { error: Error }) {
  useEffect(() => {
    throw error
  }, [error])

  return null
}
