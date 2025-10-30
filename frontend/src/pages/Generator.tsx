import { useState } from 'react'
import FormInput from '../ui/FormInput'
import Preview from '../ui/Preview'
import ExportButtons from '../ui/ExportButtons'
import { generateResume, generateCoverLetter, exportDocument } from '../services/api'

export interface Education {
	institution: string
	degree: string
	start_date: string
	end_date?: string
	description?: string
}

export interface Experience {
	company: string
	title: string
	start_date: string
	end_date?: string
	description?: string
	achievements?: string[]
}

export interface Payload {
	name: string
	contact_info: string
	linkedin_url?: string
	github_url?: string
	education: Education[]
	experience: Experience[]
	skills: string[]
	certifications: string[]
	target_job_description: string
}

function hexToBytes(hex: string): Uint8Array {
	const clean = hex.length % 2 === 0 ? hex : `0${hex}`
	const arr = new Uint8Array(clean.length / 2)
	for (let i = 0; i < arr.length; i++) {
		arr[i] = parseInt(clean.substr(i * 2, 2), 16)
	}
	return arr
}

export default function Generator() {
	const [payload, setPayload] = useState<Payload>({
		name: '',
		contact_info: '',
		linkedin_url: '',
		github_url: '',
		education: [],
		experience: [],
		skills: [],
		certifications: [],
		target_job_description: '',
	})
	const [resume, setResume] = useState('')
	const [coverLetter, setCoverLetter] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onGenerate = async () => {
		setLoading(true)
		setError(null)
		try {
			const [r, c] = await Promise.all([
				generateResume(payload),
				generateCoverLetter(payload),
			])
			setResume(r)
			setCoverLetter(c)
		} catch (e: any) {
			setError(e?.message || 'Generation failed')
		} finally {
			setLoading(false)
		}
	}

	const onExport = async (format: 'pdf' | 'docx', which: 'resume' | 'cover') => {
		const content = which === 'resume' ? resume : coverLetter
		if (!content) return
		const filenameBase = which === 'resume' ? `${payload.name || 'resume'}` : `${payload.name || 'cover-letter'}`
		const { filename, media_type, data } = await exportDocument(filenameBase, format, content)
		const bytes = hexToBytes(data)
		const blob = new Blob([bytes], { type: media_type })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = filename
		a.click()
		URL.revokeObjectURL(url)
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div>
				<FormInput value={payload} onChange={setPayload} onGenerate={onGenerate} loading={loading} />
				{error && <div className="mt-4 text-red-600">{error}</div>}
			</div>
			<div className="space-y-6">
				<Preview title="Resume Preview" content={resume} loading={loading} />
				<ExportButtons onExport={onExport} which="resume" disabled={!resume} />
				<Preview title="Cover Letter Preview" content={coverLetter} loading={loading} />
				<ExportButtons onExport={onExport} which="cover" disabled={!coverLetter} />
			</div>
		</div>
	)
}
