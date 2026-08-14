import { motion } from "framer-motion";

const companies = ["TATA", "adani", "Jindal Steel", "ITC", "Godrej", "DANONE", "PEPSICO"];

function TrustedCompanies() {
  return (
    <section className="bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-px w-24 bg-slate-300 sm:block" />
          <h2 className="text-center text-xs font-black uppercase tracking-[0.36em] text-slate-700 sm:text-sm">
            Trusted By Industry Leaders
          </h2>
          <span className="hidden h-px w-24 bg-slate-300 sm:block" />
        </div>

        <div className="-mx-4 mt-7 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex min-w-max items-center justify-between gap-10 sm:min-w-0 lg:gap-14">
            {companies.map((company, index) => (
              <motion.a
                href="#contact"
                key={company}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.45 }}
                className="group inline-flex min-w-28 items-center justify-center"
                aria-label={`${company} client logo`}
              >
                <span className="text-2xl font-black uppercase tracking-tight text-slate-600 opacity-95 transition duration-300 group-hover:text-[#C2441C] group-hover:opacity-100 sm:text-3xl">
                  {company}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedCompanies;
