
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// GenIEtal Brand Colors - properly mapped to CSS variables
				'orange-primary': 'hsl(var(--orange-primary))',
				'orange-secondary': 'hsl(var(--orange-secondary))',
				'orange-tertiary': 'hsl(var(--orange-tertiary))',
				
/* Design system colors for layout components */
'brand-orange': 'hsl(var(--brand-orange))',
'brand-orange-bg': 'hsl(var(--brand-orange-bg))',

'text-primary': 'hsl(var(--text-primary))',
'text-secondary': 'hsl(var(--text-secondary))',
'text-tertiary': 'hsl(var(--text-tertiary))',

'status-active': 'hsl(var(--status-active))',
'status-active-bg': 'hsl(var(--status-active-bg))',

'neutral-100': 'hsl(var(--neutral-100))',
'neutral-300': 'hsl(var(--neutral-300))',
'neutral-400': 'hsl(var(--neutral-400))',
'neutral-600': 'hsl(var(--neutral-600))',
				
				// Legacy colors for backward compatibility
				'dark-charcoal': '#606060',
				'bold-red': '#ee3224',
				'vibrant-orange': '#f47920',
				'bright-yellow': '#ffd200',
				
				// Shadcn defaults preserved
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				sidebar: 'hsl(var(--sidebar-background))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'mono': ['Fira Code', 'Source Code Pro', 'monospace'],
			},
			fontSize: {
				// Desktop sizes
				'h1-desktop': '56px',
				'h2-desktop': '36px', 
				'h3-desktop': '18px',
				'h4-desktop': '16px',
				'h5-desktop': '14px',
				// Mobile sizes
				'h1-mobile': '36px',
				'h2-mobile': '28px',
				'h3-mobile': '24px',
				'h4-mobile': '20px',
				'h5-mobile': '16px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-button': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'pin-drop': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'50%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'draw-line': {
					'0%': { strokeDashoffset: '100' },
					'100%': { strokeDashoffset: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'typewriter': 'typewriter 2s steps(40) 1s forwards',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'pulse-button': 'pulse-button 1.2s ease-in-out infinite',
				'pin-drop': 'pin-drop 0.6s ease-out',
				'draw-line': 'draw-line 0.8s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
