## [1.1.0](https://github.com/fivaz/fit-tracker/compare/v1.0.2...v1.1.0) (2026-01-02)

### ✨ Features

* show errors in ExerciseForm before submitting the form ([00cb207](https://github.com/fivaz/fit-tracker/commit/00cb20790f48090418fe19901d50ead4fd5d1733))
* update image optimistically in exercises page ([2dd8de4](https://github.com/fivaz/fit-tracker/commit/2dd8de434d0c8b58aded9945e3e6d7413511be59))

### 🐛 Bug Fixes

* hydration mismatch on timer ([59f20c2](https://github.com/fivaz/fit-tracker/commit/59f20c217418a9d9e75becaf91562e27573735c5))
* program-form was waiting db to respond before closing ([a4e6ebf](https://github.com/fivaz/fit-tracker/commit/a4e6ebfd08a00ae46aae9c6ce62098bd268066f7))
* race condition in sets optimist updates ([67a929e](https://github.com/fivaz/fit-tracker/commit/67a929e37977cad8ebaa04c2692925207c3fc4b2))
* remove deleted exercises from workout ([ce2f0e6](https://github.com/fivaz/fit-tracker/commit/ce2f0e6e4c152591b0a30bdaf38b0b717807754d))

### 💄 Style

* change position of notifications on the screen ([9ff2a61](https://github.com/fivaz/fit-tracker/commit/9ff2a61dcc5f107bc3782a02f8b89f9a596f958f))
* use custom confirm dialog in Workout exercise ([9850838](https://github.com/fivaz/fit-tracker/commit/98508382dfa6942023bbda73c02a4946cc708e17))

### ♻️ Refactoring

* disable sentry from dev in more places ([a6280cd](https://github.com/fivaz/fit-tracker/commit/a6280cd8268aa55278c6d7c1a92499ad29cb1529))
* organize different types of Exercise to avoid type conversions ([968aef2](https://github.com/fivaz/fit-tracker/commit/968aef286b38386b91c16982b2da9895c56baa21))
* refactor use of useOptimistic hook with context and a special hook ([50bb6a0](https://github.com/fivaz/fit-tracker/commit/50bb6a0f761fb03f6d89b9a1f1894d32fa32af11))
* remove default values on forms ([61dfbae](https://github.com/fivaz/fit-tracker/commit/61dfbae091c79b283c3e602177f4d4a8f4c0455c))
* remove multiple exports from the same file ([9457fb4](https://github.com/fivaz/fit-tracker/commit/9457fb4c0b419b641868abba1c05dea59e1dd948))
* restructure files ([e529df4](https://github.com/fivaz/fit-tracker/commit/e529df45a62664f41ac01739f281f4e94db8fe1b))
* separate types from the ones from the DB, and the ones from the UI ([3741715](https://github.com/fivaz/fit-tracker/commit/3741715a1775bde527c2d79d8c1256373ef9b0ef))
* use a generic optimistic context for products ([8a91a0e](https://github.com/fivaz/fit-tracker/commit/8a91a0eb763bcd65737a039b548dd98b6b35ae78))
* use useConfirm hook in program row ([9f74a6a](https://github.com/fivaz/fit-tracker/commit/9f74a6a329c7637e1817a8c6033c388572c15c65))

### ⚡ Performance

* add optimistic CRUD for programs ([cddb4d8](https://github.com/fivaz/fit-tracker/commit/cddb4d80faef219d7ed2899d24840dc2db661280))
* increase exercises page performance ([84ff89f](https://github.com/fivaz/fit-tracker/commit/84ff89f69b46e3aae06c0ec7f0ba2090465a7c83))
* increase programs page performance ([ec3d5c4](https://github.com/fivaz/fit-tracker/commit/ec3d5c47990b3f83886a3644d65abce2ce741368))
* stop fetching fields not used in programs page ([504e1d6](https://github.com/fivaz/fit-tracker/commit/504e1d65781991a93bbdffbdee134b6bc5783422))
* use optimistic updates and suspense in exercise page to improve performance ([c990997](https://github.com/fivaz/fit-tracker/commit/c990997aad17ce175c0a026264fb0959f5a420d4))
* use optimistic updates in programs/id page ([6b8ad18](https://github.com/fivaz/fit-tracker/commit/6b8ad18154e6225914cdadeaa1a3e909a061aa1f))
* use optimistic updates in workout page ([c32a1b2](https://github.com/fivaz/fit-tracker/commit/c32a1b20f80351a4864d87246a118591d146a435))

### 🧹 Chores

* add a custom logger that reform to sentry on production only ([cb0fea9](https://github.com/fivaz/fit-tracker/commit/cb0fea90f3d6fd6bc23683458e71d9f6add741fe))
* add sentry ([cbbd8bb](https://github.com/fivaz/fit-tracker/commit/cbbd8bb82c75d4bb3ede14b69ccac8be46b3077e))
* make use-optimistic-list lost lists based on a parameter ([e7a9ccb](https://github.com/fivaz/fit-tracker/commit/e7a9ccb4a15e499a2960b24af88d026ea2ce0348))

## [1.0.2](https://github.com/fivaz/fit-tracker/compare/v1.0.1...v1.0.2) (2026-01-02)

### 🐛 Bug Fixes

* disable husky during github actions ([95b1d79](https://github.com/fivaz/fit-tracker/commit/95b1d79225634a47ec9be5c44bb05bbaf0173736))

## [1.0.1](https://github.com/fivaz/fit-tracker/compare/v1.0.0...v1.0.1) (2026-01-02)

### 🐛 Bug Fixes

* fix error with release requiring package-lock instead of pnpm-lock.yaml ([03723a5](https://github.com/fivaz/fit-tracker/commit/03723a5fa97b0c4419568ec481e09b084859c86c))

## 1.0.0 (2026-01-02)

### ✨ Features

* ✨️ add the current version to settings page ([60325f6](https://github.com/fivaz/fit-tracker/commit/60325f6520308d18137e218477c80e206f1c2994))
* ✨️ make start workout button disabled while no exercise was added to the program ([73a93d1](https://github.com/fivaz/fit-tracker/commit/73a93d13c76161af11f4cb3fdb2d2626c402a4bb))

### 🐛 Bug Fixes

* 🐛️ fix progress link in home ([45bc6a1](https://github.com/fivaz/fit-tracker/commit/45bc6a15fd6602388e95d04cab8ff5ffad4edd9a))

### 💄 Style

* 💄 align nav ([8497a66](https://github.com/fivaz/fit-tracker/commit/8497a669ccf4d586e20a3289842c8d1484dd24e9))
* 💄 change icon of programs and exercises ([9bac20c](https://github.com/fivaz/fit-tracker/commit/9bac20c83b29fbbdf3db75ee2403d810b59a4de3))
* 💄 make the button edit as white not orange ([2ae52dd](https://github.com/fivaz/fit-tracker/commit/2ae52dd8ff4fb22164f46e77742f0b37567a582f))
* 💄 show a customized confirm dialog when user ends workout ([6a50fe6](https://github.com/fivaz/fit-tracker/commit/6a50fe6c7f1928cf0ee19d9ad0e61ea2cb66e4f7))
* 💄 use a pretty select in progress ([d5e4276](https://github.com/fivaz/fit-tracker/commit/d5e4276f15a05784295afea426f6084ffc42d26f))

### ♻️ Refactoring

* ♻️ refactor settings view ([f324ad9](https://github.com/fivaz/fit-tracker/commit/f324ad96eb44ce9a6f98998467380bfb949048a3))

### 🏗️ Build

* 🔧  change builder from withRspack to turborepo ([3bece31](https://github.com/fivaz/fit-tracker/commit/3bece314fd73281851f06c85179f047247d69bdd))

### 👷 CI

* 👷 add more emojis to semantic-release ([1778f46](https://github.com/fivaz/fit-tracker/commit/1778f46eb054fb72140d33e1a5a1262b76b24ced))
* 👷 add semantic-release configuration to automate releases ([9044c9f](https://github.com/fivaz/fit-tracker/commit/9044c9fefc97017ea5711e10b13a0cad61527fb3))

### 📝 Documentation

* 📝 rename app ([e2865df](https://github.com/fivaz/fit-tracker/commit/e2865df3baefa8e38b8b6b101c1a61ea9eb10b86))
