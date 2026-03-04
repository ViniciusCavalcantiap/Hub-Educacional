from fastapi import APIRouter
from app import schemas
from app.services.smart_assist_service import generate_suggestions
import logging

router = APIRouter(prefix="/smart-assist", tags=["Smart Assist"])

logger = logging.getLogger(__name__)


@router.post("/", response_model=schemas.SmartAssistResponse)
def smart_assist(data: schemas.SmartAssistRequest):

    descricao, tags, latency, token_usage = generate_suggestions(data.titulo, data.tipo)

    logger.info(
        f'AI Request: Title="{data.titulo}", TokenUsage={token_usage}, Latency={latency}s'
    )

    return {"descricao": descricao, "tags": tags}
