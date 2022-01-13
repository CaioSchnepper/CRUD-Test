package com.example.back.person

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document(collection = "person")
class Person(
    @Id var id: String? = UUID.randomUUID().toString(),
    var name: String,
    var document: Int
)