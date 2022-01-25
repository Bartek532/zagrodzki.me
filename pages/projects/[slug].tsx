import type { NextPage, GetStaticProps } from "next";
import type { InferGetStaticPropsType } from "types";
import { Layout } from "components/layout/Layout";
import { ResultView } from "components/result/resultView/ResultView";
import { getProjectsPaths, getProjectBySlug } from "lib/projects";
import { NextSeo, ArticleJsonLd } from "next-seo";

const Project: NextPage = ({ transformedMdx, frontmatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, description, publishedAt, slug } = frontmatter;
  const url = `${process.env.NEXT_PUBLIC_URL}/projects/${slug}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_URL}/img/projects/${slug}/thumbnail.png`;

  return (
    <>
      <NextSeo
        description={description}
        openGraph={{
          type: "article",
          article: {
            publishedTime: publishedAt,
          },
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 880,
              alt: title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        authorName="Bartosz Zagrodzki"
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={description}
        publisherLogo="/android-icon-192x192.png"
        publisherName="Bartosz Zagrodzki"
        images={[imageUrl]}
        title={title}
        url={url}
      />
      <Layout title={title}>
        <ResultView project={frontmatter} mdx={transformedMdx} type="project" />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const { transformedMdx, frontmatter } = await getProjectBySlug(slug);

  return {
    props: {
      transformedMdx,
      frontmatter: {
        slug,
        ...frontmatter,
      },
    },
    revalidate: 10,
  };
};

export const getStaticPaths = () => {
  const paths = getProjectsPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Project;
