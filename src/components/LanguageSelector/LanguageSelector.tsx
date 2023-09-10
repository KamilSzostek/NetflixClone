import { FC, useLayoutEffect, useState } from 'react';
import LanguageCheckbox from './subcomponents/LanguageCheckbox';
import { ILanguage } from '@/pages/signup/configureAccount/profiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './LanguageSelector.module.scss';

interface ILanguageSelectorProps {
    selectedLanguages: ILanguage[]
    selectedLanguageHandler: (langArr: ILanguage[]) => void
    children?: JSX.Element
}

const LanguageSelector: FC<ILanguageSelectorProps> = ({ selectedLanguages, selectedLanguageHandler, children }) => {
    const [forceRerender, setForceRerender] = useState(false)
    const forceRerenderHandler = () => setForceRerender(!forceRerender)
    const [languages, setLanguages] = useState<ILanguage[]>([])

    useLayoutEffect(() => {
        fetch('/api/languages').then(res => res.json()).then(data => setLanguages(data)).catch(err => console.log(err))
    }, [])

    const elementSelectedLanguages = selectedLanguages.length > 0 && selectedLanguages.map(language => (
        <label key={language._id}>
            <FontAwesomeIcon icon={faCheck} /><span>{language.nativeName}</span>
        </label>
    ))

    const languageSelector = languages.map((language: ILanguage) => (
        <LanguageCheckbox key={language._id} language={language} selectedLanguages={selectedLanguages} selectedLanguageHandler={selectedLanguageHandler} forceRerender={forceRerenderHandler}/>
    ))
    return (
        <section className={styles.languageSelector}>
            <div>
                {elementSelectedLanguages}
            </div>
            {languageSelector}
            {children}
        </section>
    );
};

export default LanguageSelector;
