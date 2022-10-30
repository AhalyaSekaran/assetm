import { MailSenderComponent } from './components/assets/ack-mailer/mail-sender/mail-sender.component';
import { RecentlyAssignedComponent } from './components/assets/ack-mailer/recently-assigned/recently-assigned.component';
import { AssetHistoryComponent } from './components/asset/asset-history/asset-history.component';
import { UpdateAssetComponent } from './components/asset/update-asset/update-asset.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { ServicesComponent } from './components/admin/services/services.component';
import { ListAssetComponent } from './components/asset/list-asset/list-asset.component';
import { ViewAssetComponent } from './components/asset/view-asset/view-asset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import { AuthSecurityGaurdGuard } from './components/auth-security-gaurd.guard';
import { ReportGenerationComponent } from './components/report-generation/report-generation.component';
const routes: Routes = [
  {path: '',redirectTo:'/login',pathMatch:'full'},
  {path: 'assets',component:ListAssetComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path: 'employee-list',component:ListUsersComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path: 'login',component:LoginComponent},
  {path: 'services',component:ServicesComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'viewAsset/:id',component:ViewAssetComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'updateAsset/:id',component:UpdateAssetComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'history',component:AssetHistoryComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'admin/add-admin',component:AddAdminComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'services/recently/assigned-list',component:RecentlyAssignedComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'services/recently/assigned-list/mail-sender/:empId',component:MailSenderComponent,canActivate:[AuthSecurityGaurdGuard]},
  {path:'report-generation',component:ReportGenerationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
