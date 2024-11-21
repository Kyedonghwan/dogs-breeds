import { useEffect, useState } from 'react';
import style from './FavoriteList.module.scss';
import { Link } from 'react-router-dom';
import { TFavorites } from '../ImageList';

const FavoriteList = () => {

    type TBreedName = {
        breedName: string;
        subBreedName: string;
    }

    const [breedNameArray, setBreedNameArray] = useState<TBreedName[]>([]);

    useEffect(() => {
        if(window.localStorage.getItem("breeds")) {
            const temp = JSON.parse(window.localStorage.getItem("breeds") + "").map((item: TFavorites) => {
                if(item.name.indexOf(" ") === -1) {
                    return {breedName: item.name, subBreedName: ""}
                } else {
                    return {breedName: item.name.substring(0, item.name.indexOf(" ")), subBreedName: item.name.substring(item.name.indexOf(" ") + 1)}
                }
            })
            setBreedNameArray(temp);
        }
    }, []);

    return (
        <>
            <ul className={style.list}>
                {
                    breedNameArray.map((item, idx) => 
                        {
                            let url;
                            if(item.subBreedName.length > 0) {
                                url = `/favorites/${item.subBreedName}/${item.breedName}`;
                            } else {
                                url = `/favorites/${item.breedName}`;
                            }
                            return (
                                <li key={idx}>
                                    <Link to={url}>{item.subBreedName} {item.breedName}</Link>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </>
    )
}

export default FavoriteList;