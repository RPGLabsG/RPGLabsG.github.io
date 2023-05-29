import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { FeaturedPosts } from "../components/posts/featured-posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { useState } from "react";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const posts = props.data.postConnection.edges;

  const categories = props.categories;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small" className="">
          <div className="flex justify-center">
            <img src="/images/news-articles-header.png" alt="News and articles"  className="h-[126px] font-serif text-[48px]" />
          </div>
          <div className="-mx-4 flex flex-wrap mt-10">
            <FeaturedPosts data={posts.slice(0, 2)}/>

            <div className="flex justify-start w-full items-center mb-16">
              
              <div>
                <button 
                  className={`border-gradient border-gradient-gold px-3 py-4 text-xs ml-4 ${selectedCategory === 'ALL' ? 'bg-gold' : ''}`} 
                  onClick={() => setSelectedCategory('ALL')}
                >
                  ALL
                </button>
              </div>
              {categories.map((category) => {
                return (
                  <div>
                    <button 
                      className={`border-gradient border-gradient-gold px-3 py-4 text-xs ml-4 ${selectedCategory === category.name ? 'bg-gold' : ''}`} 
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </button>
                  </div>
                );
              })}

              <div className="ml-6">
                NUMBER OF POSTS: { selectedCategory === 'ALL' ? posts.length : posts.filter((el) => el.node.category && el.node.category?.name === selectedCategory).length }
                
              </div>

            </div>

            <Posts data={selectedCategory === 'ALL' ? posts : posts.filter((el) => el.node.category && el.node.category?.name === selectedCategory)} />
          </div>
          
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  const categoriesResponse = await client.queries.categoryConnection();

  const categories = categoriesResponse.data.categoryConnection.edges.map((post) => {
    return { name: post.node.name }
  })

  return {
    props: {
      ...tinaProps,
      categories,
    },
  };
};


export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
