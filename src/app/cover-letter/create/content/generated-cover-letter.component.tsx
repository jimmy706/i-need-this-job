import { useContext } from "react";
import { CoverLetterContext } from "../cover-letter.context";
import styles from './generated-cover-letter.module.scss';
import CoverLetterEditor from './cover-letter-editor.component';
export type GeneratedCoverLetterProps = {
    letter?: string
}

const GeneratedCoverLetter = function () {
    const coverLetterContext = useContext(CoverLetterContext);
    
    function handleChangeFileName(e: any) {
        console.log(e.target.value)
    }

    return (
        <div className={styles.container}>
            <header>
                <div className={`${styles.header}`}>
                    <input type="text" onChange={handleChangeFileName} value={coverLetterContext.fileName} />
                </div>
            </header>
            <div className={`${styles['cover-letter-container']}`}>
                <CoverLetterEditor generatedContent={coverLetterContext.coverLetter}/>
            </div>
        </div>
    )
};

export default GeneratedCoverLetter;