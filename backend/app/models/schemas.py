from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class JobDescriptionInput(BaseModel):
    job_description: str = Field(..., description="The job description text.")

class ResumeInput(BaseModel):
    job_description: str = Field(..., description="The job description text.")
    resume_latex_code: str = Field(..., description="The resume as LaTeX code.")

class RefinementInput(BaseModel):
    job_description: str = Field(..., description="The job description text.")
    original_resume_latex_code: str = Field(..., description="The original resume as LaTeX code.")
    evaluation: Dict[str, Any] = Field(..., description="The evaluation JSON object.")

class EvaluationOutput(BaseModel):
    experience_match: Dict[str, Any]
    skills_and_techstack_match: Dict[str, Any]
    projects_match: Dict[str, Any]
    education_match: Dict[str, Any]
    profile_match: Dict[str, Any]
    industry_and_domain_match: Dict[str, Any]
    certifications_and_achievements_match: Dict[str, Any]
    overall_match: Dict[str, Any]

class RefinedResumeOutput(BaseModel):
    refined_latex_code: str
    overall_improvements_summary: Optional[str] = None
