import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from "src/environments/environment";

import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';



import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { ScoringTowerComponent } from './scoring-tower/scoring-tower.component';
import { ParentComponent } from './parent/parent.component';
import { StuntListComponent } from './stunt-list/stunt-list.component';
import { StuntFormComponent } from './stunt-form/stunt-form.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { LoginComponent } from './login/login.component';
import { StuntHistoryComponent } from './stunt-history/stunt-history.component';



@NgModule({
  declarations: [
    AppComponent,
    ScoringTowerComponent,
    ParentComponent,
    StuntListComponent,
    StuntFormComponent,
    ConfirmationDialogComponent,
    SnackbarComponent,
    LoginComponent,
    StuntHistoryComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatGridListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
