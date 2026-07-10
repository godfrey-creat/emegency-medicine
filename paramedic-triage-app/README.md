# 🚑 Paramedic Triage Intake Application

A production-ready, offline-first mobile application built with **React Native (Expo + TypeScript)** for emergency medical personnel operating in unreliable network environments.

The application allows paramedics to quickly capture patient triage information and guarantees that no patient data is lost when internet connectivity is unavailable.

---

# Project Overview

Emergency response teams frequently operate in environments with poor or intermittent network coverage. Losing patient information because of connectivity issues is unacceptable.

This application adopts an **Offline-First Architecture**, ensuring that every triage submission is stored locally first before being synchronized with the remote server whenever connectivity becomes available.

The system provides:

- Fast single-screen triage intake
- Immediate local persistence
- Automatic background synchronization
- Visual network status monitoring
- Production-ready architecture
- Separation of concerns
- Scalable codebase

---

# Features

## Patient Intake Form

The application captures:

- Patient Name
- Condition Description
- Priority Level (1–5)
- Status
  - Pending
  - In-Transit

Validation is implemented using:

- React Hook Form
- Zod

---

## Priority Colour Coding

Critical patients are highlighted for rapid recognition.

| Priority | Colour |
|----------|---------|
| 1 | 🔴 Deep Red |
| 2 | 🟠 Orange |
| 3 | 🟡 Yellow |
| 4 | 🟢 Green |
| 5 | 🔵 Blue |

This enables paramedics to instantly distinguish life-threatening cases.

---

# Offline First Architecture

Instead of attempting to send data directly to an API, every submission follows this workflow:

```
User
   │
   ▼
Submit Form
   │
   ▼
SQLite Database
   │
   ▼
Pending Sync Queue
   │
   ▼
Connectivity Monitor
   │
Internet Restored?
 ├── No → Wait
 └── Yes
        │
        ▼
Mock API
        │
        ▼
Record Marked Synced
```

This guarantees zero data loss.

---

# Architecture

The project follows a layered architecture.

```
UI Layer
│
├── Screens
├── Components
│
▼

State Layer
│
├── Context API
├── Reducer
│
▼

Repository Layer
│
├── SQLite Repository
│
▼

Service Layer
│
├── Connectivity Service
├── Sync Service
├── API Service
│
▼

Persistence Layer
│
SQLite Database
```

Each layer has a single responsibility.

---

# Project Structure

```
src/

components/
Reusable UI components

screens/
Application screens

context/
Global state management

database/
SQLite initialization

repositories/
Database abstraction

services/
Connectivity and synchronization

models/
Application models

hooks/
Reusable custom hooks

navigation/
Navigation

theme/
Application theme

utils/
Utilities
```

---

# Technology Stack

| Technology | Purpose |
|------------|----------|
| React Native | Mobile UI |
| Expo | Development platform |
| TypeScript | Type safety |
| Context API | State Management |
| SQLite | Local persistence |
| React Hook Form | Forms |
| Zod | Validation |
| NetInfo | Connectivity monitoring |
| React Native Paper | UI Components |
| Jest | Unit Testing |

---

# Architectural Decisions

## Why SQLite?

SQLite was selected because it:

- persists data across app restarts
- supports structured relational storage
- performs well on mobile
- is production proven
- allows efficient querying

---

## Why Context API?

For this assessment the application is relatively small.

Context API provides:

- predictable state
- minimal boilerplate
- separation of business logic
- scalability

For larger applications Redux Toolkit would be appropriate.

---

## Why Repository Pattern?

The Repository Pattern separates:

UI

from

Database

This means the UI never directly interacts with SQLite.

Instead:

```
UI

↓

Context

↓

Repository

↓

SQLite
```

This greatly improves maintainability and testing.

---

# Offline Synchronization Strategy

Every record contains a synchronization status.

```
Pending
```

or

```
Synced
```

Submission workflow:

```
User submits form

↓

Save locally

↓

Pending = true

↓

Connectivity listener waits

↓

Internet restored

↓

Sync Service uploads

↓

Pending = false

↓

Database updated
```

No user interaction is required.

---

# Connectivity Monitoring

The application continuously monitors network changes using:

```
@react-native-community/netinfo
```

When connectivity changes:

```
Offline

↓

Network Banner
↓

Waiting...

↓

Online

↓

Automatic Sync
```

---

# Background Sync Queue

The Sync Service performs:

1. Read all pending records

2. Upload sequentially

3. Retry failed uploads

4. Mark successful uploads

Pseudo workflow:

```
while (pendingRecords.length > 0)

↓

POST record

↓

Success?

Yes

↓

Mark Synced

No

↓

Leave Pending

↓

Retry later
```

This ensures reliable delivery.

---

# Local Database Schema

```
triage_records

id

patient_name

condition_description

priority

status

synced

created_at

updated_at
```

---

# Mock API

The assessment does not require a live backend.

The application simulates:

```
POST /api/v1/triage
```

using a mock repository with:

- artificial delay
- simulated failures
- retry behaviour

This demonstrates the synchronization engine.

---

# State Flow

```
User Input

↓

Validation

↓

Context

↓

Repository

↓

SQLite

↓

Sync Queue

↓

Mock API

↓

Database Updated
```

---

# Error Handling

The application gracefully handles:

✔ Invalid form input

✔ Database failures

✔ Offline mode

✔ Network interruptions

✔ Synchronization failures

✔ Retry logic

Toast notifications provide immediate user feedback.

---

# Testing

Unit tests cover:

- Validation
- Repository
- Sync Service
- Reducers
- Utility functions

Run tests:

```bash
npm test
```

---

# Running the Application

## Install dependencies

```bash
npm install
```

---

## Start Expo

```bash
npx expo start
```

---

## Android

```bash
npx expo run:android
```

or

Press

```
a
```

inside Expo.

---

## iOS

```bash
npx expo run:ios
```

---

# Simulating Offline Mode

1. Launch the application

2. Enable Airplane Mode

3. Submit several patients

4. Records are stored locally

5. Disable Airplane Mode

6. Watch automatic synchronization begin

No manual refresh is required.

---

# Future Improvements

- Background Workers
- Push Notifications
- User Authentication
- Encryption at Rest
- Conflict Resolution
- Remote Logging
- Multi-user Support
- Real Backend API
- Dashboard
- Analytics

---

# Author

**Godfrey Otieno**

Lead Automation & Full Stack Software Engineer

---

# License

This project was developed solely for the technical assessment.