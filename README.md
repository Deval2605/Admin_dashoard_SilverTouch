# Silver Touch Technologies Enterprise Dashboard

A high-performance, responsive enterprise operations dashboard developed as a comprehensive frontend assessment. This application serves as a centralized management interface modeled specifically for Silver Touch Technologies Ltd, reflecting their B2B, e-governance, and IT consulting operations.

## Project Overview and Methodology

This project was architected strictly using core web fundamentals: pure HTML5, CSS3, and Vanilla JavaScript. It is a completely standalone interface that requires no backend, local server, package managers, or build tools to operate.

A heavy emphasis was placed on code quality and standard compliance. Inline CSS has been strictly prohibited. Instead, the layout inherits from a highly maintainable, hand-authored CSS variable architecture that mirrors the deep slate, terracotta, and teal corporate color palette of the company.

## Key Technical Implementations

- **Core Architecture:** Built upon the Bootstrap 5 framework to manage layout mathematics and mobile breakpoints, while relying exclusively on Vanilla JavaScript and precise jQuery selectors for client-side routing, data mutation, and state management.
- **REST API Integration and Data Mapping:** Connected the Client Registry interface dynamically to the JSONPlaceholder API. Custom interception modules were developed to serialize and transform the generic payload into localized Indian B2G/B2B contexts, generating correct demographic names, government departments, and precise Rupee (₹) currency mapping. 
- **Interactive Visualizations:** Integrated Chart.js to dynamically render metrics across the application, focusing on enterprise-scale analytical models such as Cloud Infrastructure Usage, SLA Delivery Targets, and Quarterly Revenue Distributions.
- **User Experience (UX) Enhancements:** Developed a persistent dark mode toggle explicitly linked to browser localStorage for session persistence. Further engineered HTML-based DOM loading skeletons that animate naturally to mask the latency of asynchronous data operations.
- **Strict Validations:** Configured sophisticated, modular client-side form validations. This includes a custom key-up event listener algorithm that dynamically grades and renders an animated password strength hierarchy in real-time.

## Project Directory

1. **Dashboard (index.html):** Command center displaying Chart.js widgets, active SLA tickers, and a live corporate activity feed.
2. **Client Registry (users.html):** Asynchronous API-driven data table including multifaceted live searching and filtering mechanisms.
3. **Reports (reports.html):** Four distinct, highly configurable enterprise monitoring charts.
4. **Settings (settings.html):** Forms targeting Corporate Identity management and complex security configurations.
5. **Authentication (login.html):** Standalone interface utilizing strict client-side validation thresholds prior to granting dashboard access.

## How to Run Locally

Because this project is entirely self-contained without dependencies:
1. Clone or download this repository to your local machine.
2. Open the `shopsphere-dashboard` folder.
3. Open `login.html` directly in any modern web browser.
4. Input the designated credentials: `admin@silvertouch.com` / `Admin@123` or simply use the Demo continue button.

## File Hierarchy

```text
shopsphere-dashboard/
├── index.html
├── users.html
├── reports.html
├── settings.html
├── login.html
├── css/
│   ├── style.css
│   └── dark-mode.css
├── js/
│   ├── main.js
│   ├── dashboard.js
│   ├── users.js
│   ├── reports.js
│   ├── settings.js
│   └── validation.js
├── assets/
│   └── logo.svg
└── README.md
```

## Live Deployment
Live Demo: silvertouchadmindashboard.netlify.app

## Author
Deval Sindha
SDE Intern,
SilverTouch Technologies pvt ltd.
