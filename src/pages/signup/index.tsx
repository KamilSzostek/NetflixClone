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
import { ObjectId } from 'mongodb';
import { initialSelectedPlan } from './planform';
import KidsIcon from '../../../public/assets/profiles/kids.png'

export interface IUser {
    _id: ObjectId,
    email: string,
    password: string
    isMembershipPaid: boolean
}

export const kidsProfile = {
    name: 'Kids',
    image: KidsIcon,
    nickname: '',
    preferedLanguage: {
        _id: "1",
        code: "en",
        name: "English",
        nativeName: "English"
    },
    ageGroup: 'Kids',
    autoNextEpisode: true,
    autoPreview: true
}

const SignUp: FC = () => {
    const router = useRouter()

    const [email, setEmail] = useState(setNewMember())
    const [emailValidMessage, setEmaiValidMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidMessage, setPasswordValidMessage] = useState('')
    const [showFirstSection, setShowFirstSection] = useState(true)
    const [showSecondSection, setShowSecondSection] = useState(false)

    const emialInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        emialInputRef.current?.focus()
    }, [showSecondSection])


    const totalStepInteger = 3
    const linkArr = ['FAQ', 'Cancel Membership', 'Help Center', 'Netflix Shop', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Impressum']

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        sessionStorage.setItem('newMember', e.currentTarget.value)
        setEmail(e.currentTarget.value)
    }
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
            return ''
        }
    }

    function isTypedEmailInDatabase(data: [IUser]) {
        for (const user of data) {
            if (user.email === sessionStorage.getItem('newMember'))
                return true
        }
        return false
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const plan = initialSelectedPlan
        if (emailValidation(email) && passwordValidation(password)) {//check email and password have correct format
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
                profiles: [kidsProfile],
                isMembershipPaid: false
            })
            setPasswordValidMessage('')
            try {
                const response = await fetch('/api/users') //get all users from database
                const data: [IUser] = await response.json()
                if (isTypedEmailInDatabase(data)) {//if email isn't in database add new user to database
                    fetch('/api/users', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'PUT',
                        body: newUser
                    }).then(res => res.json()).then(data => router.push('/signup/planform')).catch(err => console.error(err))
                }
                else {
                    fetch('/api/users', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: newUser
                    }).then(res => res.json()).then(data => router.push('/signup/planform')).catch(err => console.error(err))
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        else { //if email or password don't have correct format clear input fields and show warrning info
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
