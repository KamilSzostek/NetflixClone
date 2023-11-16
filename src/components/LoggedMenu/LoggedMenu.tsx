import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsProfileSelected, profileIconSelector, profileNameSelector, setProfileIcon, setProfileName } from '@/store/selectedProfile';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
import { signOut } from 'next-auth/react';

import styles from './LoggedMenu.module.scss'

const LoggedMenu: FC = () => {
  const dispatch = useDispatch()
  const profileName = useSelector(profileNameSelector)
  const profileIcon = useSelector(profileIconSelector)

  const router = useRouter()

  const signoutHandler = async () => {
    sessionStorage.removeItem('ProfileId')
    await signOut()
    router.push('/')
  }

  const transferProfileHandler = () => {
    sessionStorage.removeItem('ProfileId')
    dispatch(changeIsProfileSelected(false))
    router.push('/browse')
  }

  const changeOnKidsProfile = () => {
    dispatch(setProfileName('Kids'))
    dispatch(setProfileIcon(KidsIcon))
  }

  const notificationList = (
    <ul className={styles.notificationList}>
      <li onClick={() => router.push('/browse/notifi/popular')}>
        <figure>
          <Image src={Popular} alt='popular movies' width={40} height={30} />
        </figure>
        <span>10 most popular hits</span>
      </li>
      <li onClick={() => router.push('/browse/notifi/oldgold')}>
        <figure>
          <Image src={Old} alt='old movies' width={40} height={30} />
        </figure>
        <span>The best old movies</span>
      </li>
      <li onClick={() => router.push('/browse/notifi/cinema')}>
        <figure>
          <Image src={Cinema} alt='cinema movies' width={40} height={30} />
        </figure>
        <span>Latest in cinema</span>
      </li>
      <li onClick={() => router.push('/browse/notifi/horror')}>
        <figure>
          <Image src={Horror} alt='horror movies' width={40} height={30} />
        </figure>
        <span>Something for connoisseurs of horror cinema</span>
      </li>
    </ul>
  )
  const profileMenu = (
    <div className={styles.profileMenu}>
      <h4>{profileName}</h4>
      <hr />
      {profileName !== 'Kids' && <figure onClick={changeOnKidsProfile}>
        <Image src={KidsIcon} alt="Kids Icon" width={50} height={50} />
        <figcaption>Kids</figcaption>
      </figure>}
      <hr />
      <ul>
        <li onClick={() => router.push('/ManageProfiles')}>
          <FontAwesomeIcon icon={faPencil} />
          <span>manage profiles</span>
        </li>
        <li onClick={transferProfileHandler}>
          <FontAwesomeIcon icon={faFaceRollingEyes} />
          <span>transfer profile</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faPerson} />
          <span>account</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span>help center</span>
        </li>
      </ul>
      <hr />
      <span onClick={signoutHandler}>sign out of netflix</span>
    </div>
  )
  return (
    <div className={styles.logMenu}>
      <SearchBar />
      <ExpandedList children2={notificationList} isLeftPos>
        <span>
          <FontAwesomeIcon icon={faBell} />
        </span>
      </ExpandedList>
      <ExpandedList children2={profileMenu} isLeftPos>
        <figure>
          <Image src={profileIcon} alt='user avatar' width={50} height={50} priority />
        </figure>
      </ExpandedList>
    </div>);
};

export default LoggedMenu;
