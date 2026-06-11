const GOAL_LABELS = {
  'build-muscle':        'Build Muscle',
  'lose-fat':            'Lose Fat',
  'improve-performance': 'Improve Athletic Performance',
  'general-fitness':     'General Fitness & Health',
  'injury-recovery':     'Injury Recovery / Prehab',
  'other':               'Other',
};

const EXPERIENCE_LABELS = {
  'beginner':     'Beginner (0–1 year)',
  'intermediate': 'Intermediate (1–3 years)',
  'advanced':     'Advanced (3+ years)',
};

function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

function buildHtml(f) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin: 0; padding: 0; background: #f4f4f4; font-family: Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #3d1348; padding: 28px 32px; }
    .header h1 { margin: 0; color: #b8d400; font-size: 22px; letter-spacing: 0.5px; }
    .header p { margin: 4px 0 0; color: #c9b4d8; font-size: 14px; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 18px; border-bottom: 1px solid #f0f0f0; padding-bottom: 18px; }
    .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.8px; color: #888; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1a1a1a; }
    .message-value { font-size: 15px; color: #1a1a1a; white-space: pre-wrap; line-height: 1.6; }
    .reply-btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background: #5a2069; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; }
    .footer { background: #f9f9f9; padding: 16px 32px; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Coaching Inquiry</h1>
      <p>Submitted via MT Movement contact form</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${f.firstName} ${f.lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${f.email}">${f.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Date of Birth</div>
        <div class="value">${formatDate(f.dob)}</div>
      </div>
      <div class="field">
        <div class="label">Occupation</div>
        <div class="value">${f.occupation || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Location</div>
        <div class="value">${f.city}, ${f.state}</div>
      </div>
      <div class="field">
        <div class="label">Primary Goal</div>
        <div class="value">${GOAL_LABELS[f.goal] || f.goal || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Training Experience</div>
        <div class="value">${EXPERIENCE_LABELS[f.experience] || f.experience || '—'}</div>
      </div>
      <div class="field">
        <div class="label">Tell Us More</div>
        <div class="message-value">${f.message || '(no additional details provided)'}</div>
      </div>
      <a class="reply-btn" href="mailto:${f.email}">Reply to ${f.firstName} →</a>
    </div>
    <div class="footer">MT Movement Coaching</div>
  </div>
</body>
</html>`;
}

function buildText(f) {
  return [
    'NEW COACHING INQUIRY — MT Movement',
    '='.repeat(40),
    `Name:                ${f.firstName} ${f.lastName}`,
    `Email:               ${f.email}`,
    `Date of Birth:       ${formatDate(f.dob)}`,
    `Occupation:          ${f.occupation || '—'}`,
    `Location:            ${f.city}, ${f.state}`,
    `Primary Goal:        ${GOAL_LABELS[f.goal] || f.goal || '—'}`,
    `Training Experience: ${EXPERIENCE_LABELS[f.experience] || f.experience || '—'}`,
    '',
    'Tell Us More:',
    f.message || '(no additional details provided)',
  ].join('\n');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body;

  const params = new URLSearchParams(raw);
  const get = (key) => (params.get(key) || '').trim();

  // Honeypot — silently drop bot submissions
  if (get('bot-field')) {
    return { statusCode: 302, headers: { Location: '/success.html' }, body: '' };
  }

  const f = {
    firstName:  get('first-name'),
    lastName:   get('last-name'),
    email:      get('email'),
    goal:       get('goal'),
    experience: get('experience'),
    occupation: get('occupation'),
    city:       get('city'),
    state:      get('state'),
    dob:        get('dob'),
    message:    get('message'),
  };

  if (!f.firstName || !f.lastName || !f.email) {
    return { statusCode: 400, body: 'Missing required fields.' };
  }

  // Send via SendGrid HTTP API (no package needed — uses native fetch)
  const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        { to: [{ email: 'Jacobalexander2017@gmail.com', name: 'Jake Alexander' }] },
      ],
      from: { email: 'Jacobalexander2017@gmail.com', name: 'MT Movement Site' },
      reply_to: { email: f.email, name: `${f.firstName} ${f.lastName}` },
      subject: `New Coaching Inquiry — ${f.firstName} ${f.lastName}`,
      content: [
        { type: 'text/plain', value: buildText(f) },
        { type: 'text/html',  value: buildHtml(f) },
      ],
    }),
  });

  if (!sgResponse.ok) {
    const errBody = await sgResponse.text();
    console.error('SendGrid error:', sgResponse.status, errBody);
    return {
      statusCode: 500,
      body: `Email failed to send (${sgResponse.status}). Please try again or contact us directly.`,
    };
  }

  return {
    statusCode: 302,
    headers: { Location: '/success.html' },
    body: '',
  };
};
