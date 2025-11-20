import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Reset body style
document.body.style.backgroundColor = '';

console.log('Initializing application...');
console.log('Current Mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Window Location:', window.location.href);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red', backgroundColor: 'white', height: '100vh', overflow: 'auto' }}>
                    <h1>Application Crashed</h1>
                    <p>Something went wrong.</p>
                    <pre style={{ whiteSpace: 'pre-wrap', background: '#eee', padding: '10px', borderRadius: '5px' }}>
                        {this.state.error?.toString()}
                    </pre>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8em', color: '#666' }}>
                        {this.state.error?.stack}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

const rootElement = document.getElementById('app');

if (!rootElement) {
    console.error('FATAL: Could not find root element with id "app"');
    document.body.innerHTML = '<div style="color:red; padding:20px;">FATAL ERROR: Root element not found.</div>';
} else {
    try {
        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </React.StrictMode>,
        );
        console.log('Application mounted successfully.');
    } catch (e) {
        console.error('FATAL: Error during React mount:', e);
        rootElement.innerHTML = `<div style="color:red; padding:20px;">FATAL ERROR: Failed to mount React app.<br/>${e}</div>`;
    }
}
