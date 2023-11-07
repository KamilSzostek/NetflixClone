import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/helpers/cookies';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection } from '@/helpers/interfaces';
import { createDataLimit } from '@/helpers/createDataLimit';

export interface IBrowseProps {
   data: ICollection[]
}

const BrowseMovies: FC<IBrowseProps> = ({ data }) => {
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

export default BrowseMovies;

export const getServerSideProps: GetServerSideProps<{ data: ICollection[] }> = async () => {
   let categoriesArr: ICollection[] = []
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
      }
   };

   const res3 = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=3', options)
   const data3 = await res3.json()
   categoriesArr.push({title: 'Upcoming', movies: createDataLimit( data3.results)})
   
   const res1 = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=5', options)
   const data1 = await res1.json()
   categoriesArr.push({title: 'Recently Added', movies: createDataLimit( data1.results)})

   const res2 = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=4', options)
   const data2 = await res2.json()
   categoriesArr.push({title: 'Popular', movies: createDataLimit( data2.results)})
   

   const res4 = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', options)
   const data4 = await res4.json()
   categoriesArr.push({title: 'Selected for You', movies: createDataLimit( data4.results)})

      return {
         props: {
            data: categoriesArr
         },
      };
};
