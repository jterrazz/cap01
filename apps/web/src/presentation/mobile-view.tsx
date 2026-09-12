import { Bell, NotebookPen, Smartphone, Waypoints } from 'lucide-react';

export function MobileView({ onConnect }: { onConnect: () => void }) {
    return (
        <section className="mobile-content">
            <Smartphone aria-hidden="true" className="page-symbol" size={32} strokeWidth={1.5} />
            <h1>Take cap01 with you.</h1>
            <p className="page-description">A little perspective, wherever your day takes you.</p>
            <button className="primary-button" onClick={onConnect} type="button">
                Connect device
            </button>
            <div aria-label="A companion for your day" className="feature-card">
                <div className="feature-row">
                    <Waypoints aria-hidden="true" />
                    <div>
                        <h2>Keep your momentum</h2>
                        <p>A space for your habits, at your own pace.</p>
                    </div>
                </div>
                <div className="feature-row">
                    <Bell aria-hidden="true" />
                    <div>
                        <h2>Make room for what matters</h2>
                        <p>Bring a little intention to the moments in between.</p>
                    </div>
                </div>
                <div className="feature-row">
                    <NotebookPen aria-hidden="true" />
                    <div>
                        <h2>Notice the small things</h2>
                        <p>Turn a passing thought into something to come back to.</p>
                    </div>
                </div>
            </div>
            <p className="mobile-note">Mobile companion in development</p>
        </section>
    );
}
