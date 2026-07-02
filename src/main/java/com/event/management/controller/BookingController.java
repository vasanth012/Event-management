package com.event.management.controller;

import com.event.management.entity.Booking;
import com.event.management.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Book Event
    @PostMapping
    public ResponseEntity<?> bookEvent(@RequestBody Booking booking) {

        try {

            Booking savedBooking = bookingService.bookEvent(booking);

            return ResponseEntity.ok(savedBooking);

        } catch (Exception e) {

            e.printStackTrace();   // Prints full error in Spring Boot console

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get User Bookings
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBookings(@PathVariable Long userId) {

        try {

            List<Booking> bookings = bookingService.getBookingsByUser(userId);

            return ResponseEntity.ok(bookings);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Cancel Booking
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {

        try {

            bookingService.cancelBooking(id);

            return ResponseEntity.ok("Booking Cancelled Successfully");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}