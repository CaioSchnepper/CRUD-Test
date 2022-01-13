import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/domain/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentPerson: Person = {
    name: '',
    document: undefined,
  };

  oldPerson: Person = new Person;

  message = '';

  valid = false;

  buttonPressed = false;

  personChanged = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPerson(this.route.snapshot.params["id"]);
    }
  }

  getPerson(id: string): void {
    this.personService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPerson = data;
          this.oldPerson.name = data.name;
          this.oldPerson.document = data.document;
        },
        error: (e) => console.error(e)
      });
  }

  updatePerson(): void {
    this.message = '';

    this.buttonPressed = true;

    if (this.isPersonValid() == false) {
      this.valid = false;
      return;
    } else {
      this.valid = true;
    }

    if (this.hasPersonChanged() == false) {
      this.personChanged = false;
      return;
    } else {
      this.personChanged = true;
    }

    this.personService.update(this.currentPerson.id, this.currentPerson)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'Pessoa atualizada com sucesso';
          this.valid = true;
          this.personChanged = true;
          this.oldPerson.name = this.currentPerson.name;
          this.oldPerson.document = this.currentPerson.document;
        },
        error: (e) => console.error(e)
      });
  }

  deletePerson(): void {
    this.personService.delete(this.currentPerson.id)
      .subscribe({
        next: () => {
          this.router.navigate(['/person']);
        },
        error: (e) => console.error(e)
      });
  }

  isPersonValid(): boolean {
    if ((this.currentPerson.name) && (this.currentPerson.name.length > 0) && (this.currentPerson.document)) return true
    else return false
  }

  hasPersonChanged(): boolean {
    if ((this.currentPerson.name == this.oldPerson.name) && (this.currentPerson.document == this.oldPerson.document)) return false
    else return true
  }

}
