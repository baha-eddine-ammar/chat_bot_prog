import os
from typing import List
from pydantic import BaseModel

# Fallback simple template if no API key is configured

def _format_bullets(items: List[str]) -> str:
	return "\n".join([f"- {i}" for i in items])


def _safe_get(key: str, default: str = "") -> str:
	value = os.getenv(key)
	return value if value is not None else default


def _summarize_experience(exp) -> str:
	lines = [f"{exp.title} at {exp.company} ({exp.start_date} - {exp.end_date or 'Present'})"]
	if exp.description:
		lines.append(exp.description)
	if exp.achievements:
		lines.append(_format_bullets(exp.achievements))
	return "\n".join(lines)


async def generate_resume_text(payload: BaseModel) -> str:
	griq_api_key = _safe_get("GRIQ_API_KEY")
	if not griq_api_key:
		# Simple deterministic resume if key is missing (MVP fallback)
		edu_block = "\n\n".join(
			[f"{e.degree} - {e.institution} ({e.start_date} - {e.end_date or 'Present'})\n{e.description or ''}" for e in payload.education]
		)
		exp_block = "\n\n".join([_summarize_experience(e) for e in payload.experience])
		skills = ", ".join(payload.skills)
		certs = ", ".join(payload.certifications)
		links = " | ".join(filter(None, [payload.linkedin_url or "", payload.github_url or ""]))
		return (
			f"{payload.name}\n{payload.contact_info}\n{links}\n\n"
			"Professional Summary\n"
			f"Results-driven professional targeting: {payload.target_job_description[:180]}...\n\n"
			"Experience\n" + (exp_block or "N/A") + "\n\n"
			"Education\n" + (edu_block or "N/A") + "\n\n"
			f"Skills\n{skills or 'N/A'}\n\nCertifications\n{certs or 'N/A'}\n"
		)

	# Placeholder for LangChain with GRIQ integration.
	# If you have a GRIQ LangChain LLM, plug it here similarly to OpenAI/Groq providers.
	# For this template, we return the same fallback-like structure while signaling key presence.
	edu_block = "\n\n".join(
		[f"{e.degree} - {e.institution} ({e.start_date} - {e.end_date or 'Present'})\n{e.description or ''}" for e in payload.education]
	)
	exp_block = "\n\n".join([_summarize_experience(e) for e in payload.experience])
	skills = ", ".join(payload.skills + ["Cross-functional collaboration", "KPI ownership"]) if payload.skills else "Cross-functional collaboration, KPI ownership"
	certs = ", ".join(payload.certifications)
	links = " | ".join(filter(None, [payload.linkedin_url or "", payload.github_url or ""]))
	return (
		f"{payload.name}\n{payload.contact_info}\n{links}\n\n"
		"Professional Summary\n"
		f"Impact-focused professional aligned to: {payload.target_job_description[:180]}...\n- Delivers measurable outcomes (e.g., +25% efficiency, -30% costs)\n- Optimizes processes with data-driven decisions and automation\n\n"
		"Experience\n" + (exp_block or "N/A") + "\n\n"
		"Education\n" + (edu_block or "N/A") + "\n\n"
		f"Skills\n{skills or 'N/A'}\n\nCertifications\n{certs or 'N/A'}\n"
	)


async def generate_cover_letter_text(payload: BaseModel) -> str:
	griq_api_key = _safe_get("GRIQ_API_KEY")
	greeting = "Dear Hiring Manager,"
	opening = (
		f"I am excited to apply for the role aligned with the following description: {payload.target_job_description[:200]}... "
		"I bring a track record of quantified impact, strong ownership, and the ability to align deliverables with business outcomes."
	)
	body_points = [
		"Delivered measurable improvements (e.g., +20% throughput, -15% lead time)",
		"Optimized workflows for ATS-friendly documentation and clarity",
		"Collaborated cross-functionally to meet deadlines and quality standards",
	]
	closing = (
		"I would welcome the opportunity to discuss how my background can support your goals. "
		"Thank you for your time and consideration."
	)
	signoff = f"Sincerely,\n{payload.name}\n{payload.contact_info}"

	if not griq_api_key:
		return "\n\n".join([greeting, opening, _format_bullets(body_points), closing, signoff])

	# If GRIQ key exists, add slightly more ATS-flavored phrasing
	body_points.insert(0, "Tailor resume keywords to JD, ensuring ATS alignment and high recall")
	return "\n\n".join([greeting, opening, _format_bullets(body_points), closing, signoff])
