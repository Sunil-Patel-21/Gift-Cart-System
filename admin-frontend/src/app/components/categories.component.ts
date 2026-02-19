import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">📂 Manage Categories</h2>
        <button class="btn btn-primary" (click)="openForm()" *ngIf="!showForm" style="font-size: 16px; margin-bottom: 30px;">+ Add New Category</button>

        <div *ngIf="showForm" style="background: white; padding: 40px; margin: 20px 0; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h3 style="font-size: 28px; font-weight: 700; color: #1e3c72; margin-bottom: 30px;">Add New Category</h3>
          <form (ngSubmit)="saveCategory()">
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Category Name</label>
              <input type="text" [(ngModel)]="category.name" name="name" required class="form-control" placeholder="Enter category name">
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Description</label>
              <textarea [(ngModel)]="category.description" name="description" class="form-control" rows="3" placeholder="Enter category description"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Add Category</button>
            <button type="button" class="btn btn-secondary" (click)="closeForm()">Cancel</button>
          </form>
        </div>

        <div *ngIf="!showForm && categories.length > 0" style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let category of categories">
                <td style="font-weight: 600;">{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" (click)="deleteCategory(category._id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div *ngIf="!showForm && categories.length === 0" style="background: white; padding: 60px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="font-size: 80px; margin-bottom: 20px;">📂</div>
          <p style="font-size: 20px; color: #666;">No categories found.</p>
        </div>
      </div>
    </div>
  `
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  showForm: boolean = false;
  category = { name: '', description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => { this.categories = response.data; }
    });
  }

  openForm(): void {
    this.showForm = true;
    this.resetForm();
  }

  saveCategory(): void {
    this.categoryService.createCategory(this.category).subscribe({
      next: () => { alert('Category added'); this.loadCategories(); this.closeForm(); }
    });
  }

  deleteCategory(id: string): void {
    if (confirm('Delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => { alert('Category deleted'); this.loadCategories(); }
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.category = { name: '', description: '' };
  }
}
