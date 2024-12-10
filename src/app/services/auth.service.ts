import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface'; 


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}/api/auth`;  // L'URL de ton API back-end pour l'authentification
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Connexion de l'utilisateur
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .subscribe(response => {
        // Stocke le token JWT dans le localStorage
        localStorage.setItem('access_token', response.token);
        this.currentUserSubject.next(response.user);
        this.router.navigate(['/dashboard']);  // Redirige l'utilisateur après la connexion
      });
  }

  // Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Récupère les informations de l'utilisateur authentifié
  me(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

}
