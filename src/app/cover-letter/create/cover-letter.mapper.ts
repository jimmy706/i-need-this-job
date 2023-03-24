import { GenerateCoverLetterRequestBody as CoverLetterRequestBody } from "@/app/api/cover-letter/models";
import { CoverLetterInputFormState } from "./form/cover-letter-input-form.component";

export function mapCoverLetterInputToRequestBody(value: CoverLetterInputFormState): CoverLetterRequestBody {
    const result: CoverLetterRequestBody = {
        name: value.name,
        applyPossition: value.applyPossition,
        targetCompany: {
            managerName: value.copanyName,
            name: value.copanyName
        },
        skills: [],
        signedName: value.name,        
    }


    return result;
}