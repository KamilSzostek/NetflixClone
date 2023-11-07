import { FC, useState } from 'react';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from '../CustomInput/CustomInput';

import styles from './ProfileInput.module.scss';

interface IProfileInputProps {
  isAddProfileIcon?: boolean
  id?: string
}

const ProfileInput: FC<IProfileInputProps> = ({ id, isAddProfileIcon }) => {
  const [profileName, setProfileName] = useState('')
  const profileNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setProfileName(e.currentTarget.value)
  return (
    <div className={styles.profile}>
      {isAddProfileIcon ? <FontAwesomeIcon icon={faUserPlus} /> : <FontAwesomeIcon icon={faUser} />}
      <CustomInput id={id} inputValue={profileName} placeholder='Name' changeHandler={profileNameHandler} isLight />
    </div>
  );
};

export default ProfileInput;
