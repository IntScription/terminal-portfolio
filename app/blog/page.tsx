import Particles from "@/components/reactbits/particles";
import { getAllBlogs } from "@/lib/content/blog";
import { BlogList } from "@/components/blog/blog-list";
import { BackLink } from "@/components/ui/back-link";

export default function BlogPage() {
  const posts = getAllBlogs();

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-52">
        <Particles
          particleColors={["#8FD3FF", "#B497CF", "#FFFFFF"]}
          particleCount={105}
          particleSpread={9}
          speed={0.05}
          particleBaseSize={70}
          moveParticlesOnHover={false}
          alphaParticles
          disableRotation={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <BackLink href="/" label="Back to home" />

        <div className="mb-10 mt-4 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            blog
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Notes on building, interfaces, and learning in public.
          </h1>

          <p className="mt-4 text-base leading-8 text-foreground/72">
            Writing about projects, process, systems, design choices, and lessons learned along the way.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
