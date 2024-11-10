from sqlalchemy.orm import Session
from models import Hotel

def create_hotel(db: Session, name: str, city: str, rating: float, address: str):
    db_hotel = Hotel(name=name, city=city, rating=rating, address=address)
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel

def get_hotels_by_city(db: Session, city: str):
    return db.query(Hotel).filter(Hotel.city == city).all()
