import Image from "next/legacy/image";

export default function Photo({ photo }: any) {
    return (
        <img
            alt="photo"
            src={`${photo.url}`}
            srcSet={`${photo.url}`}
            width="100%"
            loading="lazy"
        />
    );
}
