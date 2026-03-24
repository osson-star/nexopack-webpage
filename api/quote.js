'use strict';

const { Resend } = require('resend');
const ExcelJS = require('exceljs');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitiseFilename(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 30)
    || 'Client';
}

async function generateQuoteExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Quotation');

  sheet.columns = [
    { width: 22 },
    { width: 30 },
    { width: 15 },
    { width: 15 },
    { width: 15 }
  ];

  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  const quoteRef = `NXP-${dateStr.replace(/-/g, '')}-${Date.now()}`;

  // Header
  const titleCell = sheet.getCell('A1');
  titleCell.value = 'Nexopack';
  titleCell.font = { bold: true, size: 18 };

  sheet.getCell('A2').value = 'info@nexopack.io';
  sheet.getCell('A2').font = { size: 11, color: { argb: 'FF888888' } };

  sheet.getCell('A3').value = 'Quote Reference:';
  sheet.getCell('B3').value = quoteRef;

  sheet.getCell('A4').value = 'Date:';
  sheet.getCell('B4').value = dateStr;

  // Customer block
  sheet.getCell('A6').value = 'Name:';        sheet.getCell('B6').value = data.name;
  sheet.getCell('A7').value = 'Company:';     sheet.getCell('B7').value = data.company;
  sheet.getCell('A8').value = 'Email:';       sheet.getCell('B8').value = data.email;

  // Order details
  sheet.getCell('A10').value = 'Product Category:';  sheet.getCell('B10').value = data.productCategory;
  sheet.getCell('A11').value = 'Material:';          sheet.getCell('B11').value = data.material;
  sheet.getCell('A12').value = 'Est. Quantity:';     sheet.getCell('B12').value = data.quantity;
  sheet.getCell('A13').value = 'Delivery Location:'; sheet.getCell('B13').value = data.deliveryLocation;
  sheet.getCell('A14').value = 'Custom Printing:';   sheet.getCell('B14').value = data.customPrinting;

  // Quotation table headers
  const headers = ['Item', 'Description', 'Unit Price', 'Quantity', 'Total'];
  headers.forEach(function(header, i) {
    var cell = sheet.getCell(16, i + 1);
    cell.value = header;
    cell.font = { bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E4DC' } };
  });

  // 5 blank quote rows (17–21) — empty cells already blank, no action needed

  // Totals
  sheet.getCell('D23').value = 'Subtotal:';
  sheet.getCell('D24').value = 'Shipping:';
  const totalCell = sheet.getCell('D25');
  totalCell.value = 'Total:';
  totalCell.font = { bold: true };

  // Notes
  sheet.getCell('A27').value = 'Notes:';
  sheet.mergeCells('B27:E27');

  // Disclaimer
  const disclaimer = sheet.getCell('A29');
  disclaimer.value = 'This quotation is valid for 30 days.';
  disclaimer.font = { italic: true, color: { argb: 'FF888888' } };

  return workbook.xlsx.writeBuffer();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    productCategory, material, quantity, deliveryLocation,
    customPrinting, name, company, email
  } = req.body || {};

  if (
    !productCategory || !material || !quantity || !deliveryLocation ||
    !customPrinting || !name || !company || !EMAIL_REGEX.test(email)
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Generate Excel
  let excelBuffer;
  try {
    excelBuffer = await generateQuoteExcel({ productCategory, material, quantity, deliveryLocation, customPrinting, name, company, email });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate quote' });
  }

  // Send email with attachment (primary)
  const resend = new Resend(process.env.RESEND_API_KEY);
  const today = new Date().toISOString().slice(0, 10);
  const filename = `Nexopack-Quote-${sanitiseFilename(company)}-${today}.xlsx`;

  try {
    await resend.emails.send({
      from: 'Nexopack <noreply@nexopack.io>',
      to: 'info@nexopack.io',
      subject: `New Quote Request from ${name} (${company})`,
      text: `New quote request received. See attached Excel file.\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nProduct: ${productCategory}\nMaterial: ${material}\nQuantity: ${quantity}\nLocation: ${deliveryLocation}\nCustom Printing: ${customPrinting}`,
      attachments: [
        {
          filename: filename,
          content: excelBuffer
        }
      ]
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  // Telegram (best-effort)
  try {
    const text = [
      '\uD83D\uDCCB New Quote Request \u2014 Nexopack',
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      '',
      `Product: ${productCategory}`,
      `Material: ${material}`,
      `Quantity: ${quantity}`,
      `Location: ${deliveryLocation}`,
      `Custom Printing: ${customPrinting}`,
      '',
      '\uD83D\uDCCE Quote sheet attached.'
    ].join('\n');

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
      }
    );

    // Send the Excel as a Telegram document
    const FormData = require('form-data');
    const form = new FormData();
    form.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    form.append('document', Buffer.from(excelBuffer), { filename: filename });

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      { method: 'POST', body: form, headers: form.getHeaders() }
    );
  } catch (_) {
    // Non-fatal
  }

  return res.status(200).json({ ok: true });
};
