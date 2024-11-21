import { useEffect, useState } from 'react';
import style from './ImageList.module.scss';
import { useParams } from 'react-router-dom';
import ImageItem from '../ImageItem';
import Pagination from '../Pagination';
import { useSearchParams } from 'react-router-dom';

export type TFavorites = {
    name: string;
    imageUrls?: string[];
}

type TImageList = {
    isFavoriteList : boolean;
    imageListRef?: React.RefObject<HTMLUListElement>;
}

const ImageList = ({isFavoriteList, imageListRef}: TImageList) => {
    const {breedName, subBreedName} = useParams();
    const [imageList, setImageList] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<TFavorites>({name: ""});
    const [breedFullName, setBreedFullName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [paginationList, setPaginationList] = useState<number[]>([]);
    const [searchParams] = useSearchParams();

    const imageCountPerPage = 9;

    useEffect(() => {
        if(searchParams.get("page")) {
            setCurrentPage(Number(searchParams.get("page")));
        } else {
            setCurrentPage(1);
        }
    },[searchParams]);

    useEffect(() => {
        // breeds
        const getKeywordImage = async () => {
            let data;
    
            if(subBreedName) {
                data = await (await fetch(`https://dog.ceo/api/breed/${breedName}/${subBreedName}/images`) ).json();
            }
            else {
                data = await (await fetch(`https://dog.ceo/api/breed/${breedName}/images`) ).json();
            }
            setTotalPage(Math.ceil(data.message.length / imageCountPerPage));
            // 현재페이지 = 전체페이지
            if(currentPage === Math.ceil(data.message.length / imageCountPerPage)) {
                setImageList(data.message.slice((currentPage -1) * imageCountPerPage));
            } else {
                setImageList(data.message.slice((currentPage -1) * imageCountPerPage, currentPage * imageCountPerPage));
            }
        }

        // favorites
        const getLocalStorageImage = () => {
            let localData: string[] | undefined;

            if(subBreedName) {
                JSON.parse(window.localStorage.getItem("breeds") || "[]").some((item:TFavorites) => {
                    if(item.name === subBreedName + " " + breedName) {
                        localData = item.imageUrls;
                        return true;
                    }
                });
            } else {
                JSON.parse(window.localStorage.getItem("breeds") || "[]").some((item:TFavorites) => {
                    if(item.name ===  breedName) {
                        localData = item.imageUrls;
                        return true;
                    }
                });
            }
            
            if(localData) {
                setTotalPage(Math.ceil(localData.length / imageCountPerPage));
                // 현재페이지 = 전체페이지
                if(currentPage === Math.ceil(localData.length / imageCountPerPage)) {
                    setImageList(localData.slice((currentPage -1) * imageCountPerPage));
                } else {
                    setImageList(localData.slice((currentPage -1) * imageCountPerPage, currentPage * imageCountPerPage))
                }
            }
        }

        if(breedName) {
            if(subBreedName) {
                setBreedFullName(subBreedName + " " + breedName);
            } else {
                setBreedFullName(breedName);
            }

            if(isFavoriteList) getLocalStorageImage();
            else getKeywordImage();
        }
    },[breedName, subBreedName, isFavoriteList, currentPage]);

    useEffect(() => {
        if(totalPage >= currentPage) {
            let frontPaginationList = [];
            let backPaginationList = [];
            let fullPaginationList = [];

            if(totalPage > 10) {
                if(currentPage >= 5){
                    if(currentPage < totalPage - 4) {
                        frontPaginationList = Array(4).fill(0).map((item, idx) => currentPage - 4 + idx);
                        backPaginationList = Array(5).fill(0).map((item, idx) => currentPage + 1 + idx);
                        fullPaginationList = [...frontPaginationList, currentPage, ...backPaginationList];
                    } else {
                        fullPaginationList = Array(10).fill(0).map((item, idx) => totalPage - 9 + idx);
                    }
                } else {
                    fullPaginationList = Array(10).fill(0).map((item, idx) => idx + 1);
                }
            }else {
                fullPaginationList = Array(totalPage).fill(0).map((item, idx) => idx + 1);
            }
            setPaginationList(fullPaginationList);
        }
    },[totalPage, currentPage]);

    useEffect(() => {
        
        JSON.parse(window.localStorage.getItem("breeds") || "[]")?.some((item:TFavorites) => {
            if(item.name === breedFullName) {
                setFavorites(item);
                return true;
            }
        });
    }, [breedFullName]);

    return (
    <>
        <div className={style.list_wrap}>
            <h2 className={style.name}>{breedFullName}</h2>
            <ul className={style.list} ref={imageListRef}>
                {
                    imageList && imageList.map((item, idx) => <ImageItem imageUrl={item} key={idx} setFavorites={setFavorites} favorites={favorites} breedFullName={breedFullName} isFavoriteList={isFavoriteList}/>)
                }
            </ul>
            <Pagination currentPage={currentPage} paginationList={paginationList} totalPage={totalPage} isFavoriteList={isFavoriteList}/>
        </div>
    </>
    )
}

export default ImageList;