# TaskFlow

> A modern team task management application built with Next.js 15, TypeScript, and Prisma.

## Overview

TaskFlow is a collaborative task management platform designed for high-performing engineering teams. It helps teams track issues, ship faster, and stay organized with a clean, intuitive interface.

## Features

### Completed Features

#### Authentication & Security
- **Secure Authentication:** Email/password login with bcrypt hashing.
- **Social Login:** Google OAuth integration.
- **Two-Factor Verification:** OTP (One-Time Password) verification via email for new registrations.
- **Protected Routes:** Secure session management via NextAuth.js v5 (30-day expiry).
- **Form Validation:** robust client/server-side validation using Zod and React Hook Form.

#### 🏢 Workspace & Onboarding
- **New User Onboarding:** Streamlined flow to set up a workspace immediately after signup.
- **Multi-Workspace Support:** Users can create and switch between different workspaces.
- **Member Invitations:** - Admins can invite members via email.
  - Secure invite link verification system.
  - Guided registration flow for invited members.

#### Project Management (Core)
- **Team Management:** Admins can create teams within workspaces.
- **Project Creation:** Organize work into specific projects.
- **Kanban Board:** A fully functional, drag-and-drop Kanban board for visualizing task progress (Todo, In Progress, Done).

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **dnd-kit** - Performant drag and drop (Kanban)

### Backend & Services
- **Next.js API Routes** - Serverless backend
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Database (via Supabase)
- **NextAuth.js v5** - Authentication
- **Resend** - Transactional Email Service (OTP & Invites)
- **bcrypt** - Password hashing

---

## Screenshots

### Authentication

**Sign Up**
<img width="1920" height="920" alt="Sign Up Page" src="https://github.com/user-attachments/assets/73a4f2ab-8c68-4325-9d99-dfb755b567d4" />

**Sign In**
<img width="1920" height="920" alt="Sign In Page" src="https://github.com/user-attachments/assets/524e7c83-c486-45fd-843c-642611aea022" />

**Form Validation**
<img width="1920" height="920" alt="Form Validation" src="https://github.com/user-attachments/assets/55a22689-9a28-4b5f-80ca-381f46c10622" />

### Verification & Onboarding

**OTP Email Verification**
<img width="1914" height="923" alt="Screenshot from 2026-02-19 02-59-28" src="https://github.com/user-attachments/assets/91fe28eb-4321-4c15-a8fe-b46700525d23" />


**Workspace Onboarding**
<img width="1914" height="923" alt="Screenshot from 2026-02-19 03-12-32" src="https://github.com/user-attachments/assets/98c4a177-051d-4b15-a17f-16b5c622e0cf" />


### Application Core

**Dashboard / Workspace View** [In Development]
<img width="1921" height="926" alt="Screenshot from 2026-02-19 02-56-38" src="https://github.com/user-attachments/assets/f28c4e3c-82e7-4aff-9335-b58f17a759a1" />

**Invite Members Verification**
<img width="1921" height="926" alt="Screenshot from 2026-02-19 02-57-46" src="https://github.com/user-attachments/assets/72fa02cc-5add-4e5d-9e43-530e7dbd2109" />


**Kanban Board**
<img width="1912" height="924" alt="Screenshot from 2026-02-18 13-41-35" src="https://github.com/user-attachments/assets/4173a471-8d2d-4810-901a-8c15b21d1a1d" />

**Modals**
<img width="1921" height="926" alt="Screenshot from 2026-02-19 02-56-29" src="https://github.com/user-attachments/assets/95eb7552-965b-40c5-b730-92e600a70f58" />
<img width="1921" height="926" alt="Screenshot from 2026-02-19 02-55-33" src="https://github.com/user-attachments/assets/fc55cba8-8074-4b10-b000-ca69bd69b22f" />

