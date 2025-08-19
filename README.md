# Linkora Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

🚀 **Linkora** is a social networking platform designed exclusively for **university students**.  
Our mission is to **help students discover talents, collaborate, and connect with like-minded peers** inside the campus community.  

## 🌐 Live Demo
🔗 **[Check out our project](https://linkora-frontend.vercel.app)**

With Linkora, students can:  
- Build their **profiles** 🎓  
- **Chat** with friends in real time 💬  
- **Search & connect** with talented peers 🔍  
- Collaborate on projects and share achievements 🌟  

> 🎯 *Think of it as a campus-focused LinkedIn + Messenger, built to strengthen collaboration and community.*

---

## 🖼️ Screenshots

| Profile | Discover | Chat |
|---------|----------|------|
| ![Profile](https://github.com/user-attachments/assets/8c00de85-1bad-4518-a8bd-b4f616a2f964) | ![Discover](https://github.com/user-attachments/assets/53368d54-eece-4232-863b-6cc08120d1c6) | ![Chat](https://github.com/user-attachments/assets/4ad86062-c3eb-4824-bfdd-e6b43641375c) |

---

## ⚡ Tech Stack

- **[Next.js](https://nextjs.org/)** – React framework for the frontend  
- **[TypeScript](https://www.typescriptlang.org/)** – Strict typing for scalable code  
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first modern styling  
- **[ShadCN/UI](https://ui.shadcn.com/)** – Prebuilt accessible UI components  
- **[Lucide Icons](https://lucide.dev/)** – Beautiful open-source icons  
- **[Vercel](https://vercel.com/)** – Deployment (future plan: Azure)  

---

## 📂 Folder Structure

```bash
linkora-frontend/
├── public/              # Static assets (images, screenshots)
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities & helpers
│   ├── pages/           # Next.js pages (if used)
│   ├── styles/          # Tailwind + global styles
│   └── types/           # TypeScript types
├── .env.local           # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ATgayan/Linkora-Frontend.git
cd Linkora-Frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory and add your keys (Firebase, Stream, etc.)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
# or your deployed backend: https://your-azure-app-url/api/v1

NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key

```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Now visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🚀 Deployment

Currently deployed on **Vercel**.  
We plan to migrate to **Azure** for enterprise-level scalability in the future.

---

## 👨‍💻 Contributing

We welcome contributions from students and developers 💡

1. **Fork** the repo
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request**

---

## ✨ Authors

**Thusitha Gayan** – [GitHub](https://github.com/thusitha) | [Portfolio](www.thusitha.me) | [LinkedIn](www.linkedin.com/in/thushitha-athukorale-848765248)  
**Team Linkora** – ICT Undergraduates, Uva Wellassa University

---

**⚡ Linkora – Connecting Talents. Empowering Students.**
