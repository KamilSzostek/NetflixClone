import { FC, useState } from 'react';
import ProfileSelector from '@/components/ProfileSelector/ProfileSelector';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import { IProfile } from '@/helpers/interfaces';
import Default from '../../../public/assets/profiles/default.png'
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { getCollectionDB } from '@/helpers/dbConnection';

import styles from '../../styles/ManageProfiles.module.scss'

interface IManageProfileProps {
    profiles: IProfile[],
}

const ManageProfiles: FC<IManageProfileProps> = (props) => {
    const [selectedProfile, setSelectedProfile] = useState<IProfile>({
        _id: 'adk900jasda9',
        name: "",
        image: Default,
        nickname: "",
        preferedLanguage: [],
        ageGroup: { name: "" },
        autoNextEpisode: true,
        autoPreview: true,
        isMainProfile: false
    })
    const [profiles, setProfiles] = useState<IProfile[]>(props.profiles)
    const [showEditForm, setShowEditForm] = useState(false)

    const selectProfileHandler = (profile: IProfile) => setSelectedProfile(profile)
    const openEditForm = () => setShowEditForm(true)
    const closeEditForm = (newProfiles?: IProfile[]) => {
        newProfiles && setProfiles(newProfiles)
        setShowEditForm(false)
    }
    return (
        <main className={styles.main}>
            {!showEditForm && <ProfileSelector profiles={profiles} title='Manage profiles' buttonText='Done' linkPath='/browse' openEditHandler={openEditForm} selectProfileHandler={selectProfileHandler} isDarker />}
            {showEditForm && <EditProfileForm profiles={profiles} profileData={selectedProfile} closeEditHandler={closeEditForm} />}
        </main>
    )
};

export default ManageProfiles;
export const getServerSideProps: GetServerSideProps<IManageProfileProps> = async (context) => {
    const db = await getCollectionDB('NetflixUsers')
    const token = await getServerSession(
        context.req,
        context.res,
        authOptions
    )
    const user = await db.collection.findOne({ email: token?.user?.email })
    db.client.close()

    return {
        props: {
            profiles: user ? user.profiles : [],
            token
        },
    };
};