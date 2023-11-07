import { FC, useEffect, useState } from 'react';
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
    title: string,
    buttonText: string
    linkPath: string
    openEditHandler?: () => void
    selectProfileHandler?: (profile: IProfile) => void
    isDarker?: boolean
    profileIsSelected?: ()=>void
}

const ProfileSelector: FC<IProfileSelectorProps> = ({ title, isDarker, buttonText, linkPath, openEditHandler, selectProfileHandler, profileIsSelected }) => {
    const router = useRouter()

    const [profiles, setProfiles] = useState<IProfile[]>([])
    const [showAddProfile, setShowAddProfile] = useState(false)

    useEffect(() => {
        const id = getCookie('ActiveUserId')?.substring(13)
        if (id) {
            fetch('/api/users').then(res => res.json()).then(users => {
                const user = users.find((user: IUser) => user._id === id)
                setProfiles(user.profiles)
            }).catch(err => console.log(err))
        }
    }, [showAddProfile])

    const openAddSectionHandler = () => setShowAddProfile(true)
    const closeAddSectionHandler = () => setShowAddProfile(false)

    function showHomePage (id: string){
        sessionStorage.setItem('ProfileId', id)
        profileIsSelected && profileIsSelected()
    }

    const profileSelect = profiles?.map((profile, key) => {
        const clickHandler = () =>{
            selectProfileHandler && selectProfileHandler(profile)
            openEditHandler && openEditHandler()
        }
        if (router.pathname === '/ManageProfiles')
            return <ProfileIcone key={key} name={profile.name} image={profile.image} isEditMode clickHandler={clickHandler} />
        else
            return <ProfileIcone key={key} name={profile.name} image={profile.image} clickHandler={()=>showHomePage(profile._id)}/>
    })

    const sectionStyle = isDarker ? `${styles.darker} ${styles.selector}` : styles.selector

    return (
        showAddProfile ? <AddProfile closeSectionHandler={closeAddSectionHandler} /> :
            <section className={sectionStyle}>
                <h1>{title}</h1>
                <div>
                    {profiles.length > 0 ? profileSelect : <Loader/>}
                    {(profiles.length < 5 && profiles.length > 0) && <ProfileIcone name='Add profile' image={faCirclePlus} clickHandler={openAddSectionHandler} />}
                </div>
                {profiles.length > 0 && <Link href={linkPath}>{buttonText}</Link>}
            </section>
    )

};

export default ProfileSelector;
