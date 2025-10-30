from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional, Literal
from .ai import generate_resume_text, generate_cover_letter_text
from .export import build_pdf_bytes, build_docx_bytes


class Education(BaseModel):
	institution: str
	degree: str
	start_date: str
	end_date: Optional[str] = None
	description: Optional[str] = None


class Experience(BaseModel):
	company: str
	title: str
	start_date: str
	end_date: Optional[str] = None
	description: Optional[str] = None
	achievements: Optional[List[str]] = None


class GenerationInput(BaseModel):
	name: str
	contact_info: str
	linkedin_url: Optional[HttpUrl] = None
	github_url: Optional[HttpUrl] = None
	education: List[Education] = Field(default_factory=list)
	experience: List[Experience] = Field(default_factory=list)
	skills: List[str] = Field(default_factory=list)
	certifications: List[str] = Field(default_factory=list)
	target_job_description: str


class ExportInput(BaseModel):
	filename: str
	format: Literal["pdf", "docx"]
	content: str


app = FastAPI(title="ATS Resume & Cover Letter Generator")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Simple in-memory store (MVP): last generated content per single-session use
STORE: dict = {"resume": "", "cover_letter": ""}


@app.get("/health")
async def health() -> dict:
	return {"status": "ok"}


@app.post("/generate_resume")
async def generate_resume(payload: GenerationInput) -> dict:
	try:
		text = await generate_resume_text(payload)
		STORE["resume"] = text
		return {"resume": text}
	except Exception as exc:
		raise HTTPException(status_code=500, detail=str(exc))


@app.post("/generate_cover_letter")
async def generate_cover_letter(payload: GenerationInput) -> dict:
	try:
		text = await generate_cover_letter_text(payload)
		STORE["cover_letter"] = text
		return {"cover_letter": text}
	except Exception as exc:
		raise HTTPException(status_code=500, detail=str(exc))


@app.get("/last")
async def last_generated() -> dict:
	return {"resume": STORE.get("resume", ""), "cover_letter": STORE.get("cover_letter", "")}


@app.post("/export")
async def export_document(payload: ExportInput):
	try:
		file_bytes: bytes
		media_type: str
		filename = payload.filename.strip() or "document"
		if payload.format == "pdf":
			file_bytes = build_pdf_bytes(payload.content)
			media_type = "application/pdf"
			filename = f"{filename}.pdf"
		else:
			file_bytes = build_docx_bytes(payload.content)
			media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			filename = f"{filename}.docx"
		return {
			"filename": filename,
			"media_type": media_type,
			"data": file_bytes.hex(),
		}
	except Exception as exc:
		raise HTTPException(status_code=500, detail=str(exc))
