import fetch, { Response } from 'node-fetch';

import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import { AutomoxDevice, AutomoxGroup, AutomoxUser } from './types';

import { retry } from '@lifeomic/attempt';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private baseUri = `https://console.automox.com/api/`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;
  private perPage = 500;

  private async getRequest(endpoint: string, method: 'GET'): Promise<Response> {
    try {
      const maxAttempts = 5;
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        timeout: 15000,
        redirect: 'error',
      };

      const response = await retry(
        async () => {
          try {
            const fetch_response = await fetch(endpoint, options);
            return fetch_response;
          } catch (error) {}
        },
        {
          timeout: 10000,
          async handleTimeout() {
            var curr_attempts = 1;
            do {
              const fetch_response = await fetch(endpoint, options);
              curr_attempts++;
              return fetch_response;
            } while (curr_attempts < maxAttempts);
          },
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            ) {
              context.abort();
            }
          },
        },
      );

      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri(`orgs?limit=${this.perPage}`);
    try {
      await this.getRequest(`${uri}&page=0`, 'GET');
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async paginatedRequest<T>(
    uri: string,
    method: 'GET',
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    //let next = null;
    let page = 0;
    let next = [];
    do {
      const response = await this.getRequest(`${uri}&page=${page}`, method);
      if (!response.length) {
        break;
      }
      for (const item of response) {
        await iteratee(item);
      }
      next = response;
      page++;
    } while (true);
  }

  public async iterateDevices(
    iteratee: ResourceIteratee<AutomoxDevice>,
  ): Promise<void> {
    await this.paginatedRequest<AutomoxDevice>(
      this.withBaseUri(`servers/?limit=${this.perPage}`),
      'GET',
      iteratee,
    );
  }

  public async iterateGroups(
    iteratee: ResourceIteratee<AutomoxGroup>,
  ): Promise<void> {
    await this.paginatedRequest<AutomoxGroup>(
      this.withBaseUri(`servergroups/?limit=${this.perPage}`),
      'GET',
      iteratee,
    );
  }

  public async iterateUsers(
    iteratee: ResourceIteratee<AutomoxUser>,
  ): Promise<void> {
    await this.paginatedRequest<AutomoxUser>(
      this.withBaseUri(`users/?limit=${this.perPage}`),
      'GET',
      iteratee,
    );
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
