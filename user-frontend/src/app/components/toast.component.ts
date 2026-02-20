import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.removeToast(toast);
      }, toast.duration || 3000);
    });
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
