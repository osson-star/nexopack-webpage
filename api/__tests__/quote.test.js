'use strict';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'test-id' }) }
  }))
}));

jest.mock('exceljs', () => {
  const mockWriteBuffer = jest.fn().mockResolvedValue(Buffer.from('fake-excel'));
  const mockWorksheet = {
    columns: [],
    getCell: jest.fn().mockReturnValue({ value: null, font: {}, fill: {}, alignment: {} }),
    mergeCells: jest.fn()
  };
  return {
    Workbook: jest.fn().mockImplementation(() => ({
      addWorksheet: jest.fn().mockReturnValue(mockWorksheet),
      xlsx: { writeBuffer: mockWriteBuffer }
    }))
  };
});

global.fetch = jest.fn().mockResolvedValue({ ok: true });

const handler = require('../quote');

function validBody() {
  return {
    productCategory: 'Cups',
    material: 'Paper',
    quantity: '1,000\u20135,000',
    deliveryLocation: 'Local (Hong Kong)',
    customPrinting: 'Yes',
    name: 'Jane',
    company: 'Cafe Bloom',
    email: 'jane@cafebloom.com'
  };
}

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

describe('/api/quote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { Resend } = require('resend');
    Resend.mockImplementation(() => ({
      emails: { send: jest.fn().mockResolvedValue({ id: 'test-id' }) }
    }));
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  test('returns 405 for non-POST', async () => {
    const { req, res } = makeReqRes(validBody(), 'GET');
    await handler(req, res);
    expect(res._status).toBe(405);
  });

  test('returns 400 if a required field is missing', async () => {
    const body = validBody();
    delete body.productCategory;
    const { req, res } = makeReqRes(body);
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 400 if email is invalid', async () => {
    const { req, res } = makeReqRes({ ...validBody(), email: 'not-valid' });
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 200 with valid input', async () => {
    const { req, res } = makeReqRes(validBody());
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._json).toEqual({ ok: true });
  });

  test('returns 500 if Resend fails', async () => {
    const { Resend } = require('resend');
    Resend.mockImplementation(() => ({
      emails: { send: jest.fn().mockRejectedValue(new Error('fail')) }
    }));
    const { req, res } = makeReqRes(validBody());
    await handler(req, res);
    expect(res._status).toBe(500);
  });

  test('returns 200 even if Telegram fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Telegram down'));
    const { req, res } = makeReqRes(validBody());
    await handler(req, res);
    expect(res._status).toBe(200);
  });
});
