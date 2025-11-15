# ShivaPatpi Website

A professional React.js + TypeScript website showcasing personal brand, technical skills, spiritual insights, and meaningful connections.

## Features

- **Responsive Design**: Beautiful and professional interface that works on all devices
- **Modern Tech Stack**: Built with React 18, TypeScript, and CSS3
- **Colorful UI**: Professional color scheme with gradients and smooth animations
- **Multiple Pages**: 
  - HomePage: Welcome section with feature highlights
  - AboutMe: Personal information and values
  - Technical: Skills, projects, and professional experience
  - Spiritual: Daily practices, philosophy, and insights
  - Friends: Interactive grid layout showcasing connections
  - ContactUs: Contact form and social media links

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **Styling**: Modern CSS3 with CSS Variables
- **Design**: Professional gradients, shadows, and animations
- **Responsive**: Mobile-first design approach

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Header.tsx      # Navigation header
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── AboutMe.tsx     # About section
│   ├── Technical.tsx   # Technical skills
│   ├── Spiritual.tsx   # Spiritual content
│   ├── Friends.tsx     # Friends grid
│   └── ContactUs.tsx   # Contact form
├── styles/             # CSS stylesheets
│   ├── index.css       # Global styles
│   ├── App.css         # App layout
│   ├── Header.css      # Header styles
│   ├── HomePage.css    # Homepage styles
│   ├── AboutMe.css     # About page styles
│   ├── Technical.css   # Technical page styles
│   ├── Spiritual.css   # Spiritual page styles
│   ├── Friends.css     # Friends page styles
│   └── ContactUs.css   # Contact page styles
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## Features Detail

### Professional Design
- Modern gradient backgrounds
- Smooth hover animations
- Card-based layouts with shadows
- Responsive grid systems
- Professional typography

### Friends Page
- Grid layout with friend profiles
- Profile images with fallback avatars
- Skill badges and social links
- Hover effects and animations
- Responsive design for all screen sizes

### Contact Form
- Form validation
- Multiple contact methods
- Professional styling
- Responsive layout

## Customization

### Colors
The color scheme can be customized by modifying CSS variables in `src/styles/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  --spiritual-primary: #8b5cf6;
  /* ... more colors */
}
```

### Content
- Update personal information in the page components
- Replace placeholder images in the Friends page
- Modify contact information in ContactUs page
- Add your own projects in Technical page

## Deployment

The built application can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is available for personal and commercial use.

## Contact

For questions or collaboration opportunities, please use the contact form in the application or reach out through the provided social media links.