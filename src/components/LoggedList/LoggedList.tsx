import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ExpandedList from '../ExpandedList/ExpandedList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './LoggedList.module.scss';

const LoggedList: FC = () => {
  const router = useRouter()
  const path = router.asPath
  const listElement = (
    <ul>
      <li>
        {path === '/browse' ? <span className={styles.active}>Home</span> : <Link href='/browse'>Home</Link>}
      </li>
      <li>
        {path === '/browse/series' ? <span className={styles.active}>TV Series</span> : <Link href='/browse/series'>TV Series</Link>}
      </li>
      <li>
        {path === '/browse/movies' ? <span className={styles.active}>Movies</span> : <Link href='/browse/movies'>Movies</Link>}
      </li>
      <li>
        {path === '/browse/trending' ? <span className={styles.active}>New and Popular</span> : <Link href='/browse/trending'>New and Popular</Link>}
      </li>
    </ul>)
  return (
    <>
      <ExpandedList children2={listElement} isMobileOnly isLeftPos>
        <>
          <span>Browse</span>
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </>
      </ExpandedList>
      <ul className={styles.list}>
        <li>
          {path === '/browse' ? <span className={styles.active}>Home</span> : <Link href='/browse'>Home</Link>}
        </li>
        <li>
          {path === '/browse/series' ? <span className={styles.active}>TV Series</span> : <Link href='/browse/series'>TV Series</Link>}
        </li>
        <li>
          {path === '/browse/movies' ? <span className={styles.active}>Movies</span> : <Link href='/browse/movies'>Movies</Link>}
        </li>
        <li>
          {path === '/browse/trending' ? <span className={styles.active}>New and Popular</span> : <Link href='/browse/trending'>New and Popular</Link>}
        </li>
      </ul>
    </>
  );
};

export default LoggedList;
