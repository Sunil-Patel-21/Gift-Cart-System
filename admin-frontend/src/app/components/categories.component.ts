import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  template: `
    <div class="container">
      <h2>Manage Categories</h2>
      <button class="btn btn-primary" (click)="openForm()" *ngIf="!showForm">Add New Category</button>

      <div *ngIf="showForm" style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3>Add New Category</h3>
        <form (ngSubmit)="saveCategory()">
          <div class="form-group">
            <label>Name</label>
            <input type="text" [(ngModel)]="category.name" name="name" required class="form-control">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="category.description" name="description" class="form-control"></textarea>
          </div>
          <button type="submit" class="btn btn-success">Add Category</button>
          <button type="button" class="btn btn-secondary" (click)="closeForm()">Cancel</button>
        </form>
      </div>

      <table class="table" *ngIf="!showForm && categories.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let category of categories">
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td>
              <button class="btn btn-sm btn-danger" (click)="deleteCategory(category._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="!showForm && categories.length === 0">No categories found.</p>
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
