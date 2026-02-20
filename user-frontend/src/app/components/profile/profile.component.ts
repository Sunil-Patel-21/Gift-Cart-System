import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeTab = 'profile';
  user: any = {};
  addresses: any[] = [];
  
  profileForm = { name: '', email: '', phone: '', profilePicture: '' };
  passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
  addressForm: any = { label: 'Home', street: '', city: '', state: '', zipCode: '', country: 'India', phone: '', isDefault: false };
  
  editingAddress: any = null;
  showAddressModal = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
    this.loadAddresses();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.user = response.data;
        this.profileForm = {
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone || '',
          profilePicture: this.user.profilePicture || ''
        };
      }
    });
  }

  loadAddresses() {
    this.userService.getAddresses().subscribe({
      next: (response) => {
        this.addresses = response.data;
      }
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.loadProfile();
      },
      error: (error) => alert('Error updating profile')
    });
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    this.userService.changePassword({
      currentPassword: this.passwordForm.currentPassword,
      newPassword: this.passwordForm.newPassword
    }).subscribe({
      next: () => {
        alert('Password changed successfully!');
        this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
      },
      error: (error) => alert(error.error.message || 'Error changing password')
    });
  }

  openAddressModal(address?: any) {
    if (address) {
      this.editingAddress = address;
      this.addressForm = { ...address };
    } else {
      this.editingAddress = null;
      this.addressForm = { label: 'Home', street: '', city: '', state: '', zipCode: '', country: 'India', phone: '', isDefault: false };
    }
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
    this.editingAddress = null;
  }

  saveAddress() {
    if (this.editingAddress) {
      this.userService.updateAddress(this.editingAddress._id, this.addressForm).subscribe({
        next: () => {
          alert('Address updated!');
          this.loadAddresses();
          this.closeAddressModal();
        },
        error: () => alert('Error updating address')
      });
    } else {
      this.userService.addAddress(this.addressForm).subscribe({
        next: () => {
          alert('Address added!');
          this.loadAddresses();
          this.closeAddressModal();
        },
        error: () => alert('Error adding address')
      });
    }
  }

  deleteAddress(id: string) {
    if (confirm('Delete this address?')) {
      this.userService.deleteAddress(id).subscribe({
        next: () => {
          alert('Address deleted!');
          this.loadAddresses();
        },
        error: () => alert('Error deleting address')
      });
    }
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileForm.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
