import { FC, useState } from 'react';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import StepCounter from '@/components/StepCounter/StepCounter';
import FieldWithValidation from '@/components/FieldWithValidation/FieldWithValidation';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import ChoosenPackage from '@/components/ChoosenPackage/ChoosenPackage';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import { footerLinkArr2 } from '@/helpers/footerLinkLists';
import Footer from '@/components/Footer/Footer';
import { checkValidity } from '@/helpers/validationFunctions';
import { useSelector } from 'react-redux';
import { planSelector, priceSelector } from '@/store/typePlan';
import { useRouter } from 'next/router';
import { initialSelectedPlan } from '../planform';

import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';

const GiftOption: FC = () => {
    const router = useRouter()
    const plan = useSelector(planSelector)
    const newAccountToAdd = sessionStorage.getItem('newMembership')
    const [giftCode, setGiftCode] = useState('')
    const [validMessage, setValidMessage] = useState('')
    const validMessageHandler = (message: string) => setValidMessage(message)

    const giftCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setGiftCode(value)
        checkValidity({ name: 'Gift Card Pin or Code', value, validCondition: false, setMessage: validMessageHandler })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkValidity({ name: 'Gift Card Pin or Code', value: giftCode, validCondition: giftCode.length < 7, setMessage: validMessageHandler })
    }

    if (newAccountToAdd)
        router.push('/signup')
    else if (plan === initialSelectedPlan)
        router.push('/signup/planform')
    else {
        return (
            <SignUpLayout>
                <SignUpSection width='medium' showSection={true} isTextLeft>
                    <>
                        <StepCounter currentStep={3} totalStepInteger={3} />
                        <h2>Enter your gift code</h2>
                        <form onSubmit={submitHandler}>
                            <FieldWithValidation message={validMessage}>
                                <CustomInput placeholder='Gift Card Pin or Code' inputValue={giftCode} changeHandler={giftCodeHandler} isLight />
                            </FieldWithValidation>
                            <ChoosenPackage />
                            <BaseButton text='Redeem Gift Code' />
                        </form>
                    </>
                </SignUpSection>
                <Footer linkList={footerLinkArr2} lightBg />
            </SignUpLayout>
        );
    };
}

export default GiftOption;
