import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'register-user'
})

@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

	user = {
		name: '',
		email: '',
		phone: '',
		password: '',
	}
	func: string = 'create';
	buttonText: string = 'Registrar'; 

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userProvider:UserProvider,
		public alertCtrl: AlertController) {
			if(this.navParams.data.name){
				this.user = this.navParams.data
				this.func = 'edit';
				this.buttonText = 'Editar';
			}
			
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterUserPage');
	}

	action(){
		if(this.func === 'create')
			this.registerUser();
		else
			this.putUser(this.user);
	}

	registerUser(){
		this.userProvider.postUser(this.user)
		.then(res=>{
			this.showAlert('Usuário registrado com sucesso!');
			this.navCtrl.pop();
		})
	}

	putUser(user){
		this.userProvider.putUser(user._id, user)
		.then(res=>{
			this.showAlert('Usuário editado com sucesso!');
			this.navCtrl.pop();
		})
	}

	showAlert(subTitle) {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			subTitle: subTitle,
			buttons: ['OK']
		});
		alert.present();
	}

}
