# Salary Structure - Complete Flow Documentation

## 📋 Overview
Salary Structure module allows you to create salary templates with multiple components (earnings/deductions) and assign them to employees for automated payroll calculation.

## 🔄 Complete Data Flow

### **Step 1: Create Salary Structure**
```
User clicks "Create Structure" button
    ↓
Modal opens with "Structure Name" field
    ↓
User enters name (e.g., "Standard Staff", "Senior Management")
    ↓
Clicks "Create" button
    ↓
POST /api/payroll/structures
    ↓
Backend creates structure with empty components array
    ↓
Structure appears in table with ID "STR1", "STR2", etc.
```

**Example:**
- Structure Name: "Standard Staff"
- Components: 0 (initially empty)
- Assigned To: 0 employees

---

### **Step 2: Add Components to Structure**
```
User clicks "Add Component" button for a structure
    ↓
Modal opens with component form
    ↓
User fills:
  - Component Name (e.g., "Basic Salary", "HRA", "Tax")
  - Type: EARNING or DEDUCTION
  - Calculation Type: FIXED or PERCENTAGE
  - Value: Amount or Percentage
    ↓
Clicks "Add Component"
    ↓
POST /api/payroll/structures/:id/components
    ↓
Component added to structure
    ↓
Table updates showing "3 Components" (or however many)
```

**Example Components:**
1. **Basic Salary**
   - Type: EARNING
   - Calculation: FIXED
   - Value: R15,000

2. **HRA (House Rent Allowance)**
   - Type: EARNING
   - Calculation: PERCENTAGE
   - Value: 20% (of basic salary)

3. **Tax**
   - Type: DEDUCTION
   - Calculation: PERCENTAGE
   - Value: 10% (of basic salary)

---

### **Step 3: View Components**
```
User clicks "View Components" button
    ↓
Modal opens showing all components in a table
    ↓
Displays:
  - Component Name
  - Type (EARNING/DEDUCTION with color coding)
  - Calculation Type
  - Value (formatted as R5,000 or 10%)
```

**View Modal Shows:**
| Component Name | Type | Calculation | Value |
|----------------|------|-------------|-------|
| Basic Salary | EARNING | FIXED | R15,000 |
| HRA | EARNING | PERCENTAGE | 20% |
| Tax | DEDUCTION | PERCENTAGE | 10% |

---

### **Step 4: Assign Structure to Employee**
```
User clicks "Assign" button for a structure
    ↓
Modal opens with employee dropdown
    ↓
User selects employee from list
  (Shows: Name, Employee ID, Department)
    ↓
Clicks "Assign Structure"
    ↓
POST /api/payroll/structures/assign
    ↓
Backend creates salary_structure_assignment record
    ↓
Table updates showing "1 Employee(s)" assigned
```

**Assignment Flow:**
- Structure: "Standard Staff"
- Employee: "Sarah (HR) - EMP001 - HR Department"
- Result: Sarah's salary will be calculated using this structure

---

### **Step 5: Payroll Generation Uses Structure**
```
When generating payroll:
    ↓
System fetches employee's assigned structure
    ↓
Calculates salary based on components:
  
  Basic Salary: R15,000 (FIXED)
  HRA: R15,000 × 20% = R3,000 (PERCENTAGE)
  Tax: R15,000 × 10% = R1,500 (PERCENTAGE)
  
  Total Earnings: R15,000 + R3,000 = R18,000
  Total Deductions: R1,500
  Net Salary: R18,000 - R1,500 = R16,500
    ↓
Payroll record created with breakdown
```

---

## 🗄️ Database Structure

### **salary_structure**
```sql
id: 1
name: "Standard Staff"
companyId: 1
createdAt: 2024-01-01
updatedAt: 2024-01-01
```

### **salary_structure_component**
```sql
id: 1, structureId: 1, name: "Basic Salary", type: "EARNING", calculationType: "FIXED", value: 15000
id: 2, structureId: 1, name: "HRA", type: "EARNING", calculationType: "PERCENTAGE", value: 20
id: 3, structureId: 1, name: "Tax", type: "DEDUCTION", calculationType: "PERCENTAGE", value: 10
```

### **salary_structure_assignment**
```sql
id: 1
employeeId: 5
structureId: 1
companyId: 1
```

### **Relationships:**
```
salary_structure (1) ----< (many) salary_structure_component
salary_structure (1) ----< (many) salary_structure_assignment
employee (1) ----< (1) salary_structure_assignment
```

---

## 📊 UI Display Logic

### **Main Table Columns:**

1. **STRUCTURE ID**
   - Format: STR{id}
   - Example: STR1, STR2, STR3

2. **STRUCTURE NAME**
   - User-defined name
   - Example: "Standard Staff", "Senior Management"

3. **COMPONENTS**
   - Count of components
   - Format: "3 Components"
   - Shows 0 if no components added

4. **ASSIGNED TO**
   - Count of employees with this structure
   - Format: "5 Employee(s)"
   - Calculated by counting assignments

5. **ACTIONS**
   - **Add Component** button → Opens component modal
   - **View Components** button → Shows components table
   - **Assign** button → Opens employee selection modal

---

## 🎯 Complete User Journey

### **Scenario: Setting up payroll for a new employee**

**Step 1: Create Structure**
```
HR Manager creates "Junior Staff" structure
→ Structure appears in table with ID STR3
```

**Step 2: Add Components**
```
Clicks "Add Component" for STR3
→ Adds "Basic Salary" - EARNING - FIXED - R12,000
→ Adds "Transport" - EARNING - FIXED - R2,000
→ Adds "Medical Aid" - DEDUCTION - FIXED - R1,500
→ Adds "Tax" - DEDUCTION - PERCENTAGE - 15%
→ Table now shows "4 Components"
```

**Step 3: View Components (Verification)**
```
Clicks "View Components"
→ Modal shows all 4 components in table format
→ HR Manager verifies calculations are correct
```

**Step 4: Assign to Employee**
```
New employee "John Doe" joins as Junior Staff
→ HR Manager clicks "Assign" for STR3
→ Selects "John Doe (EMP010) - Sales"
→ Clicks "Assign Structure"
→ Table shows "1 Employee(s)" for STR3
```

**Step 5: Generate Payroll**
```
At month end, HR goes to "Generate Payroll"
→ Selects "John Doe" for payroll generation
→ System automatically:
  - Fetches STR3 structure
  - Calculates:
    Basic: R12,000
    Transport: R2,000
    Medical Aid: -R1,500
    Tax: R12,000 × 15% = -R1,800
    
    Gross: R14,000
    Deductions: R3,300
    Net: R10,700
→ Payroll generated with full breakdown
```

---

## 🔍 Data Visibility

### **Where Structure Data Shows:**

1. **Salary Structure Page**
   - All structures in main table
   - Components count
   - Assignment count

2. **View Components Modal**
   - Detailed component breakdown
   - Type and calculation method
   - Values with proper formatting

3. **Employee Management Page**
   - Shows assigned structure name
   - Can see which structure employee has

4. **Generate Payroll Page**
   - Uses structure for calculations
   - Shows breakdown in payroll details

5. **Payslip Report**
   - Displays all earnings and deductions
   - Shows component names from structure

---

## 🎨 UI Features

### **Color Coding:**
- **EARNING** components → Green badge
- **DEDUCTION** components → Red badge

### **Formatting:**
- **FIXED** amounts → R15,000
- **PERCENTAGE** values → 20%

### **Smart Displays:**
- Empty state message when no structures exist
- Empty state in components modal when no components
- Employee dropdown shows full info (Name, ID, Department)
- Assignment count updates in real-time

---

## ✅ Validation & Error Handling

### **Create Structure:**
- ✅ Structure name required
- ✅ Duplicate names allowed (different companies)
- ✅ Success toast on creation

### **Add Component:**
- ✅ All fields required
- ✅ Value must be positive number
- ✅ Success toast on addition
- ✅ Table refreshes automatically

### **Assign Structure:**
- ✅ Employee selection required
- ✅ One structure per employee (upsert logic)
- ✅ Success toast on assignment
- ✅ Can reassign different structure (updates existing)

---

## 🚀 API Endpoints Used

1. **GET /api/payroll/structures**
   - Fetches all structures with components
   - Includes: `{ id, name, components: [...] }`

2. **POST /api/payroll/structures**
   - Creates new structure
   - Body: `{ name, components: [] }`

3. **POST /api/payroll/structures/:id/components**
   - Adds component to structure
   - Body: `{ name, type, calculationType, value }`

4. **POST /api/payroll/structures/assign**
   - Assigns structure to employee
   - Body: `{ employeeId, structureId }`

5. **GET /api/payroll/employees**
   - Fetches employees with assignments
   - Includes: `salary_structure_assignment` relation

---

## 📈 Example Data Flow

### **Initial State:**
```
Structures: []
Employees: [
  { id: 1, name: "Sarah", department: "HR" },
  { id: 2, name: "John", department: "IT" }
]
```

### **After Creating Structure:**
```
Structures: [
  { id: 1, name: "Standard Staff", components: [] }
]
```

### **After Adding Components:**
```
Structures: [
  {
    id: 1,
    name: "Standard Staff",
    components: [
      { name: "Basic", type: "EARNING", calculationType: "FIXED", value: 15000 },
      { name: "HRA", type: "EARNING", calculationType: "PERCENTAGE", value: 20 },
      { name: "Tax", type: "DEDUCTION", calculationType: "PERCENTAGE", value: 10 }
    ]
  }
]
```

### **After Assignment:**
```
Employees: [
  {
    id: 1,
    name: "Sarah",
    department: "HR",
    salary_structure_assignment: {
      structureId: 1,
      structure: { name: "Standard Staff" }
    }
  },
  { id: 2, name: "John", department: "IT" }
]
```

### **Table Display:**
```
| STRUCTURE ID | STRUCTURE NAME  | COMPONENTS   | ASSIGNED TO   | ACTIONS |
|--------------|-----------------|--------------|---------------|---------|
| STR1         | Standard Staff  | 3 Components | 1 Employee(s) | [Buttons] |
```

---

## 🎯 Summary

**Complete Flow:**
1. Create Structure → Appears in table
2. Add Components → Count updates
3. View Components → See breakdown
4. Assign to Employee → Assignment count updates
5. Generate Payroll → Uses structure for calculation

**Data Persistence:**
- All data saves to database
- Refreshing page shows saved data
- Assignments persist across sessions
- Used automatically in payroll generation

**User Experience:**
- Clear visual feedback (toasts)
- Real-time table updates
- Intuitive modals
- Proper validation
- Color-coded components
- Formatted values

**Backend Integration:**
- ✅ All APIs working
- ✅ Proper relationships
- ✅ Upsert logic for assignments
- ✅ Cascade deletes
- ✅ Company-level isolation
