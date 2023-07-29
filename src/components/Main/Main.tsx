import { FC } from 'react';
import Accordion from '../Accordion/Accordion';
import BaseSection from '../ui/BaseSection/BaseSection';
import Newsletter from '../Newsletter/Newsletter';
import Tv from '../../../public/assets/extras/tv.png';
import Mobile from '../../../public/assets/extras/mobile.jpg';
import Screen from '../../../public/assets/extras/device-pile.png';
import Kids from '../../../public/assets/extras/kids.png';

import styles from './Main.module.scss'
import Image from 'next/image';

const qa = [
  {
    title: 'What can I watch on Netflix?',
    text: "Netflix has an extensive library of feature films, documentaries, TV programmes, anime, award-winning Netflix originals and more. Watch as much as you want, anytime you want. Check out some of our content."
  },
  {
    title: 'What is Netflix?',
    text: "Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!"
  },
  {
    title: 'How much does Netflix cost?',
    text: "Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from €7,99 to €15,99 a month. No extra costs, no contracts."
  },
  {
    title: 'Where can I watch?',
    text: "Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!"
  },
  {
    title: 'How do I cancel?',
    text: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time.e programmes with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
  },
  {
    title: 'Is Netflix good for children?',
    text: "The Netflix Children's experience is included in your membership to give parents control while children enjoy family-friendly TV programmes and films in their own space. Children's profiles come with PIN-protected parental controls that let you restrict the maturity rating of content children can watch and block specific titles you don’t want children to see."
  },
]

const Main: FC = () => {
  return (<main className={styles.main}>
    <BaseSection title='Enjoy on your TV' text='Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.'>
      <>
        <video src={require('../../../public/assets/extras/video-devices.mp4')} autoPlay loop muted width="600" height="300" />
        <Image src={Tv} alt='home cinema' />
      </>
    </BaseSection>
    <BaseSection title='Download your programmes to watch offline' text='Save your favourites easily and always have something to watch.' isRight>
      <Image src={Mobile} alt='mobile screen'/>
    </BaseSection>
    <BaseSection title='Watch everywhere' text='Stream unlimited films and TV programmes on your phone, tablet, laptop and TV.'>
      <>
        <video className={styles.video2} src={require('../../../public/assets/extras/video-tv4.mp4')} autoPlay loop muted width="600" height="300" />
        <Image src={Screen} alt='mac screen'/>
      </>
    </BaseSection>
    <BaseSection title='Create profiles for children' text='Send children on adventures with their favourite characters in a space made just for them – free with your membership.' isRight>
      <Image src={Kids} alt='kids offer'/>
    </BaseSection>
    <BaseSection title='Frequently Asked Questions' onlyOneColumn>
      <>
        <Accordion data={qa}/>
        <Newsletter />
      </>
    </BaseSection>
  </main>);
};

export default Main;
