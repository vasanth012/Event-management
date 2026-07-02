package com.event.management.service;

import com.event.management.entity.Booking;

import java.util.List;

public interface BookingService {

    Booking bookEvent(Booking booking);

    List<Booking> getBookingsByUser(Long userId);

    void cancelBooking(Long id);

}