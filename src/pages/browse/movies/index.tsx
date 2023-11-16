import { FC } from 'react';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection } from '@/helpers/interfaces';
import { createDataLimit } from '@/helpers/createDataLimit';
import { IBrowseProps } from '..';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const BrowseMovies: FC<IBrowseProps> = ({ movies }) => {
   return (<LoggedHomePage moviesData={movies} />)
}

export default BrowseMovies;

export const getServerSideProps: GetServerSideProps<IBrowseProps> = async (context) => {
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if (token) {
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
      categoriesArr.push({ title: 'Upcoming', movies: createDataLimit(data3.results) })

      const res1 = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=5', options)
      const data1 = await res1.json()
      categoriesArr.push({ title: 'Recently Added', movies: createDataLimit(data1.results) })

      const res2 = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=4', options)
      const data2 = await res2.json()
      categoriesArr.push({ title: 'Popular', movies: createDataLimit(data2.results) })


      const res4 = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', options)
      const data4 = await res4.json()
      categoriesArr.push({ title: 'Selected for You', movies: createDataLimit(data4.results) })
      return {
         props: {
            movies: categoriesArr,
         },
      };
   }
   else return {
      redirect: {
         destination: '/',
         permament: false
      },
      props: {
         movies: []
      }
   }
}
