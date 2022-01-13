import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/domain/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-tutorial',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person: Person = {
    name: '',
    document: undefined
  };

  submitted = false;

  valid = false;

  buttonPressed = false

  constructor(private personService: PersonService) { }

  ngOnInit(): void { }

  savePerson(): void {
    this.buttonPressed = true;

    if (this.isPersonValid() == false) {
      this.valid = false;
      return
    }

    const data = {
      name: this.person.name,
      document: this.person.document
    };

    this.personService.create(data)
      .subscribe({
        next: () => {
          this.submitted = true;
          this.valid = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPerson(): void {
    this.submitted = false;
    this.person = {
      name: '',
      document: undefined
    };
  }

  isPersonValid(): boolean {
    if ((this.person.name) && (this.person.name.length > 0) && (this.person.document)) return true
    else return false
  }

}
