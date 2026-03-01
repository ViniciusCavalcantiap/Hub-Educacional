from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas

router = APIRouter(prefix="/resources", tags=["Resources"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Resource, status_code=status.HTTP_201_CREATED)
def create_resource(resource: schemas.ResourceCreate, db: Session = Depends(get_db)):
    db_resource = models.Resource(**resource.model_dump())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

@router.get("/", response_model=list[schemas.Resource])
def list_resources(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Resource).offset(skip).limit(limit).all()

@router.get("/{resource_id}", response_model=schemas.Resource)
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(models.Resource).filter(models.Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@router.put("/{resource_id}", response_model=schemas.Resource)
def update_resource(resource_id: int, updated_data: schemas.ResourceCreate, db: Session = Depends(get_db)):
    resource = db.query(models.Resource).filter(models.Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    for key, value in updated_data.model_dump().items():
        setattr(resource, key, value)

    db.commit()
    db.refresh(resource)
    return resource

@router.delete("/{resource_id}")
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(models.Resource).filter(models.Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    db.delete(resource)
    db.commit()
    return {"message": "Resource deleted"}