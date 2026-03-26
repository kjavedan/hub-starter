# 🍽️ Healthy Meal Subscription App (MVP)

---

# 📌 PRODUCT SPECIFICATION

## 🧠 Core Idea

A B2C healthy meal subscription platform where users:

* Subscribe to a meal plan
* Select meals daily (at least 24h before delivery)
* Receive food delivered to their address

---

## 👤 User Features

### Authentication

* Phone authentication (primary via Supabase)
* Email login (optional)
* Google login (optional)

---

### Profile

* Manage name
* Manage phone/email
* Manage delivery addresses

---

### Plans & Subscription

* View available plans (e.g., 5 meals/week, 10 meals/week)
* Subscribe using Stripe
* Subscription status:

  * Active
  * Cancelled

---

### Meal Selection

* Users pick **exact meals**
* Selection is **daily-based**
* Must select or modify meals **at least 24 hours before delivery**

---

### Delivery

* Daily deliveries
* User selects delivery address
* Users can:

  * View upcoming deliveries

---

## 🛠️ Admin Features

### Roles

* SUPER_ADMIN
* ADMIN

---

### Menu Management

* Create/edit/delete categories
* Create/edit/delete menu items
* Add nutrition info:

  * Calories
  * Protein
  * Carbs
  * Fats

---

### Plan Management

* Create/edit plans
* Set:

  * meals per week
  * price

---

### Operations Dashboard (CRITICAL)

Each day staff can:

* See all meals to prepare
* See grouped meals by item
* See delivery list with addresses

---

## 💳 Payments (Stripe)

* Subscription-based payments
* Stripe handles:

  * Payment methods
  * Billing cycles
  * Webhooks

### Minimal DB Tracking

We only store:

* stripeCustomerId
* stripeSubscriptionId
