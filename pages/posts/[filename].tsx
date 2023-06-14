import { Post } from "../../components/posts/post";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout, useTheme } from "../../components/layout";
import { RelatedPosts } from "../../components/posts/related-posts";
import { useState } from "react";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const posts = props.postsResponse.data.postConnection.edges;

  const [showAll, setShowAll] = useState(false);

  if (data && data.post) {
    return (
      <Layout rawData={data} data={data.global as any}>
        <div className="mx-auto">
          <Post {...data.post} />
          <div className="flex justify-center">
            <img
              src="/images/related-articles.png"
              alt="News and articles"
              className="w-[324px] md:w-auto md:h-[126px] font-serif text-[48px]"
            />
          </div>
          <div className="flex flex-wrap max-w-7xl mt-8 md:mt-16">
            <RelatedPosts
              data={
                showAll
                  ? posts.filter(
                      (el) => el.node.category?.name === data.post.category.name
                    )
                  : posts
                      .slice(0, 3)
                      .filter(
                        (el) =>
                          el.node.category?.name === data.post.category.name
                      )
              }
            />
          </div>
          {posts.filter(
            (el) => el.node.category?.name === data.post.category.name
          ).length < 1 ? (
            <p className="text-center">No related articles</p>
          ) : posts.filter(
              (el) => el.node.category?.name === data.post.category.name
            ).length > 3 ? (
            <div className="flex justify-center">
              <button
                className={`border-gradient border-gradient-gold px-3 py-4 text-xs ml-4 mt-2 md:mt-0 min-w-[104px] ${
                  showAll === true ? "bg-gold" : ""
                }`}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "HIDE" : "SHOW ALL"}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const postsResponse = await client.queries.pageQuery();

  const tinaProps = await client.queries.blogPostQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
      postsResponse,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
