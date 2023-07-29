import { FC, ReactElement, RefObject, useRef } from 'react';

import styles from './CustomInput.module.scss'

interface ICustomInputProps {
    placeholder: string,
    inputRef?: RefObject<HTMLInputElement>,
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputBlur?: (input: HTMLInputElement, type: string)=>void,
    inputValue: string,
    inputType?: string,
    children?: ReactElement
}

const CustomInput: FC<ICustomInputProps> = ({ children, placeholder, inputRef, inputValue, changeHandler, inputType, inputBlur }) => {
    const legendRef = useRef<HTMLLegendElement>(null)
    
    const focusHandler = () => {
        legendRef.current?.classList.add(`${styles.move}`)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        inputBlur && inputBlur(e.currentTarget, e.currentTarget.type)
        inputValue === '' && legendRef.current?.classList.remove(`${styles.move}`)
    }
    return (
        <fieldset className={styles.fieldset}>
            <legend ref={legendRef}>{placeholder}</legend>
            <input className={styles.input} ref={inputRef} value={inputValue} type={inputType ? inputType : 'text'} onChange={changeHandler} onFocus={focusHandler} onBlur={blurHandler} />
            {children}
        </fieldset>
    );
};

export default CustomInput;
