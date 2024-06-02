import Image from "next/image";
import styles from "./singleBlogPost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost, getUser } from "@/lib/data";

// const getData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

export const generateMetaData = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.desc,
    siteName: "Matrimony-site",
  };
};

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {post.img && (
          <Image src={post.img} alt="Post-img" fill className={styles.img} />
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
