package com.event.management.service;

import java.util.List;

import com.event.management.entity.User;

public interface UserService {

    // Register User
    User registerUser(User user);

    // Login User
    User loginUser(String email, String password);

    // Get All Users
    List<User> getAllUsers();

    // Get User By Id
    User getUserById(Long id);

    // Delete User
    void deleteUser(Long id);

}