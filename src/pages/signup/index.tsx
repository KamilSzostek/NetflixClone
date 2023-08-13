import { FC, useRef, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';
import Image from 'next/image';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CheckList from '@/components/CheckList/CheckList';
import Devices from '../../../public/assets/Devices.png'
import Check from '../../../public/assets/Checkmark.png'
import { emailValidation, passwordValidation } from '@/helpers/validationFunctions';
import StepCounter from '@/components/StepCounter/StepCounter';

import styles from '../../styles/SignUp.module.scss'

const SignUp: FC = () => {
    const [email, setEmail] = useState('')
    const [emailValidMessage, setEmaiValidMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidMessage, setPasswordValidMessage] = useState('')
    const [stepNumber, setStepNumber] = useState(1)
    const [showFirstSection, setShowFirstSection] = useState(true)
    const [showSecondSection, setShowSecondSection] = useState(false)
    const [showThirdSection, setShowThirdSection] = useState(false)

    const emialInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    const totalStepInteger = 3

    const linkArr = ['FAQ', 'Cancel Membership', 'Help Center', 'Netflix Shop', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Impressum']
    const preplanArr = ['No commitments, cancel anytime.', 'Endless entertainment for one low price.', 'Enjoy Netflix on all your devices.']

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)

    const showSecondSectionHandler = () => {
        setShowFirstSection(false)
        setShowSecondSection(true)
    }

    function increaseStepNumber() {
        stepNumber < totalStepInteger && setStepNumber(stepNumber + 1)
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (emailValidation(email) && passwordValidation(password)) {
            increaseStepNumber()
            setShowSecondSection(false)
            setShowThirdSection(true)
        }
        else {
            email === '' ? setEmaiValidMessage('Email is required.') : (emailValidation(email) ? setEmaiValidMessage('') : setEmaiValidMessage('Please enter a valid email address.'))
            password === '' ? setPasswordValidMessage('Password is required.') : (passwordValidation(password) ? setPasswordValidMessage('') : setPasswordValidMessage('Your password must contain between 4 and 60 characters.'))
        }
    }
    return (
        <div className={styles.signup}>
            <NavBar linkLogo showSignButton isStatic />
            <main className={styles.main}>
                <SignUpSection width='small' showSection={showFirstSection} showSectionHandler={() => setShowFirstSection(!showFirstSection)}>
                    <>
                        <Image width={260} height={60} src={Devices} alt='devices' />
                        <StepCounter currentStep={stepNumber} totalStepInteger={totalStepInteger}/>
                        <h2>Finish setting up your account</h2>
                        <p>Netflix is personalized for you. <br /> Create a password to start watching Netflix.</p>
                        <BaseButton text='Next' onClick={showSecondSectionHandler} />
                    </>
                </SignUpSection>
                <SignUpSection width='medium' isTextLeft showSection={showSecondSection}>
                    <>
                        <StepCounter currentStep={stepNumber} totalStepInteger={totalStepInteger}/>
                        <h2>Create a password to start your membership</h2>
                        <p>Just a few more steps and you're !<br /> We hate paperwork, too.</p>
                        <form onSubmit={submitHandler}>
                            <FieldWithValidation message={emailValidMessage}>
                                <CustomInput placeholder='Email' inputValue={email} inputRef={emialInputRef} inputType='email' changeHandler={emailChangeHandler} isLight />
                            </FieldWithValidation>
                            <FieldWithValidation message={passwordValidMessage}>
                                <CustomInput placeholder='Add a password' inputValue={password} inputRef={passwordInputRef} inputType='password' changeHandler={passwordChangeHandler} isLight />
                            </FieldWithValidation>
                            <label htmlFor="remember"><input id='remember' type='checkbox' /><span>Yes, please email me Netflix special offers.</span></label>
                            <BaseButton text='Next' />
                        </form>
                    </>
                </SignUpSection>
                <SignUpSection width='small' showSection={showThirdSection}>
                    <>
                        <Image width={70} height={70} src={Check} alt='devices' />
                        <StepCounter currentStep={stepNumber} totalStepInteger={totalStepInteger}/>
                        <h2>Choose your plan</h2>
                        <CheckList content={preplanArr} />
                        <BaseButton text='Next' linkPath='/signup/planform'/>
                    </>
                </SignUpSection>
            </main>
            <Footer linkList={linkArr} lightBg />
        </div>

    );
};

export default SignUp;
