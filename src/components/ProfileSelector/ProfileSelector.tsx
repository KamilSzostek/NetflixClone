import { FC, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { useDispatch } from 'react-redux';
import { changeIsProfileSelected, setIsAdultContent, setProfileIcon, setProfileName } from '@/store/selectedProfile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProfileIcone from '../ProfileIcone/ProfileIcone';
import AddProfile from '../AddProfile/AddProfile';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from '@/helpers/cookies';
import { IUser, IProfile } from '@/helpers/interfaces';
import Loader from '../Loader/Loader';

import styles from './ProfileSelector.module.scss';

interface IProfileSelectorProps {
    profiles: IProfile[]
    title: string,
    buttonText: string
    linkPath: string
    openEditHandler?: () => void
    selectProfileHandler?: (profile: IProfile) => void
    isDarker?: boolean
}

const ProfileSelector: FC<IProfileSelectorProps> = ({ title, isDarker, buttonText, linkPath, openEditHandler, selectProfileHandler, ...props }) => {
    const dispatch = useDispatch()

    const router = useRouter()
    const[profiles, setProfiles] = useState<IProfile[]>(props.profiles)
    const [showAddProfile, setShowAddProfile] = useState(false)

    const openAddSectionHandler = () => setShowAddProfile(true)
    const closeAddSectionHandler = (newProfiles?: IProfile[]) => {
        setShowAddProfile(false)
        newProfiles && setProfiles(newProfiles)
    }

    function showHomePage(id: string, name: string, image: StaticImageData, ageGroup: string) {
        sessionStorage.setItem('ProfileId', id)
        dispatch(setProfileName(name))
        dispatch(setProfileIcon(image))
        dispatch(changeIsProfileSelected(true))
        ageGroup === 'adults' && dispatch(setIsAdultContent(true))
    }

    const profileSelect = profiles?.map((profile, key) => {
        const clickHandler = () => {
            selectProfileHandler && selectProfileHandler(profile)
            openEditHandler && openEditHandler()
        }
        if (router.pathname === '/ManageProfiles')
            return <ProfileIcone key={key} name={profile.name} image={profile.image} isEditMode clickHandler={clickHandler} />
        else
            return <ProfileIcone key={key} name={profile.name} image={profile.image} clickHandler={() => showHomePage(profile._id, profile.name, profile.image, profile.ageGroup.name)} />
    })

    const sectionStyle = isDarker ? `${styles.darker} ${styles.selector}` : styles.selector

    return (
        showAddProfile ? <AddProfile closeSectionHandler={closeAddSectionHandler} /> :
            <section className={sectionStyle}>
                <h1>{title}</h1>
                <div>
                    {profiles.length > 0 ? profileSelect : <Loader />}
                    {(profiles.length < 5 && profiles.length > 0) && <ProfileIcone name='Add profile' image={faCirclePlus} clickHandler={openAddSectionHandler} />}
                </div>
                {profiles.length > 0 && <Link href={linkPath}>{buttonText}</Link>}
            </section>
    )

};

export default ProfileSelector;
