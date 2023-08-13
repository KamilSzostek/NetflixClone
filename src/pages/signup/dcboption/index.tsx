import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import Vodafone from '../../../../public/assets/vodafone.png'
import O2 from '../../../../public/assets/O2.png'
import Tmobile from '../../../../public/assets/tmobile.png'
import DialingSelect from '@/components/DialingSelect/DialingSelect';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import ChoosenPackage from '@/components/ChoosenPackage/ChoosenPackage';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import { checkValidity } from '@/helpers/validationFunctions';

import styles from '../../../styles/SignUp.module.scss';
import extraStyles from '../../../styles/DCBOption.module.scss'

const DCBOption: FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [validMessage, setValidMessage] = useState('')
    const validMessageHandler = (message: string) => setValidMessage(message)

    const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const onlyDigitsReg = new RegExp('[0-9]');
        (onlyDigitsReg.test(value) || value === '') && setPhoneNumber(e.currentTarget.value)
        checkValidity({name:'Mobile number', value, validCondition: value.length < 7, setMessage: validMessageHandler})
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkValidity({name:'Mobile number', value: phoneNumber, validCondition: phoneNumber.length < 7, setMessage: validMessageHandler})

    }
    return (
        <div className={styles.signup}>
            <NavBar isStatic linkLogo showSignButton />
            <main>
                <SignUpSection width='medium' showSection={true} isTextLeft>
                    <>
                        <StepCounter currentStep={3} totalStepInteger={3} />
                        <h2>Set up billing through your mobile carrier</h2>
                        <div className={styles.images}>
                            <Image src={Vodafone} alt='Vodafone' width={50} height={30} />
                            <Image src={O2} alt='O2' width={50} height={30} />
                            <Image src={Tmobile} alt='tmobile' width={50} height={30} />
                        </div>
                        <h3>Your Netflix membership will be added to your mobile phone bill.</h3>
                        <h3>Your number will also be used if you forget your password and for important account messages. SMS fees may apply.</h3>
                        <form onSubmit={submitHandler}>

                            <FieldWithValidation message={validMessage}>
                                <div className={extraStyles.container}>
                                    <DialingSelect isStatic listWithFlags isLight />
                                    <input value={phoneNumber} type='tel' placeholder='Mobile number' onChange={phoneNumberHandler} />
                                </div>
                            </FieldWithValidation>
                            <ChoosenPackage>
                                <p>
                                    By clicking the "Start Paid Membership" button below, you agree to our
                                    <Link href=''> Terms of Use</Link> and that you are over 18 and acknowledge the
                                    <Link href=''> Privacy Statement</Link>.
                                    Netflix will automatically continue your membership and charge the membership fee
                                    (currently €17,99/month) to your payment method until you cancel.
                                    You may cancel at any time to avoid future charges.
                                </p>
                            </ChoosenPackage>
                            <BaseButton text='Verify Phone Number' />
                        </form>
                        <span className={extraStyles.info}>We'll text a code to verify your number.</span>
                    </>
                </SignUpSection>
            </main>
        </div>
    );
};

export default DCBOption;
