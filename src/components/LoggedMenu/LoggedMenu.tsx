import { FC } from 'react';
import Image from 'next/image';
import DefaultIcon from '../../../public/assets/profiles/default.png'
import KidsIcon from '../../../public/assets/profiles/kids.png'
import SearchBar from '../SearchBar/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceRollingEyes } from '@fortawesome/free-regular-svg-icons';
import ExpandedList from '../ExpandedList/ExpandedList';
import { faBell, faPencil, faPerson, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Popular from '../../../public/assets/notification/tophits.jpg'
import Old from '../../../public/assets/notification/oldgold.jpg'
import Cinema from '../../../public/assets/notification/lastcinema.jpg'
import Horror from '../../../public/assets/notification/horrorfans.jpg'

import styles from './LoggedMenu.module.scss'

const LoggedMenu: FC = () => {
  const notificationList = (
    <ul className={styles.notificationList}>
      <li>
        <figure>
          <Image src={Popular} alt='popular movies' width={75} height={50}/>
        </figure>
        <span>10 most popular hits</span>
      </li>
      <li>
      <figure>
          <Image src={Old} alt='popular movies' width={75} height={50}/>
        </figure>
        <span>The best old movies</span>
      </li>
      <li>
      <figure>
          <Image src={Cinema} alt='popular movies' width={75} height={50}/>
        </figure>
        <span>Latest in cinema</span>
      </li>
      <li>
      <figure>
          <Image src={Horror} alt='popular movies' width={75} height={50}/>
        </figure>
        <span>Something for connoisseurs of horror cinema</span>
      </li>
    </ul>
  )
  const profileIconChildren = (
    <div className={styles.profileMenu}>
      <figure>
        <Image src={KidsIcon} alt="Kids Icon" width={50} height={50} />
        <figcaption>Kids</figcaption>
      </figure>
      <hr />
      <ul>
        <li>
          <FontAwesomeIcon icon={faPencil}/>
          <span>manage profiles</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faFaceRollingEyes}/>
          <span>transfer profile</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faPerson}/>
          <span>account</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faQuestionCircle}/>
          <span>help center</span>
        </li>
      </ul>
      <hr />
      <span>sign out of netflix</span>
    </div>
  )
  return (
    <div className={styles.logMenu}>
      <SearchBar />
      <ExpandedList children2={notificationList}>
        <span>
          <FontAwesomeIcon icon={faBell} />
        </span>
      </ExpandedList>
      <ExpandedList children2={profileIconChildren}>
        <figure>
          <Image src={DefaultIcon} alt='user avatar' width={50} height={50} priority />
        </figure>
      </ExpandedList>
    </div>);
};

export default LoggedMenu;
