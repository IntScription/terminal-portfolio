import { GithubIcon, InstagramIcon, YoutubeIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/50 py-12 dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 text-foreground/70">
          <a
            href="https://github.com/IntScription"
            target="_blank"
            rel="noreferrer"
            className="transition duration-150 hover:scale-110 hover:text-foreground hover:drop-shadow-[0_0_10px_rgba(125,207,255,0.35)]"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="transition duration-150 hover:scale-110 hover:text-foreground hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.25)]"
            aria-label="YouTube"
          >
            <YoutubeIcon size={20} />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="transition duration-150 hover:scale-110 hover:text-foreground hover:drop-shadow-[0_0_10px_rgba(255,121,198,0.25)]"
            aria-label="Instagram"
          >
            <InstagramIcon size={20} />
          </a>
        </div>

        <div>
          <p className="font-medium text-foreground">Kartik Sanil</p>
          <p className="mt-1 text-sm text-foreground/65">
            full stack development, game dev, ui/ux, systems-driven products.
          </p>
        </div>
      </div>
    </footer>
  );
}
