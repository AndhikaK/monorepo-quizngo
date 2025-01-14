# Dev notes

## Build APK with eas

```bash
nx build mobile --profile development --platform android
```

It will change package.json inside the apps/mobile, make sure you revert it back after the build success

## Installing packages

```bash
nx install mobile @package-name
```
