import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { ICollection, IMovie } from '@/helpers/interfaces';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { createDataLimit } from '@/helpers/createDataLimit';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useShowPage } from '@/hooks/useShowPage';

export interface IBrowseNotifyProps {
   data: ICollection
   token: Session | null
}

const BrowseSearch: FC<IBrowseNotifyProps> = ({ data, token }) => {
   const collections = [data]
   return useShowPage(token) && (<LoggedHomePage moviesData={collections}/>)
}

export default BrowseSearch;

async function selectCollection(key: string | string[] | undefined){
    const options = {
        method: 'GET',
        headers: {
           accept: 'application/json',
           Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
        }
     };

    let res
    switch(key){
        case 'popular': 
            res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            return await res.json()
        case 'oldgold': 
            res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            return await res.json()
        case 'cinema': 
            res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            return await res.json()
        case 'horror': 
            res = await fetch('https://api.themoviedb.org/3/search/collection?query=horror&include_adult=false&language=en-US&page=1', options)
            return await res.json()
    }
}

export const getServerSideProps: GetServerSideProps<IBrowseNotifyProps> = async (context) => {
   const { params } = context
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
   )
   let results = {
      title: '',
      movies: [] as IMovie[]
   }
   if(token){
      const data = await selectCollection(params?.id)
      const filteredData = data.results.filter((movie: IMovie) => movie.poster_path !== null && movie.backdrop_path !== null && movie.overview !== '')
   
      results = {
         title: 'Notification',
         movies: createDataLimit(filteredData, 10)
      }
   }
   else throw new Error('Invalid authorization')
   return {
      props: {
         data: results,
         token
      },
   };
};
