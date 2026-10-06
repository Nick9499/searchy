# Backend Master Plan: AI-Powered Drive & Collaboration Platform

## 1. Project Initialization & Infrastructure
**Goal:** Establish a strict, scalable, and type-safe environment.
- [ ] Initialize Node.js project (`npm init`)
- [ ] Setup TypeScript (`tsconfig.json` with `strict: true`)
- [ ] Setup ESLint & Prettier (Enforce code style)
- [ ] Setup Husky (Pre-commit hooks for linting)
- [ ] Configure Environment Variables (`dotenv`)
- [ ] Docker Setup (PostgreSQL container)

## 2. Database Design (PostgreSQL + Prisma)
**Goal:** Robust schema with referential integrity.
- [ ] Define `User` model (email, password hash, role)
- [ ] Define `Folder` model (recursive relation: `parentId`)
- [ ] Define `File` model (relation to Folder and User)
- [ ] Define `Permission` model (User-File many-to-many)
- [ ] Migration Strategy (Initialize DB)

## 3. Module 1: Authentication & User Management (The Gatekeeper)
**Goal:** Secure stateless authentication.
- [ ] Implement `zod` schemas for login/register
- [ ] Service: Password hashing (`bcrypt`)
- [ ] Service: JWT generation (Access + Refresh tokens)
- [ ] Middleware: `deserializeUser` (Verify token & attach user to request)
- [ ] Middleware: `validateResource` (Zod validation)
- [ ] Routes: `/auth/register`, `/auth/session`, `/users/me`

## 4. Module 2: File System Core (The Vault)
**Goal:** Manage hierarchical data and storage.
- [ ] Service: S3/Local Storage handling (Abstract this!)
- [ ] Controller: Upload File (Multipart form data)
- [ ] Controller: Create Folder (Handle depth logic)
- [ ] Controller: Move/Rename (Transactional consistency)
- [ ] Implementation: Soft Delete (`deletedAt` field)

## 5. Module 3: Real-Time Collaboration (The Sync)
**Goal:** Live updates and multiple editors.
- [ ] Setup `socket.io` Server
- [ ] Event: `join_room` (Room ID = File ID)
- [ ] Event: `send_changes` (Broadcast OT/CRDT or simple replacement)
- [ ] Event: `cursor_move` (Show where others are typing)
- [ ] Persistence: Debounced save to Database

## 6. Module 4: AI & Search (The Brain)
**Goal:** Intelligent retrieval and generation.
- [ ] Setup: `pgvector` extension for Postgres
- [ ] Background Job: BullMQ setup (Redis required)
- [ ] Job: Generate Embedding on File Upload
- [ ] Service: OpenAI/LangChain integration
- [ ] Route: `/search` (Hybrid search: Keyword + Semantic)
- [ ] Route: `/ai/summarize` (RAG implementation)

## SDE2 "Definition of Done" Checklist
- [ ] **Error Handling:** Centralized Error Handler (no `try/catch` in every controller)
- [ ] **Logging:** Structured logging (Winston/Pino), not `console.log`
- [ ] **Testing:** Unit tests for Services (Jest/Vitest)
- [ ] **Security:** Rate Limiting, Helmet headers, CORS
