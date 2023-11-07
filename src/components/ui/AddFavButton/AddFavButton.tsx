import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './AddFavButton.module.scss'

const AddFavButton: FC = () => {
    const [isInFav, setIsInFav] = useState(false)

    return (
        <button className={isInFav ? styles.fav : ''} onClick={() => setIsInFav(!isInFav)}>
            <abbr title='Add to favorite'>
                <FontAwesomeIcon className='fav-icon' icon={isInFav ? faCheck : faPlus} />
            </abbr>
        </button>
    );
};

export default AddFavButton;
