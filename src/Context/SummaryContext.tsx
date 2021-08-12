import { createContext } from "react"

interface Country {
    id: string;
    title: string;
    body: string;
}

export interface SummaryData {

    country: Country[],
    isLoading: boolean,
    // fetchCountry: ( country: Country ) => void
    fetchCountry: ( data:any ) => void

}

export const summaryData: SummaryData = {

    country: [],
    isLoading: false,
    // fetchCountry: ( data ) => console.log(' see if it work ')
    fetchCountry: ( data:any ) => { console.log( 'see' ) }
}

export const SummaryContext = createContext<SummaryData>(summaryData);