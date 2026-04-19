import { HomeHero } from "@/components/home/home-hero";
import { WorkspacePanels } from "@/components/home/workspace-panels";
import { FeaturedProjectsStrip } from "@/components/home/featured-projects-strip";
import { BlogPreviewStrip } from "@/components/home/blog-preview-strip";
import GradualBlur from "@/components/reactbits/gradual-blur";

export default function HomePage() {
  return (
    <main className="relative">
      <HomeHero />
      <WorkspacePanels />
      <FeaturedProjectsStrip />
      <BlogPreviewStrip />

      <GradualBlur
        target="page"
        position="bottom"
        height="4.5rem"
        strength={0.8}
        divCount={4}
        curve="bezier"
        opacity={0.3}
        stopAtPageEnd
        fadeDistance={140}
      />
    </main>
  );
}
