import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import Visa from '../../../../public/assets/VISA.png'
import Master from '../../../../public/assets/MASTERCARD.png'
import American from '../../../../public/assets/AMEX.png'
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import BaseButton from '@/components/ui/BaseButton/BaseButton';

import formStyles from '../../../styles/CreditOption.module.scss'
import styles from '../../../styles/SignUp.module.scss'
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCreditCard, faIdCard, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import ChoosenPackage from '@/components/ChoosenPackage/ChoosenPackage';

const CreditOption: FC = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [CVV, setCVV] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    //Function which set error message 
    const errorHandler = (fieldName: string) => {
        return `${fieldName} is required`
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <div className={styles.signup}>
            <NavBar isStatic linkLogo showSignButton />
            <main>
                <SignUpSection width='medium' showSection={true}>
                    <>
                        <StepCounter currentStep={3} totalStepInteger={3} />
                        <h2>Set up your credit or debit card</h2>
                        <div className={styles.images}>
                            <Image src={Visa} alt='visa' width={50} height={30} />
                            <Image src={Master} alt='master' width={50} height={30} />
                            <Image src={American} alt='master' width={50} height={30} />
                        </div>
                        <form className={formStyles.form} onSubmit={submitHandler}>
                            <FieldWithValidation message={errorHandler('Card number')}>
                                <CustomInput placeholder='Card number' inputValue={cardNumber} isLight>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </CustomInput>
                            </FieldWithValidation>
                            <div className={formStyles.container}>
                                <FieldWithValidation message={errorHandler('Expiration date')}>
                                    <CustomInput placeholder='Expiration date' inputValue={expirationDate} isLight>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                    </CustomInput>
                                </FieldWithValidation>
                                <FieldWithValidation message={errorHandler('CVV code')}>
                                    <CustomInput placeholder='CVV' inputValue={CVV} isLight>
                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                    </CustomInput>
                                </FieldWithValidation>
                            </div>
                            <FieldWithValidation message={errorHandler('First name')} >
                                <CustomInput placeholder='First Name' inputValue={firstName} isLight />
                            </FieldWithValidation>
                            <FieldWithValidation message={errorHandler('Last name')}>
                                <CustomInput placeholder='Last Name' inputValue={lastName} isLight />
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
                            <BaseButton text='Start Paid Membership' />
                        </form>
                    </>
                </SignUpSection>
            </main>
        </div>
    );
};

export default CreditOption;
