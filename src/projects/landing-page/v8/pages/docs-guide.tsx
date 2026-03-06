import { useState } from 'react'
import { Search, ChevronRight, Book, Layers, Sparkles, MessageSquare, GitBranch, Share2, Terminal } from 'lucide-react'

// ── Docs Guide — Modern Sidebar Documentation ───────────────────────────────
// Clean white documentation with sidebar navigation and search. Scannable,
// organized, professional. Inspired by Stripe/Vercel/Tailwind docs.

const C = {
  bg: 'oklch(1.000 0 0)',
  bgSoft: 'oklch(0.980 0.005 260)',
  bgHover: 'oklch(0.970 0.008 260)',
  text: 'oklch(0.120 0.010 260)',
  textSec: 'oklch(0.450 0.010 260)',
  textTer: 'oklch(0.600 0.008 260)',
  border: 'oklch(0.920 0.005 260)',
  accent: 'oklch(0.550 0.200 260)',
  accentSoft: 'oklch(0.960 0.040 260)',
  code: 'oklch(0.970 0.005 260)',
}

const font = '"Inter", -apple-system, system-ui, sans-serif'
const mono = '"SF Mono", "Fira Code", Menlo, monospace'

const navItems = [
  { icon: Book, label: 'Getting Started', active: true },
  { icon: Layers, label: 'The Canvas', active: false },
  { icon: Sparkles, label: 'Generating Designs', active: false },
  { icon: MessageSquare, label: 'Annotations', active: false },
  { icon: GitBranch, label: 'Iterations', active: false },
  { icon: Share2, label: 'Sharing', active: false },
  { icon: Terminal, label: 'CLI Reference', active: false },
]

export function DocsGuide() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflow: 'auto', fontFamily: font, WebkitFontSmoothing: 'antialiased' }}>
      {/* Top nav */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', borderBottom: `1px solid ${C.border}`,
        position: 'sticky', top: 0, background: C.bg, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: C.text }}>bryllen</span>
          <nav style={{ display: 'flex', gap: 24 }}>
            {['Docs', 'Examples', 'Blog'].map((item, i) => (
              <span key={item} style={{
                fontSize: 14, fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? C.text : C.textSec,
                cursor: 'default',
              }}>{item}</span>
            ))}
          </nav>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: C.bgSoft, borderRadius: 8, padding: '8px 14px',
          border: `1px solid ${searchFocused ? C.accent : C.border}`,
          transition: 'border-color 0.15s ease',
          width: 240,
        }}>
          <Search size={14} color={C.textTer} strokeWidth={1.5} />
          <input
            placeholder="Search docs..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: 13, color: C.text, width: '100%',
              fontFamily: font,
            }}
          />
          <span style={{
            fontSize: 11, color: C.textTer, background: C.bg,
            padding: '2px 6px', borderRadius: 4, border: `1px solid ${C.border}`,
          }}>⌘K</span>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: 1280, margin: '0 auto' }}>
        {/* Sidebar */}
        <aside style={{
          width: 240, flexShrink: 0, padding: '24px 16px',
          borderRight: `1px solid ${C.border}`,
          position: 'sticky', top: 65, height: 'calc(100vh - 65px)',
          overflowY: 'auto',
        }}>
          {navItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 6,
                background: item.active ? C.accentSoft : 'transparent',
                cursor: 'default', marginBottom: 2,
              }}
            >
              <item.icon size={16} color={item.active ? C.accent : C.textTer} strokeWidth={1.5} />
              <span style={{
                fontSize: 14, fontWeight: item.active ? 500 : 400,
                color: item.active ? C.accent : C.textSec,
              }}>{item.label}</span>
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '40px 64px 80px', maxWidth: 720 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: C.textTer }}>Docs</span>
            <ChevronRight size={12} color={C.textTer} strokeWidth={1.5} />
            <span style={{ fontSize: 13, color: C.text }}>Getting Started</span>
          </div>

          <h1 style={{
            fontSize: 32, fontWeight: 600, color: C.text,
            lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 16px',
          }}>Getting Started</h1>
          <p style={{
            fontSize: 17, color: C.textSec, lineHeight: 1.6, margin: '0 0 40px',
          }}>
            Get up and running with Bryllen in under 5 minutes. Create your first AI-generated design project.
          </p>

          {/* Install section */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 20, fontWeight: 600, color: C.text,
              margin: '0 0 16px', paddingTop: 24,
              borderTop: `1px solid ${C.border}`,
            }}>Install</h2>
            <p style={{
              fontSize: 15, color: C.textSec, lineHeight: 1.65, margin: '0 0 16px',
            }}>
              Bryllen is a Claude Code plugin. Install it from the marketplace:
            </p>
            <div style={{
              background: C.code, borderRadius: 8, padding: '16px 20px',
              border: `1px solid ${C.border}`, position: 'relative',
            }}>
              <code style={{ fontFamily: mono, fontSize: 14, color: C.text }}>
                claude plugin install bryllen
              </code>
            </div>
          </section>

          {/* Create project section */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 20, fontWeight: 600, color: C.text,
              margin: '0 0 16px', paddingTop: 24,
              borderTop: `1px solid ${C.border}`,
            }}>Create your first project</h2>
            <p style={{
              fontSize: 15, color: C.textSec, lineHeight: 1.65, margin: '0 0 16px',
            }}>
              Create a new design project. This sets up the folder structure and opens the canvas:
            </p>
            <div style={{
              background: C.code, borderRadius: 8, padding: '16px 20px',
              border: `1px solid ${C.border}`, marginBottom: 20,
            }}>
              <code style={{ fontFamily: mono, fontSize: 14, color: C.text }}>
                /bryllen-new my-landing-page
              </code>
            </div>
            <p style={{
              fontSize: 15, color: C.textSec, lineHeight: 1.65, margin: '0 0 16px',
            }}>
              Now describe what you want. Bryllen will generate multiple directions you can compare:
            </p>
            <div style={{
              background: C.accentSoft, borderRadius: 8, padding: '16px 20px',
              borderLeft: `3px solid ${C.accent}`,
            }}>
              <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.6 }}>
                <strong>Tip:</strong> Be specific about the vibe you want. "A minimal landing page with warm colors and big typography" works better than "a landing page."
              </p>
            </div>
          </section>

          {/* What's next */}
          <section>
            <h2 style={{
              fontSize: 20, fontWeight: 600, color: C.text,
              margin: '0 0 16px', paddingTop: 24,
              borderTop: `1px solid ${C.border}`,
            }}>What's next?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { title: 'The Canvas', desc: 'Learn to navigate and compare designs' },
                { title: 'Annotations', desc: 'Click elements to request changes' },
              ].map((item) => (
                <div key={item.title} style={{
                  padding: '16px 20px', borderRadius: 8, border: `1px solid ${C.border}`,
                  cursor: 'default',
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 4px' }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: C.textSec, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* On this page */}
        <aside style={{
          width: 180, flexShrink: 0, padding: '40px 24px',
          position: 'sticky', top: 65, height: 'calc(100vh - 65px)',
        }}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: C.textTer,
            letterSpacing: '0.05em', textTransform: 'uppercase' as const,
            margin: '0 0 12px',
          }}>On this page</p>
          {['Install', 'Create your first project', "What's next?"].map((item, i) => (
            <div key={item} style={{
              fontSize: 13, color: i === 0 ? C.text : C.textSec,
              padding: '6px 0', cursor: 'default',
            }}>{item}</div>
          ))}
        </aside>
      </div>
    </div>
  )
}
