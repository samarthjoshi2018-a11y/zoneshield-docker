import "./css/home.css";
export default function Help() {
  return (
    <>
      <div className="maincontainer">
        <div className="helpecontainer help-section">
          <h1 className="help-title">Most Frequent Questions</h1>

          <div className="faq-container">
            <div className="faq-card">
              <h3>How does this application work?</h3>
              <p>
                This application allows you to set up a virtual geofence around
                a specific location. You can customize the radius and set a
                timer. If the device breaches the geofence, email notifications
                are sent to your registered addresses.
              </p>
            </div>

            <div className="faq-card">
              <h3>How do I set up my geofence?</h3>
              <p>
                Go to the Controls page. Drag and resize the shield to cover
                your desired area. Set the radius and timer, then click "Set".
                Make sure to provide valid email addresses for alerts.
              </p>
            </div>

            <div className="faq-card">
              <h3>What happens if my device breaches the geofence?</h3>
              <p>
                You will receive email alerts immediately. The system logs the
                breach and starts a cooldown period. Notifications are sent
                every 5 minutes until the device returns inside the zone.
              </p>
            </div>

            <div className="faq-card">
              <h3>Is my data secure?</h3>
              <p>
                Yes. We use industry-standard encryption to protect your data
                and ensure only you can access your geofence settings and
                alerts.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
