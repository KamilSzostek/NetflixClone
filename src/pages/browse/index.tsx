import { FC } from 'react';
import { useSelector } from 'react-redux';
import { isProfileSelector } from '@/store/selectedProfile';
import ProfileSelector from '@/components/ProfileSelector/ProfileSelector';
import LoggedHomePage from '@/components/LoggedHomePage/LoggedHomePage';
import { GetServerSideProps } from 'next';
import { ICollection, IProfile } from '@/helpers/interfaces';
import { createDataLimit } from '@/helpers/createDataLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getCollectionDB } from '@/helpers/dbConnection';

import styles from '../../styles/Browse.module.scss'

export interface IBrowseProps {
   movies: ICollection[]
   profiles?: IProfile[]
}

const Browse: FC<IBrowseProps> = ({ movies, profiles }) => {
   const isSelectedProfile = useSelector(isProfileSelector)

   return isSelectedProfile ?
      (<LoggedHomePage moviesData={movies} />)
      : (
         <main className={styles.browse}>
            <ProfileSelector profiles={profiles!} title='Who is watching?' buttonText='Manage profiles' linkPath='/ManageProfiles' />
         </main>
      )
}

export default Browse;

export const getServerSideProps: GetServerSideProps<IBrowseProps> = async (context) => {
   const token = await getServerSession(
      context.req,
      context.res,
      authOptions
      )
      if (token) {
      const categoriesArr: ICollection[] = []
      const options = {
         method: 'GET',
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
         }
      };

      const res1 = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      const data1 = await res1.json()
      categoriesArr.push({ title: 'Now Playing', movies: createDataLimit(data1.results, 30) })

      const res2 = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      const data2 = await res2.json()
      categoriesArr.push({ title: 'Popular', movies: createDataLimit(data2.results, 30) })

      const res3 = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      const data3 = await res3.json()
      categoriesArr.push({ title: 'Upcoming', movies: createDataLimit(data3.results, 30) })

      const res4 = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      const data4 = await res4.json()
      categoriesArr.push({ title: 'Top rated', movies: createDataLimit(data4.results, 30) })

      const db = await getCollectionDB('NetflixUsers')
      const user = await db.collection.findOne({ email: token?.user?.email })
      db.client.close()

      return {
         props: {
            movies: categoriesArr,
            profiles: user ? user.profiles : [],
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
};