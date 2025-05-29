import openai
from app.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def generate_expert_prompt(job_description: str) -> str:
    prompt = f"""
    Analyze the following job description and create a persona of a strict hiring manager with deep expertise in the relevant field. Your persona should reflect the specific requirements and preferences outlined in the job description.

    Job Description:
    {job_description}

    When creating your persona, consider the following:
    - Identify the industry or domain of the role and position yourself as an expert with over 10 years of experience in that area.
    - Determine whether the role is technical or non-technical. For technical roles, emphasize the importance of specific technical qualifications and a high rejection rate (e.g., rejecting 95% of applicants who don’t meet exact criteria). For non-technical or entry-level roles, focus on domain expertise, measurable outcomes, and potential for growth.
    - Extract key measurable achievements or metrics mentioned in the job description (e.g., revenue growth, system performance, customer metrics) and prioritize these in your evaluation.
    - If the job description specifies a minimum experience requirement (e.g., '5+ years'), enforce it strictly. If not, infer a reasonable minimum based on role complexity and industry norms (e.g., 2-3 years for mid-level, 0-1 years for entry-level) and evaluate flexibly.
    - Identify the most critical skills for the role and value depth in these areas over breadth, but allow for transferable skills when experience is limited.

    Based on this analysis, describe your persona in 2-3 sentences, highlighting how you will evaluate candidates based on the job description’s requirements. Ensure your persona is consistent, authoritative, and tailored to the role, while being adaptable to JDs without explicit experience minimums.
    """
    response = openai.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": "You’re an expert AI recruiter."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content

def evaluate_resume_text(jd_text: str, resume_latex_code: str) -> dict:
    expert_prompt = generate_expert_prompt(jd_text)
    score_guidelines = """
    **STRICT ADHERENCE TO JOB DESCRIPTION REQUIREMENTS IS CRITICAL.** Evaluate the resume SOLELY based on the explicit requirements and preferences stated in the Job Description.

    STEP 1:
    Using the hiring persona from above and the job description, evaluate the candidate's resume (provided as LaTeX code) and assign scores (0-100) with a brief explanation for each section:

    Evaluate these areas: Experience, Skills/Techstack, Projects, Education, Profile, Industry/Domain, Certifications/Achievements. 
    Assign each a score from 0 to 100 based on its alignment with the job description. Follow these guidelines:

    1. Experience Match:
    - If the JD specifies a minimum experience requirement (e.g., '5+ years'), enforce it strictly and base the score on that.
    - If no minimum is specified, infer a reasonable requirement based on role complexity and industry norms (e.g., 2-3 years for mid-level, 0-1 years for entry-level) and score flexibly, considering transferable experience.
    - 95-100: Exceeds inferred or required experience with directly relevant work.
    - 85-94: Meets exact inferred or required experience with relevant roles.
    - 75-84: 80-99% of inferred or required experience with some relevance.
    - 65-74: 50-79% of inferred or required experience with partial relevance.
    - <65: Below 50% of inferred or required experience or irrelevant roles.

    2. Skills/Techstack:
    - 95-100: All required skills present plus advanced bonus skills.
    - 85-94: All required skills present.
    - 75-84: Missing 1-2 secondary skills but has core skills.
    - 65-74: Missing some core skills but has transferable ones.
    - <65: Missing multiple core skills critical to the JD.

    3. Project Relevance:
    - 95-100: Multiple production-grade projects directly matching JD requirements.
    - 85-94: 1-2 relevant projects with clear, measurable impact.
    - 75-84: Academic or research projects relevant to the JD.
    - 65-74: Unrelated projects showing applicable skills.
    - <65: No relevant projects or impact demonstrated.

    4. Education:
    - Evaluate the candidate’s educational background flexibly, considering formal degrees, practical experience, and alternative qualifications.
    - For technical roles:
      * 95-100: Degree from a top-tier technical institute (e.g., MIT, Stanford) with relevant focus; or 5+ years of proven technical impact in a related role; or highly regarded bootcamp completion (e.g., Lambda School) with strong portfolios.
      * 85-94: Degree from a Tier-2 technical institute (e.g., strong regional schools); or reputable online certifications (e.g., Coursera, edX) with practical projects.
      * 75-84: Degree from a Tier-3 institute with relevant focus; or self-taught skills with significant open-source/personal projects.
      * 65-74: Non-technical degree with relevant certifications (e.g., AWS); or limited practical experience.
      * <65: Unrelated or unaccredited degree with no compensating qualifications.
    - For non-technical roles:
      * 95-100: Degree from a top-tier institute (e.g., Ivy League) matching JD; or 7+ years of relevant experience.
      * 85-94: Degree from a Tier-1 institute (e.g., national universities) with relevant focus; or advanced certifications.
      * 75-84: Degree from a Tier-2 institute with relevant focus; or practical experience showing required skills.
      * 65-74: Related degree from a lesser-known institute; or limited relevant experience.
      * <65: Unrelated or unaccredited degree with no compensating skills.
    - Adjust upward if practical experience or alternative qualifications strongly compensate for formal education gaps.

    5. Profile:
    - Assess career trajectory, role progression, and alignment with JD seniority.
    - 95-100: Consistent progression in directly relevant roles with leadership or advanced duties.
    - 85-94: Strong alignment with JD seniority, minor deviations (e.g., brief unrelated roles).
    - 75-84: Some relevance but inconsistent progression or unrelated roles.
    - 65-74: Loosely related trajectory with limited progression.
    - <65: Unrelated trajectory or no progression.

    6. Industry/Domain:
    - 95-100: Extensive experience in the exact industry/domain of the JD.
    - 85-94: Experience in a closely related industry/domain.
    - 75-84: Experience in a somewhat related industry/domain.
    - 65-74: Limited related industry/domain experience.
    - <65: No relevant industry/domain experience.

    7. Certifications/Achievements:
    - 95-100: Holds JD-required certifications or notable achievements (e.g., awards, patents).
    - 85-94: Holds related certifications or achievements not in JD.
    - 75-84: Holds general certifications or achievements.
    - 65-74: Limited certifications or achievements.
    - <65: No relevant certifications or achievements.

    For each section, provide a brief reasoning (1-2 sentences) explaining the score, specifically referencing the job description’s requirements and how the resume meets or falls short of them. Ensure reasoning is clear, concise, and actionable.

    STEP 2: Calculate weighted overall score:
    - Use these weights based on job seniority:
      - Senior-level roles (5+ years):
        * Experience: 40%
        * Skills/Techstack: 25%
        * Projects: 15%
        * Education: 10%
        * Profile: 5%
        * Industry/Domain: 3%
        * Certifications/Achievements: 2%
      - Mid-level roles (2-5 years):
        * Experience: 30%
        * Skills/Techstack: 30%
        * Projects: 20%
        * Education: 10%
        * Profile: 5%
        * Industry/Domain: 3%
        * Certifications/Achievements: 2%
      - Entry-level roles (0-2 years):
        * Experience: 20%
        * Skills/Techstack: 30%
        * Projects: 25%
        * Education: 15%
        * Profile: 5%
        * Industry/Domain: 3%
        * Certifications/Achievements: 2%
      - If the JD emphasizes specific areas (e.g., 'strong project portfolio'), adjust weights (e.g., increase Projects by 5-10%, reduce another category).

    - Calculate: (Experience * weight) + (Skills * weight) + (Projects * weight) + (Education * weight) + (Profile * weight) + (Industry/Domain * weight) + (Certifications/Achievements * weight)

    For overall reasoning, list critical gaps in 2-3 sentences tied to the JD. Keep pros, cons, and fit reasoning distinct and concise.
    Return a JSON:
    {
        "experience_match": { "score": integer, "reasoning": string },
        "skills_and_techstack_match": { "score": integer, "reasoning": string },
        "projects_match": { "score": integer, "reasoning": string },
        "education_match": { "score": integer, "reasoning": string },
        "profile_match": { "score": integer, "reasoning": string },
        "industry_and_domain_match": { "score": integer, "reasoning": string },
        "certifications_and_achievements_match": { "score": integer, "reasoning": string },
        "overall_match": { 
            "score": integer, 
            "reasoning": string, 
            "pros": string, 
            "cons": string, 
            "fit": { "decision": boolean, "reasoning": string }
        }
    }
    - Fit decision: False if experience_match < 85 AND the JD explicitly specifies a minimum experience requirement; otherwise, True if overall score >= 85, with reasoning tied to JD alignment and flexibility for transferable skills if no minimum is specified.
    Ensure JSON is valid, reasoning is specific, and no extra text is included.
    """
    prompt = f"{expert_prompt}\n\nEvaluate this resume LaTeX code:\n{resume_latex_code}\n\n{score_guidelines}"
    response = openai.chat.completions.create(
        model="gpt-4.1",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={"type": "json_object"}
    )
    return response.choices[0].message.content if response.choices else "{}"

def refine_resume(jd_text: str, original_resume_latex_code: str, evaluation: dict):
    import json
    print("Calling OpenAI refine_resume with LaTeX code length:", len(original_resume_latex_code))
    prompt = f"""
You are a perfectionist resume writer with an eye for detail and a deep understanding of how to align resumes precisely with job descriptions. Your task is to optimize the *content* of this LaTeX resume for the given job description based on the evaluation results, while maintaining absolute honesty, especially regarding years of experience.

### Instructions:
- **Do NOT change the LaTeX template, structure, or commands.** Only modify the content within the existing LaTeX commands (e.g., text inside \resumeItem, \resumeSubheading, etc.).
- **Do NOT add, remove, or modify any LaTeX packages, documentclass, or formatting commands.**
- **Do NOT change section order, add new sections, or remove sections.**
- **Focus on Low-Scoring Areas**: Prioritize enhancing sections with low scores (Skills/Techstack, Projects, Certifications/Achievements) to better align with the job requirements, using strong action verbs and quantifiable achievements where possible.
- **Maintain Honesty**: Do not alter years of experience, fabricate roles, or add fictitious projects/certifications. Only refine descriptions within existing roles to highlight relevant responsibilities or achievements if they can be reasonably inferred from the text.
- **Skills/Techstack**: Add missing skills only if they can be directly inferred from projects or roles (e.g., add 'Python' if PySpark is mentioned). Do NOT mark or mention inferences, and do NOT add any '[Inferred from ...]' or similar phrases.
- **Projects**: Enhance project descriptions to emphasize measurable impact only if such impact can be inferred from the resume text. Do not add new projects. Do NOT add any '[Inferred from ...]' or similar phrases.
- **Certifications/Achievements**: Add relevant certifications or achievements only if they are implied by the resume. Do NOT mark or mention inferences, and do NOT add any '[Inferred from ...]' or similar phrases.
- **Conservative Inferences**: Ensure all enhancements are directly supported by the existing resume content. Do not make assumptions beyond what is explicitly stated or reasonably implied. Do NOT add any '[Inferred from ...]' or similar phrases.
- **Maintain Original Tone**: Preserve the original tone and style of the resume to ensure a professional and coherent refined version.

### Job Description:
{jd_text}

### Original Resume LaTeX Code:
{original_resume_latex_code}

### Evaluation Results:
{json.dumps(evaluation)}

Return a JSON object with:
- "refined_latex_code": the complete, modified LaTeX code as a string (with only content changes, not template changes)
- "overall_improvements_summary": a brief summary of the key improvements made (1-2 sentences)
"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4.1",
            messages=[
                {"role": "system", "content": "You are a perfectionist resume writer with an eye for detail and a deep understanding of how to align resumes precisely with job descriptions."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            response_format={"type": "json_object"}
        )
        print("OpenAI refine_resume FULL RESPONSE:", response)
        if response.choices and response.choices[0].message.content:
            print("OpenAI refine_resume raw response:", response.choices[0].message.content)
            result = json.loads(response.choices[0].message.content)
            return result.get("refined_latex_code", ""), result.get("overall_improvements_summary", "")
        print("OpenAI refine_resume: No content in response. Choices:", response.choices)
        return "", ""
    except Exception as e:
        print("OpenAI refine_resume exception:", e)
        return "", ""
