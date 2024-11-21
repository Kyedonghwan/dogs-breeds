import classNames from 'classnames';
import style from './ImageItem.module.scss';
import { useEffect, useState } from 'react';
import { TFavorites } from '../ImageList';

type TImageItem = {
    imageUrl: string;
    favorites: TFavorites;
    setFavorites: (favorites: TFavorites) => void;
    breedFullName: string;
    isFavoriteList: boolean;
}

const ImageItem = ({imageUrl, favorites, setFavorites, breedFullName, isFavoriteList}: TImageItem) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const onClick = () => {
        let localStorageArray = JSON.parse(window.localStorage.getItem("breeds") || '[]');

        let temp = [];

        if(!isFavorite){
            if(favorites.imageUrls) {
                localStorageArray.some((item:TFavorites, idx:number) => {
                    if(item.name === breedFullName) {
                        localStorageArray[idx] = {name: breedFullName, imageUrls: [...favorites.imageUrls || [], imageUrl]};
                        return true;
                    }
                })
                window.localStorage.setItem("breeds", JSON.stringify(localStorageArray));
                setFavorites({name: breedFullName, imageUrls: [...favorites.imageUrls, imageUrl]});
            } else {
                temp = [...localStorageArray, {name: breedFullName, imageUrls: [imageUrl]}];
                window.localStorage.setItem("breeds", JSON.stringify(temp))
                setFavorites({name: breedFullName, imageUrls: [imageUrl]});
            }
            setIsFavorite(true);
        } else {
            if(favorites.imageUrls && favorites.imageUrls.length > 1) {
                localStorageArray.some((item:TFavorites, idx:number) => {
                    if(item.name === breedFullName) {
                        localStorageArray[idx] = {name: breedFullName, imageUrls: favorites.imageUrls?.filter((imageItem) => imageItem!==imageUrl)}
                        return true;
                    }
                })
                console.log(localStorageArray);
                window.localStorage.setItem("breeds", JSON.stringify(localStorageArray));
                setFavorites({name: breedFullName, imageUrls: favorites.imageUrls.filter((item) => item!==imageUrl)});
            }
            else {
                window.localStorage.setItem("breeds", JSON.stringify(localStorageArray.filter((item:TFavorites) => item.name!==breedFullName)))
                if(window.localStorage.getItem("breeds") === "[]") {
                    window.localStorage.removeItem("breeds");
                }
                setFavorites({name: ""});
            }
            setIsFavorite(false);
        }
    }

    useEffect(() => {
        if(!isFavoriteList) {
            setIsFavorite(false);
            if(favorites.imageUrls) {
                favorites.imageUrls.forEach((favoriteImageUrl) => {
                    if(favoriteImageUrl === imageUrl) {
                        setIsFavorite(true);
                        return false;
                    }
                })
            }
        }
    }, [isFavoriteList, favorites, imageUrl]);

    return (
        <li className={style.item}>
            <div className={style.thumb_wrap}>
                <img alt="섬네일" className={style.thumb} src={imageUrl}/>
                { !isFavoriteList && <button type="button" onClick={onClick} className={classNames(style.like_icon, isFavorite && style.on)}>
                    <span className="blind">add favorites</span>
                </button>}
            </div>
        </li>
    )
}

export default ImageItem;