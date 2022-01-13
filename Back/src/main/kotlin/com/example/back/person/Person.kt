package com.example.back.person

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*
import javax.validation.constraints.NotNull

@Document(collection = "person")
class Person(
    @Id var id: String? = UUID.randomUUID().toString(),
    @JsonProperty(value = "name", required = true)
    @NotNull var name: String,
    @JsonProperty(value = "document", required = true)
    @NotNull var document: Int
)