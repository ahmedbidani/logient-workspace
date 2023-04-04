export interface SearchFormType {
    searchQuery: string | null
    year: string | null
    pickedType: string | null
}

export interface MovieQueryParams {
    s: string | null
    y: string | null
    type: string | null,
    firstLoad: boolean
}

export interface Movie {
    Title: string
    Type: string
    Poster: string
    Year: number
    imdbID: string

}