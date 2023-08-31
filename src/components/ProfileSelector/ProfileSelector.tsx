import { FC } from 'react';
import { useRouter } from 'next/router';
import ProfileIcone from '../ProfileIcone/ProfileIcone';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Default from '../../../public/assets/profiles/default.png';
import Kids from '../../../public/assets/profiles/kids.png'
import Link from 'next/link';

import styles from './ProfileSelector.module.scss'

interface IProfileSelectorProps {
    title: string,
    isDarker?: boolean,
    buttonText: string,
    linkPath: string
}

const profiles = [{name: 'Kamil', image: Default}, {name: 'Dzieci', image: Kids}, {name: 'Dodaj profil', image: faCirclePlus}];

const ProfileSelector: FC<IProfileSelectorProps> = ({title, isDarker, buttonText, linkPath}) => {
    const router = useRouter()

    const profileSelect = profiles.map((profile, key) => (router.pathname === '/ManageProfiles' && key < profiles.length-1
    ? <ProfileIcone key={key} name={profile.name} image={profile.image} isEditMode/>
    : <ProfileIcone key={key} name={profile.name} image={profile.image} />))
    
    const sectionStyle = isDarker ? `${styles.darker} ${styles.selector}` : styles.selector

    return (
      <section className={sectionStyle}>
          <h1>{title}</h1>
          <div>
              {profileSelect}
          </div>
          <Link href={linkPath}>{buttonText}</Link>
      </section>
    );
};

export default ProfileSelector;
