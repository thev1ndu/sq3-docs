import dayjs from "dayjs";
import type { Metadata } from "next";

import { PostItem } from "@/features/blog/components/post-item";
import { getAllPosts, getPostsByCategory } from "@/features/blog/data/posts";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Comprehensive documentation, interactive demos, and project overview for the SQ3 platform.",
};

const categoryConfig = {
  features: {
    title: "Features",
    description:
      "Interactive demos and documentation for SQ3 platform features.",
  },
  project: {
    title: "Project",
    description: "Project overview and architecture documentation.",
  },
};

export default function Page() {
  const featurePosts = getPostsByCategory("features").sort((a, b) =>
    dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
  );
  const projectPosts = getPostsByCategory("project").sort((a, b) =>
    dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
  );

  return (
    <>
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Docs</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      {/* Features Section */}
      {featurePosts.length > 0 && (
        <div className="screen-line-after">
          <div className="px-4 pt-8 pb-4">
            <h2 className="mb-2 text-2xl font-semibold">
              {categoryConfig.features.title}
            </h2>
            <p className="font-mono text-sm text-muted-foreground">
              {categoryConfig.features.description}
            </p>
          </div>

          <div className="relative pt-4 pb-8">
            <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
              <div className="border-r border-edge"></div>
              <div className="border-l border-edge"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featurePosts.map((post, index) => (
                <PostItem
                  key={post.slug}
                  post={post}
                  shouldPreloadImage={index <= 4}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Section */}
      {projectPosts.length > 0 && (
        <div>
          <div className="px-4 pt-8 pb-4">
            <h2 className="mb-2 text-2xl font-semibold">
              {categoryConfig.project.title}
            </h2>
            <p className="font-mono text-sm text-muted-foreground">
              {categoryConfig.project.description}
            </p>
          </div>

          <div className="relative pt-4 pb-8">
            <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
              <div className="border-r border-edge"></div>
              <div className="border-l border-edge"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projectPosts.map((post, index) => (
                <PostItem
                  key={post.slug}
                  post={post}
                  shouldPreloadImage={index <= 4}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-4" />
    </>
  );
}
