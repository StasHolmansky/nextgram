import Image from "next/image";
import { useState } from "react";

export default function BlurImage(props: any): JSX.Element {
    const [isLoading, setLoading] = useState(true);
    return (
        <Image
            {...props}
            onLoadingComplete={() => setLoading(false)}
            alt="photo"
            style={{
                height: "373px",
                width: "100%",
                minWidth: "300px",
            }}
        />
    );
}
