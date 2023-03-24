"use client";

import { useState } from 'react';
import GeneratedCoverLetter from "./content/generated-cover-letter.component";
import { CoverLetterContext, CoverLetterContextType } from "./cover-letter.context";
import { mapCoverLetterInputToRequestBody } from './cover-letter.mapper';
import CoverLetterInputForm, { CoverLetterInputFormState } from "./form/cover-letter-input-form.component";
import styles from './page.module.scss';
import { generateCoverLetter } from './service/cover-letter.service';

export default function () {
    const [state, setState] = useState<CoverLetterContextType>({
        fetching: false,
        coverLetter: '',
        fileName: 'Untitled'
    });

    const handleSubmit = async (value: CoverLetterInputFormState) => {
        setState({ ...state, fetching: true });
        const requestBody = mapCoverLetterInputToRequestBody(value);
        const response = await generateCoverLetter(requestBody);        
        setState({ ...state, coverLetter: response.data.result, fetching: false });
    }

    return (
        <CoverLetterContext.Provider value={state}>
            <div className={styles.page}>
                <div className={`full-container ${styles['page__content']}`}>
                    <div className={styles.page__form}>
                        <header className={styles.header}>
                            <h2>Your information</h2>
                        </header>
                        <div className={`${styles['form-content']}`}>
                            <CoverLetterInputForm onSubmit={handleSubmit} />
                        </div>
                    </div>

                    <div>
                        <GeneratedCoverLetter />
                    </div>
                </div>
            </div>
        </CoverLetterContext.Provider>
    )
}