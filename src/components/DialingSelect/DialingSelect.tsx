import { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import { countryDialings } from '../../helpers/countryDialings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './DialingSelect.module.scss'

interface IPropsDialingSelect {
    isStatic?: boolean,
    listWithFlags?: boolean,
    isLight?: boolean 
}

const DialingSelect: FC<IPropsDialingSelect> = ({ isStatic, listWithFlags, isLight }) => {
    const [selectedDialingCode, setSelectedDialingCode] = useState('+49')
    const [showDialingList, setShowDialingList] = useState(false)
    const dialingListRef = useRef<HTMLUListElement>(null)

    const dialingCodeHandler = (code: string) => setSelectedDialingCode(code)

    const arrowIconRef = useRef<SVGSVGElement>(null)

    const selectStyle = isStatic ? `${styles.dialing} ${styles.static}` : styles.dialing
    const listStyle = isLight ? `${styles.list} ${styles.light}` : styles.list

    const showListHandler = () => {
        setShowDialingList(true)
        arrowIconRef.current?.classList.add('turnaround')
    }
    const hideListHandler = () => {
        setShowDialingList(false)
        arrowIconRef.current?.classList.remove('turnaround')
    }

    const flag = countryDialings.map(dialing => (<Image id={dialing.code} width={20} height={20} src={dialing.flag} alt={`${dialing.country} flag icon`} />)).find(img => img.props.id === selectedDialingCode)

    const dialingCodes = countryDialings.map((dialing, index) => {
        if (dialing.code === selectedDialingCode)
            return <li className={styles.selected} key={index} onClick={() => dialingCodeHandler(dialing.code)} >{listWithFlags && <Image id={dialing.code} width={20} height={20} src={dialing.flag} alt={`${dialing.country} flag icon`} />}{dialing.country}<span>{dialing.code}</span></li>
        else return <li key={index} onClick={() => dialingCodeHandler(dialing.code)} >{listWithFlags && <Image id={dialing.code} width={20} height={20} src={dialing.flag} alt={`${dialing.country} flag icon`} />}<span>{dialing.country}</span><span>{dialing.code}</span></li>
    })

    return (
        <section >
            <div className={selectStyle} onClick={showListHandler}> {flag}<span>{selectedDialingCode}</span><FontAwesomeIcon ref={arrowIconRef} className={styles.arrowdown} icon={faChevronDown} /></div>
            <CSSTransition
                in={showDialingList}
                node={dialingListRef}
                timeout={300}
                unmountOnExit
            >
                <ul className={listStyle} ref={dialingListRef} onMouseLeave={hideListHandler}>
                    {dialingCodes}
                </ul>
            </CSSTransition>
        </section>
    );
};

export default DialingSelect;
