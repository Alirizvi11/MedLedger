# 🧬 MedLedger2 – Blockchain-Powered Medicine Verification

> A full-stack decentralized platform to verify **medicine authenticity** using **IPFS, Smart Contracts, and QR-based lookup**.  
Built by **Team Forzentix** at hackathon speed ⚡.

![MedLedger Banner](./screenshots/banner.png) <!-- Replace with your actual project image -->

---

## 🚀 Live Demo & Links

- 🎥 [Demo Video](https://www.youtube.com/watch?v=fKKN6VTCdyw)  
- 🌐 [Try the App](https://medledger2.vercel.app)  
- 🧑‍💻 [Team Portfolio](https://forzentix.vercel.app)  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Blockchain**: Ethers.js + Avalanche Fuji Testnet  
- **Storage**: IPFS (Pinata Gateway)  
- **QR**: Dynamic QR rendering for CID lookup  

---

## 📦 Features

✅ Register new medicine batches with **CID + txHash**  
✅ Lookup by **Batch Number** or **CID**  
✅ Fetch metadata directly from **IPFS** (with fallback)  
✅ **QR-based traceability** – scan to verify instantly  
✅ Sleek **Dark/Light UI Toggle** for judges & users  
✅ **Hackathon-friendly modular architecture**  

---

## 🖼️ Screenshots
### 🧭  Welcome Page  
![Dashbord](./screenshots/banner.png)

### 🧭 Sign Up  
![SignUpPage](./screenshots/Signup.png)

### 🧭 Wallet Connect 
![WalleConnect](./screenshots/Wallet.png)

### 📚 Dashbord  
![DashBord](./screenshots/Dashbord.png)

### 📚 Quick Actions 
![QuicActions](./screenshots/QuickActions.png)

### 📚 Medicine Registration  
![MedicineRegestrations](./screenshots/MediceneRegistration.png)

### 🔐 Medicine Validation  
![MedicineValidation](./screenshots/MediceneValidation.png)

### 📊 Admin Dashbord  
![Admin Dashboard](/screenshots/analytics-dashboard.png)

### 📊 Add Member 
![Add Member](/screenshots/register-member.png)

### 📦 Transaction Logs  
![Transactions](/screenshots/transactions.png)
---

## 📂 Folder Structure

```bash
├── backend
│   ├── routes
│   └── server.js
├── frontend
│   ├── pages
│   └── components
├── data
│   └── medicineIndex.json
