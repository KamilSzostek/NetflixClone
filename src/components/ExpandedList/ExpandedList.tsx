import { FC } from 'react';

import styles from './ExpandedList.module.scss'

interface IExpandedListProps {
    children: React.ReactElement
    children2: string[] | React.ReactElement
    isMobileOnly?: boolean
    isLeftPos?: boolean
}

const ExpandedList: FC<IExpandedListProps> = ({ children, children2, isMobileOnly, isLeftPos }) => {
    return (
        <div className={styles.expandedList}>
            {children}
            <div className={isLeftPos ? `${styles.chill2} ${styles.leftPos}` : styles.chill2}>
                {children2}
            </div>
            <style jsx>
                {`
            @media(min-width: 992px){
                .${styles.expandedList}{
                    display: ${isMobileOnly ? 'none' : 'block'};
                }
            }
        `}
            </style>
        </div>
    );
};

export default ExpandedList;
