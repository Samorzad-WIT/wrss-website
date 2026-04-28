export default function CalendarEmbed() {
  const calendarId = "YOUR_CALENDAR_ID"; // DO UZUPEŁNIENIA
  const calendarEmbedUrl = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=Europe%2FWarsaw&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&color=%23b91c1c`;
  const subscribeUrl = `https://calendar.google.com/calendar/render?cid=${calendarId}`;

  return (
    <div className="calendar-container">
      <iframe
        src={calendarEmbedUrl}
        className="calendar-iframe"
        scrolling="no"
        title="Kalendarz WRSS"
      ></iframe>
      <div className="calendar-actions">
        <a
          href={subscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Dodaj do mojego Google Calendar
        </a>
      </div>
    </div>
  );
}
