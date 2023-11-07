import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import { IconDefinition, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ProfileIcone.module.scss'

interface IProfileIconeProps {
    name: string,
    image: StaticImageData | IconDefinition,
    isEditMode?: boolean,
    clickHandler?: () => void
}
const ProfileIcone: FC<IProfileIconeProps> = ({ name, image, isEditMode, clickHandler }) => {
    function instanceOfStaticImageData(image: any): image is StaticImageData {
        return 'src' in image;
    }
    return (
        <figure className={styles.profile} onClick={clickHandler}>
            <div className={isEditMode ? styles.edit : ''}>
                {isEditMode && <FontAwesomeIcon icon={faPencil}/>}
                {instanceOfStaticImageData(image) ? <Image src={image as StaticImageData} alt={name} width={200} height={200} priority/> : <FontAwesomeIcon icon={image as IconDefinition} />}
            </div>
            <figcaption>{name}</figcaption>
        </figure>
    );
};

export default ProfileIcone;
