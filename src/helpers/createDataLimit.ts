import { IMovie } from "./interfaces"
export function createDataLimit(data: IMovie[], limit = 20) {
   if (data.length > limit)
      return data.slice(0, limit)
   else return data
}