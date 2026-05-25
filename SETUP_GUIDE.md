# 🏨 HotelHub Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

## Step 1: Clone Repository

```bash
git clone https://github.com/vividhacapital-crypto/Vividha-Hospitality-Coding.git
cd Vividha-Hospitality-Coding
```

## Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

## Step 3: Setup Frontend

In a new terminal:

```bash
cd dashboard

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

Dashboard runs on: `http://localhost:3000`

## Step 4: Test the Application

1. Open http://localhost:3000
2. Register a new account
3. Login with your credentials
4. Explore the dashboard!

## Testing Credentials

Create a test account:
- **Email**: test@example.com
- **Password**: Test@123
- **Full Name**: Test User

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /token` - Login
- `GET /me` - Get current user

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - List bookings
- `POST /bookings/{id}/checkin` - Check-in
- `POST /bookings/{id}/checkout` - Check-out
- `POST /bookings/{id}/unlock-room` - Remote unlock

### Facilities
- `POST /bookings/{id}/facilities` - Book facility
- `GET /bookings/{id}/facilities` - List facilities

### Reviews
- `POST /reviews` - Post review
- `GET /reviews` - List reviews

### Media
- `POST /media/upload` - Upload photo/video
- `GET /media/my` - Get user media

## Troubleshooting

### Backend won't start
```bash
# Make sure port 8000 is free
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# If port is in use, use different port:
uvicorn main:app --reload --port 8001
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Then start again
npm start
```

### API Connection Issues
- Check if backend is running on port 8000
- Check `.env` file has correct API URL
- Check browser console for errors
- Clear browser cache and restart

## Features

✅ User Authentication (JWT)
✅ Booking Management
✅ Web Check-in & Room Assignment
✅ Remote Room Unlock
✅ Facility Bookings
✅ Reward Points System
✅ Guest Reviews & Ratings
✅ Media Gallery
✅ Responsive Design
✅ Real-time Notifications

## Development

### Backend
- Edit files in `backend/main.py`
- Server auto-reloads with changes
- Check API docs at `http://localhost:8000/docs`

### Frontend
- Edit files in `dashboard/src`
- Browser auto-refreshes with changes
- Check browser console for errors

## Deployment

### Backend (Heroku/Railway/Render)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
cd dashboard
npm run build
# Deploy build folder
```

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./hotel_guest.db
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## Support

For issues:
1. Check GitHub Issues
2. Review API docs at `/docs`
3. Check terminal/console logs
4. Create new issue with details

## License

MIT License - Free to use!
