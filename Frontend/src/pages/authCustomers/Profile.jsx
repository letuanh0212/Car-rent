import Button from "~/components/Button";
import InfoBox from "~/components/InfoBox";
import InputField from "~/components/Inputs/InputField";
import InputWithIcon from "~/components/Inputs/InputWithIcon";

export default function Profile() {
  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-(--color-text-primary)">
          My Profile
        </h1>
        <p className="text-(--color-text-muted)">
          Manage your account information and preferences.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <InfoBox className="border border-(--color-border) bg-(--color-surface-lowest) shadow-(--shadow-sm)">
          <div className="flex flex-col items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-(--color-admin-primary-bg) text-(--color-admin-primary)]">
              <span className="material-symbols-outlined text-[54px]">
                person
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-bold text-(--color-text-primary)">
              Admin User
            </h2>
            <p className="mt-1 text-sm font-medium text-(--color-text-muted)">
              admin@gmail.com
            </p>

            <div className="mt-6 flex w-full flex-col gap-3">

              <div className="rounded-xl bg-(--color-surface-low) p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-muted)">
                  Role
                </p>

                <p className="mt-1 text-sm font-bold text-(--color-text-primary)">
                  Administrator
                </p>
              </div>

              <div className="rounded-xl bg-(--color-surface-low) p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-(--color-text-muted)">
                  Status
                </p>

                <p className="mt-1 text-sm font-bold text-(--color-success)">
                  Active
                </p>
              </div>

            </div>

          </div>

        </InfoBox>

        {/* RIGHT FORM */}
        <div className="lg:col-span-2">

          <InfoBox
            title="Profile Information"
            className="border border-(--color-border) bg-(--color-surface-lowest) shadow-(--shadow-sm)"
          >

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <InputField label="First Name">
                <InputWithIcon
                  icon="badge"
                  placeholder="John"
                />
              </InputField>

              <InputField label="Last Name">
                <InputWithIcon
                  icon="badge"
                  placeholder="Doe"
                />
              </InputField>

              <InputField label="Email Address">
                <InputWithIcon
                  type="email"
                  icon="email"
                  placeholder="admin@gmail.com"
                />
              </InputField>

              <InputField label="Phone Number">
                <InputWithIcon
                  icon="call"
                  placeholder="+84 123 456 789"
                />
              </InputField>

            </div>

            <div className="mt-6">
              <InputField label="Bio">
                <textarea
                  rows={5}
                  placeholder="Write something about yourself..."
                  className="
                    w-full rounded-xl border border-(--color-border)
                    bg-(--color-surface-lowest)
                    px-4 py-3
                    text-sm
                    text-(--color-text-primary)
                    outline-none
                    transition
                    focus:border-(--color-secondary)
                  "
                />
              </InputField>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">

              <Button
                type="button"
                variant="admin"
                className="px-6"
              >
                Save Changes
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="border border-(--color-border) px-6"
              >
                Cancel
              </Button>

            </div>

          </InfoBox>

        </div>

      </div>

    </section>
  );
}