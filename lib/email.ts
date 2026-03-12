import nodemailer from 'nodemailer'
import { getSiteConfig } from './config'

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
  fromName?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const config = await getSiteConfig()
    const fromName = options.fromName || config.site.name
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mail.me.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: options.from || `"${fromName}" <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export function generateContactEmailHTML(data: any, siteTitle: string) {
  const currentDate = new Date().toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 40px 20px;
          }
          .email-wrapper {
            max-width: 640px;
            margin: 0 auto;
          }
          .container { 
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .header { 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: #fff; 
            padding: 48px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.5;
          }
          .header-content {
            position: relative;
            z-index: 1;
          }
          .logo {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 16px;
            backdrop-filter: blur(10px);
          }
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header p {
            font-size: 14px;
            opacity: 0.8;
            font-weight: 500;
          }
          .content { 
            padding: 40px 32px;
          }
          .alert-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 4px solid #0284c7;
            padding: 20px;
            margin-bottom: 32px;
            border-radius: 8px;
            display: flex;
            align-items: start;
            gap: 12px;
          }
          .alert-icon {
            width: 24px;
            height: 24px;
            background: #0284c7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            flex-shrink: 0;
          }
          .alert-content {
            flex: 1;
          }
          .alert-content strong {
            color: #075985;
            font-weight: 600;
            display: block;
            margin-bottom: 4px;
          }
          .alert-content p {
            font-size: 13px;
            color: #0c4a6e;
            line-height: 1.5;
          }
          .field { 
            margin-bottom: 24px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
          }
          .field:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .label { 
            font-weight: 600;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .label-icon {
            font-size: 16px;
          }
          .value { 
            color: #0f172a;
            font-size: 16px;
            line-height: 1.6;
            font-weight: 500;
          }
          .value a {
            color: #0284c7;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }
          .value a:hover {
            color: #0369a1;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #fff;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .message-box {
            background: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-top: 8px;
          }
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer-brand {
            font-weight: 700;
            color: #0f172a;
            font-size: 16px;
            margin-bottom: 12px;
          }
          .footer-text {
            font-size: 13px;
            color: #64748b;
            line-height: 1.6;
          }
          .footer-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #0f172a 0%, #64748b 100%);
            margin: 16px auto;
            border-radius: 2px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          @media only screen and (max-width: 600px) {
            body { padding: 20px 10px; }
            .header { padding: 32px 20px; }
            .content { padding: 24px 20px; }
            .footer { padding: 24px 20px; }
            .header h1 { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <div class="header-content">
                <div class="logo">📧</div>
                <h1>Yeni İletişim Formu</h1>
                <p>${currentDate}</p>
              </div>
            </div>
            
            <div class="content">
              <div class="alert-box">
                <div class="alert-icon">ℹ️</div>
                <div class="alert-content">
                  <strong>Form Bildirimi</strong>
                  <p>Web sitesi iletişim formundan yeni bir mesaj alındınız. Aşağıda müşteri bilgilerini bulabilirsiniz.</p>
                </div>
              </div>

              <div class="field">
                <div class="label">
                  <span class="label-icon">👤</span>
                  <span>Ad Soyad</span>
                </div>
                <div class="value">${data.name}</div>
              </div>

              ${data.company ? `
              <div class="field">
                <div class="label">
                  <span class="label-icon">🏢</span>
                  <span>Firma</span>
                </div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">
                  <span class="label-icon">📧</span>
                  <span>E-posta Adresi</span>
                </div>
                <div class="value">
                  <a href="mailto:${data.email}">${data.email}</a>
                </div>
              </div>

              <div class="field">
                <div class="label">
                  <span class="label-icon">📱</span>
                  <span>Telefon Numarası</span>
                </div>
                <div class="value">
                  <a href="tel:${data.phone}">${data.phone}</a>
                </div>
              </div>

              ${data.service ? `
              <div class="field">
                <div class="label">
                  <span class="label-icon">🎯</span>
                  <span>Talep Edilen Hizmet</span>
                </div>
                <div class="value">
                  ${data.service}
                  <div><span class="badge">${data.service}</span></div>
                </div>
              </div>
              ` : ''}

              ${data.budget ? `
              <div class="field">
                <div class="label">
                  <span class="label-icon">💰</span>
                  <span>Bütçe Aralığı</span>
                </div>
                <div class="value">${data.budget}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">
                  <span class="label-icon">💬</span>
                  <span>Mesaj İçeriği</span>
                </div>
                <div class="message-box">
                  <div class="value" style="white-space: pre-wrap;">${data.message}</div>
                </div>
              </div>

              <div style="text-align: center; margin-top: 32px;">
                <a href="mailto:${data.email}" class="cta-button">
                  ✉️ Hemen Yanıtla
                </a>
              </div>
            </div>

            <div class="footer">
              <div class="footer-brand">${siteTitle}</div>
              <div class="footer-divider"></div>
              <p class="footer-text">
                Bu e-posta, web sitenizin iletişim formundan otomatik olarak gönderilmiştir.<br>
                Müşterinize en kısa sürede dönüş yapmanız önerilir.
              </p>
              <p class="footer-text" style="margin-top: 12px; font-size: 12px;">
                © ${new Date().getFullYear()} ${siteTitle}. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateQuoteEmailHTML(data: any, siteTitle: string) {
  const currentDate = new Date().toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const projectTypeLabels: Record<string, string> = {
    'landing': 'Landing Page',
    'corporate': 'Kurumsal Site',
    'ecommerce': 'E-Ticaret',
    'custom': 'Özel Proje'
  }

  const budgetLabels: Record<string, string> = {
    '10k-20k': '10.000₺ - 20.000₺',
    '20k-40k': '20.000₺ - 40.000₺',
    '40k-60k': '40.000₺ - 60.000₺',
    '60k+': '60.000₺+'
  }

  const deadlineLabels: Record<string, string> = {
    '1-month': '1 Ay',
    '2-months': '2 Ay',
    '3-months': '3 Ay',
    'flexible': 'Esnek'
  }

  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 40px 20px;
          }
          .email-wrapper {
            max-width: 640px;
            margin: 0 auto;
          }
          .container { 
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .header { 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: #fff; 
            padding: 48px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.5;
          }
          .header-content {
            position: relative;
            z-index: 1;
          }
          .logo {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 16px;
            backdrop-filter: blur(10px);
          }
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header p {
            font-size: 14px;
            opacity: 0.8;
            font-weight: 500;
          }
          .content { 
            padding: 40px 32px;
          }
          .alert-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
            padding: 20px;
            margin-bottom: 32px;
            border-radius: 8px;
            display: flex;
            align-items: start;
            gap: 12px;
          }
          .alert-icon {
            width: 24px;
            height: 24px;
            background: #f59e0b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            flex-shrink: 0;
          }
          .alert-content {
            flex: 1;
          }
          .alert-content strong {
            color: #92400e;
            font-weight: 600;
            display: block;
            margin-bottom: 4px;
          }
          .alert-content p {
            font-size: 13px;
            color: #78350f;
            line-height: 1.5;
          }
          .field { 
            margin-bottom: 24px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
          }
          .field:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .label { 
            font-weight: 600;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .label-icon {
            font-size: 16px;
          }
          .value { 
            color: #0f172a;
            font-size: 16px;
            line-height: 1.6;
            font-weight: 500;
          }
          .value a {
            color: #0284c7;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }
          .value a:hover {
            color: #0369a1;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #fff;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .message-box {
            background: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-top: 8px;
          }
          .project-summary {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            border: 2px solid #0284c7;
          }
          .project-summary h3 {
            color: #0c4a6e;
            font-size: 18px;
            margin-bottom: 16px;
            font-weight: 700;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .summary-item {
            background: white;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #bae6fd;
          }
          .summary-item-label {
            font-size: 11px;
            color: #0369a1;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .summary-item-value {
            font-size: 14px;
            color: #0c4a6e;
            font-weight: 600;
          }
          .footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer-brand {
            font-weight: 700;
            color: #0f172a;
            font-size: 16px;
            margin-bottom: 12px;
          }
          .footer-text {
            font-size: 13px;
            color: #64748b;
            line-height: 1.6;
          }
          .footer-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #0f172a 0%, #64748b 100%);
            margin: 16px auto;
            border-radius: 2px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          @media only screen and (max-width: 600px) {
            body { padding: 20px 10px; }
            .header { padding: 32px 20px; }
            .content { padding: 24px 20px; }
            .footer { padding: 24px 20px; }
            .header h1 { font-size: 24px; }
            .summary-grid { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <div class="header-content">
                <div class="logo">💼</div>
                <h1>Yeni Teklif Talebi</h1>
                <p>${currentDate}</p>
              </div>
            </div>
            
            <div class="content">
              <div class="alert-box">
                <div class="alert-icon">⚡</div>
                <div class="alert-content">
                  <strong>Teklif Talebi Bildirimi</strong>
                  <p>Web sitesi teklif formundan yeni bir talep alındınız. Müşteri detaylı bilgi sağlamıştır.</p>
                </div>
              </div>

              <div class="project-summary">
                <h3>📋 Proje Özeti</h3>
                <div class="summary-grid">
                  <div class="summary-item">
                    <div class="summary-item-label">Proje Tipi</div>
                    <div class="summary-item-value">${projectTypeLabels[data.projectType] || data.projectType}</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-item-label">Bütçe Aralığı</div>
                    <div class="summary-item-value">${budgetLabels[data.budget] || data.budget}</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-item-label">Teslim Süresi</div>
                    <div class="summary-item-value">${deadlineLabels[data.deadline] || data.deadline}</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-item-label">Talep Tarihi</div>
                    <div class="summary-item-value">${currentDate.split(',')[0]}</div>
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="label">
                  <span class="label-icon">👤</span>
                  <span>Ad Soyad</span>
                </div>
                <div class="value">${data.name}</div>
              </div>

              ${data.company ? `
              <div class="field">
                <div class="label">
                  <span class="label-icon">🏢</span>
                  <span>Firma</span>
                </div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">
                  <span class="label-icon">📧</span>
                  <span>E-posta Adresi</span>
                </div>
                <div class="value">
                  <a href="mailto:${data.email}">${data.email}</a>
                </div>
              </div>

              <div class="field">
                <div class="label">
                  <span class="label-icon">📱</span>
                  <span>Telefon Numarası</span>
                </div>
                <div class="value">
                  <a href="tel:${data.phone}">${data.phone}</a>
                </div>
              </div>

              <div class="field">
                <div class="label">
                  <span class="label-icon">💬</span>
                  <span>Proje Açıklaması</span>
                </div>
                <div class="message-box">
                  <div class="value" style="white-space: pre-wrap;">${data.message}</div>
                </div>
              </div>

              <div style="text-align: center; margin-top: 32px;">
                <a href="mailto:${data.email}" class="cta-button">
                  ✉️ Hemen Yanıtla
                </a>
              </div>
            </div>

            <div class="footer">
              <div class="footer-brand">${siteTitle}</div>
              <div class="footer-divider"></div>
              <p class="footer-text">
                Bu e-posta, web sitenizin teklif formundan otomatik olarak gönderilmiştir.<br>
                Müşterinize en kısa sürede dönüş yapmanız önerilir.
              </p>
              <p class="footer-text" style="margin-top: 12px; font-size: 12px;">
                © ${new Date().getFullYear()} ${siteTitle}. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateTechServiceEmailHTML(data: any, siteTitle: string) {
  const currentDate = new Date().toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const deviceTypeLabels: Record<string, string> = {
    'laptop': 'Laptop / Dizüstü',
    'desktop': 'Masaüstü / PC',
    'macbook': 'MacBook / iMac',
    'printer': 'Yazıcı',
    'modem': 'Modem / Router',
    'switch': 'Switch / Ağ Cihazı',
    'nas': 'NAS / Yedekleme',
    'server': 'Sunucu / Server'
  }

  const issueTypeLabels: Record<string, string> = {
    'not-starting': 'Açılmıyor',
    'slow': 'Yavaş Çalışıyor',
    'overheating': 'Aşırı Isınma',
    'blue-screen': 'Mavi Ekran / Hata',
    'noise': 'Gürültü / Fan Sesi',
    'charging': 'Şarj Olmuyor',
    'screen': 'Ekran Sorunu',
    'data-recovery': 'Veri Kurtarma',
    'maintenance': 'Genel Bakım',
    'format': 'Format / Kurulum',
    'network': 'Ağ Sorunu',
    'other': 'Diğer'
  }

  const urgencyLabels: Record<string, string> = {
    'urgent': 'Acil (Aynı Gün)',
    'normal': 'Normal (2-3 Gün)',
    'flexible': 'Esnek (1 Hafta)'
  }

  const locationLabels: Record<string, string> = {
    'onsite': 'Yerinde Servis',
    'workshop': 'Servise Getireceğim',
    'remote': 'Uzaktan Destek'
  }

  const cityLabels: Record<string, string> = {
    'istanbul': 'İstanbul',
    'kocaeli': 'Kocaeli',
    'sakarya': 'Sakarya',
    'duzce': 'Düzce',
    'yalova': 'Yalova'
  }

  const urgencyColor = data.urgency === 'urgent' ? '#dc2626' : data.urgency === 'normal' ? '#f59e0b' : '#10b981'

  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #1f2937;
            background: #f9fafb;
            padding: 20px;
          }
          .container { 
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
            color: #fff; 
            padding: 32px 24px;
            text-align: center;
          }
          .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .header p {
            font-size: 13px;
            opacity: 0.9;
          }
          .content { 
            padding: 32px 24px;
          }
          .alert {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid ${urgencyColor};
            padding: 16px;
            margin-bottom: 24px;
            border-radius: 6px;
          }
          .alert strong {
            color: #92400e;
            font-size: 14px;
            display: block;
            margin-bottom: 4px;
          }
          .alert p {
            font-size: 13px;
            color: #78350f;
          }
          .summary {
            background: #f9fafb;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
          }
          .summary h3 {
            color: #111827;
            font-size: 16px;
            margin-bottom: 16px;
            font-weight: 600;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .summary-item {
            background: white;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
          }
          .summary-label {
            font-size: 11px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .summary-value {
            font-size: 14px;
            color: #111827;
            font-weight: 600;
          }
          .field { 
            margin-bottom: 20px;
            padding: 16px;
            background: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }
          .label { 
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .value { 
            color: #111827;
            font-size: 15px;
            font-weight: 500;
          }
          .value a {
            color: #2563eb;
            text-decoration: none;
          }
          .value a:hover {
            text-decoration: underline;
          }
          .message-box {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 16px;
            margin-top: 8px;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.6;
          }
          .footer {
            background: #f9fafb;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer-text {
            font-size: 13px;
            color: #6b7280;
            line-height: 1.5;
          }
          .cta-button {
            display: inline-block;
            background: #111827;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            margin-top: 16px;
          }
          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .header { padding: 24px 16px; }
            .content { padding: 24px 16px; }
            .footer { padding: 20px 16px; }
            .summary-grid { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔧 Yeni Teknik Servis Talebi</h1>
            <p>${currentDate}</p>
          </div>
          
          <div class="content">
            <div class="alert">
              <strong>Servis Talebi Bildirimi</strong>
              <p>Web sitesi teklif formundan yeni bir bilgisayar teknik servis talebi alındınız.</p>
            </div>

            <div class="summary">
              <h3>📋 Talep Özeti</h3>
              <div class="summary-grid">
                <div class="summary-item">
                  <div class="summary-label">Cihaz Tipi</div>
                  <div class="summary-value">${deviceTypeLabels[data.deviceType] || data.deviceType}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Arıza Türü</div>
                  <div class="summary-value">${issueTypeLabels[data.issueType] || data.issueType}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Aciliyet</div>
                  <div class="summary-value" style="color: ${urgencyColor};">${urgencyLabels[data.urgency] || data.urgency}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Servis Lokasyonu</div>
                  <div class="summary-value">${locationLabels[data.serviceLocation] || data.serviceLocation}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Şehir</div>
                  <div class="summary-value">${cityLabels[data.city] || data.city}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Talep Tarihi</div>
                  <div class="summary-value">${currentDate.split(',')[0]}</div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="label">👤 Ad Soyad</div>
              <div class="value">${data.name}</div>
            </div>

            <div class="field">
              <div class="label">📧 E-posta Adresi</div>
              <div class="value">
                <a href="mailto:${data.email}">${data.email}</a>
              </div>
            </div>

            <div class="field">
              <div class="label">📱 Telefon Numarası</div>
              <div class="value">
                <a href="tel:${data.phone}">${data.phone}</a>
              </div>
            </div>

            ${data.message ? `
            <div class="field">
              <div class="label">💬 Ek Açıklama</div>
              <div class="message-box">${data.message}</div>
            </div>
            ` : ''}

            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${data.email}" class="cta-button">
                ✉️ Hemen Yanıtla
              </a>
            </div>
          </div>

          <div class="footer">
            <p class="footer-text">
              <strong>${siteTitle}</strong><br>
              Bu e-posta, web sitenizin teknik servis teklif formundan otomatik olarak gönderilmiştir.<br>
              Müşterinize en kısa sürede dönüş yapmanız önerilir.
            </p>
            <p class="footer-text" style="margin-top: 12px; font-size: 12px; color: #9ca3af;">
              © ${new Date().getFullYear()} ${siteTitle}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}
