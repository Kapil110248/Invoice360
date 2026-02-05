# Payroll Settings API Documentation

## Overview
Complete backend and frontend integration for Payroll Settings module with all UI fields properly mapped to database.

## Database Schema

### Model: `payroll_setting`
```prisma
model payroll_setting {
  id                    Int      @id @default(autoincrement())
  companyId             Int      @unique
  payCycle              String   @default("Monthly")
  bankAccount           String?
  currency              String   @default("USD")
  taxSlab               String?
  enablePF              Boolean  @default(false)
  enableInsurance       Boolean  @default(false)
  enableOtherDeductions Boolean  @default(false)
  layout                String   @default("Simple")
  footerNotes           String?  @db.Text
  digitalSignature      Boolean  @default(false)
  enableEmail           Boolean  @default(true)
  enableWhatsapp        Boolean  @default(false)
  emailTemplate         String?  @db.Text
  createdAt             DateTime @default(now())
  updatedAt             DateTime @default(now()) @updatedAt
  company               company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
}
```

## API Endpoints

### 1. Get Payroll Settings
**Endpoint:** `GET /api/payroll/settings`  
**Auth:** Required (JWT Token)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "companyId": 1,
    "payCycle": "Monthly",
    "bankAccount": "1234567890",
    "currency": "USD",
    "taxSlab": "10% for income up to R50,000",
    "enablePF": true,
    "enableInsurance": true,
    "enableOtherDeductions": false,
    "layout": "Simple",
    "footerNotes": "This is a computer-generated document",
    "digitalSignature": true,
    "enableEmail": true,
    "enableWhatsapp": false,
    "emailTemplate": "Your payslip for {month} is now available.",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Update Payroll Settings
**Endpoint:** `PUT /api/payroll/settings`  
**Auth:** Required (JWT Token)

**Request Body:**
```json
{
  "payCycle": "Monthly",
  "bankAccount": "1234567890",
  "currency": "USD",
  "taxSlab": "10% for income up to R50,000",
  "enablePF": true,
  "enableInsurance": true,
  "enableOtherDeductions": false,
  "layout": "Simple",
  "footerNotes": "This is a computer-generated document",
  "digitalSignature": true,
  "enableEmail": true,
  "enableWhatsapp": false,
  "emailTemplate": "Your payslip for {month} is now available."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "companyId": 1,
    "payCycle": "Monthly",
    "bankAccount": "1234567890",
    "currency": "USD",
    ...
  }
}
```

## Frontend Integration

### Service: `payrollService.js`
```javascript
// Get Settings
getSettings: async () => {
  const response = await axiosInstance.get('/payroll/settings');
  return response.data;
}

// Update Settings
updateSettings: async (data) => {
  const response = await axiosInstance.put('/payroll/settings', data);
  return response.data;
}
```

### Component: `PayrollSetting.jsx`
- Fetches settings on component mount
- All form fields are bound to state
- Save button triggers API call to update settings
- Reset button restores default values
- Toast notifications for success/error feedback

## Field Mapping

| UI Field | Database Field | Type | Default |
|----------|---------------|------|---------|
| Default Pay Cycle | payCycle | String | "Monthly" |
| Default Bank Account | bankAccount | String? | null |
| Default Currency | currency | String | "USD" |
| Add Tax Slab / Percentage | taxSlab | String? | null |
| Enable PF (Provident Fund) | enablePF | Boolean | false |
| Enable Insurance | enableInsurance | Boolean | false |
| Enable Other Deductions | enableOtherDeductions | Boolean | false |
| Select Layout | layout | String | "Simple" |
| Add Footer Notes | footerNotes | String? | null |
| Include Digital Signature | digitalSignature | Boolean | false |
| Enable Email Send | enableEmail | Boolean | true |
| Enable WhatsApp Send | enableWhatsapp | Boolean | false |
| Default Message Template | emailTemplate | String? | null |

## Usage Flow

1. **Initial Load:**
   - User opens Payroll Settings page
   - Frontend calls `GET /api/payroll/settings`
   - If no settings exist, backend creates default settings
   - Settings populate form fields

2. **Update Settings:**
   - User modifies form fields
   - Clicks "Save Settings" button
   - Frontend calls `PUT /api/payroll/settings` with all field values
   - Backend performs upsert operation
   - Success toast notification shown

3. **Reset to Defaults:**
   - User clicks "Reset Defaults" button
   - Confirmation dialog appears
   - On confirm, form resets to default values
   - User must click "Save Settings" to persist

## Database Migration

After schema changes, run:
```bash
npx prisma db push
npx prisma generate
```

## Status
✅ Database schema updated  
✅ Backend API implemented  
✅ Frontend integration complete  
✅ All UI fields mapped to database  
✅ CRUD operations functional  
✅ Error handling implemented  
✅ Toast notifications added
