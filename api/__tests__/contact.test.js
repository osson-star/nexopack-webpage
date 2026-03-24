'use strict';

// Mock resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'test-id' })
      }
    }))
  };
});

// Mock global fetch for Telegram
global.fetch = jest.fn().mockResolvedValue({ ok: true });

const handler = require('../contact');

function makeReqRes(body, method = 'POST') {
  const req = { method, body };
  const res = {
    _status: 200,
    _json: null,
    status(code) { this._status = code; return this; },
    json(data)   { this._json = data; return this; }
  };
  return { req, res };
}

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { Resend } = require('resend');
    Resend.mockImplementation(() => ({
      emails: { send: jest.fn().mockResolvedValue({ id: 'test-id' }) }
    }));
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  test('returns 405 for non-POST requests', async () => {
    const { req, res } = makeReqRes({}, 'GET');
    await handler(req, res);
    expect(res._status).toBe(405);
  });

  test('returns 400 if name is missing', async () => {
    const { req, res } = makeReqRes({ company: 'Acme', email: 'a@b.com', message: 'Hi' });
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 400 if email is invalid', async () => {
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'not-an-email', message: 'Hi' });
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 200 and calls Resend on valid input', async () => {
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'jane@acme.com', message: 'Hello' });
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._json).toEqual({ ok: true });
  });

  test('returns 500 if Resend throws', async () => {
    const { Resend } = require('resend');
    Resend.mockImplementation(() => ({
      emails: { send: jest.fn().mockRejectedValue(new Error('Resend down')) }
    }));
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'jane@acme.com', message: 'Hello' });
    await handler(req, res);
    expect(res._status).toBe(500);
  });

  test('returns 200 even if Telegram fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Telegram down'));
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'jane@acme.com', message: 'Hello' });
    await handler(req, res);
    expect(res._status).toBe(200);
  });
});
