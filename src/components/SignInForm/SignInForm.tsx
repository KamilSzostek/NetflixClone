import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";
import CustomInput from '../ui/CustomInput/CustomInput';
import BaseButton from '../ui/BaseButton/BaseButton';
import FieldWithValidation from '../FieldWithValidation/FieldWithValidation';
import DialingSelect from '../DialingSelect/DialingSelect';

import styles from './SignInForm.module.scss'


const SignInForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPhoneSelect, setShowPhoneSelect] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loginValidMessage, setLoginValidMessage] = useState('')
    const [passwordValidMessage, setPasswordValidMessage] = useState('')

    const [showInfo, setShowInfo] = useState(false)

    const reCaptchaRef = useRef<ReCAPTCHA>(null)

    const router = useRouter()

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

    const reCaptchaChangeHandler = async (captchaCode: string | null) => {
        if (!captchaCode) {
            return;
        }
        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                body: JSON.stringify({ email, password, captcha: captchaCode }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                router.push('/browse')
            } else {

                const error = await response.json();
                throw new Error(error.message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            reCaptchaRef.current && reCaptchaRef.current.reset();
            setEmail("");
            setPassword("");
        }
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const captcha = reCaptchaRef.current
        captcha && captcha.execute();
        if(loginValidMessage === '' && passwordValidMessage === '' && email === 'kamil@s.pl' && password === 'kamil')
        router.push('/browse')
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2>sign in</h2>
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
                <label htmlFor="remember"><input id='remember' type='checkbox' />Remember me</label>
                <Link href='/LoginHelp'>Need help?</Link>
            </div>
            <div className={styles.recaptcha}>
                <h4>New to Netflix? <Link href='/'>Sign up now.</Link></h4>
                <div>
                    <ReCAPTCHA
                        ref={reCaptchaRef}
                        size="invisible"
                        sitekey='6LcjA2UnAAAAADv5krbxXAKbn1XFcvxBQN80tXCL'
                        // onChange={reCaptchaChangeHandler}
                        badge='inline'
                    />
                </div>
                <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.{!showInfo && <span onClick={() => setShowInfo(true)}>Learn more.</span>}</p>
                {showInfo && <p>The information collected by Google reCAPTCHA is subject to the Google <Link href='https://policies.google.com/privacy'>Privacy Policy</Link> and <Link href='https://policies.google.com/terms'>Terms of Service</Link>, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).</p>}
            </div>
        </form>);
};

export default SignInForm;
