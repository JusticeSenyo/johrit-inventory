# Dashboard API Schema Documentation

This document outlines the exact data structure your backend API should return for each endpoint. The frontend will handle aggregations, calculations, and visualizations.

## Admin Reports API

### 1. `/api/reports/monthly`
**Purpose**: Monthly business overview data  
**Method**: GET  
**Revalidation**: 1 hour

**Expected Response** (Array of objects):
\`\`\`json
[
  {
    "month": "Jan",
    "orders": 400,
    "revenue": 24000,
    "profit": 8000
  },
  {
    "month": "Feb",
    "orders": 320,
    "revenue": 14000,
    "profit": 5000
  }
]
\`\`\`

**Field Definitions**:
- `month` (string): 3-letter month abbreviation (Jan, Feb, etc.)
- `orders` (number): Total number of orders placed that month
- `revenue` (number): Total revenue in dollars (no currency symbol, just number)
- `profit` (number): Net profit after costs in dollars

**Frontend Calculations**:
- Total Revenue: `SUM(revenue)`
- Total Orders: `SUM(orders)`
- Average Order Value: `SUM(revenue) / SUM(orders)`
- Gross Profit: `SUM(profit)`
- Margin %: `(profit / revenue) * 100` (calculated per row in table)

---

### 2. `/api/reports/categories`
**Purpose**: Revenue breakdown by category  
**Method**: GET  
**Revalidation**: 1 hour

**Expected Response** (Array of objects):
\`\`\`json
[
  {
    "category": "Pizza",
    "revenue": 8500
  },
  {
    "category": "Salads",
    "revenue": 4200
  },
  {
    "category": "Pasta",
    "revenue": 6800
  },
  {
    "category": "Seafood",
    "revenue": 9200
  },
  {
    "category": "Desserts",
    "revenue": 3100
  }
]
\`\`\`

**Field Definitions**:
- `category` (string): Category name
- `revenue` (number): Total revenue for this category

**Frontend Visualization**: Displayed as pie chart with percentage calculations

---

## Sales Reports API

### `/api/reports/sales`
**Purpose**: Weekly sales performance and targets  
**Method**: GET  
**Revalidation**: 1 hour

**Expected Response** (Array of objects):
\`\`\`json
[
  {
    "week": "Week 1",
    "revenue": 8500,
    "orders": 95,
    "target": 9000
  },
  {
    "week": "Week 2",
    "revenue": 9200,
    "orders": 102,
    "target": 9000
  },
  {
    "week": "Week 3",
    "revenue": 8800,
    "orders": 98,
    "target": 9000
  },
  {
    "week": "Week 4",
    "revenue": 10200,
    "orders": 112,
    "target": 9000
  }
]
\`\`\`

**Field Definitions**:
- `week` (string): Week identifier (e.g., "Week 1")
- `revenue` (number): Total revenue for that week in dollars
- `orders` (number): Total number of orders placed that week
- `target` (number): Weekly revenue target in dollars

**Frontend Visualization**:
- Bar chart: Revenue vs Target comparison
- Line chart: Order volume trend

---

## Chef/Kitchen Reports API

### 1. `/api/reports/kitchen/daily`
**Purpose**: Daily kitchen performance metrics  
**Method**: GET  
**Revalidation**: 1 hour

**Expected Response** (Array of objects):
\`\`\`json
[
  {
    "day": "Mon",
    "ordersCompleted": 45,
    "avgTime": 12,
    "mistakes": 1
  },
  {
    "day": "Tue",
    "ordersCompleted": 52,
    "avgTime": 11,
    "mistakes": 0
  },
  {
    "day": "Wed",
    "ordersCompleted": 48,
    "avgTime": 13,
    "mistakes": 2
  },
  {
    "day": "Thu",
    "ordersCompleted": 61,
    "avgTime": 10,
    "mistakes": 1
  },
  {
    "day": "Fri",
    "ordersCompleted": 68,
    "avgTime": 11,
    "mistakes": 0
  },
  {
    "day": "Sat",
    "ordersCompleted": 72,
    "avgTime": 12,
    "mistakes": 1
  },
  {
    "day": "Sun",
    "ordersCompleted": 58,
    "avgTime": 12,
    "mistakes": 1
  }
]
\`\`\`

**Field Definitions**:
- `day` (string): Day of week (Mon, Tue, Wed, etc.)
- `ordersCompleted` (number): Number of orders completed that day
- `avgTime` (number): Average preparation time in minutes
- `mistakes` (number): Number of order mistakes/quality issues

**Frontend Calculations**:
- Total Orders Completed: `SUM(ordersCompleted)`
- Average Prep Time: `AVERAGE(avgTime)` (formatted as "12m")
- Quality Score: `((SUM(ordersCompleted) - SUM(mistakes)) / SUM(ordersCompleted)) * 100`
- Rush Orders: Count of days where `avgTime < 15`

---

### 2. `/api/reports/kitchen/dishes`
**Purpose**: Breakdown of dishes prepared by type  
**Method**: GET  
**Revalidation**: 1 hour

**Expected Response** (Array of objects):
\`\`\`json
[
  {
    "type": "Pizza",
    "count": 145
  },
  {
    "type": "Pasta",
    "count": 98
  },
  {
    "type": "Salads",
    "count": 76
  },
  {
    "type": "Seafood",
    "count": 82
  },
  {
    "type": "Desserts",
    "count": 54
  }
]
\`\`\`

**Field Definitions**:
- `type` (string): Dish type/category name
- `count` (number): Number of dishes of this type prepared

**Frontend Visualization**: Pie chart showing distribution

---

## Implementation Notes

### For Your Backend:
1. **Just provide raw numbers** - Your backend queries the database and returns the aggregated numbers
2. **No complex calculations needed** - The frontend handles percentages, averages, and sums
3. **Date handling** - Provide pre-formatted strings for months/weeks/days (we don't need timestamps)
4. **Numbers only** - Don't include currency symbols or percentage signs, just the numbers

### Example Backend Logic:
\`\`\`sql
-- For admin monthly reports
SELECT 
  DATE_FORMAT(order_date, '%b') as month,
  COUNT(*) as orders,
  SUM(total_amount) as revenue,
  SUM(total_amount - cost) as profit
FROM orders
GROUP BY DATE_FORMAT(order_date, '%b')
\`\`\`

### Error Handling:
If your API endpoint is down or slow, the frontend will automatically fall back to mock data. Just ensure your API returns valid JSON matching these schemas.

---

## Testing Your API

Once you implement these endpoints, test them with:

\`\`\`bash
curl http://localhost:3000/api/reports/monthly
curl http://localhost:3000/api/reports/categories
curl http://localhost:3000/api/reports/sales
curl http://localhost:3000/api/reports/kitchen/daily
curl http://localhost:3000/api/reports/kitchen/dishes
\`\`\`

Each should return the array of objects as specified above.
