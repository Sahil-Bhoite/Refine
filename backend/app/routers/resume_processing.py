from fastapi import APIRouter, Form, HTTPException
from app.models.schemas import ResumeInput, RefinementInput, EvaluationOutput, RefinedResumeOutput
from app.core.openai_service import evaluate_resume_text, refine_resume
from typing import Dict, Any
import json

router = APIRouter(
    prefix="/api",
    tags=["resume"]
)

@router.post("/evaluate_resume", response_model=EvaluationOutput)
async def evaluate_resume(
    job_description: str = Form(...),
    resume_latex_code: str = Form(...)
):
    """
    Evaluate a LaTeX resume against a job description.
    """
    if not job_description:
        raise HTTPException(status_code=400, detail="Job description is required.")
    if not resume_latex_code or not resume_latex_code.strip():
        raise HTTPException(status_code=400, detail="Resume LaTeX code is required.")

    eval_json_str = evaluate_resume_text(job_description, resume_latex_code)
    try:
        eval_json = json.loads(eval_json_str)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to parse evaluation result from OpenAI.")

    return eval_json

@router.post("/refine_resume", response_model=RefinedResumeOutput)
async def refine_resume_endpoint(input: RefinementInput):
    """
    Refine a LaTeX resume based on job description and evaluation.
    """
    try:
        refined_latex, summary = refine_resume(
            input.job_description,
            input.original_resume_latex_code,
            input.evaluation
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to refine resume: {e}")

    return {"refined_latex_code": refined_latex, "overall_improvements_summary": summary}
