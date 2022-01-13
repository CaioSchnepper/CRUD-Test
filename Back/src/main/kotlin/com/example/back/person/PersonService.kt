package com.example.back.person

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["http://localhost:8081"])
@RequestMapping("/person")
class PersonService @Autowired constructor(
    private var personRepository: PersonRepository
) {

    @GetMapping
    fun getAll(): ResponseEntity<List<Person>> = ResponseEntity(personRepository.findAll(), HttpStatus.OK)

    @GetMapping("/{id}")
    fun getById(@PathVariable("id") id: String): ResponseEntity<Person> =
        ResponseEntity(
            personRepository.findById(id).orElseThrow { IllegalArgumentException("Pessoa não encontrada") },
            HttpStatus.OK
        )

    @PostMapping
    fun create(@RequestBody person: Person): ResponseEntity<Person> = ResponseEntity(
        personRepository.save(Person(person.id, person.name, person.document))
            ?: throw IllegalArgumentException("Erro ao salvar pessoa"),
        HttpStatus.CREATED
    )

    @PutMapping("/{id}")
    fun update(@PathVariable("id") id: String, @RequestBody newPerson: Person): ResponseEntity<Person> {
        val oldPerson = personRepository.findById(id).orElseThrow { IllegalArgumentException("Pessoa não encontrada") }
        return ResponseEntity(
            personRepository.save(oldPerson
                .apply { name = newPerson.name }
                .apply { document = newPerson.document })
                ?: throw IllegalArgumentException("Erro ao salvar pessoa"),
            HttpStatus.OK
        )
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: String): ResponseEntity<HttpStatus> {
        personRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }

}