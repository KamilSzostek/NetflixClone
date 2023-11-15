import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomInput from '../ui/CustomInput/CustomInput';
import BaseButton from '../ui/BaseButton/BaseButton';
import FieldWithValidation from '../FieldWithValidation/FieldWithValidation';
import DialingSelect from '../DialingSelect/DialingSelect';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import styles from './SignInForm.module.scss'

const SignInForm: FC = () => {
    const {data: session, status} = useSession()
    const router = useRouter()

    const [email, setEmail] = useState(router.query.email as string || '')
    const [password, setPassword] = useState('')
    const [isRememberMe, setIsRememberMe] = useState(false)
    const [showPhoneSelect, setShowPhoneSelect] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loginValidMessage, setLoginValidMessage] = useState('')
    const [passwordValidMessage, setPasswordValidMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showInfo, setShowInfo] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (sessionStorage.getItem('newMember')) {
            router.query.activeAccount === '' && setEmail(sessionStorage.getItem('newMember')!)
            sessionStorage.removeItem('newMember')
            formRef.current?.querySelector('input')?.focus()
        }
    }, [])

    const loginChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const login = e.currentTarget.value
        setEmail(login)
        const noNumbers = new RegExp(/[^0-9]+/g)
        const onlyNumbers = new RegExp(/[0-9]+/g)
        if (login.match(onlyNumbers)) {
            setLoginValidMessage('Please enter a valid phone number.')
            setShowPhoneSelect(true)
        }
        if (login.match(noNumbers)) {
            setShowPhoneSelect(false)
            setLoginValidMessage('Please enter a valid email address.')
        }
        login === '' && setLoginValidMessage('Please enter a valid email address or phone number.')
        login.length > 5 && setLoginValidMessage('')
    }
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.currentTarget.value
        setPassword(e.currentTarget.value)
        password === '' && setPasswordValidMessage('Your password must contain between 4 and 60 characters.')
        password.length > 4 && setPasswordValidMessage('')
    }
    const inputBlurHandling = (input: HTMLInputElement, type: string) => {
        if (input.value.length < 5) {
            input.classList.add(styles.invalid)
            type === 'text' ? input.value === '' && setLoginValidMessage('Please enter a valid email address or phone number.') : setPasswordValidMessage('Your password must contain between 4 and 60 characters.')
        }
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials = {
            email,
            password
        }
        const status = await signIn('credentials', {
            redirect: false,
            email: credentials.email,
            password: credentials.password,
        });
        if (status?.ok) {
            router.push('/browse')
        }
        else {
            setPassword('')
            setLoginValidMessage('')
            setPasswordValidMessage('')
            status?.error && setErrorMessage(status.error + ". Please try again.")
        }
    }

    return (
        <form ref={formRef} className={styles.form} onSubmit={submitHandler}>
            {router.query.activeAccount === '' && <p className={styles.message}>Account with that email address already exist. Try to sign in.</p>}
            <h2>sign in</h2>
            {errorMessage !== '' && <p className={styles.error}>{errorMessage}</p>}
            <FieldWithValidation message={loginValidMessage}>
                <CustomInput placeholder='Email or phone number' inputValue={email} inputBlur={inputBlurHandling} changeHandler={loginChangeHandler}>
                    {showPhoneSelect ? <DialingSelect /> : undefined}
                </CustomInput>
            </FieldWithValidation>
            <FieldWithValidation message={passwordValidMessage}>
                <CustomInput placeholder='Password' inputValue={password} inputType={showPassword ? 'text' : 'password'} inputBlur={inputBlurHandling} changeHandler={passwordChangeHandler}>
                    {showPassword ? <div className={styles.showpass} onClick={() => setShowPassword(!showPassword)}>hide</div> : <div className={styles.showpass} onClick={() => setShowPassword(!showPassword)} >show</div>}
                </CustomInput>
            </FieldWithValidation>

            <BaseButton text='sign in' />
            <div className={styles.remember}>
                <label htmlFor="remember"><input id='remember' type='checkbox' checked={isRememberMe} onChange={() => setIsRememberMe(!isRememberMe)} />Remember me</label>
                <Link href='/LoginHelp'>Need help?</Link>
            </div>
            <div className={styles.recaptcha}>
                <h4>New to Netflix? <Link href='/'>Sign up now.</Link></h4>
                <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.{!showInfo && <span onClick={() => setShowInfo(true)}>Learn more.</span>}</p>
                {showInfo && <p>The information collected by Google reCAPTCHA is subject to the Google <Link href='https://policies.google.com/privacy'>Privacy Policy</Link> and <Link href='https://policies.google.com/terms'>Terms of Service</Link>, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).</p>}
            </div>
        </form>);
};

export default SignInForm;
