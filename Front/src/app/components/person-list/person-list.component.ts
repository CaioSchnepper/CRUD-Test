import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/domain/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons?: Person[];

  currentPerson: Person = {};

  currentIndex = -1;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.retrievePersons();
  }

  retrievePersons(): void {
    this.personService.getAll()
      .subscribe({
        next: (data) => {
          this.persons = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePersons();
    this.currentPerson = {};
    this.currentIndex = -1;
  }

  setActivePerson(person: Person, index: number): void {
    this.currentPerson = person;
    this.currentIndex = index;
  }

}
