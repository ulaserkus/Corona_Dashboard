import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  invalidLogin:boolean
  ngOnInit(): void {
  }

  login(form: NgForm) {
    const credentials ={
      "username":form.value.username,
      "password":form.value.password
    }
    this.http.post("https://localhost:44350/api/auth/login", credentials)
    .subscribe(response => {

      const token = (<any>response).token
      localStorage.setItem("jwt", token)
      this.invalidLogin = false
      this.router.navigate(["/admin"])
       console.log(response)

    }, err => {
      this.invalidLogin = true
      console.log(err)
    })



  }

  logOut() {
    localStorage.removeItem("jwt")
  }
}
