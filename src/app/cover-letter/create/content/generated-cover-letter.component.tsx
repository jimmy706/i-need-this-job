import { memo, useContext } from "react";
import { CoverLetterContext } from "../cover-letter.context";
import styles from './generated-cover-letter.module.scss';

export type GeneratedCoverLetterProps = {
    letter?: string
}

const GeneratedCoverLetter = memo(function ({ letter }: GeneratedCoverLetterProps) {
    const coverLetterContext = useContext(CoverLetterContext);
    console.log(coverLetterContext)

    return (
        <div className={styles.container}>
            <header>
                <div className={`${styles.header}`}>
                    <input type="text" defaultValue="File name" />
                </div>
            </header>
            <div className={`${styles['cover-letter-container']}`}>
                <textarea
                    className={styles['cover-letter-content']}
                    readOnly
                    placeholder="Generated cover letter"
                    defaultValue={letter}>
                </textarea>
            </div>
        </div>
    )
});

export default GeneratedCoverLetter;