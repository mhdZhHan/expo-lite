# expo-social-lite 📱✨

![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-FF6B00?style=for-the-badge&logo=convex&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C5CF2?style=for-the-badge&logo=clerk&logoColor=white)

Welcome to **expo-social-lite**, a lightweight social media app built with love using **Expo** and **Convex**! 🌟 Connect with friends, share your coolest posts, and explore a universe of likes, comments, and bookmarks. This app is your space to shine! 🌌

## 🎉 What’s This App About?

- Create your profile and connect with others! 👥
- Share posts with images and captions. 📸
- Like, comment, and follow your buddies! ❤️💬
- Save your favorite posts in a slick bookmarks page! 🔖
- Stay updated with notifications! 🔔
- Check out your profile and edit it anytime! 🖌️

## 🚀 Tech Stack

This app is powered by some awesome tools:

- **Expo** (2.8.3) - For a smooth React Native experience! 📱
- **Convex** (1.19.5) - Our Backend-as-a-Service hero! 💾
- **Clerk** - For super-easy authentication! 🔑
- **lucide-react-native** - Bringing sleek, customizable icons to life! ⭐
- **react-native-svg** & **reanimated** - For cool animations and vector graphics! 🎨
- **TypeScript**, **Prettier**, and **ESLint** - Keeping the code clean and tested! ✅

## 📸 Screenshots

Check out the app in action! 😎

![New Post](/screenshots/frame.png)

<!-- - **New Post**: Tap to share your vibe! 📤
  ![New Post](/screenshots/new-post.jpg)
- **Notifications**: See who’s liking and commenting! 🔔
  ![Notifications](/screenshots/notifications.jpg)
- **Bookmarks**: Your saved treasures! 🔖
  ![Bookmarks](/screenshots/bookmarks.jpg)
- **Profile**: Show off your style! 🖼️
  ![Profile](/screenshots/profile.jpg)
- **Feed**: Explore the cosmic glow! 🌕
  ![Feed](/screenshots/feed.jpg) -->

## 🎮 How to Run It

Want to try it yourself? Here’s how! 🛠️

1. Clone the repo:
   ```bash
   git clone https://github.com/mhdZhHan/expo-lite.git
   ```
2. Navigate to the project:
   ```bash
   cd expo-social-lite
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set Up Environment Variables

   Create a `.env.local` file in the root of the project and add the following keys

   ```bash
   # Clerk (Get this from your Clerk dashboard)
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>

   # Convex (Get these from your Convex dashboard)
   CONVEX_DEPLOYMENT=<your-convex-deployment>
   EXPO_PUBLIC_CONVEX_URL=<your-convex-url>
   ```

   > Note: You’ll need to sign up at Clerk and Convex to get these credentials.

5. Run the Convex Backend
   ```bash
   npx convex dev
   ```
   > Keep this running—it manages your database and backend logic!
6. Run the Expo App:

   In a separate terminal window, launch the Expo app:

   ```bash
   npx expo
   ```

   - Scan the QR code with the `Expo Go app` on your phone, or
   - Press `i` for iOS simulator or `a` for Android emulator (if set up).

## ⚙️ Troubleshooting

Hitting a snag? Don’t worry, we’ve got you covered! 🛠️✨

- **Both servers running?** Ensure `npx convex dev` ⚙️ and `npx expo` 📱 are humming along in separate terminals. They’re a dynamic duo! 💪
- **Env vars check!** Peek at your `.env` file 👀—are those Clerk 🔑 and Convex 🌐 values correct? Typos are sneaky little gremlins! � gremlin
- **Still stuck?** Dive into the [Expo docs](https://docs.expo.dev) 📚 or [Convex docs](https://docs.convex.dev) 🗄️ for extra wisdom—or ping me for help! 🆘

You’ll be soaring through **expo-social-lite** in no time! 🚀

## 🤝 Contributing

Love the app? Want to help? 🎉

- Fork the repo! 🍴
- Create a feature or fix a bug! 🐛
- Submit a pull request! 🚀
- Let’s make it even better together! 👊

## 🙌 Thanks

Big thanks to the [Expo](https://expo.dev), [Convex](https://convex.dev), and [Clerk ](https://clerk.com/) teams for their amazing tools! 🙏 Also, a shoutout to you for checking this out—hope you enjoy **expo-social-lite** as much as I enjoyed building it! 😄
