import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  
  category = {
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.resetForm();
  }

  saveCategory(): void {
    this.categoryService.createCategory(this.category).subscribe({
      next: () => {
        alert('Category added successfully');
        this.loadCategories();
        this.closeForm();
      }
    });
  }

  deleteCategory(id: string): void {
    if (confirm('Delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          alert('Category deleted');
          this.loadCategories();
        }
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.category = {
      name: '',
      description: ''
    };
  }
}
