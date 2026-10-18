import os
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import resend

# Cargar variables de entorno desde .env local o raíz
env_path = Path(__file__).resolve().parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "").strip()
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "nicolas.psilvera@gmail.com").strip()
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "Portfolio Contact <onboarding@resend.dev>").strip()

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(
    title="Portfolio Email API — Nicolás Pereira",
    description="Microservicio con FastAPI para recepción de mensajes y envío vía Resend API.",
    version="1.0.0",
)

# Configuración de CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nombre del remitente")
    email: EmailStr = Field(..., description="Correo electrónico del remitente")
    subject: Optional[str] = Field(default=None, max_length=150, description="Asunto opcional")
    message: str = Field(..., min_length=5, max_length=5000, description="Cuerpo del mensaje")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Portfolio Email API",
        "endpoints": {
            "send_email": "POST /api/send-email",
            "health": "GET /health",
        },
    }

@app.get("/health")
def health_check():
    api_key_configured = bool(RESEND_API_KEY and not RESEND_API_KEY.startswith("re_tu_api_key"))
    return {
        "status": "healthy",
        "resend_configured": api_key_configured,
        "recipient": RECIPIENT_EMAIL,
    }

@app.post("/api/send-email", status_code=status.HTTP_200_OK)
def send_email(data: ContactMessage):
    # Recargar clave en caso de haber sido actualizada en caliente
    api_key = os.getenv("RESEND_API_KEY", "").strip()
    if not api_key or api_key.startswith("re_tu_api_key"):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="La variable RESEND_API_KEY no está configurada o contiene el valor por defecto en backend/.env",
        )

    resend.api_key = api_key
    recipient = os.getenv("RECIPIENT_EMAIL", "nicolas.psilvera@gmail.com").strip()
    sender = os.getenv("SENDER_EMAIL", "Portfolio Contact <onboarding@resend.dev>").strip()

    subject_text = data.subject if data.subject else f"Nuevo contacto desde portfolio: {data.name}"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #221D26; line-height: 1.5; padding: 20px; }}
        .card {{ background: #F7F1E2; border: 1.5px solid #221D26; border-radius: 8px; padding: 24px; max-width: 600px; margin: 0 auto; box-shadow: 4px 4px 0 #6A46E5; }}
        .header {{ border-bottom: 1.5px dashed #C5BCAB; padding-bottom: 12px; margin-bottom: 16px; }}
        .tag {{ display: inline-block; background: #6A46E5; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }}
        .meta {{ font-size: 14px; color: #555; margin: 6px 0; }}
        .message {{ background: #fff; border: 1px solid #D6CEBE; border-radius: 6px; padding: 16px; font-size: 15px; white-space: pre-wrap; margin-top: 14px; }}
        .footer {{ font-size: 12px; color: #888; margin-top: 20px; text-align: center; }}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="tag">Mensaje de Portfolio</span>
          <h2 style="margin: 8px 0 4px; color: #221D26;">{data.name} te ha contactado</h2>
          <div class="meta"><strong>De:</strong> {data.name} &lt;{data.email}&gt;</div>
          <div class="meta"><strong>Asunto:</strong> {subject_text}</div>
        </div>
        <div class="message">{data.message}</div>
        <div class="footer">Enviado a través del endpoint FastAPI + Resend de tu Portfolio.</div>
      </div>
    </body>
    </html>
    """

    try:
        params: resend.Emails.SendParams = {
            "from": sender,
            "to": [recipient],
            "reply_to": data.email,
            "subject": subject_text,
            "html": html_content,
        }

        email_response = resend.Emails.send(params)
        return {
            "status": "success",
            "message": "Correo enviado exitosamente.",
            "data": email_response,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Error al enviar correo mediante la API de Resend: {str(e)}",
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
