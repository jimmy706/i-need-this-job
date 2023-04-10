import { useContext, useRef } from "react";
import { CoverLetterContext } from "../cover-letter.context";
import styles from './generated-cover-letter.module.scss';
import CoverLetterEditor from './cover-letter-editor.component';
export type GeneratedCoverLetterProps = {
    letter?: string
}

const GeneratedCoverLetter = function () {
    const coverLetterContext = useContext(CoverLetterContext);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
 

    function handleChangeFileName(e: any) {
        console.log(e.target.value)
    }

    function handleCopyContent() {
        textareaRef.current?.select();
        navigator.clipboard.writeText(coverLetterContext.coverLetter);
    }

    return (
        <div className={styles.container}>
            <header>
                <div className={`${styles.header}`}>
                    <input type="text" onChange={handleChangeFileName} value={coverLetterContext.fileName} />
                </div>
            </header>
            <div className={`${styles['cover-letter-container']}`}>
                {
                    coverLetterContext.coverLetter && (
                    <span onClick={handleCopyContent} className={`material-icons material-symbols-outlined clickable-icon ${styles['copy-content']}`}>
                        content_copy
                    </span>)
                }
                <CoverLetterEditor textareaRef={textareaRef} generatedContent={coverLetterContext.coverLetter} />
            </div>
        </div>
    )
};

export default GeneratedCoverLetter;