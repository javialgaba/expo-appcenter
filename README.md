# expo-appcenter

Expo plugin for react native appcenter SDK

Note: [This is a fork of BelkaLab's `expo-appcenter`](https://github.com/BelkaLab/expo-appcenter). The difference is that with this fork, you provide the secrets through the plugin config, while in the original repo you provide it by creating files with the secrets. Aside from that, this fork will continue to be updated as required.

# API documentation

- [Documentation for the master branch](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/sdk/appcenter.md)
- [Documentation for the latest stable release](https://docs.expo.io/versions/latest/sdk/appcenter/)

# Installation in managed Expo projects

For managed [managed](https://docs.expo.io/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `react-native-unimodules` package](https://github.com/expo/expo/tree/master/packages/react-native-unimodules) before continuing.

### Add the package to your npm dependencies

#### Prerequisites:

- App project using Expo SDK 49+.
- Installed `expo-cli@4.4.4` or later.
- Installed `appcenter` JavaScript libraries:

```sh
yarn add appcenter appcenter-analytics appcenter-crashes
```

#### With `expo install`

```
expo install expo-appcenter
```

#### Without `expo install`

```sh
# using yarn
yarn add @armster/expo-appcenter

# using npm
npm install @armster/expo-appcenter
```

Open your `app.json` and update your `plugins` section (`expo install` would do it for you):

```json
{
  "plugins": [
    [
      "@armster/expo-appcenter",
      {
        "iosAppSecret": "<ios_app_secret>",
        "androidAppSecret": "<android_app_secret>"
      }
    ]
  ]
}
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
