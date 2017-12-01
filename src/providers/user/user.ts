import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

	host: string = 'http://localhost:3000';

	constructor(public http: Http) {
		console.log('Hello UserProvider Provider');
	}

	getUsers() {
		return this.http
		.get(this.host+'/v1/users')
		.toPromise()
		.then(res=> res.json().data)
		.catch(this.handleError)
	}

	postUser(user){
		return this.http
		.post(this.host+'/v1/users', user)
		.toPromise()
		.then(res=> res.json().data)
		.catch(this.handleError)
	}

	deleteUser(userId){
		return this.http
		.delete(this.host+'/v1/users/'+userId)
		.toPromise()
		.then(res=> res.json().data)
		.catch(this.handleError)
	}

	putUser(userId, user){
		return this.http
		.put(this.host+'/v1/users/'+userId, user)
		.toPromise()
		.then(res=> res.json().data)
		.catch(this.handleError)
	}

	private handleError(error: any): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
    }

}
