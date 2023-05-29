import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { FeaturedPosts } from "../components/posts/featured-posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const posts = props.data.postConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small" className="">
          <div className="flex justify-center">
            <img src="/images/news-articles-header.png" alt="News and articles"  className="h-[126px] font-serif text-[48px]" />
          </div>
          <div className="-mx-4 flex flex-wrap mt-10">
            <FeaturedPosts data={posts.slice(0, 2)}/>
            <Posts data={posts} />
          </div>
          
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
