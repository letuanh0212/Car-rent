import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputWithIcon from "~/components/Inputs/InputWithIcon";
import InputField from "~/components/Inputs/InputField";
import Button from "~/components/Button";

import FormCard from "~/components/Form/FormCard";
import FormActions from "~/components/Form/FormActions";

import useCustomerRegister from "~/hooks/AuthCus/useCustomerRegister";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { register, loading, error } = useCustomerRegister();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--color-background) px-4 pt-28 pb-10">
      <FormCard
        title="Create an Account"
        subtitle="Join LuxeDrive today."
        className="w-full max-w-xl"
      >
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <InputField label="Full Name">
            <InputWithIcon
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              icon="person"
            />
          </InputField>

          <InputField label="Email">
            <InputWithIcon
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              icon="email"
            />
          </InputField>

          <InputField label="Password">
            <InputWithIcon
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon="lock"
            />
          </InputField>

          <InputField label="Confirm Password">
            <InputWithIcon
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              icon="lock"
            />
          </InputField>

          <InputField label="Phone Number">
            <InputWithIcon
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              icon="phone"
            />
          </InputField>

          {error && (
            <p className="text-sm font-semibold text-(--color-error)">
              {error}
            </p>
          )}

          <FormActions>
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              type="submit"
              variant="admin"
              fullWidth
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </FormActions>
        </form>
      </FormCard>
    </div>
  );
}
