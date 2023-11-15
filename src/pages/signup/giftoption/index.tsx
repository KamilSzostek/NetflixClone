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
import { useRouter } from 'next/router';
import SignUpLayout from '@/components/ui/SignUpLayout/SignUpLayout';
import { useShowPageSignup } from '@/hooks/useShowPageSignup';

const GiftOption: FC = () => {
    const router = useRouter()
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
        if (checkValidity({ name: 'Gift Card Pin or Code', value: giftCode, validCondition: giftCode.length > 7, setMessage: validMessageHandler })) {
            const newUser = {
                email: sessionStorage.getItem('newMember'),
                isMembershipPaid: true
            }
            fetch('/api/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(newUser)
            }).then(res => res.json()).then(data => {
                data.user.isMembershipPaid ? router.push('/signup/configureAccount') : alert('Payment not done.')
            }).catch(err => console.error(err))
            router.push('/signup/configureAccount')
        }
    }

    if (useShowPageSignup()) return (
        <SignUpLayout children2={<Footer linkList={footerLinkArr2} lightBg />}>
            <SignUpSection width='medium' showSection={true} isTextLeftAllign>
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
        </SignUpLayout>
    );
}

export default GiftOption;
