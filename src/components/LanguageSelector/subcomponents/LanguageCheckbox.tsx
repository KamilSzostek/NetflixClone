import { FC, useEffect, useState } from 'react';
import { ILanguage } from '@/pages/signup/configureAccount/profiles';

interface ILanguageCheckboxProps {
    language: ILanguage,
    selectedLanguages: ILanguage[]
    selectedLanguageHandler: (langArr: ILanguage[]) => void
    forceRerender: () => void
}

const LanguageCheckbox: FC<ILanguageCheckboxProps> = ({ language, selectedLanguages, selectedLanguageHandler, forceRerender }) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        let tempArr = selectedLanguages
        checked ? tempArr.push(language) : tempArr = tempArr.filter(lang => lang._id !== language._id)
        selectedLanguageHandler(tempArr)
        forceRerender()
        
    }, [checked])

    return (
        <div key={language._id} >
            <input id={language._id} type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            <label htmlFor={language._id}>{language.nativeName}</label>
        </div>
    );
};

export default LanguageCheckbox;
