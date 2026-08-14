import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Applications = ({ product }) => {
  const applications = product?.applications || [];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Applications
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-800">
            Industries We Serve
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            This machine is engineered to deliver reliable performance across
            multiple industrial sectors with high productivity and efficiency.
          </p>
        </motion.div>

        {/* Cards */}
        {applications.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-8
                  text-center
                  shadow-md
                  transition-all
                  hover:border-orange-500
                  hover:shadow-xl
                "
              >
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 transition-all duration-300 group-hover:bg-orange-500">
                  <CheckCircle2
                    size={30}
                    className="text-orange-500 group-hover:text-white"
                  />
                </div>

                {/* Application */}
                <h3 className="mt-6 text-xl font-semibold text-slate-800">
                  {item}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Reliable performance for {item.toLowerCase()} applications.
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">
              Applications are currently unavailable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Applications;
