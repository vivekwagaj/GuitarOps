### **🛠️ Remaining Tasks for My Guitar Shop Project**

Here’s a structured list of what’s left to implement, covering **both functional and non-functional improvements**.

---

## **✅ 1️⃣ Core Functionalities (Must-Have Features)**
These features are essential for the smooth operation of your app.

### **🔹 A. Authentication & Role-Based Access (Mostly Done)**
Payment Integration (Optional) → Mock payment gateway or simple cash-on-delivery.
✔️ **JWT Authentication** (Login system)  
✔️ **Role-Based Access Control (RBAC) for Users, Admins, and Technicians**  
✔️ **Restricted "Mark as Resolved" for `ROLE_USER`**  
✔️ **User Registration** (Allow customers to create an account instead of admins adding them manually)  
🔲 **Forgot Password / Password Reset** (Optional but useful)

### **🔹 B. Manage Guitars**
✔️ **Admins can add, update, delete guitars**  
✔️ **Guitars can be displayed in the shop**  
🔲 **Customers should be able to sell guitars (add listing to shop)**

### **🔹 C. Manage Customers**
✔️ **Customers can be added to the system**  
✔️ **Retrieve customer purchase & repair history** (Show previous orders & repairs)

### **🔹 D. Repair Requests**
✔️ **Customers can submit repair requests**  
✔️ **Technicians/Admins can mark as resolved**  
🔲 **Allow customers to track repair status updates**

🛒 Next Steps for Cart & Checkout

### **🔹 E. Cart Functionality

✔️ **Add to Cart Button → Users can add guitars to their cart.
✔️ **Cart Page → Shows selected guitars, allows quantity updates & removal.
✔️ **Cart Persistence → Store cart items in localStorage, so they persist on refresh.
### **🔹 F. Checkout Process

✔️ ** Checkout Page → Users enter details and place an order.
🔲 ** Order Confirmation → Store order details in the backend.
---

## **⚡ 2️⃣ Advanced Functionalities (Nice-to-Have Features)**
These features will improve usability and make your app more powerful.

### **🔹 A. Order & Purchase System**
✔️ **Customers can buy guitars**  
✔️ **Store order details in the database**  
🔲 **Admins can track order statuses (Pending, Shipped, Delivered)**

### **🔹 B. Customer Wishlist**
🔲 **Users can add guitars to a wishlist for later purchase**

### **🔹 C. Repair Cost Estimation**
🔲 **Automatically calculate an estimated repair cost based on the issue type**

### **🔹 D. Notifications & Email Alerts**
🔲 **Send an email when a repair status is updated**  
🔲 **Send confirmation emails for orders and repairs**

### **🔹 E. Admin Dashboard & Reports**
🔲 **Show total sales, most repaired guitar models, pending repairs**  
🔲 **Generate downloadable reports (CSV/PDF)**

---

## **🎨 3️⃣ Non-Functional Enhancements (UI/UX & Performance)**
These will improve the overall experience and performance of your app.

### **🔹 A. UI/UX Improvements**
🔲 **Improve the overall UI (better colors, fonts, layout)**  
🔲 **Add animations and loading indicators for API calls**  
🔲 **Show toast notifications instead of alerts** (e.g., "Login successful!", "Repair request submitted!")  
🔲 **Improve mobile responsiveness** (Make sure UI looks good on all screen sizes)

### **🔹 B. Performance & Security**
🔲 **Optimize API performance (Lazy Loading, Pagination for lists)**  
🔲 **Improve database indexing for faster queries**  
🔲 **Rate limiting for API requests to prevent spam**  
🔲 **Secure JWT tokens with refresh tokens**

---

## **🚀 What Should We Focus on Next?**
Would you like to:
1️⃣ **Continue adding core features?** (e.g., customer history, repair tracking)  
2️⃣ **Improve UI & UX?** (Better design, animations, notifications)  
3️⃣ **Implement advanced features?** (Wishlist, order system, reports)

Tatakae!! 🚀🔥