import {FC, useEffect, useState} from 'react';
import { createPortal } from 'react-dom';

import styles from './Loader.module.scss'

const Loader: FC = () => {
    const [bodyElement, setBodyElement] = useState<HTMLElement>()
    useEffect(()=>{
        setBodyElement(document.body)
    },[])
    return bodyElement && createPortal((<div className={styles.loader}>
        <span className={styles.circle}></span>
    </div>), bodyElement)

};

export default Loader;
