import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
  		fontFamily: {
  			sans: [
  				'Poppins',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			display: [
  				'Playfair Display',
  				'serif'
  			],
  			mono: [
  				'Cascadia Code',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			],
  			serif: [
  				'Crimson Text',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
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
  			smokey: 'hsl(var(--smokey))',
  			charcoal: 'hsl(var(--charcoal))',
  			ember: 'hsl(var(--ember))',
  			gold: 'hsl(var(--gold))',
  			'gradient-dark': 'hsl(var(--gradient-dark))',
  			'gradient-crimson': 'hsl(var(--gradient-crimson))',
  			'gradient-orange': 'hsl(var(--gradient-orange))',
  			'gradient-sand': 'hsl(var(--gradient-sand))'
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
  			'fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(40px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(100px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-left': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-100px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'rotate-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'rotate(-10deg) scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'rotate(0) scale(1)'
  				}
  			},
  			'bounce-soft': {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
  				}
  			},
  			'text-shimmer': {
  				'0%': {
  					backgroundPosition: '-200% center'
  				},
  				'100%': {
  					backgroundPosition: '200% center'
  				}
  			},
  			'float-up': {
  				'0%, 100%': {
  					transform: 'translateY(0) rotate(0deg)'
  				},
  				'25%': {
  					transform: 'translateY(-10px) rotate(2deg)'
  				},
  				'50%': {
  					transform: 'translateY(-20px) rotate(0deg)'
  				},
  				'75%': {
  					transform: 'translateY(-10px) rotate(-2deg)'
  				}
  			},
  			'spin-slow': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			morph: {
  				'0%, 100%': {
  					borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
  				},
  				'50%': {
  					borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			'gradient-y': {
  				'0%, 100%': {
  					backgroundPosition: '50% 0%'
  				},
  				'50%': {
  					backgroundPosition: '50% 100%'
  				}
  			},
  			'gradient-xy': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'25%': {
  					backgroundPosition: '100% 0%'
  				},
  				'50%': {
  					backgroundPosition: '100% 100%'
  				},
  				'75%': {
  					backgroundPosition: '0% 100%'
  				}
  			},
  			'draw-line': {
  				'0%': {
  					strokeDashoffset: '1000'
  				},
  				'100%': {
  					strokeDashoffset: '0'
  				}
  			},
  			typewriter: {
  				'0%': {
  					width: '0'
  				},
  				'100%': {
  					width: '100%'
  				}
  			},
  			blink: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0'
  				}
  			},
  			wave: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'10%': {
  					transform: 'rotate(14deg)'
  				},
  				'20%': {
  					transform: 'rotate(-8deg)'
  				},
  				'30%': {
  					transform: 'rotate(14deg)'
  				},
  				'40%': {
  					transform: 'rotate(-4deg)'
  				},
  				'50%': {
  					transform: 'rotate(10deg)'
  				},
  				'60%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(0deg)'
  				}
  			},
  			shake: {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'10%, 30%, 50%, 70%, 90%': {
  					transform: 'translateX(-2px)'
  				},
  				'20%, 40%, 60%, 80%': {
  					transform: 'translateX(2px)'
  				}
  			},
  			wiggle: {
  				'0%, 100%': {
  					transform: 'rotate(-3deg)'
  				},
  				'50%': {
  					transform: 'rotate(3deg)'
  				}
  			},
  			'ping-slow': {
  				'75%, 100%': {
  					transform: 'scale(1.5)',
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out forwards',
  			'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
  			'scale-in': 'scale-in 0.5s ease-out forwards',
  			'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
  			'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
  			'rotate-in': 'rotate-in 0.6s ease-out forwards',
  			'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
  			'float-up': 'float-up 6s ease-in-out infinite',
  			'spin-slow': 'spin-slow 20s linear infinite',
  			morph: 'morph 8s ease-in-out infinite',
  			'gradient-x': 'gradient-x 3s ease infinite',
  			'gradient-y': 'gradient-y 3s ease infinite',
  			'gradient-xy': 'gradient-xy 6s ease infinite',
  			'draw-line': 'draw-line 2s ease-out forwards',
  			typewriter: 'typewriter 3s steps(40) forwards',
  			blink: 'blink 1s infinite',
  			wave: 'wave 2.5s infinite',
  			shake: 'shake 0.5s ease-in-out',
  			wiggle: 'wiggle 1s ease-in-out infinite',
  			'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			shimmer: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)'
  		},
  		transitionTimingFunction: {
  			'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  			'smooth-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  			elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		fontSize: {
  			'10xl': [
  				'10rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'11xl': [
  				'12rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'12xl': [
  				'14rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		blur: {
  			'4xl': '100px'
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
