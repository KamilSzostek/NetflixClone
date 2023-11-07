import { IMovie } from "./interfaces"
export function createDataLimit(data: IMovie[]) {
    const maxAmountCardsInSlider = 30
    if (data.length > maxAmountCardsInSlider)
       return data.slice(0, maxAmountCardsInSlider)
    else return data
 }