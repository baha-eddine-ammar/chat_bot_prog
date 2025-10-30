interface Props {
	onExport: (format: 'pdf' | 'docx', which: 'resume' | 'cover') => void
	which: 'resume' | 'cover'
	disabled?: boolean
}

export default function ExportButtons({ onExport, which, disabled }: Props) {
	return (
		<div className="flex items-center gap-3">
			<button className="btn" disabled={disabled} onClick={() => onExport('pdf', which)}>Export {which === 'resume' ? 'Resume' : 'Cover'} as PDF</button>
			<button className="btn" disabled={disabled} onClick={() => onExport('docx', which)}>Export as Word</button>
		</div>
	)
}
