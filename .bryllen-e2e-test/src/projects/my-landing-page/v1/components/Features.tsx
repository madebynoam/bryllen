export function Features() {
  return <section style={{ padding: 'var(--space-lg)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
    {['Fast', 'Secure', 'Scalable'].map(f => (
      <div key={f} style={{ background: 'var(--surface)', padding: 'var(--space-md)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <h3 style={{ color: 'var(--primary)' }}>{f}</h3>
        <p style={{ color: 'var(--text)' }}>Built for modern teams.</p>
      </div>
    ))}
  </section>
}
