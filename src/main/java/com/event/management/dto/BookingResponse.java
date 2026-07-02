package com.event.management.dto;

import com.event.management.entity.Event;

public class BookingResponse {

    private Long bookingId;
    private Event event;

    public BookingResponse() {}

    public BookingResponse(Long bookingId, Event event) {
        this.bookingId = bookingId;
        this.event = event;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}