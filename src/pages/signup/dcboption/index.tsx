import { FC, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import { useSelector } from 'react-redux';
import { planSelector, priceSelector } from '@/store/typePlan';
import { useRouter } from 'next/router';

import styles from '../../../styles/SignUp.module.scss';
import extraStyles from '../../../styles/DCBOption.module.scss'


const DCBOption: FC = () => {
    const router = useRouter()
    const plan = useSelector(planSelector)
    let newAccountToAdd = ''
    const price = useSelector(priceSelector)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [validMessage, setValidMessage] = useState('')
    const validMessageHandler = (message: string) => setValidMessage(message)

    useLayoutEffect(() => {
        newAccountToAdd = sessionStorage.getItem('newMember')!
        if (newAccountToAdd === undefined)
            router.push('/signup')
        else if (plan.price === '')
            router.push('/signup/planform')
    })


    const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const onlyDigitsReg = new RegExp('[0-9]');
        (onlyDigitsReg.test(value) || value === '') && setPhoneNumber(e.currentTarget.value)
        checkValidity({ name: 'Mobile number', value, validCondition: value.length < 7, setMessage: validMessageHandler })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkValidity({ name: 'Mobile number', value: phoneNumber, validCondition: phoneNumber.length < 7, setMessage: validMessageHandler })
        if (validMessage === '') {
            const newUser = {
                email: sessionStorage.getItem('newMembership'),
                plan
            }
            fetch('/api/users', {
                method: 'PUT',
                headers: {
                    "ContentType": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            router.push('/browse')
        }
    }

    if (plan.price !== '')
        return (
            <SignUpLayout>
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
                                    (currently €{price}/month) to your payment method until you cancel.
                                    You may cancel at any time to avoid future charges.
                                </p>
                            </ChoosenPackage>
                            <BaseButton text='Verify Phone Number' />
                        </form>
                        <span className={extraStyles.info}>We'll text a code to verify your number.</span>
                    </>
                </SignUpSection>
            </SignUpLayout>
        );
};

export default DCBOption;
