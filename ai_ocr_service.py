from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from typing import List, Optional
import os
import time
import uvicorn
import requests
import base64

app = FastAPI(title="MedVerify AI/OCR Service", version="1.0.0")

# API Key authentication
API_KEY = os.environ.get("API_KEY", "medverify-secret-key-2024")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=True)

def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")
    return api_key

class SymptomRequest(BaseModel):
    symptoms: List[str]
    duration: Optional[str] = None
    age: Optional[int] = None

class SummarizeRequest(BaseModel):
    ocr_text: str

def ocr_cloud_api(image_bytes):
    """Use free OCR API (no local dependencies)"""
    try:
        # OCR.space free API (100 requests/day free)
        response = requests.post(
            'https://api.ocr.space/parse/image',
            files={'file': ('image.jpg', image_bytes)},
            data={'apikey': 'helloworld', 'language': 'eng', 'isOverlayRequired': False},
            timeout=30
        )
        data = response.json()
        if data.get('IsErroredOnProcessing') == False:
            text = data['ParsedResults'][0]['ParsedText']
            return text
        return ""
    except Exception as e:
        print(f"OCR error: {e}")
        return ""

@app.get("/health")
def health():
    return {"status": "ok", "version": "1.0.0", "ocr_loaded": True}

@app.post("/internal/ocr/extract", dependencies=[Depends(verify_api_key)])
async def extract_ocr(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image")
    
    contents = await file.read()
    extracted_text = ocr_cloud_api(contents)
    
    if not extracted_text:
        extracted_text = "Unable to extract text from image"
    
    emergency_keywords = ["chest pain", "difficulty breathing", "severe bleeding", 
                         "heart attack", "stroke", "unconscious", "emergency"]
    contains_emergency = any(kw in extracted_text.lower() for kw in emergency_keywords)
    
    return {
        "extracted_text": extracted_text,
        "word_count": len(extracted_text.split()),
        "confidence": 0.85,
        "contains_emergency_keywords": contains_emergency
    }

@app.post("/internal/triage/analyze", dependencies=[Depends(verify_api_key)])
async def analyze_symptoms(request: SymptomRequest):
    symptoms_lower = [s.lower() for s in request.symptoms]
    
    emergency_symptoms = ["chest pain", "difficulty breathing", "shortness of breath",
                         "severe bleeding", "unconscious", "heart attack", "stroke"]
    high_urgency = [s for s in symptoms_lower if s in emergency_symptoms]
    
    if high_urgency:
        return {
            "alert_id": f"alert_{int(time.time())}",
            "severity": "HIGH",
            "reason": f"{', '.join(high_urgency)} detected",
            "status": "open",
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "recommendation": "Seek immediate medical attention. Call emergency services."
        }
    
    medium_symptoms = ["fever", "vomiting", "diarrhea", "severe headache", "injury", "cough"]
    medium_urgency = [s for s in symptoms_lower if s in medium_symptoms]
    
    if medium_urgency:
        return {
            "alert_id": f"alert_{int(time.time())}",
            "severity": "MEDIUM",
            "reason": f"{', '.join(medium_urgency)} reported",
            "status": "open",
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "recommendation": "Consult a physician within 24-48 hours"
        }
    
    return {
        "alert_id": f"alert_{int(time.time())}",
        "severity": "LOW",
        "reason": "Non-urgent symptoms reported",
        "status": "open",
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "recommendation": "Monitor symptoms. Schedule routine appointment if needed."
    }

@app.post("/internal/report/summarize", dependencies=[Depends(verify_api_key)])
async def summarize_report(request: SummarizeRequest):
    text = request.ocr_text.lower()
    
    findings = []
    if "bp" in text or "blood pressure" in text:
        findings.append("Blood pressure mentioned")
    if "sugar" in text or "glucose" in text:
        findings.append("Blood sugar mentioned")
    if "medication" in text or "prescribed" in text:
        findings.append("Medications prescribed")
    
    return {
        "summary": f"Medical report analysis: {request.ocr_text[:200]}...",
        "key_findings": findings if findings else ["No specific findings extracted"],
        "abnormalities": ["Possible abnormal values detected"] if "abnormal" in text else []
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)