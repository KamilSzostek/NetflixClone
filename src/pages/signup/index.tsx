import { FC, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';
import Image from 'next/image';
import Devices from '../../../public/assets/Devices.png'
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CheckList from '@/components/CheckList/CheckList';

import styles from '../../styles/SignUp.module.scss'
import { emailValidation, passwordValidation } from '@/helpers/validationFunctions';

const SignUp: FC = () => {
    const [email, setEmail] = useState('')
    const [emailValidMessage, setEmaiValidMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidMessage, setPasswordValidMessage] = useState('')
    const [stepNumber, setStepNumber] = useState(1)
    const [showFirstSection, setShowFirstSection] = useState(false)
    const [showSecondSection, setShowSecondSection] = useState(true)
    const [showThirdSection, setShowThirdSection] = useState(false)
    const [showFourthSection, setShowFourthSection] = useState(false)
    const totalStepInteger = 3

    const linkArr = ['FAQ', 'Cancel Membership', 'Help Center', 'Netflix Shop', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Impressum']
    const preplanArr = ['No commitments, cancel anytime.', 'Endless entertainment for one low price.', 'Enjoy Netflix on all your devices.']

    function showSectionHandler(buttonNumber: number) {
        switch (buttonNumber) {
            case 1: setShowFirstSection(false)
                setShowSecondSection(true)
                break;
            case 2: setShowSecondSection(false)
                setShowThirdSection(true)
                break;
            case 3: setShowThirdSection(false)
                setShowFourthSection(true)
                break;
            default: return

        }
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        email === '' && setEmaiValidMessage('Email is required')
        emailValidation(email) ? setEmaiValidMessage('Email is incorrect') : setEmaiValidMessage('')
        password === '' && setPasswordValidMessage('Password is required.');
        passwordValidation(password) ? setPasswordValidMessage('') : setPasswordValidMessage('Your password must contain between 4 and 60 characters.')
        if (emailValidMessage === '' && passwordValidMessage === '') {
            stepNumberHandler()
            showSectionHandler(2)
        }
    }

    const stepNumberHandler = () => {
        stepNumber < totalStepInteger && setStepNumber(stepNumber + 1)
    }
    return (
        <div className={styles.signup}>
            <NavBar linkLogo showSignButton isStatic/>
            <main className={styles.main}>
                <SignUpSection showSection={showFirstSection}>
                    <>
                        <Image width={260} height={60} src={Devices} alt='devices' />
                        <h3>step <span>{stepNumber}</span> of <span>{totalStepInteger}</span></h3>
                        <h2>Finish setting up your account</h2>
                        <p>Netflix is personalized for you. <br /> Create a password to start watching Netflix.</p>
                        <BaseButton text='Next' isBig onClick={() => showSectionHandler(1)} />
                    </>
                </SignUpSection>
                <SignUpSection showSection={showSecondSection}>
                    <>
                        <h3>step <span>{stepNumber}</span> of <span>{totalStepInteger}</span></h3>
                        <h2>Create a password to start your membership</h2>
                        <p>Just a few more steps and you're !<br /> We hate paperwork, too.</p>
                        <form onSubmit={submitHandler}>
                            <FieldWithValidation message={emailValidMessage}>
                                <CustomInput placeholder='Email' inputValue={email} />
                            </FieldWithValidation>
                            <FieldWithValidation message={passwordValidMessage}>
                                <CustomInput placeholder='Add a password' inputValue={password} />
                            </FieldWithValidation>
                            <label htmlFor="remember"><input id='remember' type='checkbox' />Yes, please email me Netflix special offers.</label>
                            <BaseButton text='Next' isBig />
                        </form>
                    </>
                </SignUpSection>
                <SignUpSection showSection={showThirdSection}>
                    <>
                        <Image width={200} height={100} src={Devices} alt='devices' />
                        <h3>step {stepNumber} of {totalStepInteger}</h3>
                        <CheckList content={preplanArr} />
                        <BaseButton text='Next' linkPath='/singup/planform' isBig onClick={() => { showSectionHandler(3); stepNumberHandler() }} />
                    </>
                </SignUpSection>
            </main>
            <Footer linkList={linkArr} lightBg/>
        </div>

    );
};

export default SignUp;
