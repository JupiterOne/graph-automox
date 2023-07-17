# v2.0.0 (Mon Jul 17 2023)

#### 💥 Breaking Change

- Upgrade project to latest patterns [#20](https://github.com/JupiterOne/graph-automox/pull/20) ([@austinkelleher](https://github.com/austinkelleher))

#### 🐛 Bug Fix

- Fix automox device make [#21](https://github.com/JupiterOne/graph-automox/pull/21) ([@xdumaine](https://github.com/xdumaine))
- DEVICE-23 - Add new properties to `automox_device` [#19](https://github.com/JupiterOne/graph-automox/pull/19) ([@austinkelleher](https://github.com/austinkelleher))
- INT-7660: ingest new device fields [#17](https://github.com/JupiterOne/graph-automox/pull/17) ([@gastonyelmini](https://github.com/gastonyelmini))
- J1 FileManagement Automation v1.2.1 [#10](https://github.com/JupiterOne/graph-automox/pull/10) (security@jupiterone.com [@j1-github-org-repo-standard[bot]](https://github.com/j1-github-org-repo-standard[bot]))
- J1 FileManagement Automation v1.2.2 [#14](https://github.com/JupiterOne/graph-automox/pull/14) (security@jupiterone.com [@j1-github-org-repo-standard[bot]](https://github.com/j1-github-org-repo-standard[bot]))
- v1.1.0 [#16](https://github.com/JupiterOne/graph-automox/pull/16) ([@austinkelleher](https://github.com/austinkelleher))
- INT-7036 - Add properties to `automox_device` [#15](https://github.com/JupiterOne/graph-automox/pull/15) ([@austinkelleher](https://github.com/austinkelleher))
- Ran Prettier [#13](https://github.com/JupiterOne/graph-automox/pull/13) ([@janettelynch](https://github.com/janettelynch) [@austinkelleher](https://github.com/austinkelleher))
- Updated nav instructions [#12](https://github.com/JupiterOne/graph-automox/pull/12) ([@janettelynch](https://github.com/janettelynch))
- Merging CodeQL [#9](https://github.com/JupiterOne/graph-automox/pull/9) ([@VDubber](https://github.com/VDubber))
- Added Security Files [#9](https://github.com/JupiterOne/graph-automox/pull/9) (security@jupiterone.com)
- Change title [#7](https://github.com/JupiterOne/graph-automox/pull/7) ([@janettelynch](https://github.com/janettelynch))
- Fix bug [#8](https://github.com/JupiterOne/graph-automox/pull/8) ([@janettelynch](https://github.com/janettelynch))
- Version 1.0.0 [#6](https://github.com/JupiterOne/graph-automox/pull/6) ([@eXtremeX](https://github.com/eXtremeX))
- Add initial integration [#5](https://github.com/JupiterOne/graph-automox/pull/5) ([@eXtremeX](https://github.com/eXtremeX))

#### ⚠️ Pushed to `main`

- Initial commit ([@eXtremeX](https://github.com/eXtremeX))

#### 🔩 Dependency Updates

- Bump url-parse from 1.5.7 to 1.5.10 [#3](https://github.com/JupiterOne/graph-automox/pull/3) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump minimist from 1.2.5 to 1.2.6 [#2](https://github.com/JupiterOne/graph-automox/pull/2) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump moment from 2.29.1 to 2.29.3 [#1](https://github.com/JupiterOne/graph-automox/pull/1) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 9

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@j1-github-org-repo-standard[bot]](https://github.com/j1-github-org-repo-standard[bot])
- Austin Kelleher ([@austinkelleher](https://github.com/austinkelleher))
- Gaston Yelmini ([@gastonyelmini](https://github.com/gastonyelmini))
- J1 Security (security@jupiterone.com)
- Janette Lynch ([@janettelynch](https://github.com/janettelynch))
- Samuel Poulton ([@VDubber](https://github.com/VDubber))
- Stefan Virag ([@eXtremeX](https://github.com/eXtremeX))
- Xander Dumaine ([@xdumaine](https://github.com/xdumaine))

---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.2.1 - 2023-7-14

- `automox_device` entities have corrected `make` property.

## 1.2.0 - 2023-05-16

### Added

- `automox_device` entities now have the following new properties:

  | Property       | Type       |
  | -------------- | ---------- |
  | `displayName`  | `string`   |
  | `serialNumber` | `string`   |
  | `macAddress`   | `string[]` |
  | `lastSeenOn`   | `number`   |

## 1.1.0 - 2023-02-02

### Added

- `automox_device` entities now have the following new properties:

  | Property           | Type     |
  | ------------------ | -------- |
  | `updatedOn`        | `number` |
  | `lastProcessedOn`  | `number` |
  | `lastRefreshedOn`  | `number` |
  | `lastScanFailedOn` | `number` |

## 1.0.0 - 2022-05-11

### Added

- Ingest new entities
  - `automox_account`
  - `automox_device`
  - `automox_device_group`
  - `automox_user`
- Build new relationships
  - `automox_account_has_automox_device`
  - `automox_account_has_automox_device_group`
  - `automox_account_has_automox_user`
  - `automox_device_group_has_automox_device`
