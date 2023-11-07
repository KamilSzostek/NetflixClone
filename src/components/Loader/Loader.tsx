import {FC} from 'react';
import { createPortal } from 'react-dom';

import styles from './Loader.module.scss'

const Loader: FC = () => {
    return createPortal((<div className={styles.loader}>
        <span className={styles.circle}></span>
    </div>), document.body)

};

export default Loader;
