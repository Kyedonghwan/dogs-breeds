import { useEffect, useState } from 'react';
import style from './FavoriteList.module.scss';
import { Link } from 'react-router-dom';

const FavoriteList = () => {

    const [breedNameArray, setBreedNameArray] = useState([]);

    useEffect(() => {
        const keys = Object.keys(window.localStorage);
        const temp = keys.map((item) => {
            if(item.indexOf(" ") === -1) {
                return {breedName: item, subBreedName: ""}
            } else {
                return {breedName: item.substring(0, item.indexOf(" ")), subBreedName: item.substring(item.indexOf(" ") + 1)}
            }
        })
        setBreedNameArray(temp);
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