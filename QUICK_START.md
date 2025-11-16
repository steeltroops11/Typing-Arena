# ⚡ Quick Start - Build APK in 5 Steps

## Prerequisites Check ✅
1. ✅ Node.js installed? → https://nodejs.org/
2. ✅ Android Studio installed? → https://developer.android.com/studio

## 🚀 Build Steps

### 1. Install Node.js (if not installed)
Download and install from: https://nodejs.org/
- Choose **LTS version**
- Restart computer after installation

### 2. Open Terminal in Project Folder
Navigate to: `C:\Users\hp\OneDrive\Desktop\College_Project`

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Capacitor
```bash
npx cap init
npx cap add android
npx cap sync
```

### 5. Open in Android Studio & Build
```bash
npx cap open android
```
Then in Android Studio:
- Wait for Gradle sync (first time: 5-10 min)
- Click: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
- Find APK: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 That's It!
Your APK is ready to install on any Android device!

---

**For detailed instructions, see: `BUILD_APK_GUIDE.md`**

