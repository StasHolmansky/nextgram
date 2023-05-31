import Image from "next/legacy/image";
import { useState } from "react";
import cn from "clsx";

export default function BlurImage(props: any): JSX.Element {
    const [isLoading, setLoading] = useState(true);
    return (
        <Image
            {...props}
            onLoadingComplete={() => setLoading(false)}
            alt="photo"
        />
    );
}
