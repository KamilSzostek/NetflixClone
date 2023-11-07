import { FC, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Accordion.module.scss'

interface IAccordionTabProps {
    title: string,
    text: string
}

const AccordionTab: FC<IAccordionTabProps> = ({ title, text }) => {
    const [showParagraph, setShowParagraph] = useState(false)
    const paragraphRef = useRef(null)
    return (
        <div>
            <h3 onClick={() => setShowParagraph(!showParagraph)}>{title}
                {showParagraph ? <FontAwesomeIcon className={styles.icon} icon={faClose} /> : <FontAwesomeIcon className={styles.icon} icon={faPlus} />}
            </h3>
            <CSSTransition
                in={showParagraph}
                nodeRef={paragraphRef}
                timeout={300}
                classNames='show'
            >
                <p ref={paragraphRef}>{text}</p>
            </CSSTransition>
        </div>);
};

export default AccordionTab;
