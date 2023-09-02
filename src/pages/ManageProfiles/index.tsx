import { FC, useState } from 'react';
import ProfileSelector from '@/components/ProfileSelector/ProfileSelector';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';

import styles from '../../styles/ManageProfiles.module.scss'

const ManageProfiles: FC = () => {
    const [showEditForm, setShowEditForm] = useState(false)
    const openEditForm = () => setShowEditForm(true)
    const closeEditForm = () => setShowEditForm(false)
    return (
        <main className={styles.main}>
            {!showEditForm && <ProfileSelector title='Manage profiles' buttonText='Done' linkPath='/browse' isDarker />}
            {showEditForm && <EditProfileForm />}
        </main>
    )
};

export default ManageProfiles;
