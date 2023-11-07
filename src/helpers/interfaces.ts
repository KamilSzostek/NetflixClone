import { StaticImageData } from "next/image";
import { ObjectId } from "mongodb";

export interface IProfile {
  _id: string;
  name: string;
  image: StaticImageData;
  nickname: string;
  preferedLanguage: ILanguage[];
  ageGroup: IAgeGroup;
  autoNextEpisode: boolean;
  autoPreview: boolean;
  isMainProfile: boolean;
}
export interface IUser {
  _id?: string;
  email: string;
  password: string;
  plan: {
    name: string;
    quality: string;
    price: string;
    resolution: string;
  };
  phoneNumber: string;
  creditCard: {
    firstName: string;
    lastName: string;
    cardNumber: string;
    CVV: string;
    expirationDate: string;
  };
  profiles: IProfile[];
  isMembershipPaid: boolean;
  isActive: boolean;
}

export interface ILanguage {
  _id: string;
  code: string;
  name: string;
  nativeName: string;
}

export interface IAgeGroup {
  id?: ObjectId;
  name: string;
  title?: string;
  description?: string;
}

export interface IMovie {
  adult: string;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  name?: string;
  video: string;
  vote_average: number;
  vote_count: number;
  index?: number
}

export interface ICollection{
  title: string
  movies: IMovie[]
}
