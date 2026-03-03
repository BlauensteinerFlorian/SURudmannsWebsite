export default function Datenschutz() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a18] text-white py-16">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h1 className="text-4xl font-bold text-[#ff6600] mb-4">Datenschutzerklärung</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700 mb-6">
            Wir freuen uns über Ihren Besuch auf unserer Website. Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Diese Datenschutzerklärung informiert Sie über die Verarbeitung Ihrer personenbezogenen Daten auf unserer Website.
          </p>

          {/* 1. Verantwortlicher */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">1. Verantwortlicher</h2>
            <p className="text-gray-700">
              <strong>Sportunion Rudmanns</strong><br />
              Birkenstadion Stift Zwettl<br />
              Stift Zwettl<br />
              Österreich<br />
              E-Mail: info@surudmanns.at
            </p>
          </div>

          {/* 2. Erhebung und Verarbeitung personenbezogener Daten */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p className="text-gray-700 mb-4">
              Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Dienste erforderlich ist. Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, außer:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Bei gesetzlicher Auskunftspflicht</li>
              <li>Zur Durchführung von Spielbetrieb und Meisterschaften (an Verbände)</li>
              <li>Mit Ihrer ausdrücklichen Zustimmung</li>
            </ul>
          </div>

          {/* 3. Kontaktformular */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">3. Kontaktformular / Turnieranmeldung</h2>
            <p className="text-gray-700">
              Bei der Anmeldung zu unserem Pfingstturnier erheben wir folgende Daten: Name, E-Mail-Adresse, Telefonnummer und Teamname. Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anmeldung verwendet und nicht an Dritte weitergegeben.
            </p>
          </div>

          {/* 4. Spielerdaten */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">4. Spielerdaten</h2>
            <p className="text-gray-700">
              Informationen über Spieler (Name, Position, Geburtsdatum, Fotos) werden nur mit ausdrücklicher Zustimmung der Betroffenen (bzw. Erziehungsberechtigten) erhoben und für die Öffentlichkeitsarbeit des Vereins (Website, Social Media) verwendet.
            </p>
          </div>

          {/* 5. Cookies */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">5. Cookies</h2>
            <p className="text-gray-700">
              Diese Website verwendet keine Cookies zur Tracking- oder Werbezwecken. Technisch notwendige Session-Cookies werden beim Schließen des Browsers automatisch gelöscht.
            </p>
          </div>

          {/* 6. Ihre Rechte */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">6. Ihre Rechte</h2>
            <p className="text-gray-700 mb-4">
              Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Auskunft:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen.</li>
              <li><strong>Berichtigung:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong>Löschung:</strong> Sie können die Löschung Ihrer Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong>Widerspruch:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Zur Ausübung dieser Rechte wenden Sie sich bitte an: info@surudmanns.at
            </p>
          </div>

          {/* 7. Änderungen */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#ff6600]">7. Änderungen dieser Erklärung</h2>
            <p className="text-gray-700">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version finden Sie stets auf dieser Website.
            </p>
          </div>

          {/* Stand */}
          <div className="text-sm text-gray-500 mt-12 pt-4 border-t">
            <p>Stand: März 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}
