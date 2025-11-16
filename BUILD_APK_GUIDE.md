# 📱 How to Build APK from Your Typing Arena Project

This guide will help you convert your web app into an Android APK file using Capacitor.

## 📋 Prerequisites

### 1. Install Node.js
- Download Node.js from: https://nodejs.org/
- Install the **LTS version** (recommended)
- Restart your computer after installation
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Install Android Studio
- Download from: https://developer.android.com/studio
- Install Android Studio
- During installation, make sure to install:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (AVD)
- Open Android Studio and complete the setup wizard

### 3. Set Environment Variables (Important!)
After installing Android Studio, set these environment variables:

**For Windows:**
1. Open System Properties → Environment Variables
2. Add new System Variable:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
3. Add to Path:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

**Verify:**
```bash
echo $env:ANDROID_HOME
```

## 🚀 Step-by-Step Build Process

### Step 1: Install Dependencies
Open terminal in your project folder and run:
```bash
npm install
```

### Step 2: Initialize Capacitor
```bash
npx cap init
```
- App name: `Typing Arena`
- App ID: `com.typingarena.app`
- Web directory: `.` (current directory)

### Step 3: Add Android Platform
```bash
npx cap add android
```

### Step 4: Sync Your Web App
This copies your web files to the Android project:
```bash
npx cap sync
```

### Step 5: Open in Android Studio
```bash
npx cap open android
```

### Step 6: Build APK in Android Studio

1. **Wait for Gradle Sync** (first time takes 5-10 minutes)

2. **Build the APK:**
   - Go to: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Wait for build to complete (2-5 minutes)

3. **Find Your APK:**
   - After build, click "locate" in the notification
   - Or navigate to: `android/app/build/outputs/apk/debug/app-debug.apk`

4. **Install APK:**
   - Transfer to your Android phone
   - Enable "Install from Unknown Sources" in phone settings
   - Tap the APK file to install

## 🔧 Alternative: Build APK via Command Line

If you prefer command line:

```bash
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📦 Build Release APK (For Distribution)

For a release APK (signed and optimized):

1. **Generate Keystore:**
   ```bash
   keytool -genkey -v -keystore typing-arena-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias typing-arena
   ```

2. **Create `android/key.properties`:**
   ```
   storePassword=your_password
   keyPassword=your_password
   keyAlias=typing-arena
   storeFile=../typing-arena-key.jks
   ```

3. **Update `android/app/build.gradle`:**
   - Add signing config (see Android Studio documentation)

4. **Build Release APK:**
   - In Android Studio: `Build` → `Generate Signed Bundle / APK`
   - Or command line: `./gradlew assembleRelease`

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Add Android platform (first time only)
npx cap add android

# Sync web files to Android
npx cap sync

# Open in Android Studio
npx cap open android

# Copy web files only
npx cap copy

# Update Capacitor
npm update @capacitor/core @capacitor/cli @capacitor/android
```

## ⚠️ Troubleshooting

### Issue: "Command not found: npx"
**Solution:** Make sure Node.js is installed and restart terminal

### Issue: "ANDROID_HOME not set"
**Solution:** Set the environment variable as shown in Prerequisites

### Issue: Gradle build fails
**Solution:** 
- Open Android Studio
- Go to `File` → `Sync Project with Gradle Files`
- Wait for sync to complete

### Issue: "SDK location not found"
**Solution:**
- Open Android Studio
- Go to `File` → `Project Structure` → `SDK Location`
- Set the SDK path

### Issue: APK is too large
**Solution:**
- Build release APK (smaller size)
- Enable ProGuard in `build.gradle`

## 📱 Testing Your APK

1. **On Emulator:**
   - In Android Studio, click "Run" button
   - Select an emulator or create one

2. **On Real Device:**
   - Enable USB Debugging on your phone
   - Connect via USB
   - Click "Run" in Android Studio
   - Select your device

3. **Install APK Directly:**
   - Transfer APK to phone
   - Enable "Install from Unknown Sources"
   - Tap APK to install

## 🎨 Customization

### Change App Icon:
1. Replace icons in `android/app/src/main/res/`
2. Use Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/

### Change App Name:
Edit `android/app/src/main/res/values/strings.xml`

### Change Package Name:
Edit `android/app/build.gradle` → `applicationId`

## 📝 Notes

- First build takes 10-15 minutes (downloads dependencies)
- Subsequent builds are faster (2-5 minutes)
- APK size: ~5-10 MB (debug), ~3-5 MB (release)
- Minimum Android version: Android 5.0 (API 21)

## 🆘 Need Help?

- Capacitor Docs: https://capacitorjs.com/docs
- Android Studio Help: https://developer.android.com/studio/intro
- Stack Overflow: Search "Capacitor Android build"

---

**Good luck building your APK! 🚀**

