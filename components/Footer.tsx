export default function Footer() {
  return (
    <footer className="bg-[#0b1120] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-white mb-2">
              Franklin Community Health Assessment
            </h3>
            <p className="text-sm text-white/50">
              Voice AI-powered community health survey for the City of Franklin, Wisconsin.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Organization</h3>
            <ul className="text-sm text-white/50 space-y-1">
              <li>Franklin Health Department</li>
              <li>City of Franklin, Wisconsin</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Links</h3>
            <ul className="text-sm text-white/50 space-y-1">
              <li>
                <a
                  href="https://www.franklinwi.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  City of Franklin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/25">
          &copy; {new Date().getFullYear()} City of Franklin Health Department
        </div>
      </div>
    </footer>
  );
}
