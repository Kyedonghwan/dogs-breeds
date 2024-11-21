import { useEffect, useState } from 'react';
import style from './SearchList.module.scss';
import { Link } from 'react-router-dom';
import Input from '../Input';

const SearchList = ({keyword, setKeyword, imageListHeight}) => {
    const [allBreeds, setAllBreeds] = useState({});
    const [searchBreeds, setSearchBreeds] = useState({});

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    const getAllBreeds = async () => {
        const json = await( await fetch('https://dog.ceo/api/breeds/list/all')).json();
        setAllBreeds(json.message);
    }

    const SearchItem = ({name}) => {
        const lowerName = name.toLowerCase();
        const lowerKeyword = keyword.toLowerCase();

        if (lowerName.includes(lowerKeyword)) {
            const matchText = name.split(new RegExp(`(${keyword})`, 'gi'));
            return matchText.map((text, idx) => text.toLowerCase() === lowerKeyword ? <span key={idx} className={style.type_highlight}>{text}</span> : text);
        }

        return name;
    }

    useEffect(() => {
        const searchBreed = () => {

            let temp = [];
    
            for (const [breedName, subBreedNameArray] of Object.entries(allBreeds)) {
                if(breedName.toLowerCase().includes(keyword.toLowerCase())) {
                    temp[breedName] = subBreedNameArray;
                } else {
                    subBreedNameArray.some((subBreedName, temp) => {
                        if (subBreedName.toLowerCase().includes(keyword.toLowerCase())) {
                            temp[breedName] = [subBreedName];
                            return true;
                        }
                        return false;
                    });                     
                }
            }

            if(Object.keys(temp).length === 0 ) {
                temp = allBreeds;
            }

            setSearchBreeds(temp);
        }

        searchBreed();
    }, [keyword, allBreeds]);

    useEffect(() => {
        getAllBreeds();
    },[]);

    return (
        <div className={style.list_wrap}>
            <div className={style.search_wrap}>
              <Input value={keyword} type="text" onChange={onChange} placeholder="type breeds name..." />
              <button type="button" className={style.search_button} />
            </div>
            <ul className={style.list} style={{ height: imageListHeight > 0 && imageListHeight}}>
                {
                    Object.keys(searchBreeds).map((breedName, idx) => 
                        <li key={idx} className={style.outter_item}>
                            <Link to={`/breeds/${breedName}`} className={style.link} >
                                <SearchItem name={breedName}/>
                            </Link>
                            <ul className={style.list}>
                                {
                                    searchBreeds[breedName].length >0 ? searchBreeds[breedName].map((subBreedName, idx) => 
                                        <li key={idx} className={style.inner_item}>
                                            <Link to={`/breeds/${breedName}/${subBreedName}`} className={style.link}>
                                                <SearchItem name={subBreedName}/>
                                            </Link>
                                        </li>
                                    ) : null
                                }
                            </ul>
                        </li>
                    ) 
                }
            </ul>
        </div>
    )
}

export default SearchList;