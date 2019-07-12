
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskInputComponent } from './task-input/task-input.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { DetailsComponent } from './details/details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './todo/todo.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: 'todo', component: TodoComponent },
  { path: 'details/:id', component: DetailsComponent },
  // { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];
const route: Route = {};
@NgModule({
  declarations: [
    AppComponent,
    TaskInputComponent,
    TasklistComponent,
    DetailsComponent,
    PageNotFoundComponent,
    TodoComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
