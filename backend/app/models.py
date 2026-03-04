from sqlalchemy import Column, Integer, String, Text
from .database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(Text)
    tipo = Column(String, nullable=False)
    url = Column(String)
    tags = Column(String)
