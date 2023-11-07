import { FC, ReactElement, RefObject, useRef } from 'react';

import styles from './CustomInput.module.scss'

interface ICustomInputProps {
    placeholder: string,
    inputRef?: RefObject<HTMLInputElement>,
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    keyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    inputBlur?: (input: HTMLInputElement, type: string)=>void,
    inputValue: string,
    inputType?: string,
    isLight?: boolean,
    children?: ReactElement
    id?: string
}

const CustomInput: FC<ICustomInputProps> = ({ id, children, placeholder, inputRef, inputValue, changeHandler, inputType, inputBlur, keyDownHandler, isLight }) => {
    const legendRef = useRef<HTMLLegendElement>(null)
    const inputInsideRef = useRef<HTMLInputElement>(null)

    const fieldsetStyle = isLight ? `${styles.fieldset} ${styles.light}` : styles.fieldset

    const focusHandler = () => {
        inputRef?.current ? inputRef?.current?.focus() : inputInsideRef.current?.focus()
        legendRef.current?.classList.add(`${styles.move}`)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        inputBlur && inputBlur(e.currentTarget, e.currentTarget.type)
        inputValue === '' && legendRef.current?.classList.remove(`${styles.move}`)
    }
    return (
        <fieldset className={fieldsetStyle}>
            <legend ref={legendRef} onClick={focusHandler}>{placeholder}</legend>
            <input id={id} className={styles.input} ref={inputRef ?? inputInsideRef} value={inputValue} type={inputType ? inputType : 'text'} onChange={changeHandler} onFocus={focusHandler} onBlur={blurHandler} onKeyDown={keyDownHandler}/>
            {children}
        </fieldset>
    );
};

export default CustomInput;
