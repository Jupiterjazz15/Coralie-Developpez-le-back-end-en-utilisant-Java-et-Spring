import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public user: User | undefined;

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.me().subscribe(
      (user: User) => {
        this.user = user; // Stocker l'utilisateur dans la propriété
        console.log('User data:', user); // Log de la réponse
      },
      (error) => {
        console.error('Error fetching user data:', error); // Gestion des erreurs
      }
    );
  }

  public back() {
    window.history.back();
  }

}
