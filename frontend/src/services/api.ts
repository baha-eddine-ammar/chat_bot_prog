import axios from 'axios'
import type { Payload } from '../pages/Generator'

export async function generateResume(payload: Payload): Promise<string> {
	const { data } = await axios.post('/generate_resume', payload)
	return data.resume as string
}

export async function generateCoverLetter(payload: Payload): Promise<string> {
	const { data } = await axios.post('/generate_cover_letter', payload)
	return data.cover_letter as string
}

export async function exportDocument(filename: string, format: 'pdf' | 'docx', content: string): Promise<{ filename: string; media_type: string; data: string; }>{
	const { data } = await axios.post('/export', { filename, format, content })
	return data
}
