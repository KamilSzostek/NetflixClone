import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import BaseButton from '../ui/BaseButton/BaseButton';
import CustomInput from '../ui/CustomInput/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { emailValidation } from '@/helpers/validationFunctions';

import styles from './Memebership.module.scss'

const Membership: FC = () => {
    const [validationText, setValidationText] = useState<string>('Email is required')
    const [inputValue, setInputValue] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null)
    const validRef = useRef<HTMLElement>(null)

    const router = useRouter()

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (emailValidation(inputValue)){
            sessionStorage.setItem('newMember', inputValue)          
            router.push('/signup')
        }
        else {
            inputRef.current?.classList.add('red-border')
            validRef.current?.classList.add('opacity-1')
            inputValue === '' ? setValidationText('Email is required.') : setValidationText('Please enter a valid email address')
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)

        if (inputValue.length > 5 && !emailValidation(inputValue)) {
            setValidationText('Please enter a valid email address')
            validRef.current?.classList.add('opacity-1')
        }
        else {
            validRef.current?.classList.remove('opacity-1')
            setValidationText('')
        }
    }
    return (
        <section className={styles.newsletter}>
            <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
            <form onSubmit={submitHandler}>
                <div>
                    <CustomInput placeholder='Email address' inputValue={inputValue} inputRef={inputRef} changeHandler={changeHandler} />
                    <small ref={validRef}><FontAwesomeIcon className={styles.icon} icon={faCircleXmark} />{validationText}</small>
                </div>
                <BaseButton text='get started' isBig icon={faChevronRight} />
            </form>
        </section>);
};

export default Membership;
