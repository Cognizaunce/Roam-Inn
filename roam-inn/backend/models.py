from sqlalchemy import Column, Integer, String, Float, DECIMAL, Text, Enum, Date, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import enum

# Define enums for status fields
class AvailabilityStatus(enum.Enum):
    available = "available"
    booked = "booked"

class PaymentStatus(enum.Enum):
    pending = "pending"
    successful = "successful"
    failed = "failed"

class PaymentMethod(enum.Enum):
    credit_card = "credit_card"
    PayPal = "PayPal"
    bank_transfer = "bank_transfer"

class UserType(enum.Enum):
    user = "user"
    admin = "admin"
    guest = "guest"


class User(Base):
    __tablename__ = "Users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    user_type = Column(Enum(UserType), nullable=False)
    phone_number = Column(String(15))
    account_created = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    account_updated = Column(TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    bookings = relationship("Booking", back_populates="user")
    reviews = relationship("Review", back_populates="user")


class Hotel(Base):
    __tablename__ = "Hotels"

    hotel_id = Column(String(50), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    postal_code = Column(String(10))
    rooms = relationship("Room", back_populates="hotel")
    reviews = relationship("Review", back_populates="hotel")


class Room(Base):
    __tablename__ = "Rooms"

    room_id = Column(Integer, primary_key=True, autoincrement=True)
    hotel_id = Column(String(50), ForeignKey("Hotels.hotel_id"), nullable=False)
    room_type = Column(String(50), nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    availability_status = Column(Enum(AvailabilityStatus), nullable=False)

    hotel = relationship("Hotel", back_populates="rooms")
    bookings = relationship("Booking", back_populates="room")


class Booking(Base):
    __tablename__ = "Bookings"

    booking_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("Users.user_id"), nullable=False)
    room_id = Column(Integer, ForeignKey("Rooms.room_id"), nullable=False)
    check_in_date = Column(Date, nullable=False)
    check_out_date = Column(Date, nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    payment_status = Column(Enum(PaymentStatus), nullable=False)
    created_on = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    updated_on = Column(TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    user = relationship("User", back_populates="bookings")
    room = relationship("Room", back_populates="bookings")
    payment = relationship("Payment", back_populates="booking")


class Payment(Base):
    __tablename__ = "Payments"

    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    booking_id = Column(Integer, ForeignKey("Bookings.booking_id"), nullable=False)
    payment_method = Column(Enum(PaymentMethod), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    transaction_date = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    payment_status = Column(Enum(PaymentStatus), nullable=False)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    booking = relationship("Booking", back_populates="payment")


class Review(Base):
    __tablename__ = "Reviews"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    hotel_id = Column(String(50), ForeignKey("Hotels.hotel_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("Users.user_id"), nullable=False)
    rating = Column(Integer, nullable=False)
    user_comment = Column(Text)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    hotel = relationship("Hotel", back_populates="reviews")
    user = relationship("User", back_populates="reviews")
