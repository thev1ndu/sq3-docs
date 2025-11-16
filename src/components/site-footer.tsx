export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-3 sm:px-4">
      <div className="screen-line-before mx-auto pt-5 sm:pt-6 md:max-w-3xl md:border-x md:border-edge">
        {/* Author credit */}
        <p className="mb-6 px-4 text-center font-mono text-xs [overflow-wrap:anywhere] break-words text-muted-foreground sm:text-sm">
          Developed by{" "}
          <a
            className="link"
            href="https://linkedin.com/company/sequence3"
            target="_blank"
            rel="noopener"
          >
            Sequence3®
          </a>
        </p>
      </div>
      {/* Safe area fix */}
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="h-2" />
      </div>
    </footer>
  );
}
