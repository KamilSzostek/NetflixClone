import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/helpers/cookies';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection } from '@/helpers/interfaces';
import {IBrowseProps} from '../index';
import { createDataLimit } from '@/helpers/createDataLimit';

const BrowseTrending: FC<IBrowseProps> = ({ data }) => {
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

export default BrowseTrending;

export const getServerSideProps: GetServerSideProps<{ data: ICollection[] }> = async () => {
   let categoriesArr: ICollection[] = []
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
      }
   };

   const res2 = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
   const data2 = await res2.json()
   categoriesArr.push({title: 'TV Series', movies: createDataLimit( data2.results)})
   
   const res3 = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
   const data3 = await res3.json()
   categoriesArr.push({title: 'Movies', movies: createDataLimit( data3.results)})

   const res4 = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
   const data4 = await res4.json()
   categoriesArr.push({title: 'All', movies: createDataLimit( data4.results)})

      return {
         props: {
            data: categoriesArr
         },
      };
};

