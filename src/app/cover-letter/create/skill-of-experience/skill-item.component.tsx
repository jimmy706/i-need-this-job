import { SkillOfExperience } from "@/app/api/cover-letter/models";
import { useMemo, useState } from "react";
import SkillInput from "./skill-input.component";
import styles from './skill-item.module.scss';

type SkillItemComponentProps = {
    skill: SkillOfExperience,
    onEdit: () => void,
    onDelete: () => void
}

type SkillItemProps = {
    skill: SkillOfExperience,
    onDelete: (key: any) => void,
    skillKey: any,
    onSaveEdit: (editedSkill: SkillOfExperience, key: any) => void,
    onEdit: (key: any) => void
}

function SkillItemComponent({ skill, onDelete, onEdit }: SkillItemComponentProps) {

    return (
        <div className={styles['skill-item']}>
            <div className="d-flex justify-between align-start">
                <div>
                    <strong className="m-0">
                        {skill.name}
                    </strong>
                    <br />
                    <small>
                        {skill.yearOfExperience} Years of experience
                    </small>
                </div>
                <div className="d-flex ml-3">
                    <span
                        title="Edit skill"
                        className="material-icons material-symbols-outlined text-secondary cursor-pointer mr-2"
                        onClick={onEdit}>
                        edit
                    </span>
                    <span
                        title="Delete skill"
                        className="material-icons material-symbols-outlined text-default cursor-pointer"
                        onClick={onDelete}>
                        delete
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function SkillItem({ skill, skillKey, onDelete, onSaveEdit, onEdit }: SkillItemProps) {
    const [editing, setEditing] = useState(false);
    const [skillState, setSkillState] = useState(skill);

    function handleCancel() {
        setSkillState(skill);
        setEditing(false);
    }

    function handleSave(editedSkill: SkillOfExperience) {
        setSkillState(editedSkill);
        setEditing(false);
        onSaveEdit(editedSkill, skillKey)
    }

    function renderSkillItemOrEditingSkill() {
        return (editing
            ? <SkillInput skillKey={skillKey} onCancel={handleCancel} onSave={handleSave} existedSkill={skillState} />
            : <SkillItemComponent onDelete={() => onDelete(skillKey)}
                onEdit={() => {
                    setEditing(true);
                    onEdit(skillKey)
                }} skill={skillState} />
        )
    }

    const memorizedRendering = useMemo(() => renderSkillItemOrEditingSkill(), [editing]);

    return (
        <>
            {memorizedRendering}
        </>
    )
}