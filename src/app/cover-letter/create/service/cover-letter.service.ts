import { GenerateCoverLetterRequestBody, GeneratedCoverLetter } from "@/app/api/cover-letter/models";
import axios from "axios";

export function generateCoverLetter(requestBody: GenerateCoverLetterRequestBody) {
    return axios.post<GeneratedCoverLetter>('/api/cover-letter', requestBody);
}