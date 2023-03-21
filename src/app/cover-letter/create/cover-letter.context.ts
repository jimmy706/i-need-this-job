import { createContext } from "react";

export type CoverLetterContextType = {
    fetching: boolean,
    coverLetter: string,
    fileName: string
}

export const CoverLetterContext = createContext<CoverLetterContextType>({
    fetching: false,
    coverLetter: '',
    fileName: 'Untitled'
});