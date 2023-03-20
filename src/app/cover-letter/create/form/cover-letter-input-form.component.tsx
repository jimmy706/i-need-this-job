export default function CoverLetterInputForm() {
    return (
        <form>
            <h3>Personal Information</h3>
            <div className="input-container">
                <label className="label">Your name</label>
                <input className="input" type="text" placeholder="Ex: John Doe" />
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
                <input className="input" type="text" placeholder="Ex: Google" />
            </div>
            <div className="input-container">
                <label className="label">Apply position</label>
                <input className="input" type="text" placeholder="Ex: Full-stack developer" />
            </div>

            <button className="btn--primary w-full" type="submit">Create cover letter</button>
        </form>
    )
}