# AERO Bead Cleaning - Goodyear

Goodyear bead cleaning system with modern interface using Angular 19 and Webix UI, featuring secure authentication.

## 🎨 Design and Interface

### Goodyear Theme
- **Main colors**: Goodyear Blue (#003DA5, #0052CC) and Yellow (#FFD100)
- **Interface**: Full screen without cards, only fixed blue header
- **Responsiveness**: Automatically centers when width exceeds 1024px

### Authentication System
- **Secure login page** with Goodyear branding
- **User authentication** with mock API integration
- **Route protection** with AuthGuard
- **Session management** with localStorage
- **Automatic redirects** for authenticated users

### Fixed Header
- **Goodyear Logo** with text fallback
- **User information**: Name, User ID and logout button
- **Current date** formatted in English
- **Position**: Fixed at the top of the screen

### Main Interface
- **Barcode scanner** as main focus
- **Data table** with scanned codes
- **Submit button** for data submission
- **Clean layout** without unnecessary cards

## 🚀 Features

### Authentication and User
- **Secure login system** with form validation
- **Demo credentials** for quick testing
- **Session persistence** across browser sessions
- **Automatic logout** with session cleanup
- **Route protection** for authenticated areas

### Barcode Scanner
- **Input field** for typing or scanning codes
- **Submit button** to process the code
- **Validation** of required field
- **Automatic focus** on field after submission
- **Real-time data table**
- **Webix pattern** maintained throughout interface

### Data and API
- **API integration** for barcodes and users
- **Mock data** as fallback
- **Configured endpoints**:
  - `POST /api/auth/login` - User authentication
  - `GET /api/barcodes` - List of codes
  - `POST /api/barcodes` - Code submission
  - `GET /api/user/current` - Current user
  - `GET /api/barcodes/user/{username}` - Codes by user
  - `GET /api/barcodes/date/{date}` - Codes by date

## 🛠️ Technologies

- **Angular 19** - Main framework
- **Webix UI** - Interface components
- **SCSS** - Advanced styling
- **TypeScript** - Static typing
- **HttpClient** - API communication
- **Angular Router** - Navigation and route protection

## 📦 Installation and Usage

### Prerequisites
```bash
Node.js 18+ 
npm or yarn
```

### Installation
```bash
# Clone repository
git clone [repository-url]
cd bead-cleaning

# Install dependencies
npm install

# Run in development mode
ng serve --port 4203
```

### Access
- **URL**: http://localhost:4203
- **Login**: http://localhost:4203/login
- **Dashboard**: http://localhost:4203/dashboard (requires authentication)

### Demo Credentials
- **Admin User**: `admin` / `admin`
- **Regular User**: `user` / `user`

## 🎯 Main Features

### Modern Interface
- **Clean design** without unnecessary cards
- **Fixed header** with essential information
- **Scanner focus** as main element
- **Responsiveness** for different screen sizes

### Authentication Flow
1. **Access application** → Redirected to login
2. **Enter credentials** → Form validation
3. **Successful login** → Redirected to dashboard
4. **Session management** → Persistent across browser
5. **Logout** → Session cleanup and redirect to login

### Functionality
- **Scanner field** for barcodes
- **Automatic validation** of input
- **Real-time submission** to API
- **Automatically updated** data table
- **Logout button** in header
- **Automatic focus** on field after submission

### How to Use the Scanner
1. **Type or scan** the code in the "📦 Barcode" field
2. **Click "✅ Submit"** or press Enter
3. **Code processed** and sent to API
4. **Field cleared** and focus returns automatically
5. **Data updated** in real-time table

### Integration
- **REST API** for backend communication
- **Mock data** as fallback
- **Robust error handling**
- **Detailed logs** for debugging

## 🔧 API Configuration

### Authentication Endpoints
```typescript
// Authentication
POST /api/auth/login
{
  "username": "admin",
  "password": "admin"
}

// Response
{
  "success": true,
  "user": {
    "username": "AE04085",
    "name": "João Silva",
    "role": "Operator"
  },
  "token": "jwt-token-here"
}
```

### Main Endpoints
```typescript
// Barcodes
GET /api/barcodes
POST /api/barcodes
GET /api/barcodes/user/{username}
GET /api/barcodes/date/{date}

// User
GET /api/user/current
```

### Mock Data (Fallback)
```typescript
// Default users
{
  username: 'admin',
  password: 'admin',
  user: {
    username: 'AE04085',
    name: 'João Silva',
    role: 'Operator'
  }
}

// Example barcodes
[
  {
    username: 'AE04085',
    barcode: '1234567890',
    createdAt: '2024-01-15 10:30:00',
    status: 'Processed'
  }
]
```

## 📱 Responsiveness

- **Desktop**: Complete interface with automatic centering
- **Tablet**: Layout adapted for medium screens
- **Mobile**: Interface optimized for mobile devices
- **Breakpoint**: 1024px for centering

## 🎨 Customization

### Goodyear Colors
```scss
--goodyear-blue: #003DA5;
--goodyear-blue-light: #0052CC;
--goodyear-yellow: #FFD100;
```

### Webix Components
- **Custom theme** maintaining Webix pattern
- **Native components** for better performance
- **Consistent styling** with visual identity

## 🔄 Recent Updates

### Authentication System
- ✅ Implemented secure login page
- ✅ Added AuthService with session management
- ✅ Created AuthGuard for route protection
- ✅ Integrated with existing dashboard
- ✅ Added demo credentials for testing

### Interface
- ✅ Removed card design
- ✅ Implemented full screen layout
- ✅ Added logout button in header
- ✅ Removed "operator" tag, kept only User ID
- ✅ Removed "Scan Barcode" button, kept only "Submit"
- ✅ Automatic centering when exceeding 1024px
- ✅ Added barcode input field
- ✅ Automatic validation and field focus

### Functionality
- ✅ Complete API integration
- ✅ Mock data as fallback
- ✅ Robust error handling
- ✅ Responsive interface
- ✅ Functional scanner with real-time submission
- ✅ Automatically updated table
- ✅ Session persistence and management

## 📄 License

© 2024 Goodyear Tire & Rubber Company. AERO Bead Cleaning System.
