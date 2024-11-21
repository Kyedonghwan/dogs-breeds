import { useParams } from 'react-router-dom';
import style from './Pagination.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type TPagination = {
    currentPage: number;
    paginationList: number[];
    totalPage: number;
    isFavoriteList: boolean;
}

const Pagination = ({currentPage, paginationList, totalPage, isFavoriteList}: TPagination) => {

    const {breedName, subBreedName} = useParams();

    let url = "";

    if(!isFavoriteList) {
        if(subBreedName) {
            url = `/breeds/${breedName}/${subBreedName}`;
        } else {
            url = `/breeds/${breedName}`;
        }
    } else {
        if(subBreedName) {
            url = `/favorites/${breedName}/${subBreedName}`;
        } else {
            url = `/favorites/${breedName}`;
        }
    }

    return (
        <>
            <div className={style.list_wrap}>
                { currentPage >= 3 && <Link className={style.arrow_link} to={`${url}?page=${1}`}>&lt;&lt;</Link>}
                { currentPage >= 2 &&<Link  className={style.arrowlinkn} to={`${url}?page=${Number(currentPage)-1}`}>&lt;</Link>}
                <ul className={style.list}>
                    {paginationList.map((item, idx) => 
                        <li className={style.item} key={idx}><Link to={`${url}?page=${item}`} className={classNames(style.page_link, currentPage===item && style.on)}>{item}</Link></li>)}
                </ul>
                { currentPage <= totalPage - 1 && <Link  className={style.arrowlinkn} to={`${url}?page=${Number(currentPage)+1}`}>&gt;</Link>}
                { currentPage <= totalPage - 2 && <Link className={style.arrow_link} to={`${url}?page=${totalPage}`}>&gt;&gt;</Link>}
            </div>
        </>
    )
}

export default Pagination;