use roaminn;
-- 1. Create the Users Data Table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('user', 'admin', 'guest') NOT NULL,
    phone_number VARCHAR(15),
    account_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    account_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
    -- enter sql statements for bookings & reviews within User class
    -- bookings = relationship("Booking", back_populates="user")
    -- reviews = relationship("Review", back_populates="user")
);

-- Potential tables for ^ (bookings and reviews)
-- Rooms Table
-- CREATE TABLE Rooms (
--     room_id INT PRIMARY KEY AUTO_INCREMENT,
--     hotel_id VARCHAR(50) NOT NULL,
--     room_number VARCHAR(20) NOT NULL,
--     room_type ENUM('single', 'double', 'suite') NOT NULL,
--     price_per_night DECIMAL(10, 2) NOT NULL,
--     availability BOOLEAN DEFAULT TRUE,
--     FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id) ON DELETE CASCADE
-- );

-- -- Reviews Table
-- CREATE TABLE Reviews (
--     review_id INT PRIMARY KEY AUTO_INCREMENT,
--     user_id INT NOT NULL,
--     hotel_id VARCHAR(50) NOT NULL,
--     review_text TEXT NOT NULL,
--     rating INT CHECK (rating BETWEEN 1 AND 5),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id) ON DELETE CASCADE
-- );


-- 2. Create The Hotels Data table
CREATE TABLE Hotels (
    hotel_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR (255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10)
    -- need sql for rooms, reviews, 
    -- rooms = relationship("Room", back_populates="hotel")
    -- reviews = relationship("Review", back_populates="hotel")
);

-- 3 Create the Rooms Table
CREATE TABLE Rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id VARCHAR(50) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availability_status ENUM('available', 'booked') NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id) ON DELETE CASCADE
);

-- 4. Create the Bookings table
CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Rooms (room_id) ON DELETE CASCADE
);


-- 5. Create the Payments Table
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    payment_method ENUM('credit_card', 'PayPal', 'bank_transfer') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('successful', 'failed') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id) ON DELETE CASCADE
    -- sql for booking
    --  booking = relationship("Booking", back_populates="payment")
);

-- 6. Create the Reviews Table
CREATE TABLE Reviews(
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    user_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    -- sql for hotel and user
    --  hotel = relationship("Hotel", back_populates="reviews")
    -- user = relationship("User", back_populates="reviews")

);