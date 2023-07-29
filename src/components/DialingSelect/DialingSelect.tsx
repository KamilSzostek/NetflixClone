import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './DialingSelect.module.scss'

const countryCallingCodes = [
    { country: "United States", code: "+1" },
    { country: "United Kingdom", code: "+44" },
    { country: "Australia", code: "+61" },
    { country: "France", code: "+33" },
    { country: "Poland", code: "+48" },
];

interface IDialingSelectProps {
    showDialingList: boolean,
    hideListHandler: () => void,
    dialingCodeHandler: (code: string) => void
}

const DialingSelect: FC<IDialingSelectProps> = ({ showDialingList, hideListHandler, dialingCodeHandler }) => {
   const dialingListRef = useRef<HTMLUListElement>(null)
    return (
        <CSSTransition
            in={showDialingList}
            node={dialingListRef}
            timeout={300}
            unmountOnExit
        >
            <ul className={styles.list} ref={dialingListRef} onMouseLeave={hideListHandler}>
                {countryCallingCodes.map((country, index) => (<li key={index} onClick={() => dialingCodeHandler(country.code)} ><span>{country.code}</span><span>{country.country}</span></li>))}
            </ul>
        </CSSTransition>
    );
};

export default DialingSelect;
