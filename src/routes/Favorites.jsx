import { useState } from "react";
import ImageList from "../components/ImageList";
import FavoriteList from "../components/FavoriteList";

const Favorites = () => {

    return (
    <div style={{display: "flex"}}>
        <FavoriteList />
        <ImageList isFavoriteList={true} />
    </div>
    )
}

export default Favorites;