import Image from "next/image";
import styles from "./styles.module.css";

export default function Photo({ photo }) {
  return (
    <div className={styles.photo}>
      <div className={styles.image}>
        <Image
          alt=""
          src={photo.url}
          height={600}
          width={600}
          objectFit="cover"
        />
      </div>

      <div className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          <h3>{photo.caption}</h3>
        </ul>
      </div>
    </div>
  );
}
