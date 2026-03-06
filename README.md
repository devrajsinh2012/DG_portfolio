# Devrajsinh Gohil - Interactive Portfolio Website

A modern, interactive portfolio website for Devrajsinh Gohil, showcasing professional experience, skills, and accomplishments.

## Features

- Modern, responsive design optimized for all devices
- Interactive UI elements and animations
- Professional sections for About, Skills, Experience, Projects, Education, and Contact
- Downloadable resume
- Customizable color themes and typography

## Technology Stack

- Next.js with TypeScript
- Tailwind CSS for styling
- Framer Motion & GSAP for animations
- Firebase for hosting and storage

## Setting Up EmailJS for Contact Form

To enable the email functionality in the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/) (they have a free tier)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with variables: `name`, `email`, `subject`, `message`
4. Get your EmailJS user ID, service ID, and template ID
5. Update the contact form component with your IDs:

```jsx
// In src/components/sections/contact-section.tsx
const serviceID = 'YOUR_SERVICE_ID';  // Replace with your service ID
const templateID = 'YOUR_TEMPLATE_ID';  // Replace with your template ID
const userID = 'YOUR_USER_ID';  // Replace with your user ID
```

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## Deployment

This project is configured for Firebase Hosting with static export (`output: 'export'`).

```bash
# Build and deploy
npm run build
firebase deploy
```

## License

All rights reserved. This project is proprietary and confidential.