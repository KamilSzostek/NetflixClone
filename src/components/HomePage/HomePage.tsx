import { FC } from 'react';
import Accordion from '../Accordion/Accordion';
import BaseSection from '../ui/BaseSection/BaseSection';
import Newsletter from '../Memebership/Membership';
import Tv from '../../../public/assets/extras/tv.png';
import Mobile from '../../../public/assets/extras/mobile.jpg';
import Screen from '../../../public/assets/extras/device-pile.png';
import Kids from '../../../public/assets/extras/kids.png';
import Image from 'next/image';
import { IQA } from '@/helpers/interfaces';

import styles from './HomePage.module.scss'

interface IMainProps {
  data: IQA[]
}

const Main: FC<IMainProps> = ({ data }) => {
  return (<main className={styles.main}>
    <BaseSection title='Enjoy on your TV' text='Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.'>
      <>
        <video src={require('../../../public/assets/extras/video-devices.mp4')} autoPlay loop muted width="600" height="300" />
        <Image src={Tv} alt='home cinema' priority/>
      </>
    </BaseSection>
    <BaseSection title='Download your programmes to watch offline' text='Save your favourites easily and always have something to watch.' isRight>
      <Image src={Mobile} alt='mobile screen' priority/>
    </BaseSection>
    <BaseSection title='Watch everywhere' text='Stream unlimited films and TV programmes on your phone, tablet, laptop and TV.'>
      <>
        <video className={styles.video2} src={require('../../../public/assets/extras/video-tv4.mp4')} autoPlay loop muted width="600" height="300" />
        <Image src={Screen} alt='mac screen' priority/>
      </>
    </BaseSection>
    <BaseSection title='Create profiles for children' text='Send children on adventures with their favourite characters in a space made just for them – free with your membership.' isRight>
      <Image src={Kids} alt='kids offer' priority/>
    </BaseSection>
    <BaseSection title='Frequently Asked Questions' onlyOneColumn>
      <>
        <Accordion data={data} />
        <Newsletter />
      </>
    </BaseSection>
  </main>);
};

export default Main;
