import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from "./components/components.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatOptionModule} from "@angular/material/core";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
