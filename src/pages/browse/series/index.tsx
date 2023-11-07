import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/helpers/cookies';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection } from '@/helpers/interfaces';
import {IBrowseProps} from '../index';
import { createDataLimit } from '@/helpers/createDataLimit';

const BrowseSeries: FC<IBrowseProps> = ({ data }) => {
   const router = useRouter()
   const [showPage, setShowPage] = useState(false)

   useEffect(() => {
      const id = getCookie('ActiveUserId')
      if (!id)
         router.push('/')
      else
         setShowPage(true)
   }, [])

      return showPage && (<LoggedHomePage moviesData={data} />)
}

export default BrowseSeries;

export const getServerSideProps: GetServerSideProps<{ data: ICollection[] }> = async () => {
   let categoriesArr: ICollection[] = []
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
      }
   };

   const res1 = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
   const data1 = await res1.json()
   categoriesArr.push({title: 'Top rated', movies: createDataLimit( data1.results)})

   const res2 = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=3', options)
   const data2 = await res2.json()
   categoriesArr.push({title: 'Popular', movies: createDataLimit( data2.results)})
   
   const res3 = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=5', options)
   const data3 = await res3.json()
   categoriesArr.push({title: 'On th Air', movies: createDataLimit( data3.results)})

   const res4 = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
   const data4 = await res4.json()
   categoriesArr.push({title: 'Airing Today', movies: createDataLimit( data4.results)})

      return {
         props: {
            data: categoriesArr
         },
      };
};

