import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-gifts',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">Manage Gifts</h2>
        <button class="btn btn-primary" (click)="openForm()" *ngIf="!showForm" style="font-size: 16px; margin-bottom: 30px;">+ Add New Gift</button>

        <div *ngIf="showForm" style="background: white; padding: 40px; margin: 20px 0; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h3 style="font-size: 28px; font-weight: 700; color: #1e3c72; margin-bottom: 30px;">{{ editMode ? 'Edit Gift' : 'Add New Gift' }}</h3>
          <form (ngSubmit)="saveGift()">
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Name</label>
              <input type="text" [(ngModel)]="gift.name" name="name" required class="form-control">
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Description</label>
              <textarea [(ngModel)]="gift.description" name="description" required class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Price</label>
              <input type="number" [(ngModel)]="gift.price" name="price" required class="form-control">
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Image</label>
              <input type="file" (change)="onImageSelect($event)" accept="image/*" class="form-control" style="padding: 10px;">
              <div *ngIf="imagePreview" style="margin-top: 15px;">
                <img [src]="imagePreview" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Category</label>
              <select [(ngModel)]="gift.category" name="category" required class="form-control">
                <option value="">Select Category</option>
                <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Stock</label>
              <input type="number" [(ngModel)]="gift.stock" name="stock" required class="form-control">
            </div>
            <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Add' }} Gift</button>
            <button type="button" class="btn btn-secondary" (click)="closeForm()">Cancel</button>
          </form>
        </div>

        <div *ngIf="!showForm" style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let gift of gifts">
                <td><img [src]="gift.image" alt="{{ gift.name }}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
                <td style="font-weight: 600;">{{ gift.name }}</td>
                <td>{{ gift.description }}</td>
                <td style="color: #1e3c72; font-weight: 700;">₹{{ gift.price }}</td>
                <td>{{ gift.stock }}</td>
                <td>
                  <button class="btn btn-sm btn-warning" (click)="editGift(gift)">Edit</button>
                  <button class="btn btn-sm btn-danger" (click)="deleteGift(gift._id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class GiftsComponent implements OnInit {
  gifts: any[] = [];
  categories: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  gift: any = { name: '', description: '', price: 0, image: '', category: '', stock: 0 };
  imagePreview: string | null = null;
  selectedFile: File | null = null;

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

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.gift.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
    this.imagePreview = gift.image;
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
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
