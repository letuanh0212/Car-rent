import InputWithIcon from "~/components/Inputs/InputWithIcon";
import InputField from "~/components/Inputs/InputField";
import Button from "~/components/Button";

import FormCard from "~/components/Form/FormCard";
import FormActions from "~/components/Form/FormActions";
// import FormRow from "~/components/Form/FormRow";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-1 pt-28 pb-10">
      <FormCard
        title="Create an Account"
        subtitle="Join LuxeDrive today."
      >
        <form className="flex flex-col gap-5">
          {/* Email */}
            <InputField label="Full Name">
            <InputWithIcon
              type="text"
              placeholder="Enter your full name"
              icon="person"
            />
          </InputField>
            <InputField label="Email">
            <InputWithIcon
              type="email"
              placeholder="Enter your email"
              icon="email"
            />
          </InputField>
          <InputField label="Password">
            <InputWithIcon
              type="password"
              placeholder="Enter your password"
              icon="lock"
            />
          </InputField>
          <InputField label="Confirm Password">
            <InputWithIcon
              type="password"
              placeholder="Confirm your password"
              icon="lock"
            />
          </InputField>
          <InputField label="Phone Number">
            <InputWithIcon
              type="tel"
              placeholder="Enter your phone number"
              icon="phone"
            />
          </InputField>
          <FormActions>
            <Button variant="outline" fullWidth>
              Register
            </Button>
            <Button variant="outline" fullWidth>
              Create Account
            </Button>
          </FormActions>
        </form>
      </FormCard>
    </div>
  );
}