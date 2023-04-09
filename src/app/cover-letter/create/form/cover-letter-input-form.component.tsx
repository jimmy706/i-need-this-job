"use client";

import { SkillOfExperience } from '@/app/api/cover-letter/models';
import { FormEvent, useContext, useState } from 'react';
import { CoverLetterContext } from '../cover-letter.context';
import SkillInput from '../skill-of-experience/skill-input.component';
import SkillItem from '../skill-of-experience/skill-item.component';
import styles from './cover-letter-input-form.module.scss';

export type CoverLetterInputFormState = {
    name: string,
    copanyName: string,
    applyPossition: string,
    skills: SkillOfExperience[]
}

export type CoverLetterInputFormProps = {
    onSubmit?: (value: CoverLetterInputFormState) => void,
}

export default function CoverLetterInputForm({ onSubmit }: CoverLetterInputFormProps) {
    const coverLetterContext = useContext(CoverLetterContext);

    const [form, setForm] = useState<CoverLetterInputFormState>({
        name: '',
        copanyName: '',
        applyPossition: '',
        skills: []
    });
    const [openAddSkill, setOpenAddSkill] = useState<boolean>(false);

    function updateFormState(event: any) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(form);
        }
    }

    const handleAddSkills = (addedSkillk: SkillOfExperience) => {
        setForm({ ...form, skills: [...form.skills, addedSkillk] });
        setOpenAddSkill(false);
    }

    const handleRemoveSkill = (key: any) => {
        const skills = [...form.skills];
        delete skills[key];
        setForm({ ...form, skills });
    };

    const handleEditSkill = (editedSkill: SkillOfExperience, key: any) => {
        const skills = [...form.skills];
        skills[key] = editedSkill;
        setForm({ ...form, skills });
    }

    const renderSkills = () => form.skills.map((skill, index) => (
        <li
            key={`skill-${index}`}
            className='mb-2'>
            <SkillItem
                onDelete={handleRemoveSkill}
                onEdit={() => setOpenAddSkill(false)}
                onSaveEdit={handleEditSkill}
                skillKey={index}
                skill={skill} />
        </li>))

    return (
        <form className={styles.main} onChange={(event) => updateFormState(event)} onSubmit={handleSubmit}>
            <div>
                <h3>Personal Information</h3>
                <hr className='hr' />
                <div className="input-container">
                    <label className="label">Your name</label>
                    <input className="input" name='name' type="text" placeholder="Ex: John Doe" />
                </div>
                <div className="input-container">
                    <label className="label">Signed name</label>
                    <input className="input" type="text" placeholder="Ex: John Doe" />
                </div>
                <h3 className='d-flex align-start'>
                    Your Skills
                    {
                        !openAddSkill && (
                            <button onClick={() => setOpenAddSkill(true)} type='button' title='Add your skills' className="ml-3 btn btn--circle btn--secondary">
                                <span className="material-icons material-symbols-outlined">add</span>
                            </button>
                        )
                    }
                </h3>
                <div className='mb-3'>
                    {openAddSkill && <SkillInput
                        onCancel={() => setOpenAddSkill(false)}
                        onSave={handleAddSkills}
                    />}
                </div>
                <ul>
                    {renderSkills()}
                </ul>
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

            <button className={`btn ${coverLetterContext.fetching ? 'loading' : ''} btn--primary w-full ${styles['submit-btn']}`} type="submit">Create cover letter</button>
        </form>
    )
}