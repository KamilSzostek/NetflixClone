import { FC, useState } from 'react';
import ProfileSelector from '@/components/ProfileSelector/ProfileSelector';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import { IProfile } from '@/helpers/interfaces';
import Default from '../../../public/assets/profiles/default.png'

import styles from '../../styles/ManageProfiles.module.scss'
//Zaktualizuj nav guardy
const ManageProfiles: FC = () => {
    const [selectedProfile, setSelectedProfile] = useState<IProfile>({
        _id: 'adk900jasda9',
        name: "",
        image: Default,
        nickname: "",
        preferedLanguage: [],
        ageGroup: {name: ""},
        autoNextEpisode: true,
        autoPreview: true,
        isMainProfile: false
    })
    const [showEditForm, setShowEditForm] = useState(false)

    const selectProfileHandler = (profile: IProfile) => setSelectedProfile(profile)
    const openEditForm = () => setShowEditForm(true)
    const closeEditForm = () => setShowEditForm(false)
    return (
        <main className={styles.main}>
            {!showEditForm && <ProfileSelector title='Manage profiles' buttonText='Done' linkPath='/browse' openEditHandler={openEditForm} selectProfileHandler={selectProfileHandler} isDarker />}
            {showEditForm && <EditProfileForm profileData={selectedProfile} closeEditHandler={closeEditForm} />}
        </main>
    )
};

export default ManageProfiles;
