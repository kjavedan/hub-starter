import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Boilerplate
            </p>
            <div className="space-y-1">
              <h1 className="font-serif text-4xl text-foreground">Hub-Starter</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Your new full-stack turborepo starter. Everything is configured and ready to go!
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <article className="prose prose-sm dark:prose-invert">
          <h3>Features Included:</h3>
          <ul>
            <li>Next.js App Router & Server Components</li>
            <li>Tailwind CSS v4 + Custom Design Tokens</li>
            <li>ts-rest for type-safe API contracts</li>
            <li>Prisma ORM with Postgres</li>
            <li>Turborepo for fast monorepo builds</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
