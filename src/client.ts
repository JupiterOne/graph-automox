import fetch, { Response } from 'node-fetch';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { retry } from '@lifeomic/attempt';

import { IntegrationConfig } from './config';
import { AutomoxDevice, AutomoxGroup, AutomoxUser } from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private baseUri = `https://console.automox.com/api/`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;
  private perPage = 500;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async getRequest(endpoint: string, method: 'GET'): Promise<Response> {
    try {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      };

      const response = await retry(
        async () => {
          const res: Response = await fetch(endpoint, options);
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          factor: 2,
          maxAttempts: 5,
          minDelay: 100,
          maxDelay: 500,
          jitter: true,
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
    } while (next.length);
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
