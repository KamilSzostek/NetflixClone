import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileIcone from '../ProfileIcone/ProfileIcone';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Default from '../../../public/assets/profiles/default.png';
import Kids from '../../../public/assets/profiles/kids.png'
import Link from 'next/link';

import styles from './ProfileSelector.module.scss'
import { StaticImageData } from 'next/image';
import { ILanguage } from '@/pages/signup/configureAccount/profiles';

export interface IProfile {
    name: string
    image: StaticImageData
    nickname: string
    preferedLanguage: ILanguage[]
    ageGroup: string
    autoNextEpisode: boolean
    autoPreview: boolean
}
export interface IUser {
    email: string,
    password: string,
    plan: {
        name: string,
        quality: string,
        price: string,
        resolution: string
    },
    phoneNumber: string,
    creditCard: {
        firstName: string,
        lastName: string,
        cardNumber: string,
        CVV: string,
        expirationDate: string
    },
    profiles: IProfile[],
    isMembershipPaid: boolean
}
interface IProfileSelectorProps {
    title: string,
    buttonText: string
    linkPath: string
    openEditHandler?: () => void
    isDarker?: boolean
}

const ProfileSelector: FC<IProfileSelectorProps> = ({ title, isDarker, buttonText, linkPath, openEditHandler }) => {
    const router = useRouter()
    const [profiles, setProfiles] = useState<IProfile[]>([])
    
    useEffect(() => {
        fetch('/api/users').then(res => res.json()).then(data => {
            const user = data.find((user: IUser) => user.email === 'kam1@kam')
            setProfiles(user.profiles)
        }).catch(err => console.log(err))
    })

    const profileSelect = profiles.map((profile, key) => (router.pathname === '/ManageProfiles'
        ? <ProfileIcone key={key} name={profile.name} image={profile.image} isEditMode />
        : <ProfileIcone key={key} name={profile.name} image={profile.image} />))

    const sectionStyle = isDarker ? `${styles.darker} ${styles.selector}` : styles.selector

    return (
        <section className={sectionStyle}>
            <h1>{title}</h1>
            <div onClick={openEditHandler}>
                {profileSelect}
                <ProfileIcone name='Dodaj profil' image={faCirclePlus} />
            </div>
            <Link href={linkPath}>{buttonText}</Link>
        </section>
    );
};

export default ProfileSelector;
