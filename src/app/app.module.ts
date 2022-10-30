import { TokenInterceptorService } from './services/token-interceptor.service';
import { ListAssetComponent } from './components/asset/list-asset/list-asset.component';
import { AddAssetComponent } from './components/assets/add-asset/add-asset.component';
import { AssignAssetComponent } from './components/asset/assign-asset/assign-asset.component';
import { TopnavComponent } from './components/navbar/topnav/topnav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { ServicesComponent } from './components/admin/services/services.component';
import { SidenavComponent } from './components/navbar/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatDialogModule}from '@angular/material/dialog'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewAssetComponent } from './components/asset/view-asset/view-asset.component';
import { UpdateAssetComponent } from './components/asset/update-asset/update-asset.component';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AssetHistoryComponent } from './components/asset/asset-history/asset-history.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgToastModule } from 'ng-angular-popup';
import { GoogleChartsModule } from 'angular-google-charts';
import { AddAssetNameComponent } from './components/asset/add-asset-name/add-asset-name.component';
import { MatSelectModule } from '@angular/material/select';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import { RecentlyAssignedComponent } from './components/assets/ack-mailer/recently-assigned/recently-assigned.component';
import { MailSenderComponent } from './components/assets/ack-mailer/mail-sender/mail-sender.component';
import { ConfirmDialogComponent } from './components/popup-modals/confirm-dialog/confirm-dialog.component';
import { CustomAlertComponent } from './components/popup-modals/custom-alert/custom-alert.component';
import { ReportGenerationComponent } from './components/report-generation/report-generation.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    RegisterComponent,
    ServicesComponent,
    SidenavComponent,
    TopnavComponent,
    AssignAssetComponent,
    AddAssetComponent,
    ListAssetComponent,
    DashboardComponent,
    AddUsersComponent,
    ListUsersComponent,
    ViewAssetComponent,
    UpdateAssetComponent,
    AssetHistoryComponent,
    AddAssetNameComponent,
    AddAdminComponent,
    RecentlyAssignedComponent,
    MailSenderComponent,
    ConfirmDialogComponent,
    CustomAlertComponent,
    ReportGenerationComponent,
    
  ],
  imports: [
    BrowserModule,MatStepperModule,MatButtonToggleModule,MatExpansionModule,DragDropModule,
    AppRoutingModule ,NgxPaginationModule,
    BrowserAnimationsModule,MatSortModule,FormsModule,ReactiveFormsModule,Ng2SearchPipeModule,HttpClientModule,MatDialogModule,
    MatIconModule,CommonModule,MatFormFieldModule,MatInputModule,NgToastModule,GoogleChartsModule,MatSelectModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent]
})

export class AppModule { }
