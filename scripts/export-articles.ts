import { prisma } from "../lib/prisma";
import fs from "fs";

async function main() {
  const articles = await prisma.universityArticle.findMany({
    where: { status: "PUBLISHED" },
    select: {
      slug:    true,
      title:   true,
      excerpt: true,
      content: true,
      category: { select: { name: true, slug: true } },
    },
  });

  fs.writeFileSync("scripts/.forge-articles.json", JSON.stringify(articles, null, 2), "utf-8");
  console.log(`Exported ${articles.length} articles (${(fs.statSync("scripts/.forge-articles.json").size / 1024).toFixed(0)} KB)`);
  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
