import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    users = [];
    constructor(
		public navCtrl: NavController,
		public userProvider:UserProvider,
		public alertCtrl: AlertController) {    
    }

    ionViewWillEnter(){
        this.init();
    }

    init(){
		this.userProvider.getUsers()
		.then(users=>{
			this.users = users;
			console.log(this.users);
		});
    }

    registerUser(){
      	this.navCtrl.push('register-user');
    }

    deleteUser(userId){
		this.userProvider.deleteUser(userId)
		.then(users=>{
			this.init();
		});
	}

	putUser(user){
		this.navCtrl.push('register-user', user)
	}
	
	showConfirm(userId) {
		let confirm = this.alertCtrl.create({
		  title: 'Tem certeza que deseja remover este usuário?',
		  buttons: [
			{
			  text: 'Sim',
			  handler: () => {
				this.deleteUser(userId);
			  }
			},
			{
			  text: 'Não',
			  handler: () => {
				console.log('Cancelado');
			  }
			}
		  ]
		});
		confirm.present();
	  }

}
