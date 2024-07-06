import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {
    console.log(this.data);

  }

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [this.data._id],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      role: [this.data.role],
      password: [this.data.password],
      age: [this.data.age, [Validators.required, Validators.min(1)]],
      gouvernerat: [this.data.gouvernerat, Validators.required],
      phone: [this.data.phone, [Validators.required, Validators.minLength(8)]],
      genre: ['Homme', Validators.required],
    });
  }

  onSubmit() {
    this.userService.updateUser(this.data._id , this.userForm.value).subscribe(res=>{
      Swal.fire({
        title: 'Succès !',
        text: 'L\'utilisateur a été modifié avec succès.',
        icon: 'success',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(()=>{
        this.dialogRef.close()
      })
    },error=>{
      Swal.fire({
        title: 'Erreur !',
        text: "quelque chose s'est mal passé.",
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    })
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
