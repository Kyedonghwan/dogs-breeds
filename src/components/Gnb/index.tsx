import { Link } from 'react-router-dom';
import style from './Gnb.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

const cx = classNames.bind(style);

const Gnb = () => {
    const [activeMenu, setActiveMenu] = useState('Home');
    
    const handleMenuClick = (menu: string) => {
      setActiveMenu(menu);
    }

    const GNB_LIST = [
      {
        path: '/',
        activeMenu: 'Home'
      },
      {
        path: '/breeds',
        activeMenu: 'Breeds'
      },
      {
        path: '/favorites',
        activeMenu: 'Favorite'
      },
      {
        path: '/quiz',
        activeMenu: 'Quiz'
      }
    ]

    return (
        <div className={style.list_wrap}>
          <ul className={style.list}>
            {GNB_LIST.map((menu, index) => (
                <li key={`index-${index}`} className={cx(style.item, activeMenu === menu.activeMenu ? style.active: '')} onClick={() => handleMenuClick(menu.activeMenu)}>
                  <Link className={style.link} to={menu.path}>{menu.activeMenu}</Link>
                </li>
            ))}
          </ul>
        </div>
    )
}

export default Gnb;