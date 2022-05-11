# Development

This integration focuses on [Automox](https://www.automox.com/) and is using
[Automox API](https://https://developer.automox.com/) for interacting with the
Automox resources.

## Provider account setup

1. Sign-up for a Automox account
2. Take note of the provided domain
3. In the kebab menu on the console, go to Keys.
4. Add an API key

## Authentication

Provide the `API_KEY` and the company `ACCOUNT_NAME` and `ACCOUNT_ID` (Can be
seen in Keys in the kebab menu on the console) to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The API Key will be used to authorize requests using Bearer Authorization.
