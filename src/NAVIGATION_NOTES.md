# SusSTEM Website - Navigation & Interaction Guide

## Navigation Architecture

This website uses a **Single Page Application (SPA)** architecture with state-based routing managed through React. Navigation is handled differently for internal vs. external links.

---

## ✅ Implementation Summary

### What Opens in New Tab (External Links)
All external links have been configured with `target="_blank"` and `rel="noopener noreferrer"` for security:

- **Social Media Links** (in Footer):
  - LinkedIn: https://www.linkedin.com/company/susstem
  - YouTube: https://www.youtube.com/@SusSTEM
  - Instagram: https://www.instagram.com/susstem.org
  - X/Twitter: https://twitter.com/susstem_org

### What Opens in Same Tab (Internal Navigation)
All internal navigation stays in the same tab through either:
- **Smooth scrolling** to page sections (e.g., #what-is-susstem, #projects)
- **State changes** that render different page components (e.g., Volunteer, Donate, Partner forms)

---

## Complete Navigation Reference Table

| Component | Element | Action | Target | Opens In |
|-----------|---------|--------|--------|----------|
| **Navbar - Desktop** |
| Navbar | Logo (SusSTEM) | Return to homepage | Homepage | Same Tab |
| Navbar | About Us | Scroll to section | #what-is-susstem | Same Tab |
| Navbar | The Programme | Scroll to section | #projects | Same Tab |
| Navbar | Impact | Scroll to section | #impact | Same Tab |
| Navbar | Our Purpose | Scroll to section | #about-us | Same Tab |
| Navbar | Contact | Scroll to section | #contact | Same Tab |
| Navbar | Get Involved > Volunteer | Navigate to form | Volunteer Page | Same Tab |
| Navbar | Get Involved > Donate | Navigate to form | Donate Page | Same Tab |
| Navbar | Get Involved > Partner | Navigate to form | Partner Page | Same Tab |
| Navbar | Donate Button (Top Right) | Navigate to form | Donate Page | Same Tab |
| **Navbar - Mobile** |
| Mobile Menu | All items | Same as desktop | Various | Same Tab |
| Mobile Menu | Touch targets | 44px minimum | N/A | N/A |
| **Hero Carousel** |
| Hero Slide 1 | "Learn More" | Scroll to section | #what-is-susstem | Same Tab |
| Hero Slide 2 | "See Our Projects" | Scroll to section | #projects | Same Tab |
| Hero Slide 3 | "Join the Movement" | Scroll to section | #get-involved | Same Tab |
| Hero Slide 4 | "Explore Impact" | Scroll to section | #impact | Same Tab |
| Hero Slide 5 | "Partner With Us" | Scroll to section | #get-involved | Same Tab |
| **Featured Projects (The Programme)** |
| Level 1 Card | "Learn More" | Navigate to project | Air Alert Page | Same Tab |
| Level 2 Card | "Learn More" | Navigate to project | Innovator Page | Same Tab |
| Level 3 Card | "Learn More" | Navigate to project | Changemaker Page | Same Tab |
| **Get Involved Section** |
| Volunteer Card | "Sign Up" | Navigate to form | Volunteer Page | Same Tab |
| Donate Card | "Make a Difference" | Navigate to form | Donate Page | Same Tab |
| Partner Card | "Collaborate" | Navigate to form | Partner Page | Same Tab |
| **CTA Section** |
| CTA Section | "Get Involved" | Scroll to section | #get-involved | Same Tab |
| CTA Section | "Learn More" | Scroll to section | #what-is-susstem | Same Tab |
| **Contact Preview** |
| Contact Section | "Contact Us" | Scroll to footer | #footer | Same Tab |
| **Footer - Navigation** |
| Footer | Partner With Us | Scroll to section | #get-involved | Same Tab |
| Footer | Volunteer | Scroll to section | #get-involved | Same Tab |
| Footer | Donate | Scroll to section | #get-involved | Same Tab |
| Footer | For Educators | Scroll to section | #projects | Same Tab |
| Footer | Access Curriculum | Scroll to section | #projects | Same Tab |
| **Footer - External Links** |
| Footer | LinkedIn Icon | External link | LinkedIn Company Page | **New Tab** |
| Footer | YouTube Icon | External link | YouTube Channel | **New Tab** |
| Footer | Instagram Icon | External link | Instagram Profile | **New Tab** |
| Footer | X/Twitter Icon | External link | Twitter Profile | **New Tab** |
| Footer | Email Link | Email client | mailto:hello@susstem.org | Email App |

---

## Form Submission Notes

All form pages (Volunteer, Donate, Partner) currently log data to the console. In production, these would:
1. Submit to a backend API
2. Show confirmation messages
3. Possibly redirect to a thank you page

---

## Accessibility Features

- All interactive elements have proper ARIA labels
- Links opening in new tabs include "(opens in new tab)" in aria-label
- Buttons have clear focus states
- Navigation maintains keyboard accessibility
- Touch targets meet minimum 44px requirement on mobile

---

## Consistent Interaction Patterns

### Primary Action Buttons
- Green background (#20593A or #a2bb65)
- Rounded corners (12-16px)
- Hover effects with color transitions
- Used for: Donate, Submit forms, Primary CTAs

### Secondary Action Buttons
- Outline style with border
- Transparent or white background
- Used for: Learn More, Explore options

### Navigation Buttons
- Navbar uses text links with hover effects
- Mobile menu includes hamburger icon
- Dropdown uses chevron indicators

### Card Interactions
- Hover effects with shadow elevation
- Clickable cards in Featured Projects
- Color-coded by level (Green/Yellow/Orange)

---

## Mobile Responsiveness

- Mobile menu collapses into hamburger icon
- Dropdowns work with touch interaction
- Form layouts stack vertically on small screens
- Partner/Volunteer pages use responsive two-column layouts
- Carousels adapt to single-item view on mobile

---

Last Updated: December 27, 2025