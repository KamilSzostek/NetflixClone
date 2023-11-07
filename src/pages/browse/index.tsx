import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileSelector from '@/components/ProfileSelector/ProfileSelector';
import { getCookie } from '@/helpers/cookies';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection, IMovie } from '@/helpers/interfaces';

import styles from '../../styles/Browse.module.scss'

export interface IBrowseProps {
   data: ICollection[]
}

const Browse: FC<IBrowseProps> = ({ data }) => {
   const router = useRouter()
   const [showPage, setShowPage] = useState(false)
   const [isSelectedProfile, setIsSelectedProfile] = useState(false)

   const profileIsSelected = () => setIsSelectedProfile(true)

   useEffect(() => {
      const id = getCookie('ActiveUserId')
      if (!id)
         router.push('/')
      else
         setShowPage(true)
   }, [])
   useEffect(() => {
      sessionStorage.getItem('ProfileId') && setIsSelectedProfile(true)
   }, [])
   if (showPage)
      return isSelectedProfile ?
         (<LoggedHomePage moviesData={data} />)
         : (
            <main className={styles.browse}>
               <ProfileSelector title='Who is watching?' buttonText='Manage profiles' linkPath='/ManageProfiles' profileIsSelected={profileIsSelected} />
            </main>
         )
}

export default Browse;

function createDataLimit(data: IMovie[]) {
   const maxAmountCardsInSlider = 30
   if (data.length > maxAmountCardsInSlider)
      return data.slice(0, maxAmountCardsInSlider)
   else return data
}
export const getServerSideProps: GetServerSideProps<{ data: ICollection[] }> = async () => {
   let categoriesArr: ICollection[] = []
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
      }
   };

   const res1 = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
   const data1 = await res1.json()
   categoriesArr.push({title: 'Now Playing', movies: createDataLimit( data1.results)})

   const res2 = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
   const data2 = await res2.json()
   categoriesArr.push({title: 'Popular', movies: createDataLimit( data2.results)})
   
   const res3 = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
   const data3 = await res3.json()
   categoriesArr.push({title: 'Upcoming', movies: createDataLimit( data3.results)})

   const res4 = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
   const data4 = await res4.json()
   categoriesArr.push({title: 'Top rated', movies: createDataLimit( data4.results)})

      return {
         props: {
            data: categoriesArr
         },
      };
};