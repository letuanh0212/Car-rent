import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";

const stats = [
  {
    label: "Monthly Revenue",
    value: "$428,590",
    trend: "+12.5% from last month",
    icon: "payments",
    positive: true,
  },
  {
    label: "Avg Booking Value",
    value: "$1,245",
    trend: "+4.2% from last month",
    icon: "event_available",
    positive: true,
  },
  {
    label: "Top Customer",
    value: "Sophia Chen",
    trend: "14 bookings this year",
    icon: "person",
    positive: false,
  },
];

const revenueBars = [
  { label: "Mon", value: "40%" },
  { label: "Tue", value: "65%" },
  { label: "Wed", value: "85%", active: true },
  { label: "Thu", value: "55%" },
  { label: "Fri", value: "70%" },
];

export default function Dashboard() {
  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-(--color-text-primary)">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-(--color-text-muted)">
            Performance insights for the current fiscal quarter.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="min-h-10 border border-(--color-border) bg-(--color-surface-lowest) px-4 normal-case"
          >
            <span className="material-symbols-outlined text-[20px]">
              calendar_month
            </span>
            Last 30 Days
          </Button>

          <Button
            type="button"
            variant="admin"
            className="min-h-10 px-4 normal-case shadow-(--shadow-sm)"
          >
            <span className="material-symbols-outlined text-[20px]">
              file_download
            </span>
            Export Report
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <InfoBox
        title="Revenue Trends"
        icon="monitoring"
        className="p-6 md:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-(--color-text-muted)">
              Weekly revenue performance across active bookings.
            </p>
          </div>

          <select className="min-h-10 rounded-lg border border-(--color-border) bg-(--color-surface-lowest) px-4 text-sm font-semibold text-(--color-text-secondary) outline-none transition focus:border-(--color-admin-primary) focus:ring-2 focus:ring-(--color-admin-primary-bg)">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="flex h-64 items-end gap-4 border-b border-(--color-border) pb-4">
          {revenueBars.map((bar) => (
            <div
              key={bar.label}
              className="flex h-full flex-1 flex-col justify-end gap-3"
            >
              <div
                className={[
                  "rounded-t-lg transition-all",
                  bar.active
                    ? "bg-(--color-admin-primary)"
                    : "bg-(--color-admin-primary-bg)",
                ].join(" ")}
                style={{ height: bar.value }}
              />
              <span className="text-center text-xs font-semibold text-(--color-text-muted)">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </InfoBox>
    </section>
  );
}

function StatCard({
  label,
  value,
  trend,
  icon,
  positive,
}) {
  return (
    <InfoBox title={label} icon={icon} className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-(--color-text-primary)">
            {value}
          </h2>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-admin-primary-bg) text-(--color-admin-primary)">
          <span className="material-symbols-outlined text-[22px]">
            {icon}
          </span>
        </span>
      </div>

      <p
        className={[
          "mt-4 text-sm font-semibold",
          positive
            ? "text-(--color-success)"
            : "text-(--color-text-muted)",
        ].join(" ")}
      >
        {trend}
      </p>
    </InfoBox>
  );
}
