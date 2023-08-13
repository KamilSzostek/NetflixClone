import { FC } from 'react';
import styles from './StepCounter.module.scss'

interface IStepCounterProps {
    currentStep: number,
    totalStepInteger: number
}

const StepCounter: React.FunctionComponent<IStepCounterProps> = ({currentStep, totalStepInteger}) => {
    return(
        <h3 className={styles.stepcounter}>step <span>{currentStep}</span> of <span>{totalStepInteger}</span></h3>
    );
};

export default StepCounter;
