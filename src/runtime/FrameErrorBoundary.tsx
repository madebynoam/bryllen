import React from 'react'

interface Props {
  children: React.ReactNode
  frameId: string
  title: string
}

interface State {
  error: Error | null
}

export class FrameErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', fontSize: 13, color: '#c00' }}>
          <strong>{this.props.title}</strong> crashed:<br />
          <code>{this.state.error.message}</code>
        </div>
      )
    }
    return this.props.children
  }
}
