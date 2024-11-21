import classNames from 'classnames';
import style from './ImageItem.module.scss';
import { useEffect, useMemo, useState } from 'react';

const ImageItem = ({imageUrl, favorites, setFavorites, breedFullName, isFavoriteList}) => {

    const [isFavorite, setIsFavorite] = useState(false);

    useMemo(() => favorites, [favorites]);

    const onClick = () => {
        if(!isFavorite){
            if(favorites) {
                window.localStorage.setItem(breedFullName, JSON.stringify([...favorites, imageUrl]));
                setFavorites([...favorites, imageUrl]);
            } else {
                window.localStorage.setItem(breedFullName, JSON.stringify([imageUrl]));
                setFavorites([imageUrl]);
            }
            setIsFavorite(true);
        } else {
            if(favorites.length > 1) {
                window.localStorage.setItem(breedFullName, JSON.stringify(favorites.filter(favorite => favorite !== imageUrl)));
            }
            else {
                window.localStorage.removeItem(breedFullName);
            }
            setFavorites(favorites.filter(favorite => favorite !== imageUrl));
            setIsFavorite(false);
        }
    }

    useEffect(() => {
        if(!isFavoriteList) {
            setIsFavorite(false);
            if(favorites) {
                favorites.forEach((favoriteImageUrl) => {
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