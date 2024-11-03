
-- view 1
CREATE VIEW UserBookings AS
SELECT u.user_id, u.first_name, u.last_name, b.booking_id, r.room_type, 
h.name AS hotel_name, b.check_in_date, b.check_out_date, b.total_price
FROM Users u
JOIN Bookings b ON u.user_id = b.user_id
JOIN Rooms r ON b.room_id = r.room_id
JOIN Hotels h ON r.hotel_id = h.hotel_id;

-- view 2
CREATE VIEW AverageBookedRoomPriceByHotel AS
SELECT h.name AS hotel_name, AVG(r.price) AS average_booked_room_price
FROM Hotels h
JOIN Rooms r ON h.hotel_id = r.hotel_id
WHERE r.availability_status = 'booked'
GROUP BY h.name;

-- view 3
CREATE VIEW ActiveBookings AS
SELECT u.user_id, u.first_name, u.last_name, b.booking_id, b.check_in_date,
 b.check_out_date
FROM Users u
JOIN Bookings b ON u.user_id = b.user_id
WHERE CURRENT_DATE BETWEEN b.check_in_date AND b.check_out_date;

-- view 4
CREATE VIEW HotelAmenities AS
SELECT h.hotel_id, h.name AS hotel_name, a.amenity_name
FROM Hotels h
LEFT JOIN Amenities a ON h.hotel_id = a.hotel_id
UNION
SELECT h.hotel_id, h.name AS hotel_name, a.amenity_name
FROM Hotels h
RIGHT JOIN Amenities a ON h.hotel_id = a.hotel_id;

-- view 5
CREATE VIEW PopularHotels AS
SELECT h.hotel_id, h.name AS hotel_name, COUNT(b.booking_id) AS total_bookings
FROM Hotels h
JOIN Rooms r ON h.hotel_id = r.hotel_id
JOIN Bookings b ON r.room_id = b.room_id
GROUP BY h.hotel_id, h.name
ORDER BY total_bookings DESC;


-- remaining 5 views
CREATE VIEW HighRatedBookedHotels AS
SELECT h.name AS hotel_name, r.room_type, r.price
FROM Hotels h
JOIN Rooms r ON h.hotel_id = r.hotel_id
WHERE h.rating >= 4.5 AND r.availability_status = 'booked';

CREATE VIEW CommonAmenitiesByHotel AS
SELECT h.name AS hotel_name, a.amenity_name, COUNT(a.amenity_name) AS 
amenity_count
FROM Hotels h
JOIN Amenities a ON h.hotel_id = a.hotel_id
GROUP BY h.name, a.amenity_name
ORDER BY amenity_count DESC;

CREATE VIEW TotalPaymentsByUser AS
SELECT u.user_id, u.first_name, u.last_name, SUM(p.amount) AS total_spent
FROM Users u
JOIN Bookings b ON u.user_id = b.user_id
JOIN Payments p ON b.booking_id = p.booking_id
WHERE p.status = 'successful'
GROUP BY u.user_id, u.first_name, u.last_name;

CREATE VIEW RecentHighRatedHotelReviews AS
SELECT h.name AS hotel_name, r.user_comment, r.rating, r.created_at
FROM Hotels h
JOIN Reviews r ON h.hotel_id = r.hotel_id
WHERE h.rating >= 4 AND r.created_at >= 
DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH);

CREATE VIEW BookingsPerCity AS
SELECT h.city, COUNT(b.booking_id) AS total_bookings
FROM Hotels h
JOIN Rooms r ON h.hotel_id = r.hotel_id
JOIN Bookings b ON r.room_id = b.room_id
GROUP BY h.city;