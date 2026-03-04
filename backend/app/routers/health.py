from fastapi import APIRouter, status
import time

router = APIRouter(tags=["Health"])


@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "healthy", "timestamp": time.time(), "version": "1.0.0"}
