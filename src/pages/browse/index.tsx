import {FC} from 'react';
import ProfileSelector from '@/components/ProfileSelector/ProfileSelector';

const Browse: FC =  () => {
   return(
    <ProfileSelector title='Who is watching?' buttonText='Manage profiles' linkPath='/ManageProfiles'/>
   )
}

export default Browse;