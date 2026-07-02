package com.event.management.controller;

import com.event.management.entity.User;
import com.event.management.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ===========================
    // Register User
    // ===========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    // ===========================
    // Login User
    // ===========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail());

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        if (!user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect password.");
        }

        return ResponseEntity.ok(user);
    }

    // ===========================
    // Get All Users
    // ===========================
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ===========================
    // Get User By ID
    // ===========================
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {

        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    // ===========================
    // Delete User
    // ===========================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok("User deleted successfully.");
    }

}