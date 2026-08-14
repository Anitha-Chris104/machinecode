import { GearIcon, ShieldIcon, TruckIcon, UserIcon } from "./icons";

const badges = [
  { label: "ISO Certified", icon: ShieldIcon },
  { label: "15+ Years Experience", icon: UserIcon },
  { label: "Custom Engineering", icon: GearIcon },
  { label: "Nationwide Service", icon: TruckIcon },
];

function TrustBadges() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-0">
      {badges.map(({ label, icon: Icon }, index) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-3 py-3 text-left backdrop-blur sm:border-y-0 sm:border-l-0 sm:border-r sm:bg-transparent sm:px-4 sm:py-0 sm:last:border-r-0 lg:first:pl-0"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/80 text-white">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold leading-tight text-white sm:max-w-24 sm:text-sm">
            {index === 1 ? (
              <>
                15+ Years
                <br />
                Experience
              </>
            ) : index === 2 ? (
              <>
                Custom
                <br />
                Engineering
              </>
            ) : index === 3 ? (
              <>
                Nationwide
                <br />
                Service
              </>
            ) : (
              label
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;
