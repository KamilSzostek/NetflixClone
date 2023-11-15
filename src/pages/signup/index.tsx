import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Footer from '@/components/Footer/Footer';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import Devices from '../../../public/assets/Devices.png'
import StepCounter from '@/components/StepCounter/StepCounter';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import { emailValidation, passwordValidation } from '@/helpers/validationFunctions';
import { initialSelectedPlan } from './planform';
import { IUser } from '@/helpers/interfaces';
import Link from 'next/link';
import { useShowPageSignup } from '@/hooks/useShowPageSignup';

import styles from '../../styles/SignUp.module.scss'
import { encrypt } from '@/helpers/dataEncryption';

const SignUp: FC = () => {
    const router = useRouter()

    const [email, setEmail] = useState(setNewMember())
    const [emailValidMessage, setEmaiValidMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidMessage, setPasswordValidMessage] = useState('')
    const [showFirstSection, setShowFirstSection] = useState(true)
    const [showSecondSection, setShowSecondSection] = useState(false)
    const [accountExisted, setAccountExisted] = useState(false)

    const emialInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        emialInputRef.current?.focus()
    }, [showSecondSection])


    const totalStepInteger = 3
    const linkArr = ['FAQ', 'Cancel Membership', 'Help Center', 'Netflix Shop', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Impressum']

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)

    const showSecondSectionHandler = () => {
        setShowFirstSection(false)
        setShowSecondSection(true)
    }

    function setNewMember() {
        let newMember;
        try {
            newMember = sessionStorage.getItem('newMember')!
            return newMember
        }
        catch (e) {
            return 'No email in session storage'
        }
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const plan = initialSelectedPlan
        if (emailValidation(email) && passwordValidation(password)) {

            const newUser = JSON.stringify({
                email,
                password,
                plan,
                phoneNumber: '',
                creditCard: {
                    firstName: '',
                    lastName: '',
                    cardNumber: '',
                    CVV: 0,
                    expirationDate: ''
                },
                profiles: [],
                isMembershipPaid: false,
                isActive: false
            })
            setPasswordValidMessage('')
            try {
                const response = await fetch(`/api/users/${email}`)
                const user: IUser = await response.json()
                user.isActive && setAccountExisted(true)
                if (user) {
                    if (user.isActive) {
                        setAccountExisted(true)
                    }
                    else {
                        fetch('/api/users', {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'PUT',
                            body: newUser
                        }).then(res => res.json()).then(() => {
                            sessionStorage.setItem('newMember', email)
                            router.push('/signup/planform')
                        }
                        ).catch(err => console.error(err))
                    }
                }
                else {
                    fetch('/api/users', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: newUser
                    }).then(res => res.json()).then((data) => {
                        console.log(encrypt(password));
                        console.log(data.user.hash);
                        sessionStorage.setItem('newMember', email)
                        // router.push('/signup/planform')
                    }).catch(err => console.error(err))
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            email === '' ? setEmaiValidMessage('Email is required.') : (emailValidation(email) ? setEmaiValidMessage('') : setEmaiValidMessage('Please enter a valid email address.'))
            password === '' ? setPasswordValidMessage('Password is required.') : (passwordValidation(password) ? setPasswordValidMessage('') : setPasswordValidMessage('Your password must contain between 4 and 60 characters.'))
        }
    }
    return (
        <SignUpLayout children2={<Footer linkList={linkArr} lightBg />}>
            <>
                <SignUpSection width='small' showSection={showFirstSection} showSectionHandler={() => setShowFirstSection(!showFirstSection)}>
                    <>
                        <Image width={260} height={60} src={Devices} alt='devices' />
                        <StepCounter currentStep={1} totalStepInteger={totalStepInteger} />
                        <h2>Finish setting up your account</h2>
                        <p>Netflix is personalized for you. <br /> Create a password to start watching Netflix.</p>
                        <BaseButton text='Next' onClick={showSecondSectionHandler} />
                    </>
                </SignUpSection>
                <SignUpSection width='medium' isTextLeftAllign showSection={showSecondSection}>
                    <>
                        <StepCounter currentStep={1} totalStepInteger={totalStepInteger} />
                        <h2>Create a password to start your membership</h2>
                        <p>Just a few more steps and you're !<br /> We hate paperwork, too.</p>
                        <form onSubmit={submitHandler}>
                            <FieldWithValidation message={emailValidMessage}>
                                <CustomInput placeholder='Email' inputValue={email} inputRef={emialInputRef} inputType='email' changeHandler={emailChangeHandler} isLight />
                            </FieldWithValidation>
                            <FieldWithValidation message={passwordValidMessage}>
                                <CustomInput placeholder='Add a password' inputValue={password} inputRef={passwordInputRef} inputType='password' changeHandler={passwordChangeHandler} isLight />
                            </FieldWithValidation>
                            {accountExisted && (
                                <div className={styles.infoFrame}>
                                    <span>We already have account with that email. Change email or try </span>
                                    <Link href={'/login'} onClick={() => sessionStorage.removeItem('newMember')}>Log In</Link>.
                                </div>)}
                            <label htmlFor="remember"><input id='remember' type='checkbox' /><span>Yes, please email me Netflix special offers.</span></label>
                            <BaseButton text='Next' />
                        </form>
                    </>
                </SignUpSection>
            </>
        </SignUpLayout>
    );
};

export default SignUp;