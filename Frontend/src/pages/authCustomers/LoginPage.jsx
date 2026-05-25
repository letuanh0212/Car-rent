import InputWithIcon from "~/components/Inputs/InputWithIcon";
import InputField from "~/components/Inputs/InputField";
import Button from "~/components/Button";

import FormCard from "~/components/Form/FormCard";
import FormActions from "~/components/Form/FormActions";
// import FormRow from "~/components/Form/FormRow";
import useCustomerLogin  from '~/hooks/AuthCus/useCustomerLogin';

import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, loading, error } = useCustomerLogin();
    
    const handleLogin = async (e) => { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        try{
            await login(data);
            navigate("/");
        }catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
    <div className="flex min-h-screen items-center justify-center bg-(--color-background) px-4">
      <FormCard
        title="Login to Your Account"
        subtitle="Welcome back to LuxeDrive."
      >
        <form className="flex flex-col gap-5"
              onSubmit={handleLogin}>
          {/* Email */}
          <InputField label="Email">
            <InputWithIcon
              type="email"
              name="email"
              placeholder="Enter your email"
              icon="email"
            />
          </InputField>
          {/* Password */}
          <InputField label="Password">
            <InputWithIcon
              type="password"
              name="password"
              placeholder="Enter your password"
              icon="lock"
            />
          </InputField>
          {error && (
            <p className="text-sm text-(--color-error)">
              {error}
            </p>
          )}
          {/* Forgot password */}
          <div className="flex justify-end -mt-2">
            <Button
              variant="ghost"
              className="px-0 text-xs font-medium normal-case"
            >
              Forgot Password?
            </Button>
          </div>

          <FormActions>
            {/* Main login button */}
            <Button variant="outline" fullWidth>
                {loading ? "Logging in..." : "Login"}
            </Button>
            {/* Create account button */}
            <Button variant="outline" fullWidth onClick={() => navigate("/register")}>
              Create Account
            </Button>
          </FormActions>
        </form>
      </FormCard>
    </div>
  );
}
