import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";
import { useSelector } from "react-redux";

export default function Profile() {
   const { user } = useSelector((state) => state.auth);

  return (
    <section className="rounded-4xl bg-(--color-surface) p-6 shadow-(--shadow-lg) md:p-8">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-(--color-surface-lowest) p-6 shadow-(--shadow-sm) md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-(--color-text-primary)">
            My Profile
          </h1>

          <p className="mt-2 text-(--color-text-muted)">
            View your account information.
          </p>
        </div>

        <Button type="button" variant="admin" className="w-fit px-5">
          <span className="material-symbols-outlined text-[20px]">
            edit
          </span>
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <InfoBox
          title="Profile"
          icon="person"
          className="h-fit border border-(--color-border) bg-(--color-surface-lowest) shadow-(--shadow-sm)"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-(--color-secondary) text-(--color-on-secondary) shadow-(--shadow-md)">
              <span className="material-symbols-outlined text-[72px]">
                person
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-(--color-text-primary)">
              {user.fullName}
            </h2>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              {user.email}
            </p>
          </div>
        </InfoBox>

        <InfoBox
          title="Account Information"
          icon="badge"
          className="border border-(--color-border) bg-(--color-surface-lowest) shadow-(--shadow-sm)"
        >
          <div className="grid grid-cols-1 gap-4">
            <ProfileItem
              icon="person"
              label="Full Name"
              value={user.full_name}
            />

            <ProfileItem
              icon="email"
              label="Email"
              value={user.email}
            />

            <ProfileItem
              icon="call"
              label="Phone"
              value={user.phone}
            />
          </div>
        </InfoBox>
      </div>
    </section>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-(--color-surface-low) p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-secondary)/10 text-(--color-secondary)">
        <span className="material-symbols-outlined text-[22px]">
          {icon}
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-muted)">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-bold text-(--color-text-primary)">
          {value}
        </p>
      </div>
    </div>
  );
}
