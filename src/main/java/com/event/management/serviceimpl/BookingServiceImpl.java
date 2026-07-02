package com.event.management.serviceimpl;

import com.event.management.entity.Booking;
import com.event.management.entity.Event;
import com.event.management.repository.BookingRepository;
import com.event.management.repository.EventRepository;
import com.event.management.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Booking bookEvent(Booking booking) {

        Long userId = booking.getUser().getId();
        Long eventId = booking.getEvent().getId();

        // Prevent duplicate booking
        if (bookingRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new RuntimeException("You have already booked this event.");
        }

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Integer seats = event.getAvailableSeats();

        if (seats == null) {
            seats = 0;
        }

        if (seats <= 0) {
            throw new RuntimeException("No seats available");
        }

        event.setAvailableSeats(seats - 1);
        eventRepository.save(event);

        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Event event = booking.getEvent();

        if (event != null) {

            Integer seats = event.getAvailableSeats();

            if (seats == null) {
                seats = 0;
            }

            event.setAvailableSeats(seats + 1);
            eventRepository.save(event);
        }

        bookingRepository.delete(booking);
    }
}