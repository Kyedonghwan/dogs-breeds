import { useEffect, useRef, useState } from "react";
import SearchList from "../components/SearchList";
import style from './Breeds.module.scss';
import ImageList from "../components/ImageList";

const Breeds = () => {
    const [keyword, setKeyword] = useState("");
    const [imageListHeight, setImageListHeight] = useState(0);
    const imageListRef = useRef(null);

    useEffect(() => {
        let current;

        const observer = new ResizeObserver(entries => {
            for(let entry of entries) {
                setImageListHeight(entry.contentRect.height);
            }
        })

        if(imageListRef.current) {
            observer.observe(imageListRef.current, {
                box: "border-box"
            })
            current = imageListRef.current;
        }

        return () => {
            if(current) {
                observer.disconnect(current);
            }
        }
    },[]);

    return (
    <div className={style.breeds_wrap}>
        <SearchList keyword={keyword} setKeyword={setKeyword} imageListHeight={imageListHeight} />
        <ImageList keyword={keyword} imageListRef={imageListRef} setImageListHeight={setImageListHeight}/>
    </div>
    )
}

export default Breeds;