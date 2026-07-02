package com.event.management.serviceimpl;

import com.event.management.entity.Event;
import com.event.management.entity.User;
import com.event.management.repository.EventRepository;
import com.event.management.repository.UserRepository;
import com.event.management.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<Event> getEventsByUser(Long userId) {
        return eventRepository.findByUserId(userId);
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    @Override
    public Event saveEvent(Event event, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        event.setUser(user);

        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Long id, Event event) {

        Event existing = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        existing.setName(event.getName());
        existing.setDescription(event.getDescription());
        existing.setLocation(event.getLocation());

        return eventRepository.save(existing);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}