```mermaid
erDiagram
    User ||--o{ Address : has
    User ||--o{ Subscription : subscribes

    Plan ||--o{ Subscription : defines

    Subscription ||--o{ DailySelection : contains

    DailySelection ||--o{ DailyMeal : includes
    DailySelection ||--|| Delivery : generates

    MenuCategory ||--o{ MenuItem : groups
    MenuItem ||--o{ DailyMeal : selected_as

    Address ||--o{ Delivery : used_for

    User {
        string id PK
        string email
        string phone
        string full_name
        string role
        string stripe_customer_id
        datetime created_at
        datetime updated_at
    }

    Address {
        string id PK
        string user_id FK
        string label
        string address
        boolean is_default
    }

    Plan {
        string id PK
        string name
        string description
        int meals_per_week
        int duration_weeks
        float price
        boolean is_active
    }

    Subscription {
        string id PK
        string user_id FK
        string plan_id FK
        string stripe_subscription_id
        string status
        datetime start_date
        datetime end_date
    }

    DailySelection {
        string id PK
        string subscription_id FK
        date delivery_date
        boolean is_locked
    }

    DailyMeal {
        string id PK
        string selection_id FK
        string menu_item_id FK
        int quantity
    }

    Delivery {
        string id PK
        string selection_id FK
        string address_id FK
        string status
    }

    MenuCategory {
        string id PK
        string name
        string description
        boolean is_active
    }

    MenuItem {
        string id PK
        string name
        string description
        float price
        string image_url
        int calories
        float protein
        float carbs
        float fats
        boolean is_available
        string category_id FK
    }
```

# 🗄️ DATABASE SCHEMA (PRISMA)

```prisma
model User {
  id          String   @id
  email       String?  @unique
  phone       String?  @unique
  fullName    String?
  role        Role     @default(CUSTOMER)

  stripeCustomerId String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  addresses      Address[]
  subscriptions  Subscription[]
}

// ----------------------

enum Role {
  SUPER_ADMIN
  ADMIN
  CUSTOMER
}

// ----------------------

model Address {
  id        String  @id @default(uuid())
  userId    String
  label     String?
  address   String
  isDefault Boolean @default(false)

  user User @relation(fields: [userId], references: [id])
}

// ----------------------

model MenuCategory {
  id          String  @id @default(uuid())
  name        String
  description String?
  isActive    Boolean @default(true)

  items MenuItem[]
}

// ----------------------

model MenuItem {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Float
  imageUrl    String?

  calories    Int?
  protein     Float?
  carbs       Float?
  fats        Float?

  isAvailable Boolean @default(true)

  categoryId String?
  category   MenuCategory? @relation(fields: [categoryId], references: [id])

  createdAt DateTime @default(now())
}

// ----------------------

model Plan {
  id            String  @id @default(uuid())
  name          String
  description   String?
  mealsPerWeek  Int
  durationWeeks Int
  price         Float
  isActive      Boolean @default(true)

  subscriptions Subscription[]
}

// ----------------------

model Subscription {
  id        String   @id @default(uuid())
  userId    String
  planId    String

  stripeSubscriptionId String?

  status    SubscriptionStatus
  startDate DateTime
  endDate   DateTime?

  user User @relation(fields: [userId], references: [id])
  plan Plan @relation(fields: [planId], references: [id])

  selections DailySelection[]
}

// ----------------------

model DailySelection {
  id             String   @id @default(uuid())
  subscriptionId String

  deliveryDate   DateTime
  isLocked       Boolean  @default(false)

  subscription Subscription @relation(fields: [subscriptionId], references: [id])
  meals        DailyMeal[]
  delivery     Delivery?
}

// ----------------------

model DailyMeal {
  id            String @id @default(uuid())
  selectionId   String
  menuItemId    String
  quantity      Int

  selection DailySelection @relation(fields: [selectionId], references: [id])
  menuItem  MenuItem       @relation(fields: [menuItemId], references: [id])
}

// ----------------------

model Delivery {
  id            String   @id @default(uuid())
  selectionId   String   @unique
  addressId     String

  status        DeliveryStatus

  selection DailySelection @relation(fields: [selectionId], references: [id])
  address   Address        @relation(fields: [addressId], references: [id])
}

// ----------------------

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
}

// ----------------------

enum DeliveryStatus {
  PENDING
  PREPARING
  OUT_FOR_DELIVERY
  DELIVERED
}
```

