package com.example.back.person

import org.springframework.data.mongodb.repository.MongoRepository

interface PersonRepository : MongoRepository<Person, String>