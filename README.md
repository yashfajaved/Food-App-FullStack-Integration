# Food App Backend & Frontend Integration

This project demonstrates a full-stack integration for a food delivery application. It includes a multi-port backend architecture and a React Native frontend.

## 🚀 Project Components

### 1. Hardcoded Menu Server (Port 5050)
- **Task:** Provides a JSON catalog of food items.
- **Data Structure:** Each item includes `id`, `name`, `price`, `category`, and a `visual image URL`.
- **Endpoint:** `GET http://localhost:5050/menu`

### 2. Order Logger Service (Port 8080)
- **Task:** Acts as a "Manager" receiver for incoming orders.
- **Functionality:** Receives POST requests from the mobile app and prints order details to the terminal.
- **Endpoint:** `POST /place-order`

### 3. Mobile Frontend (React Native)
- Utilizes the `fetch` API to connect with both backend services.
- Successfully handles real-time data transmission and state management.

## 🛠️ How to Run

1. **Clone the repository:**
   ```bash
   git clone [Your Repository Link Here]

2.Start the Menu Server:
node final_menu.js

3.Start the Order Logger:
node order_logger.js

4.Run the App:
Ensure your IP address is updated in App.js and run your Expo/React Native project.

Deliverables Checklist
[x] Single Server files for Menu & Logging.
[x] Web-based Image URLs (Visual Catalog).
[x] Terminal Logging for Order confirmation.
[x] Documentation with screenshots (PDF).
