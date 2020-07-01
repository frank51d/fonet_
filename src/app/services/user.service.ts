import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  API_URI = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.API_URI}/usuarios`);
    }

    register(user: User) {
        return this.http.post(`${this.API_URI}/usuarios/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.API_URI}/usuarios/${id}`);
    }
}
