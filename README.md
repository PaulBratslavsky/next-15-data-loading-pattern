## Exploring Data Loading Strategies in Next.js 15 

In this post, we'll explore an elegant and type-safe pattern for loading and rendering data in React Server Components, using a real-world example. This pattern provides excellent separation of concerns, error handling, and component reusability.

## The Pattern Overview

The pattern consists of three main parts:
1. A loader component that handles data fetching on the server
2. A presentation component that renders the data fetched by the loader on client.
3. A composition layer that brings them together

Let's break down why this pattern is effective.

## The Resource Loader Component

```typescript
async function loader() {
  const resources = await getResources();
  return resources?.data ?? [];
}

export async function ResourceLoader({ component }: ResourceLoaderProps) {
  try {
    const resources = await loader();
    const Component = component;
    // ... error handling and rendering
  } catch (error) {
    return (
      <ThrowClientError
        error={error instanceof Error ? error : new Error(String(error))}
      />
    );
  }
}
```

The `ResourceLoader` component is responsible for:
- Data fetching through a dedicated loader function
- Error handling
- Rendering the provided component with the fetched data

### Key Benefits:
1. **Separation of Concerns**: The loader component doesn't know anything about how the data will be displayed
2. **Reusability**: The same loader can be used with different presentation components
3. **Error Handling**: Centralized error handling using the `ThrowClientError` component
4. **Type Safety**: Through the use of TypeScript interfaces and props validation

## The Presentation Component

```typescript
const ResourceCard = ({ documentId, type, content }: ResourceProps) => {
  return (
    <Card className="h-[250px]">
      <CardHeader>
        <CardTitle className="text-lg">{documentId}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px]">
          <p className="text-sm text-muted-foreground">
            {type === "youtube" ? "Video Resource" : "Text Resource"}
          </p>
          <p className="mt-2">{content}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
```

The presentation component (`ResourceCard`) is:
- Purely focused on rendering
- Strongly typed with `ResourceProps`
- Completely unaware of how its data is loaded

## Why This Pattern Is Effective

### 1. Server Component Optimization
By using async Server Components, we can:
- Fetch data directly on the server
- Reduce client-side JavaScript
- Improve initial page load performance

### 2. Composability
```typescript
const renderResource = (props: ResourceProps) => <ResourceCard {...props} />;

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <ResourceLoader component={renderResource} />
    </div>
  );
}
```

The pattern allows for easy composition where:
- The page component orchestrates the connection between loader and presentation
- Components can be swapped out easily
- The rendering logic remains flexible

### 3. Error Boundary Integration

```typescript
export function ThrowClientError({ error }: { error: Error }) {
  useEffect(() => {
    throw error
  }, [error])
}
```

The pattern includes built-in error handling that:
- Properly propagates errors to React's error boundary system
- Ensures errors are handled gracefully
- Maintains a good user experience even when things go wrong

## Best Practices This Pattern Demonstrates

1. **Single Responsibility Principle**: Each component has one clear purpose
2. **Dependency Injection**: The presentation component is injected into the loader
3. **Error Handling**: Comprehensive error management strategy
4. **Type Safety**: Strong TypeScript typing throughout the system
5. **Scalability**: Easy to add new resource types or modify existing ones

## When to Use This Pattern

This pattern is particularly effective when:
- You need to reuse the same data loading logic with different presentations
- You want to maintain clear separation between data fetching and rendering
- You're building a server-rendered React application
- You need robust error handling
- You want to keep your components maintainable and testable

## Conclusion

This data loading pattern provides a robust foundation for building scalable React applications. It leverages the power of Server Components while maintaining clean separation of concerns and type safety. The pattern is particularly valuable in larger applications where data loading patterns need to be consistent and maintainable.

By separating the concerns of data loading, error handling, and presentation, we create more maintainable and testable code that's easier to reason about and modify as requirements change.

Remember, the key to this pattern's success is its clear separation of responsibilities and the flexibility it provides in composing components together.

## Getting Started

1. Clone the repository
   
2. Install dependencies:
   
```bash
yarn setup && yarn seed
```

3. Run the development server:
```bash
yarn dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:1337](http://localhost:1337) to see the Strapi admin panel.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
