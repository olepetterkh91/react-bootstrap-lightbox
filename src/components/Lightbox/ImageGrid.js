import { useEffect, useState } from "react";
import LightBox from "./Lightbox";

function ImageGrid() {

    const [images, setImages] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch("https://smorasstats.com/v4/wp-json/wp/v2/gallery")
            const data = await response.json()
            const imageUrls = data?.map((post) => post?.acf?.galleri_poster)
            setImages(imageUrls)
        }
        getData()
    }, [])

    return (
        <div>
            <LightBox images={images} />
        </div>
    )
}
export default ImageGrid