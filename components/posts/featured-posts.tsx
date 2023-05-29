import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import format from "date-fns/format";
import OrnamentTopLeft from '../../assets/icons/posts/ornament-top-left.svg'
import OrnamentTopRight from '../../assets/icons/posts/ornament-top-right.svg'
import OrnamentBottomLeft from '../../assets/icons/posts/ornament-bottom-left.svg'
import OrnamentBottomRight from '../../assets/icons/posts/ornament-bottom-right.svg'

export const FeaturedPosts = ({ data }) => {

  return (
    <>
      {data.map((postData) => {
        const post = postData.node;
        const date = new Date(post.date);
        let formattedDate = "";
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMM dd, yyyy");
        }
        console.log('post: ', post)
        return (
          <div className="px-4 w-1/2 pb-8">
            
          <Link
            key={post._sys.filename}
            href={`/posts/` + post._sys.filename}
            passHref
          >
            
            <a
              key={post.id}
              className="group block mb-8 last:mb-0  h-full"
            >
              {/* POst image */}
              {
                !post?._values.heroImg ? 
                  <div className="relative pb-[70%] overflow-hidden bg-gold-gradient1/10">
                    <OrnamentTopLeft className="absolute left-5 top-5 z-[10]"></OrnamentTopLeft>
                    <OrnamentTopRight className="absolute right-5 top-5 z-[10]"></OrnamentTopRight>
                    <OrnamentBottomLeft className="absolute left-5 bottom-5 z-[10]"></OrnamentBottomLeft>
                    <OrnamentBottomRight className="absolute right-5 bottom-5 z-[10]"></OrnamentBottomRight>
                  </div>
                : post?._values.heroImg.endsWith(".mp4") ?
                  <div className="relative pb-[70%] overflow-hidden bg-gold-gradient1/10">
                    <OrnamentTopLeft className="absolute left-5 top-5 z-[10]"></OrnamentTopLeft>
                    <OrnamentTopRight className="absolute right-5 top-5 z-[10]"></OrnamentTopRight>
                    <OrnamentBottomLeft className="absolute left-5 bottom-5 z-[10]"></OrnamentBottomLeft>
                    <OrnamentBottomRight className="absolute right-5 bottom-5 z-[10]"></OrnamentBottomRight>
                    <video autoPlay muted loop className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full" src={post?._values.heroImg} >
                      <source src={post?._values.heroImg} />
                    </video>
                  </div>
                :  
                  <div className="relative pb-[70%] overflow-hidden">
                    <OrnamentTopLeft className="absolute left-5 top-5 z-[10]"></OrnamentTopLeft>
                    <OrnamentTopRight className="absolute right-5 top-5 z-[10]"></OrnamentTopRight>
                    <OrnamentBottomLeft className="absolute left-5 bottom-5 z-[10]"></OrnamentBottomLeft>
                    <OrnamentBottomRight className="absolute right-5 bottom-5 z-[10]"></OrnamentBottomRight>
                    <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full" src={post?._values.heroImg} alt="" />
                  </div>
              }
              

              {/* Caregory */}
              {
                post.category ? 
                <div className="flex justify-start">
                  <div className="bg-neutral-900 px-2 py-1 text-xs w-auto text-white mt-10">
                    {post.category?.name}
                  </div>
                </div>
                : <div className="mt-7"></div>
              }

                
              {/* Title */}
              <h3
                className={`text-neutral-700 text-3xl lg:text-[36px] title-font mb-3 transition-all duration-150 ease-out mt-3`}
              >
                {post._values.title}{" "}
              </h3>

              {/* Excerpt */}
              <div className="prose dark:prose-dark w-full max-w-none mb-5 text-neutral-700">
                <TinaMarkdown content={post._values.excerpt} />
              </div>

            </a>
          </Link>
          
          </div>
        );
      })}
    </>
  );
};
