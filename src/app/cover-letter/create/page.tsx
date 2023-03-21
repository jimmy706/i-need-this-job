"use client";

import { useState } from 'react';
import GeneratedCoverLetter from "./content/generated-cover-letter.component";
import { CoverLetterContext, CoverLetterContextType } from "./cover-letter.context";
import CoverLetterInputForm from "./form/cover-letter-input-form.component";
import styles from './page.module.scss';

export default function () {
    const [state, setState] = useState<CoverLetterContextType>({
        fetching: false,
        coverLetter: '',
        fileName: 'Untitled'
    });
    return (
        <CoverLetterContext.Provider value={state}>
            <div className={styles.page}>
                <div className={`full-container ${styles['page__content']}`}>
                    <div className={styles.page__form}>
                        <header className={styles.header}>
                            <h2>Your information</h2>
                        </header>
                        <div className={`${styles['form-content']}`}>
                            <CoverLetterInputForm />
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