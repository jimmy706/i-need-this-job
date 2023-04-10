import { SkillOfExperience } from "@/app/api/cover-letter/models"
import { useEffect, useState } from "react"

type Props = {
    onSave?: (skill: SkillOfExperience) => void,
    onCancel?: () => void,
    existedSkill?: SkillOfExperience,
    skillKey?: any
}

const defaultState: SkillOfExperience = {
    name: '',
    yearOfExperience: -1,
    description: ''
}

export default function SkillInput({ onSave, onCancel, existedSkill }: Props) {
    const [skillState, setSkillState] = useState<SkillOfExperience>(existedSkill ? existedSkill : defaultState);

    useEffect(() => {
        if (existedSkill) {
            setSkillState(existedSkill);
        }
    }, [existedSkill])


    function handleCancel() {
        if (onCancel) {
            onCancel();
        }
    }

    function handleAddSkill() {
        if (onSave) {
            onSave(skillState);
        }
    }

    return (
        <div>
            <div className="input-container">
                <label className="label" htmlFor="skill-field">Skill name</label>
                <input id="skill-field"
                    type="text"
                    className="input"
                    required
                    placeholder="Ex: SEO writing"
                    value={skillState.name}
                    onChange={(e) => setSkillState({ ...skillState, name: e.target.value })} />
            </div>

            <div className="input-container">
                <label className="label" htmlFor="skill-yoe">Years of experience</label>
                <select className="input" value={skillState.yearOfExperience} id="skill-yoe" onChange={(e) => setSkillState({ ...skillState, yearOfExperience: parseInt(e.target.value) })}>
                    <option value={-1}>No Experience</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                    <option value="6">6 Years</option>
                    <option value="7">7 Years</option>
                    <option value="8">8 Years</option>
                    <option value="9">9 Years</option>
                    <option value="10">10 years +</option>
                </select>
            </div>

            {/* <div className="input-container">
                <label className="label" htmlFor="skill-desc">Description</label>
                <textarea id="skill-desc"
                    className="input"
                    placeholder="Description your skill"
                    value={skillState.description}
                    onChange={(e) => setSkillState({ ...skillState, description: e.target.value })}>
                </textarea>
            </div> */}

            <div className="d-flex mt-3">
                <button type="button" className="btn btn--secondary mr-2" onClick={handleAddSkill}>Save</button>
                <button type="button" className="btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}