import CoverLetterInputForm from "./form/cover-letter-input-form.component";
import styles from './page.module.scss';

export default function () {
    return (
        <div>
            <div>
                <header className={styles.header}>
                    <h2>Your information</h2>
                </header>
                <div className={`full-container ${styles['form-content']}`}>
                    <CoverLetterInputForm/>
                </div>
            </div>
        </div>
    )
}