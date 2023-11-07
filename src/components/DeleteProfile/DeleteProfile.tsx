import { FC } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

import styles from './DeleteProfile.module.scss'

interface IDeleteProfileProps {
    icon: StaticImageData
    name: string
    deleteProfileHandler: ()=>void
    cancelAction: ()=>void
}

const DeleteProfile: FC<IDeleteProfileProps> = ({ icon, name, deleteProfileHandler, cancelAction }) => {
    return (
        <section className={styles.deleteProfile}>
            <h1>Delete profile?</h1>
            <div>
                <figure>
                    <Image src={icon} alt='' width={50} height={50} priority />
                    <figcaption>{name}</figcaption>
                </figure>
                <p>The story of this profile - my list, ratings and actions - going to permament delete, without recovery option.</p>
            </div>
            <div>
                <button type='button' onClick={cancelAction}>Keep profile</button>
                <button type='button' onClick={deleteProfileHandler}>Delete profile</button>
            </div>
        </section>
    );
};

export default DeleteProfile;
