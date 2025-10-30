import { Link, Outlet } from 'react-router-dom'

export default function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-white border-b">
				<div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
					<Link to="/" className="text-xl font-semibold">ATS Resume Builder</Link>
					<nav className="space-x-4">
						<Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
						<Link to="/generate" className="text-gray-600 hover:text-gray-900">Generate</Link>
					</nav>
				</div>
			</header>
			<main className="flex-1">
				<div className="max-w-5xl mx-auto px-4 py-8">
					<Outlet />
				</div>
			</main>
			<footer className="border-t bg-white py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} ATS Resume Builder</footer>
		</div>
	)
}
