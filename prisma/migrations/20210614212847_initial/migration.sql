-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'Untitled',
    "body" TEXT NOT NULL DEFAULT E'',
    "code" TEXT NOT NULL DEFAULT E'',
    "frontmatter" JSONB,
    "tags" TEXT[],
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.slug_publishedAt_unique" ON "Post"("slug", "publishedAt");
