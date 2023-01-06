/* subscribe to the observable returned from the alertService.onAlert() method.
  this enables the alert component to be notified whenever an alert message is sent 
  to the alert service and add it to the alerts array for display. Alerts are cleared
  when an alert with an empty message is received from the alert service. The ngOnInit
  method also calls router.events.subscribe() to subscribe to route change events
  so it can automatically clear alerts on route changes.
*/

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../_models/alert';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        // add alert to arry
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  // unsubscribes from the alert service and router when the component is destroyed to prevent memory leaks from orphaned subscriptions
  ngOnDestroy(): void {
    // unsibscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  // removes the specified 'alert' object form the array, which allows individual alerts to be closed in the UI
  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // fade out alert
      alert.fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  // returns a corresponding alert class for each of the alert types
  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissibl', 'mt-4', 'container'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    }

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
