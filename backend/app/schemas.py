from pydantic import BaseModel
from typing import Optional, List


class ResourceBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    tipo: str
    url: Optional[str] = None
    tags: Optional[str] = None


class ResourceCreate(ResourceBase):
    pass


class Resource(ResourceBase):
    id: int

    class Config:
        from_attributes = True


class SmartAssistRequest(BaseModel):
    titulo: str
    tipo: str


class SmartAssistResponse(BaseModel):
    descricao: str
    tags: List[str]
