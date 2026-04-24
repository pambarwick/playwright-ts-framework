import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test.describe('GET', () => {
    test('GET /posts returns a list of posts', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/posts`);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });

    test('GET /posts/:id returns a single post', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/posts/1`);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('id', 1);
      expect(body).toHaveProperty('title');
      expect(body).toHaveProperty('body');
      expect(body).toHaveProperty('userId');
    });

    test('GET /posts/:id returns 404 for non-existent post', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/posts/999`);
      expect(response.status()).toBe(404);
    });

    test('GET /posts?userId=1 filters posts by user', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/posts?userId=1`);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      body.forEach((post: { userId: number }) => {
        expect(post.userId).toBe(1);
      });
    });
  });

  test.describe('POST / PUT / DELETE', () => {
    test('POST /posts creates a new post', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/posts`, {
        data: {
          title: 'QA Engineer Test Post',
          body: 'Created by automated test',
          userId: 1,
        },
      });
      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body.title).toBe('QA Engineer Test Post');
      expect(body.userId).toBe(1);
    });

    test('PUT /posts/:id updates an existing post', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/posts/1`, {
        data: {
          id: 1,
          title: 'Updated Title',
          body: 'Updated body content',
          userId: 1,
        },
      });
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.title).toBe('Updated Title');
      expect(body.body).toBe('Updated body content');
      expect(body.userId).toBe(1);
    });

    test('DELETE /posts/:id deletes a post', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/posts/1`);
      expect(response.status()).toBe(200);
    });
  });
});
