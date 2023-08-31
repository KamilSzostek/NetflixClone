import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import Visa from '../../../../public/assets/VISA.png'
import Master from '../../../../public/assets/MASTERCARD.png'
import American from '../../../../public/assets/AMEX.png'
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import formStyles from '../../../styles/CreditOption.module.scss'
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCreditCard, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import ChoosenPackage from '@/components/ChoosenPackage/ChoosenPackage';
import { checkValidity } from '@/helpers/validationFunctions';

import styles from '../../../styles/SignUp.module.scss'
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';

const CreditOption: FC = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [cardNumberMessage, setCardNumberMessage] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [expirationDateMessage, setExpirationDateMessage] = useState('')
    const [CVV, setCVV] = useState('')
    const [CVVMessage, setCVVMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [firstNameMessage, setFirstNameMessage] = useState('')
    const [lastName, setLastName] = useState('')
    const [lastNameMessage, setLastNameMessage] = useState('')
    const onlyDigitsReg = new RegExp('[0-9]')
    const onlyLettersReg = new RegExp('[A-z]')

    //Function control card number field, which can contain only 16 digits separeted by space after every four digits
    const cardNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const trimedValue = value.replaceAll(' ', '');
        ((onlyDigitsReg.test(value) || value === '') && trimedValue.length <= 16) && setCardNumber(value);
        (trimedValue.length % 4 === 0) && trimedValue.length <= 15 && value !== '' && setCardNumber(value + ' ');
    }

    //Function trim last white space when user push 'Backspace' button
    const cardNumberKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Backspace" && setCardNumber(cardNumber.trimEnd())
    }
    const cardNumberMessageHandler = (message: string) => setCardNumberMessage(message)

    //Function control correct format of expiration date
    const expirationDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        (onlyDigitsReg.test(value) || value === '') && value.length <= 5 && setExpirationDate(value)
        value.length === 2 && setExpirationDate(value + '/')
    }

    //If caret is next to slash character and user push 'Backspace' button, function will delete slash
    const expirationDateKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Backspace" && e.currentTarget.value.length === 3 && setExpirationDate(expirationDate.replace('/', ''))
    }
    const expirationDateMessageHandler = (message: string) => setExpirationDateMessage(message)

    //Function control CVV code contains only digits and has length less than 4
    const CVVHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        (onlyDigitsReg.test(value) || value === '') && value.length <= 3 && setCVV(value)
    }
    const CVVMessageHandler = (message: string) => setCVVMessage(message)

    //Function control firstName input contains only letters
    const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        (onlyLettersReg.test(value) || value === '') && setFirstName(value)
    }
    const firstNameMessageHandler = (message: string) => setFirstNameMessage(message)

    //Function control lastName input contains only letters
    const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        (onlyLettersReg.test(value) || value === '') && setLastName(value)
    }
    const lastNameMessageHandler = (message: string) => setLastNameMessage(message)

    //Function prevent send of form and check which fields are valid, if field is invalid then function will set error-message
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const expirationDateCondition = (parseInt(expirationDate.substring(0, 3)) > 12 || parseInt(expirationDate.substring(3, 5)) < new Date().getFullYear() - 2001)
        checkValidity({ name: 'Card number', value: cardNumber, validCondition: cardNumber.length < 17, setMessage: cardNumberMessageHandler })
        checkValidity({ name: 'Expiration date', value: expirationDate, validCondition: expirationDateCondition, setMessage: expirationDateMessageHandler })
        checkValidity({ name: 'CVV', value: CVV, validCondition: CVV.length < 3, setMessage: CVVMessageHandler })
        checkValidity({ name: 'First name', value: firstName, validCondition: firstName.length >= 2, setMessage: firstNameMessageHandler })
        checkValidity({ name: 'Last name', value: lastName, validCondition: lastName.length >= 2, setMessage: lastNameMessageHandler })
    }

    return (
        <SignUpLayout>
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
                        <FieldWithValidation message={cardNumberMessage}>
                            <CustomInput placeholder='Card number' inputValue={cardNumber} changeHandler={cardNumberHandler} keyDownHandler={cardNumberKeyHandler} isLight>
                                <FontAwesomeIcon icon={faCreditCard} />
                            </CustomInput>
                        </FieldWithValidation>
                        <div className={formStyles.container}>
                            <FieldWithValidation message={expirationDateMessage}>
                                <CustomInput placeholder='Expiration date' inputValue={expirationDate} changeHandler={expirationDateHandler} keyDownHandler={expirationDateKeyHandler} isLight>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </CustomInput>
                            </FieldWithValidation>
                            <FieldWithValidation message={CVVMessage}>
                                <CustomInput placeholder='CVV' inputValue={CVV} changeHandler={CVVHandler} isLight>
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                </CustomInput>
                            </FieldWithValidation>
                        </div>
                        <FieldWithValidation message={firstNameMessage} >
                            <CustomInput placeholder='First Name' inputValue={firstName} changeHandler={firstNameHandler} isLight />
                        </FieldWithValidation>
                        <FieldWithValidation message={lastNameMessage}>
                            <CustomInput placeholder='Last Name' inputValue={lastName} changeHandler={lastNameHandler} isLight />
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
        </SignUpLayout>
    );
};

export default CreditOption;
