import Image from "next/image";
import styles from "./singleBlogPost.module.css";

const SingleBlogPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="" alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}> Title</h1>
        <div className={styles.detail}>
          <Image
            src=""
            alt="avatar"
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Ratheshan Raina</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.03.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id porro
          earum nobis rerum, eaque sunt perferendis molestias voluptas maiores.
          Repellendus dolores impedit temporibus molestias atque illum iusto
          deleniti quae voluptate.
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
