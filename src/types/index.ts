export interface DataProps {
    id  : string
    image : string
    category: string
    price? : string
   
}

export interface FilterProps {
    filterItem: ProductTypes;
}

export type categoryTypes = {
    category: string;
    Icon: any
}

export type ProductTypes = {
    id : string  | any
    images: string[0] | string
    name: string
    category: string
    count: number
    details: string
    price: string   
}

export type HelpType = {
    question: string
    answer: String
}

