import { FC, useRef, useState } from 'react';
import BaseButton from '../ui/BaseButton/BaseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import styles from './Newsletter.module.scss'
import CustomInput from '../ui/CustomInput/CustomInput';

const Newsletter: FC = () => {
    const [validationText, setValidationText] = useState<string>('Email is required')
    const [inputValue, setInputValue] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null)
    const validRef = useRef<HTMLElement>(null)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (inputValue === '') {
            setValidationText('Email is required.')
            inputRef.current?.classList.add('red-border')
            validRef.current?.classList.add('opacity-1')
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        const emailRegex = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$')

        if (inputValue.length > 5 && !inputValue.match(emailRegex)) {
            setValidationText('Please enter a valid email addres')
            validRef.current?.classList.add('opacity-1')
        }
        else
            validRef.current?.classList.remove('opacity-1')
    }
    return (
        <section className={styles.newsletter}>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <form onSubmit={submitHandler}>
                <div>
                    <CustomInput placeholder='Email address' inputValue={inputValue} inputRef={inputRef} changeHandler={changeHandler} />
                    <small ref={validRef}><FontAwesomeIcon className={styles.icon} icon={faCircleXmark} />{validationText}</small>
                </div>
                <BaseButton text='get started' isBig icon={faChevronRight} />
            </form>
        </section>);
};

export default Newsletter;
