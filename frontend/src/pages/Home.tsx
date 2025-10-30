import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<div className="text-center">
			<h1 className="text-4xl md:text-5xl font-bold mb-6">Baha Eddine Ammar</h1>
			<p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
				This web application allows users to create professional resumes and cover letters optimized for ATS systems. Simply input your details, and the AI will generate tailored, high-quality documents ready to download in PDF or Word format.
			</p>
			<Link to="/generate" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">Get Started</Link>
		</div>
	)
}
