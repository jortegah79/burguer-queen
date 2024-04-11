import { ListProductsOrderComponent } from './../list-products-order/list-products-order.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventType, Router, RoutesRecognized } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { UserOrderService } from 'src/app/services/user-order.service';
import { LoginComponent } from '../login/login.component';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants/constants';
import { ToastService } from 'src/app/services/toast.service';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    LoginComponent,
    CreateAccountComponent,
    ListProductsOrderComponent,
  ],
})
export class ToolbarComponent implements OnInit {
  public showBackButton: boolean;
  public showInfoUser: boolean;
  public showCreateAccount: boolean;
  public showOrder: boolean;

  constructor(
    private router: Router,
    private navController: NavController,
    public userOrderService: UserOrderService,
    private menuController: MenuController,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    this.showBackButton = false;
    this.showInfoUser = false;
    this.showCreateAccount = false;
    this.showOrder = false;
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event.type === EventType.RoutesRecognized))
      .subscribe({
        next: (event: RoutesRecognized) => {
          this.showBackButton = event.state.root.firstChild.data['showBack'];
        },
      });
  }

  goBack() {
    this.navController.back();
  }

  showPanelInfoUser() {
    this.showInfoUser = true;
  }

  async logout() {
    this.userOrderService.clear();
    await Preferences.remove({ key: KEY_TOKEN });
    this.navController.navigateForward('categories');
    this.menuController.close('content');
    this.toastService.showToast(this.translate.instant('label.logout.success'));
  }

  back() {
    this.showInfoUser = false;
    this.showCreateAccount = false;
    this.showOrder = false;
  }

  newAccount() {
    this.showCreateAccount = true;
  }

  showLogin() {
    this.showCreateAccount = false;
  }

  goToPay() {
    this.back();
    this.menuController.close('content');
    this.navController.navigateForward('pay');
  }
  seeOrder() {
    this.showOrder = true;
  }
}
