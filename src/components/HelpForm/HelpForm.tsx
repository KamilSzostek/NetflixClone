import { FC, useRef, useState } from 'react';
import FieldWithValidation from '../FieldWithValidation/FieldWithValidation';
import BaseButton from '../ui/BaseButton/BaseButton';
import DialingSelect from '../DialingSelect/DialingSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './HelpForm.module.scss'

const HelpForm: FC = () => {
    const [method, setMethod] = useState('email')
    const [message, setMessage] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const emailReg = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$')
        !inputRef.current?.value.match(emailReg) ? setMessage('Please enter a valid email address.') : setMessage('')
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2>Forgot Email/Password</h2>
            <section>
                <p>How would you like to reset your password?</p>
                <label htmlFor="email">
                    <input id='email' value='email' name='method' type="radio" onClick={() => setMethod('email')} />
                    <span>Email</span>
                </label>
                <label htmlFor='sms'>
                    <input id='sms' value='sms' name='method' type="radio" onClick={() => setMethod('sms')} />
                    <span>Text Message(SMS)</span>
                </label>
            </section>
            <section>
                {method === 'email' ? <p>We will send you an email with instructions on how to reset your password.</p>
                    : <p>We will text you a verification code to reset your password. Message and data rates may apply.</p>}
                <FieldWithValidation message={message}>
                    {method === 'email' ? <input ref={inputRef} type="email" placeholder='name@example.com' />
                        : <div className={styles.phoneselect}>
                            <DialingSelect isStatic listWithFlags isLight/>
                            <input ref={inputRef} type='tel' />
                        </div>}
                </FieldWithValidation>
            </section>
            <BaseButton text={method === 'email' ? 'Email me' : 'Text me'} />
            <button>I don't remember my email or phone.</button>
        </form>
    );
};

export default HelpForm;
