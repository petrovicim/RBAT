import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { ApiConnectionService } from '@services/api-connection.service';
import { PostService } from '@services/post-service';
import { AuthService } from '@services/auth-guard/auth.service';
import { AuthGuard } from '@services/auth-guard/auth-guard.service';
import { FilterPipe } from '@services/filter-pipes/filter-by';
import { ReadObjectPipe } from '@services/read-object-pipe';
import { ArraySortPipe } from '@services/filter-pipes/sort-by';
import {
  SideMenuComponent,
  TopBarComponent,
  AssetsComponent,
  EntitiesComponent,
  AddNewAssetBtnComponent,
  AssetsTableComponent,
  AddAssetCategoryBtnComponent,
  AddEntitieCategoryBtnComponent,
  UsersComponent,
  UserEditComponent,
  LoginComponent,
  ResetPasswordComponent,
  RegisterComponent,
  SearchBarComponent,
  QRCodeComponent,
  EntitiesTableComponent,
  DropdownMenuComponent,
  CalendarComponent,
  AddNewEntitieBtnComponent,
  SubmitMessageComponent,
  EditCategoryDialogComponent,
  DeleteDialogComponent,
  AddCategoryBtnComponent,
  AddNewBtnComponent,
  EditDataDialogComponent,
  AddNewUserBtnComponent,
  UsersTableComponent,
  AssetHistoryComponent,
  AddUserCategoryBtnComponent,
  NestedEntitiesComponent,
} from '@components';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    TopBarComponent,
    AssetsComponent,
    EntitiesComponent,
    AddNewAssetBtnComponent,
    AssetsTableComponent,
    AddAssetCategoryBtnComponent,
    AddEntitieCategoryBtnComponent,
    UsersComponent,
    UserEditComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent,
    SearchBarComponent,
    QRCodeComponent,
    EntitiesTableComponent,
    DropdownMenuComponent,
    CalendarComponent,
    AddNewEntitieBtnComponent,
    FilterPipe,
    ArraySortPipe,
    ReadObjectPipe,
    SubmitMessageComponent,
    EditCategoryDialogComponent,
    DeleteDialogComponent,
    AddCategoryBtnComponent,
    AddNewBtnComponent,
    EditDataDialogComponent,
    AddNewUserBtnComponent,
    UsersTableComponent,
    AssetHistoryComponent,
    AddUserCategoryBtnComponent,
    NestedEntitiesComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    ApiConnectionService,
    PostService,
    DatePipe,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
  entryComponents: [
    QRCodeComponent,
    SubmitMessageComponent,
    EditCategoryDialogComponent,
    EditDataDialogComponent,
    DeleteDialogComponent,
    AddCategoryBtnComponent,
    AddNewBtnComponent,
    AssetHistoryComponent,
    NestedEntitiesComponent,
  ],
})
export class AppModule { }
