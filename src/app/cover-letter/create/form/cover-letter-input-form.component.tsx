"use client";

import { FormEvent, useState } from 'react';
import styles from './cover-letter-input-form.module.scss';

export type CoverLetterInputFormState = {
    name: string,
    copanyName: string,
    applyPossition: string,
}

export type CoverLetterInputFormProps = {
    onSubmit?: (value: CoverLetterInputFormState) => void
}

export default function CoverLetterInputForm({ onSubmit }: CoverLetterInputFormProps) {
    const [form, setForm] = useState<CoverLetterInputFormState>({
        name: '',
        copanyName: '',
        applyPossition: '',
    });

    function updateFormState(event: any) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(form);
        }
    }

    return (
        <form className={styles.main} onChange={(event) => updateFormState(event)} onSubmit={handleSubmit}>
            <div>
                <h3>Personal Information</h3>
                <div className="input-container">
                    <label className="label">Your name</label>
                    <input className="input" name='name' type="text" placeholder="Ex: John Doe" />
                </div>
                <div className="input-container">
                    <label className="label">Signed name</label>
                    <input className="input" type="text" placeholder="Ex: John Doe" />
                </div>

                <h3>Experience</h3>
                <div className="input-container">
                    <label className="label">Your skills</label>
                    <input className="input" type="text" placeholder="Ex: JavaScript" />
                </div>
                <div className="input-container">
                    <label className="label">Past experiences</label>
                    <input className="input" type="text" placeholder="Ex: JavaScript" />
                </div>

                <h3>Target company Information</h3>
                <div className="input-container">
                    <label className="label">Company Name</label>
                    <input className="input" name='copanyName' type="text" placeholder="Ex: Google" />
                </div>
                <div className="input-container">
                    <label className="label">Apply position</label>
                    <input className="input" name='applyPossition' type="text" placeholder="Ex: Full-stack developer" />
                </div>
            </div>

            <button className={`btn--primary w-full ${styles['submit-btn']}`} type="submit">Create cover letter</button>
        </form>
    )
}