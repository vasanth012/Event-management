package com.event.management.service;

import com.event.management.entity.Event;
import java.util.List;

public interface EventService {

    List<Event> getAllEvents();

    List<Event> getEventsByUser(Long userId);

    Event getEventById(Long id);

    Event saveEvent(Event event, Long userId);

    Event updateEvent(Long id, Event event);

    void deleteEvent(Long id);
}