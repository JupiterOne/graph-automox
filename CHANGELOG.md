# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
