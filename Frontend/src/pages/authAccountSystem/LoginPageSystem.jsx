import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InfoBox from "~/components/InfoBox";
import InputField from "~/components/Inputs/InputField";
import InputWithIcon from "~/components/Inputs/InputWithIcon";
import Button from "~/components/Button";

import useAccountAuth from "~/hooks/AuthAcc/accountLogin";

export default function LoginSystem() {
  const navigate = useNavigate();

  const { login, loading, error } = useAccountAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(formData);

      console.log(result);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-surface) p-6">
      <div className="grid w-full max-w-120 grid-cols-1 gap-4">

        <form onSubmit={handleSubmit}>
          <InfoBox
            title="System LUXE CAR"
            icon="person"
            className="w-full"
          >

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

            {error && (
              <p className="text-sm text-(--color-error)">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="outline"
              fullWidth
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login To Dashboard"}
            </Button>

          </InfoBox>
        </form>

      </div>
    </div>
  );
}
