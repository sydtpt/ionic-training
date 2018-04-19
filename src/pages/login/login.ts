import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    username: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, private userService:UserService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login() {
        this.userService.registerUser(this.username).subscribe(
            // this.userService.getUsers().subscribe(
                res=>{
                console.log(res);
            },
            error => {
                console.log(error);
            }
        );
        let a = 2;
    }

    function (nome) {

    }

}
