import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../../services/gift.service';
import { CategoryService } from '../../../services/category.service';
import { Gift } from '../../../models/gift.model';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  gifts: Gift[] = [];
  categories: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  imagePreview: string = '';
  selectedImage: File | null = null;
  
  gift: Gift = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: 0,
    stock: 0
  };

  constructor(
    private giftService: GiftService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadGifts();
    this.loadCategories();
  }

  loadGifts(): void {
    this.giftService.getAllGifts().subscribe({
      next: (response) => {
        this.gifts = response.data;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data || [];
        console.log('Categories loaded:', this.categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.categories = [];
      }
    });
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.gift.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.resetForm();
  }

  editGift(gift: Gift): void {
    this.showForm = true;
    this.editMode = true;
    this.gift = { ...gift };
  }

  saveGift(): void {
    const giftData = {
      name: this.gift.name,
      description: this.gift.description,
      price: this.gift.price,
      image: this.gift.imageUrl,
      category: this.gift.categoryId,
      stock: this.gift.stock
    };

    if (this.editMode && this.gift.id) {
      this.giftService.updateGift(this.gift.id.toString(), giftData).subscribe({
        next: () => {
          alert('Gift updated successfully');
          this.loadGifts();
          this.closeForm();
        }
      });
    } else {
      this.giftService.createGift(giftData).subscribe({
        next: () => {
          alert('Gift added successfully');
          this.loadGifts();
          this.closeForm();
        },
        error: (error) => {
          alert('Error: ' + (error.error.message || 'Failed to add gift'));
        }
      });
    }
  }

  deleteGift(id: number): void {
    if (confirm('Delete this gift?')) {
      this.giftService.deleteGift(id.toString()).subscribe({
        next: () => {
          alert('Gift deleted');
          this.loadGifts();
        }
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.gift = {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      categoryId: 0,
      stock: 0
    };
    this.imagePreview = '';
    this.selectedImage = null;
  }
}
