import {FC} from 'react';
import Link  from 'next/link';
import SignUpSection from '@/components/SignUpSection/SignUpSection';
import CheckList from '@/components/CheckList/CheckList';
import PlanTable from '@/components/PlanTable/PlanTable';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const PlanForm: FC = (props) => {
    const planArr = ['Watch all you want.', 'Recommendations just for you.', 'Change or cancel your plan anytime.']

    return (
        <SignUpSection>
            <section>
                <h3>step 2 of 3</h3>
                <CheckList content={planArr} />
                <PlanTable />
                <div><FontAwesomeIcon icon={faLock} />An ad-supported plan includes a few differences. <Link href='/https://help.netflix.com/en'>Learn how it works.</Link></div>
                <article>
                    <p>If you select an ad-supported plan, you will be required to provide your date of birth for ads personalization and other purposes consistent with the Netflix Privacy Statement.</p>
                    <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
                    </p>
                    <p>Only people who live with you may use your account. Add 1 extra member with Standard or up to 2 with Premium. Learn more. Watch on 4 different devices at the same time with Premium, 2 with Standard or Standard with ads, and 1 with Basic.
                    </p>
                </article>
                <BaseButton text='Next' isBig />
            </section>
        </SignUpSection>);
};

export default PlanForm;
