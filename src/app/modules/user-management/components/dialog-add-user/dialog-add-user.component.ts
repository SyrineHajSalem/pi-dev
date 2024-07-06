import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) { }
  userForm!: FormGroup;


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gouvernerat: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      genre: ['Homme', Validators.required],
      role: ['client', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.usersService.addUser(this.userForm.value).subscribe(res => {
        Swal.fire({
          title: 'Succès !',
          text: 'L\'utilisateur a été ajouté avec succès.',
          icon: 'success',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.userForm.reset();
          this.dialogRef.close()
        })
      }, error => {
        Swal.fire({
          title: 'Erreur !',
          text: "quelque chose s'est mal passé.",
          icon: 'error',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      })
    } else {
      Swal.fire({
        title: 'Erreur !',
        text: 'Veuillez remplir tous les champs requis correctement.',
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }

  gouvernerats = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Le Kef',
    'Mahdia',
    'La Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];
}
