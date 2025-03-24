# fullstock-project--1

יישום שרת לקוח - REST API.
תיאור הפרויקט

פרויקט זה מיישם שרת REST API באמצעות Node.js ו-Express, עם בסיס נתונים MongoDB. השרת תומך בפעולות CRUD עבור אובייקטים מסוגים שונים, כולל משתמשים, פוסטים, רשימות ומשימות.

טכנולוגיות בשימוש

פלטפורמת צד שרת להפעלת - Node.js -  JavaScript.

מסגרת עבודה לבניית שרתים - Express.js.

בסיס נתונים NoSQL לאחסון נתונים - MongoDB.

מבנה הנתונים

האובייקטים הנתמכים במערכת:

משתמש - Users (name, username, email, address, phone).
פוסטים - Posts (title, body).
משימות - Todos (title, completed).

פעולות נתמכות (Endpoints)

ה-API מאפשר גישה לאובייקטים באמצעות קריאות HTTP בפרוטוקול REST, הכוללות:
שליפת נתונים - GET.
צירת נתונים חדשים - POST.
עדכון נתונים קיימים - PUT.
מחיקת נתונים - DELETE.

פעולות על Todos

שליפת כל ה-Todos (GET /todos)

שליפת פריט ספציפי לפי ID (GET /todos/:id)

הוספת משימה חדשה (POST /todos)

עדכון משימה קיימת (PUT /todos/:id)

מחיקת משימה (DELETE /todos/:id)

פעולות על Posts

שליפת כל הפוסטים (GET /posts)

שליפת פוסט לפי ID (GET /posts/:id)

הוספת פוסט חדש (POST /posts)

עדכון פוסט קיים (PUT /posts/:id)

מחיקת פוסט (DELETE /posts/:id)

פעולות על Users

שליפת כל המשתמשים (GET /users)

שליפת משתמש לפי ID (GET /users/:id)

הוספת משתמש חדש (POST /users)

עדכון משתמש קיים (PUT /users/:id)

מחיקת משתמש (DELETE /users/:id)

הוראות הפעלה

התקן את התלויות הנדרשות באמצעות: npm install

הפעל את השרת באמצעות: node server.js

ניתן לגשת ל-API דרך http://localhost:3000.

הערות נוספות

השרת תומך בניהול משימות באמצעות שדה completed ב-Todos.

ניתן להשתמש ב-Postman או בכלי אחר לבדיקה ושליחת בקשות ל-API.

יש לוודא שבסיס הנתונים MongoDB פועל לפני הפעלת השרת.

מחבר

שם המפתח/ת: (יש להכניס את שמך כאן)

