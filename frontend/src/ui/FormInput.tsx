import { useState } from 'react'
import type { Payload, Education, Experience } from '../pages/Generator'

interface Props {
	value: Payload
	onChange: (p: Payload) => void
	onGenerate: () => void
	loading: boolean
}

export default function FormInput({ value, onChange, onGenerate, loading }: Props) {
	const [edu, setEdu] = useState<Education>({ institution: '', degree: '', start_date: '', end_date: '', description: '' })
	const [exp, setExp] = useState<Experience>({ company: '', title: '', start_date: '', end_date: '', description: '', achievements: [] })
	const [skill, setSkill] = useState('')
	const [cert, setCert] = useState('')

	const addEdu = () => {
		if (!edu.institution || !edu.degree) return
		onChange({ ...value, education: [...value.education, edu] })
		setEdu({ institution: '', degree: '', start_date: '', end_date: '', description: '' })
	}
	const addExp = () => {
		if (!exp.company || !exp.title) return
		onChange({ ...value, experience: [...value.experience, exp] })
		setExp({ company: '', title: '', start_date: '', end_date: '', description: '', achievements: [] })
	}
	const addSkill = () => {
		if (!skill) return
		onChange({ ...value, skills: [...value.skills, skill] })
		setSkill('')
	}
	const addCert = () => {
		if (!cert) return
		onChange({ ...value, certifications: [...value.certifications, cert] })
		setCert('')
	}

	return (
		<div className="space-y-6">
			<section className="bg-white rounded-md shadow p-4">
				<h2 className="font-semibold mb-4">Contact</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input className="input" placeholder="Name" value={value.name} onChange={e => onChange({ ...value, name: e.target.value })} />
					<input className="input" placeholder="Contact info (email/phone)" value={value.contact_info} onChange={e => onChange({ ...value, contact_info: e.target.value })} />
					<input className="input" placeholder="LinkedIn URL" value={value.linkedin_url} onChange={e => onChange({ ...value, linkedin_url: e.target.value })} />
					<input className="input" placeholder="GitHub URL" value={value.github_url} onChange={e => onChange({ ...value, github_url: e.target.value })} />
				</div>
			</section>

			<section className="bg-white rounded-md shadow p-4">
				<h2 className="font-semibold mb-4">Target Job</h2>
				<textarea className="input min-h-[100px]" placeholder="Paste job description" value={value.target_job_description} onChange={e => onChange({ ...value, target_job_description: e.target.value })} />
			</section>

			<section className="bg-white rounded-md shadow p-4">
				<h2 className="font-semibold mb-4">Education</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<input className="input" placeholder="Institution" value={edu.institution} onChange={e => setEdu({ ...edu, institution: e.target.value })} />
					<input className="input" placeholder="Degree" value={edu.degree} onChange={e => setEdu({ ...edu, degree: e.target.value })} />
					<input className="input" placeholder="Start date" value={edu.start_date} onChange={e => setEdu({ ...edu, start_date: e.target.value })} />
					<input className="input" placeholder="End date (or blank)" value={edu.end_date} onChange={e => setEdu({ ...edu, end_date: e.target.value })} />
					<textarea className="input" placeholder="Description" value={edu.description} onChange={e => setEdu({ ...edu, description: e.target.value })} />
				</div>
				<button className="btn mt-3" onClick={addEdu}>Add Education</button>
				<div className="mt-2 text-sm text-gray-600">{value.education.length} item(s) added</div>
			</section>

			<section className="bg-white rounded-md shadow p-4">
				<h2 className="font-semibold mb-4">Experience</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<input className="input" placeholder="Company" value={exp.company} onChange={e => setExp({ ...exp, company: e.target.value })} />
					<input className="input" placeholder="Title" value={exp.title} onChange={e => setExp({ ...exp, title: e.target.value })} />
					<input className="input" placeholder="Start date" value={exp.start_date} onChange={e => setExp({ ...exp, start_date: e.target.value })} />
					<input className="input" placeholder="End date (or blank)" value={exp.end_date} onChange={e => setExp({ ...exp, end_date: e.target.value })} />
					<textarea className="input" placeholder="Description" value={exp.description} onChange={e => setExp({ ...exp, description: e.target.value })} />
					<input className="input" placeholder="Add achievement (quantified)" value={''} onChange={() => {}} />
				</div>
				<div className="flex gap-2">
					<input className="input" placeholder="Achievement example: Increased throughput by 25%" value={''} readOnly />
				</div>
				<button className="btn mt-3" onClick={addExp}>Add Experience</button>
				<div className="mt-2 text-sm text-gray-600">{value.experience.length} item(s) added</div>
			</section>

			<section className="bg-white rounded-md shadow p-4">
				<h2 className="font-semibold mb-4">Skills & Certifications</h2>
				<div className="flex gap-2">
					<input className="input flex-1" placeholder="Add skill" value={skill} onChange={e => setSkill(e.target.value)} />
					<button className="btn" onClick={addSkill}>Add</button>
				</div>
				<div className="mt-2 text-sm text-gray-600">{value.skills.join(', ')}</div>
				<div className="flex gap-2 mt-4">
					<input className="input flex-1" placeholder="Add certification" value={cert} onChange={e => setCert(e.target.value)} />
					<button className="btn" onClick={addCert}>Add</button>
				</div>
				<div className="mt-2 text-sm text-gray-600">{value.certifications.join(', ')}</div>
			</section>

			<button className="btn-primary" onClick={onGenerate} disabled={loading || !value.name || !value.contact_info || !value.target_job_description}>
				{loading ? 'Generating…' : 'Generate Resume & Cover Letter'}
			</button>
		</div>
	)
}

// Tailwind utility styles for inputs/buttons
declare global {
	interface HTMLElementTagNameMap {
		div: HTMLDivElement
	}
}

// Utility classes via global styles
// Using class names here for readability
// .input, .btn, .btn-primary styles are expected to be defined by Tailwind utilities composition in CSS frameworks.
