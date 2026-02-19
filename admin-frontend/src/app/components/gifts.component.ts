import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-gifts',
  template: `
    <div class="container">
      <h2>Manage Gifts</h2>
      <button class="btn btn-primary" (click)="openForm()" *ngIf="!showForm">Add New Gift</button>

      <div *ngIf="showForm" style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3>{{ editMode ? 'Edit Gift' : 'Add New Gift' }}</h3>
        <form (ngSubmit)="saveGift()">
          <div class="form-group">
            <label>Name</label>
            <input type="text" [(ngModel)]="gift.name" name="name" required class="form-control">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="gift.description" name="description" required class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" [(ngModel)]="gift.price" name="price" required class="form-control">
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="text" [(ngModel)]="gift.image" name="image" class="form-control">
          </div>
          <div class="form-group">
            <label>Category</label>
            <select [(ngModel)]="gift.category" name="category" required class="form-control">
              <option value="">Select Category</option>
              <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Stock</label>
            <input type="number" [(ngModel)]="gift.stock" name="stock" required class="form-control">
          </div>
          <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Add' }} Gift</button>
          <button type="button" class="btn btn-secondary" (click)="closeForm()">Cancel</button>
        </form>
      </div>

      <table class="table" *ngIf="!showForm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let gift of gifts">
            <td>{{ gift.name }}</td>
            <td>{{ gift.description }}</td>
            <td>₹{{ gift.price }}</td>
            <td>{{ gift.stock }}</td>
            <td>
              <button class="btn btn-sm btn-warning" (click)="editGift(gift)">Edit</button>
              <button class="btn btn-sm btn-danger" (click)="deleteGift(gift._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class GiftsComponent implements OnInit {
  gifts: any[] = [];
  categories: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  gift: any = { name: '', description: '', price: 0, image: '', category: '', stock: 0 };

  constructor(private giftService: GiftService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadGifts();
    this.loadCategories();
  }

  loadGifts(): void {
    this.giftService.getAllGifts().subscribe({
      next: (response) => { this.gifts = response.data; }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => { this.categories = response.data || []; }
    });
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.resetForm();
  }

  editGift(gift: any): void {
    this.showForm = true;
    this.editMode = true;
    this.gift = { ...gift, category: gift.category._id || gift.category };
  }

  saveGift(): void {
    if (this.editMode && this.gift._id) {
      this.giftService.updateGift(this.gift._id, this.gift).subscribe({
        next: () => { alert('Gift updated'); this.loadGifts(); this.closeForm(); }
      });
    } else {
      this.giftService.createGift(this.gift).subscribe({
        next: () => { alert('Gift added'); this.loadGifts(); this.closeForm(); },
        error: (error) => { alert('Error: ' + (error.error.message || 'Failed')); }
      });
    }
  }

  deleteGift(id: string): void {
    if (confirm('Delete this gift?')) {
      this.giftService.deleteGift(id).subscribe({
        next: () => { alert('Gift deleted'); this.loadGifts(); }
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.gift = { name: '', description: '', price: 0, image: '', category: '', stock: 0 };
  }
}
