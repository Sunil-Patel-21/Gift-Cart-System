import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 50px 0 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px;">
          
          <!-- About Section -->
          <div>
            <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Gift Cart</h3>
            <p style="color: rgba(255,255,255,0.8); line-height: 1.8; font-size: 14px;">Your one-stop destination for perfect gifts. We help you celebrate every special moment with thoughtfully curated presents.</p>
            <div style="display: flex; gap: 15px; margin-top: 20px;">
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">📘</a>
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">🐦</a>
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">📷</a>
              <a href="#" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">💼</a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 20px;">Quick Links</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 12px;"><a routerLink="/home" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Home</a></li>
              <li style="margin-bottom: 12px;"><a routerLink="/products" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Products</a></li>
              <li style="margin-bottom: 12px;"><a routerLink="/wishlist" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Wishlist</a></li>
              <li style="margin-bottom: 12px;"><a routerLink="/orders" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">My Orders</a></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 20px;">Customer Service</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 12px;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Help Center</a></li>
              <li style="margin-bottom: 12px;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Track Order</a></li>
              <li style="margin-bottom: 12px;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Returns & Refunds</a></li>
              <li style="margin-bottom: 12px;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'; this.style.paddingLeft='5px'" onmouseout="this.style.color='rgba(255,255,255,0.8)'; this.style.paddingLeft='0'">Shipping Info</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 20px;">Contact Us</h4>
            <div style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 2;">
              <p style="margin-bottom: 12px;">📧 support@giftcart.com</p>
              <p style="margin-bottom: 12px;">📞 +91 1234567890</p>
              <p style="margin-bottom: 12px;">📍 123 Gift Street, Mumbai, India</p>
              <p style="margin-bottom: 12px;">🕐 Mon-Sat: 9AM - 6PM</p>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0;">© 2024 Gift Cart. All rights reserved.</p>
          <div style="display: flex; gap: 20px;">
            <a href="#" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Privacy Policy</a>
            <a href="#" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Terms of Service</a>
            <a href="#" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: all 0.3s;" onmouseover="this.style.color='#667eea'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
