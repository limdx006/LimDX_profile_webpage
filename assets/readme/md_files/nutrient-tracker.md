# CP3407-Group-Project
# Project Proposal: Nutrient
### GITHUB link: [Repository](https://github.com/LimDongXian/CP3407-Group-Project)
### Student: Lim Dong Xian 
### Student: Hamzah Nutt 
### Student: Richo Winson Tandoto 
### Student: Mayur Ramesh 

---

## 1. Project Overview
This is a web-based nutrition tracking application that enables users to:
- Search and analyse nutritional values of food items using barcode scanning or text search
- Log daily meals and track macronutrient intake (calories, protein, carbs, fats)
- Auto personalised health goals based on calculated TDEE (Total Daily Energy Expenditure)
- Monitor progress with visual dashboards and historical data

**Target Users:** Health-conscious individuals, fitness enthusiasts, and anyone monitoring dietary intake.
<img width="2537" height="1262" alt="image" src="https://github.com/user-attachments/assets/6b4029a7-ac54-4dc3-ad13-e0240a8abbf8" />

---

## 2. Objectives
| Objective | Success Metric |
|-----------|---------------|
| Provide accurate nutritional data from reliable sources | Integration with 2+ verified nutrition APIs |
| Enable quick food logging | < 30 seconds to log a meal |
| Calculate personalized daily targets | Mifflin-St Jeor BMR equation implementation |
| Ensure data persistence | Daily snapshots stored for historical tracking |
---

## 3. Key Features

### 🔍 Food Search & Discovery
- **Text Search:** Search 2M+ products via Open Food Facts API
- **Nutrient Normalization:** Automatic conversion (kJ→kcal, g→mg for sodium)

### 📊 Daily Tracking
- Real-time macronutrient counters with progress bars
- Meal categorisation (Breakfast, Lunch, Dinner, Snacks)
- Daily summary with BMR-based goal calculations

### 🍽️ Custom Food Creation
- Create and save custom recipes
- Ingredient-based nutrition calculation via CalorieNinjas API
- Image upload for food items (base64 storage)

### 📈 Progress Monitoring
- 7 or 31-day intake history with Chart.js visualisations
- Automatic daily reset

### 💡 Dietary Insights
- High nutrient highlights
- Suggested daily limits based on user profile (age, weight, gender, height)

---

## 4. Technology Stack
- Framework: Django 5.x.x
- Frontend: HTML, CSS
- Backend: Python, JavaScript
- Database: SQL
- Version Control: GitHub commit

### API Integration Details
- **Open Food Facts:** Product search by name/barcode, nutritional data per 100g
- **CalorieNinjas:** Natural language food parsing ("2 eggs and toast"), ingredient-level analysis

---

## 5. Data and Privacy
The application will utilise publicly available nutrient datasets or APIs. No personal or sensitive user data will be stored without consent. 
All data handling will comply with data privacy and security, ensuring that user information remains confidential and secure.
