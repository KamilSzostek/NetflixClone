import { FC } from 'react';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection } from '@/helpers/interfaces';
import { IBrowseProps } from '../index';
import { createDataLimit } from '@/helpers/createDataLimit';
import { useShowPage } from '@/hooks/useShowPage';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const BrowseTrending: FC<IBrowseProps> = ({ movies, token }) => {
   return useShowPage(token) && (<LoggedHomePage moviesData={movies} />)
}

export default BrowseTrending;

export const getServerSideProps: GetServerSideProps<IBrowseProps> = async (context) => {
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
   )
   let categoriesArr: ICollection[] = []
   if (token) {
      const options = {
         method: 'GET',
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
         }
      };

      const res2 = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
      const data2 = await res2.json()
      categoriesArr.push({ title: 'TV Series', movies: createDataLimit(data2.results) })

      const res3 = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      const data3 = await res3.json()
      categoriesArr.push({ title: 'Movies', movies: createDataLimit(data3.results) })

      const res4 = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
      const data4 = await res4.json()
      categoriesArr.push({ title: 'All', movies: createDataLimit(data4.results) })
   }
   else throw new Error('Invalid authorization')
   return {
      props: {
         movies: categoriesArr,
         token
      },
   };
};

