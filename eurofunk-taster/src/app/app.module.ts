import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserRowComponent } from './user-row/user-row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupRowComponent } from './group-row/group-row.component';

@NgModule({
  declarations: [AppComponent, UserRowComponent, GroupRowComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
