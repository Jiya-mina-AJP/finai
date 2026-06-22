# FinAI - Personal Finance Platform

FinAI is a modern, full-stack personal finance platform that helps you track your expenses, manage budgets, analyze transactions, and scan receipts—all in one clean dashboard.

## Key Features

- **Multi-Account & Multi-Currency**: Manage multiple bank or credit accounts in various currencies with real-time tracking.
- **Transaction Management**: Detailed transaction tables with searching, category filtering, pagination, and bulk actions.
- **Smart Receipt Scanner**: Automatically extract transaction details from uploaded receipt images.
- **Budget Planning**: Set monthly budgets and monitor your spending progress with interactive visual indicators.
- **Advanced Analytics**: Visual representations of income, expenses, and category distributions over custom date ranges.
- **Automated Insights**: Keep track of recurring transactions and monthly updates automatically.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Authentication**: Clerk
- **Background Jobs**: Inngest
- **Security & Rate Limiting**: ArcJet
- **Styling**: Tailwind CSS & Shadcn UI

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Jiya-mina-AJP/finai.git
cd finai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=
RESEND_API_KEY=
ARCJET_KEY=
```

### 4. Database Setup
Push the schema to your database:
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

Open (https://finai-lilac.vercel.app/) with your browser to see the result.
