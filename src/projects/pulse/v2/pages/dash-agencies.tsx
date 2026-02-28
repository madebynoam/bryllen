import { useState } from 'react'

/* ------------------------------------------------------------------ */
/*  Agencies Dashboard — Dark monochrome style                          */
/*  Inspired by: dark bg, pill tags, big percentages, progress bars     */
/* ------------------------------------------------------------------ */

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const mono = '"SF Mono", "Fira Code", Menlo, monospace'

/* Dark monochrome palette */
const c = {
  bg: 'oklch(0.12 0 0)',
  card: 'oklch(0.16 0 0)',
  cardBorder: 'oklch(0.25 0 0)',
  text: 'oklch(0.95 0 0)',
  textSecondary: 'oklch(0.70 0 0)',
  textTertiary: 'oklch(0.50 0 0)',
  barFilled: 'oklch(0.85 0 0)',
  barEmpty: 'oklch(0.30 0 0)',
  pillBorder: 'oklch(0.35 0 0)',
  positive: 'oklch(0.75 0.12 145)',
}

/* Agency stats */
const agencies = [
  { name: 'Starter', count: 124, revenue: '$48K', growth: 12 },
  { name: 'Pro', count: 89, revenue: '$156K', growth: 24 },
  { name: 'Enterprise', count: 31, revenue: '$412K', growth: 8 },
]

/* Migration progress */
const migrations = {
  total: 847,
  completed: 602,
  inProgress: 156,
  pending: 89,
}

/* Site metrics */
const siteMetrics = [
  { label: 'Active Sites', value: '2,847', change: '+156' },
  { label: 'Monthly Traffic', value: '14.2M', change: '+2.1M' },
  { label: 'Avg Uptime', value: '99.94%', change: '+0.02%' },
]

/* Progress bar component */
function ProgressBar({ filled, total }: { filled: number; total: number }) {
  const segments = 30
  const filledSegments = Math.round((filled / total) * segments)

  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 32,
            background: i < filledSegments ? c.barFilled : c.barEmpty,
            borderRadius: 2,
            transform: 'skewX(-12deg)',
          }}
        />
      ))}
    </div>
  )
}

/* Pill tag */
function Pill({ children }: { children: string }) {
  return (
    <span style={{
      padding: '6px 14px',
      border: `1px solid ${c.pillBorder}`,
      borderRadius: 20,
      fontSize: 13,
      color: c.textSecondary,
      fontWeight: 500,
    }}>
      {children}
    </span>
  )
}

/* Stat card */
function StatCard({ title, tags, value, subtitle, change, progress }: {
  title: string
  tags?: string[]
  value: string
  subtitle: string
  change?: string
  progress?: { filled: number; total: number }
}) {
  return (
    <div style={{
      background: c.card,
      border: `1px solid ${c.cardBorder}`,
      borderRadius: 16,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {tags && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          {tags.map(tag => <Pill key={tag}>{tag}</Pill>)}
        </div>
      )}

      <div>
        <h3 style={{
          fontSize: 28,
          fontWeight: 600,
          color: c.text,
          margin: 0,
          letterSpacing: -0.5,
        }}>{title}</h3>
        <div style={{
          width: 40,
          height: 1,
          background: c.textTertiary,
          marginTop: 12,
        }} />
      </div>

      <p style={{
        fontSize: 15,
        color: c.textSecondary,
        margin: 0,
        lineHeight: 1.5,
      }}>{subtitle}</p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{
          fontSize: 56,
          fontWeight: 700,
          color: c.text,
          fontFamily: mono,
          letterSpacing: -2,
          lineHeight: 1,
        }}>{value}</span>

        {change && (
          <span style={{
            padding: '6px 12px',
            border: `1px solid ${c.pillBorder}`,
            borderRadius: 6,
            fontSize: 14,
            color: c.positive,
            fontFamily: mono,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span style={{ fontSize: 12 }}>↗</span> {change}
          </span>
        )}

        <span style={{
          fontSize: 14,
          color: c.textTertiary,
        }}>since you last checked</span>
      </div>

      {progress && (
        <div style={{ marginTop: 8 }}>
          <ProgressBar filled={progress.filled} total={progress.total} />
        </div>
      )}
    </div>
  )
}

export function DashAgencies() {
  const [activeTab, setActiveTab] = useState('overview')
  const migrationPercent = Math.round((migrations.completed / migrations.total) * 100)

  return (
    <div style={{
      minHeight: '100%',
      overflow: 'auto',
      fontFamily: font,
      WebkitFontSmoothing: 'antialiased',
      background: c.bg,
      padding: 40,
      cursor: 'default',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
      }}>
        <div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            color: c.text,
            margin: 0,
            letterSpacing: -1,
          }}>Agencies</h1>
          <p style={{
            fontSize: 14,
            color: c.textTertiary,
            margin: 0,
            marginTop: 6,
          }}>Partner program overview</p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {['overview', 'migrations', 'revenue'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${activeTab === tab ? c.text : c.pillBorder}`,
                borderRadius: 8,
                background: activeTab === tab ? c.text : 'transparent',
                color: activeTab === tab ? c.bg : c.textSecondary,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'default',
                textTransform: 'capitalize',
              }}
            >{tab}</button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
      }}>
        {/* Migrations card - large */}
        <StatCard
          title="Migrations"
          tags={['incentive', 'Q1-2026', 'active']}
          value={`${migrationPercent}%`}
          subtitle="You are on track to reach the quarterly goal in 12 days."
          change="+8%"
          progress={{ filled: migrations.completed, total: migrations.total }}
        />

        {/* Agency tiers */}
        <div style={{
          background: c.card,
          border: `1px solid ${c.cardBorder}`,
          borderRadius: 16,
          padding: 28,
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: c.text,
            margin: 0,
            marginBottom: 24,
          }}>Agency Tiers</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {agencies.map(agency => (
              <div key={agency.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: `1px solid ${c.cardBorder}`,
              }}>
                <div>
                  <div style={{ fontSize: 15, color: c.text, fontWeight: 500 }}>
                    {agency.name}
                  </div>
                  <div style={{ fontSize: 13, color: c.textTertiary, marginTop: 2 }}>
                    {agency.count} agencies
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, color: c.text, fontFamily: mono, fontWeight: 600 }}>
                    {agency.revenue}
                  </div>
                  <div style={{ fontSize: 12, color: c.positive, marginTop: 2 }}>
                    +{agency.growth}% MoM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site metrics - spans full width */}
        <div style={{
          gridColumn: '1 / -1',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {siteMetrics.map(metric => (
            <div key={metric.label} style={{
              background: c.card,
              border: `1px solid ${c.cardBorder}`,
              borderRadius: 16,
              padding: 24,
            }}>
              <div style={{ fontSize: 13, color: c.textTertiary, marginBottom: 8 }}>
                {metric.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: c.text,
                  fontFamily: mono,
                  letterSpacing: -1,
                }}>{metric.value}</span>
                <span style={{
                  fontSize: 13,
                  color: c.positive,
                }}>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div style={{
          gridColumn: '1 / -1',
          background: c.card,
          border: `1px solid ${c.cardBorder}`,
          borderRadius: 16,
          padding: 28,
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: c.text,
            margin: 0,
            marginBottom: 20,
          }}>Recent Migrations</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { site: 'agency-starter.com', from: 'WP Engine', status: 'completed', time: '2 hours ago' },
              { site: 'pro-digital.co', from: 'Kinsta', status: 'in-progress', time: '4 hours ago' },
              { site: 'enterprise-media.net', from: 'Flywheel', status: 'completed', time: '6 hours ago' },
              { site: 'starter-dev.io', from: 'SiteGround', status: 'pending', time: '8 hours ago' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: c.bg,
                borderRadius: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: item.status === 'completed' ? c.positive
                      : item.status === 'in-progress' ? c.barFilled
                      : c.textTertiary,
                  }} />
                  <div>
                    <div style={{ fontSize: 14, color: c.text }}>{item.site}</div>
                    <div style={{ fontSize: 12, color: c.textTertiary }}>from {item.from}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: c.textTertiary }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
