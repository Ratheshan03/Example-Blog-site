import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src="" alt="" fill className={styles.img} />
        </div>
        <span className={styles.date}>01.12.2024</span>
      </div>

      <div className={styles.bottom}>
        <h1 className={styles.title}> Title</h1>
        <p className={styles.description}>DESC</p>
        <Link href="/blog/post">READ MORE</Link>
      </div>
    </div>
  );
};

export default PostCard;
