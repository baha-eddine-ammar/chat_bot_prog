interface Props {
	title: string
	content: string
	loading?: boolean
}

export default function Preview({ title, content, loading }: Props) {
	return (
		<section className="bg-white rounded-md shadow p-4">
			<h2 className="font-semibold mb-3">{title}</h2>
			{loading ? (
				<div className="animate-pulse text-gray-500">Generating…</div>
			) : (
				<pre className="whitespace-pre-wrap text-sm leading-relaxed">{content || 'No content yet.'}</pre>
			)}
		</section>
	)
}
