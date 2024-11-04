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
CREATE VIEW HighRatedHotelsWithReviewCount AS
SELECT h.hotel_id, h.name AS hotel_name, AVG(r.rating) AS average_rating, 
       COUNT(r.review_id) AS total_reviews
FROM Hotels h
JOIN Reviews r ON h.hotel_id = r.hotel_id
GROUP BY h.hotel_id, h.name
HAVING AVG(r.rating) >= 4
ORDER BY average_rating DESC;

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

CREATE VIEW HighDemandRooms AS
SELECT r.room_id, r.room_type, r.price, h.name AS hotel_name,
       COUNT(p.payment_id) AS successful_payment_count,
       CASE 
           WHEN COUNT(p.payment_id) > 10 THEN 'Consider Price Increase'
           ELSE 'Stable Price'
       END AS price_status
FROM Rooms r
JOIN Hotels h ON r.hotel_id = h.hotel_id
JOIN Bookings b ON r.room_id = b.room_id
JOIN Payments p ON b.booking_id = p.booking_id
WHERE p.status = 'successful'
GROUP BY r.room_id, r.room_type, r.price, h.name
ORDER BY successful_payment_count DESC;

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
