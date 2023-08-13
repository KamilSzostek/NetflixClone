import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import Visa from '../../../../public/assets/VISA.png'
import Master from '../../../../public/assets/MASTERCARD.png'
import American from '../../../../public/assets/AMEX.png'
import DialingSelect from '@/components/DialingSelect/DialingSelect';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import ChoosenPackage from '@/components/ChoosenPackage/ChoosenPackage';
import BaseButton from '@/components/ui/BaseButton/BaseButton';

import styles from '../../../styles/SignUp.module.scss';
import extraStyles from '../../../styles/DCBOption.module.scss'

interface IDCBOptionProps {
}

const DCBOption: React.FunctionComponent<IDCBOptionProps> = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('')

    const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.currentTarget.value) 
    return (
        <div className={styles.signup}>
            <NavBar isStatic linkLogo showSignButton />
            <main>
                <SignUpSection width='medium' showSection={true} isTextLeft>
                    <>
                        <StepCounter currentStep={3} totalStepInteger={3} />
                        <h2>Set up billing through your mobile carrier</h2>
                        <div className={styles.images}>
                            <Image src={Visa} alt='visa' width={50} height={30} />
                            <Image src={Master} alt='master' width={50} height={30} />
                            <Image src={American} alt='master' width={50} height={30} />
                        </div>
                        <h3>Your Netflix membership will be added to your mobile phone bill.</h3>
                        <h3>Your number will also be used if you forget your password and for important account messages. SMS fees may apply.</h3>
                        <FieldWithValidation message='Mobile is required'>
                            <div className={extraStyles.container}>
                                <DialingSelect isStatic listWithFlags isLight />
                                <input value={phoneNumber} type='tel' placeholder='Mobile number' onChange={phoneNumberHandler} pattern=''/>
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
                        <span className={extraStyles.info}>We'll text a code to verify your number.</span>
                    </>
                </SignUpSection>
            </main>
        </div>
    );
};

export default DCBOption;
