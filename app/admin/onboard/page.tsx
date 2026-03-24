export default function AdminOnboardPage() {
  const steps = [
    {
      id: 1,
      state: "done" as const,
      title: "Commission accepted",
      desc: "Begin form submitted and reviewed",
    },
    {
      id: 2,
      state: "done" as const,
      title: "NDA & agreement signed",
      desc: "Legal docs executed",
    },
    {
      id: 3,
      state: "current" as const,
      title: "Client workspace created",
      desc: "Set up account and subscription below",
    },
    {
      id: 4,
      state: "todo" as const,
      title: "Welcome email sent",
      desc: "Platform access and onboarding kit",
    },
    {
      id: 5,
      state: "todo" as const,
      title: "Kick-off scheduled",
      desc: "Discovery session booked",
    },
  ];

  return (
    <>
      <header className="dashboard-page-header">
        <h2>Onboard New Client</h2>
        <p>Set up a client workspace and subscription</p>
      </header>

      <div className="dashboard-grid-2">
        <div>
          <section className="dashboard-card onboard-panel" style={{ marginBottom: 12 }}>
            <div className="dashboard-card-header">
              <span className="onboard-card-title">Onboarding Steps</span>
            </div>
            {steps.map((step) => (
              <div key={step.id} className="onboard-step">
                <div className={`onboard-step-num ${step.state}`}>
                  {step.state === "done" ? "✓" : step.id}
                </div>
                <div>
                  <div className="onboard-step-title">{step.title}</div>
                  <div className="onboard-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div>
          <section className="dashboard-card onboard-panel">
            <div className="dashboard-card-header">
              <span className="onboard-card-title">Create Workspace</span>
            </div>

            <div className="onboard-form-field">
              <label className="onboard-form-label">Organisation Name</label>
              <input className="onboard-form-input" placeholder="e.g. Pan-African Law Practice" />
            </div>

            <div className="onboard-form-row">
              <div className="onboard-form-field" style={{ marginBottom: 0 }}>
                <label className="onboard-form-label">Contact Name</label>
                <input className="onboard-form-input" placeholder="Full name" />
              </div>
              <div className="onboard-form-field" style={{ marginBottom: 0 }}>
                <label className="onboard-form-label">Role / Title</label>
                <input className="onboard-form-input" placeholder="e.g. Managing Partner" />
              </div>
            </div>

            <div className="onboard-form-field" style={{ marginTop: 12 }}>
              <label className="onboard-form-label">Email</label>
              <input className="onboard-form-input" type="email" placeholder="client@organisation.com" />
            </div>

            <div className="onboard-form-field">
              <label className="onboard-form-label">Sector</label>
              <select className="onboard-form-select" defaultValue="Financial Services">
                <option>Financial Services</option>
                <option>Government</option>
                <option>Professional Services</option>
                <option>Infrastructure</option>
                <option>Healthcare</option>
                <option>Education</option>
              </select>
            </div>

            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 16, marginTop: 4 }}>
              <div className="onboard-card-title" style={{ marginBottom: 12 }}>
                Subscription
              </div>

              <div className="onboard-form-row">
                <div className="onboard-form-field" style={{ marginBottom: 0 }}>
                  <label className="onboard-form-label">Tier Name</label>
                  <input className="onboard-form-input" placeholder="e.g. Enterprise" />
                </div>
                <div className="onboard-form-field" style={{ marginBottom: 0 }}>
                  <label className="onboard-form-label">Monthly (ZAR)</label>
                  <input className="onboard-form-input" type="number" placeholder="38500" />
                </div>
              </div>

              <div className="onboard-form-field" style={{ marginTop: 12 }}>
                <label className="onboard-form-label">Included Services</label>
                <textarea
                  className="onboard-form-textarea"
                  placeholder="e.g. Brand Identity, Credentials, Digital Design — up to 3 active projects"
                />
              </div>

              <div className="onboard-form-row">
                <div className="onboard-form-field" style={{ marginBottom: 0 }}>
                  <label className="onboard-form-label">Start Date</label>
                  <input className="onboard-form-input" type="date" />
                </div>
                <div className="onboard-form-field" style={{ marginBottom: 0 }}>
                  <label className="onboard-form-label">Billing Day</label>
                  <input className="onboard-form-input" type="number" placeholder="1" min={1} max={28} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <button type="button" className="dashboard-tb-btn primary" style={{ width: "100%", justifyContent: "center" }}>
                Create Workspace & Send Invite →
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
