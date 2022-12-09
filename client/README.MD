```
npm i
npm run postinstall
```

```
npm run start
npm run android
```

// fix color-picker: edit line 34 at 'client/node_modules/react-native-color-panel/android/build.gradle' to 
` implementation 'com.facebook.react:react-native:+' `
// fix duplicate resources: Delete by automatic hands

```
cd android
./gradlew clean 
rm -rf /app/src/main/res/raw

```