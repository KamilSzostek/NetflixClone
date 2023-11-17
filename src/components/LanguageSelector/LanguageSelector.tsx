import { FC, useState } from 'react';
import LanguageCheckbox from './subcomponents/LanguageCheckbox';
import { ILanguage } from '@/pages/signup/configureAccount/profiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './LanguageSelector.module.scss';

interface ILanguageSelectorProps {
    languages: ILanguage[]
    selectedLanguages: ILanguage[]
    selectedLanguageHandler: (langArr: ILanguage[]) => void
    children?: JSX.Element
}

const LanguageSelector: FC<ILanguageSelectorProps> = ({ languages, selectedLanguages, selectedLanguageHandler, children }) => {
    const [forceRerender, setForceRerender] = useState(false)
    const forceRerenderHandler = () => setForceRerender(!forceRerender)

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
