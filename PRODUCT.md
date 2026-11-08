# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

User approved a migration to React and Tailwind CSS when needed; Vite is selected for a static build that fits the existing Vercel hosting setup.

## Users

Primary audiences are inferred from the portfolio’s content and current request: recruiters evaluating Nicolás Pereira for software development roles, and prospective freelance clients assessing his work.

## Product Purpose

Present Nicolás Pereira’s software development profile, experience, technical skills, and real projects so visitors can assess his work and contact him.

## Positioning

The portfolio presents a developer who starts from real operational problems and builds maintainable software, backend systems, APIs, automation, and applied AI solutions.

## Operating Context

Visitors browse a public, Spanish-language portfolio from desktop or mobile, review project details and live demos or repositories, then reach out by email or the contact form.

## Capabilities and Constraints

- Sections include an introduction, about, projects, technology stack, experience, education, and contact.
- Project information and outbound links must remain factual and point to the existing demos and repositories.
- The portfolio uses a NestJS API for contact messages and Resend for email delivery; the current frontend defaults to a local API URL unless configured.
- The current hosting target is Vercel and the frontend must produce a static deployable build.
- Accessibility expectations include responsive behavior, usable keyboard navigation, and reduced-motion support for animation.

## Brand Commitments

- The portfolio belongs to Nicolás Pereira, based in Montevideo, Uruguay.
- Existing copy is Spanish and uses a direct, conversational voice.
- Preserve the supplied portrait at `client/frontend/assets/yop.jpg` and favicon at `client/frontend/assets/favicon.svg`.
- The user explicitly requested ReactBits Logo Loop for technologies, Lanyard to present the portrait in a large centered hero, Flux Lines as the site background, and Folder for projects.

## Evidence on Hand

- Project descriptions, experience, education, skills, and contact details are maintained in `client/frontend/src/App.jsx`.
- The current project set includes a collaborative open source project (Qubik Timer), the NEZT startup site, a sports team document validation automation, three freelance deliveries (Museo Ezequiel Zamora, Suárez Vóley, LS Acondicionadores), and three portfolio projects (Telegram Lead Bot, Assistance System, QRLY).
- Live demos are linked for Qubik Timer, NEZT, the document validation bot, the museum, Suárez Vóley, and LS Acondicionadores.
- Repository links exist for Telegram Lead Bot, Assistance System, and QRLY.
- Portrait and favicon assets are available locally. No testimonials or quantitative outcome claims are provided.

## Product Principles

- Show real work and preserve its project links.
- Explain the practical problem each project addresses.
- Keep the professional story grounded in the supplied experience.
- Make it easy to explore work and contact Nicolás across screen sizes.
