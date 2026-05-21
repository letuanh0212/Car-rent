import InputWithIcon from "~/components/Inputs/InputWithIcon";
import InputField from "~/components/Inputs/InputField";
import Button from "~/components/Button";

import FormCard from "~/components/Form/FormCard";
import FormActions from "~/components/Form/FormActions";
// import FormRow from "~/components/Form/FormRow";
import UseCustomerLogin from "~/hooks/AuthCus/useAuthCus";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, loading, error } = UseCustomerLogin();
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
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4">
      <FormCard
        title="Login to Your Account"
        subtitle="Welcome back to LuxeDrive."
      >
        <form className="flex flex-col gap-5">
          {/* Email */}
          <InputField label="Email">
            <InputWithIcon
              type="email"
              placeholder="Enter your email"
              icon="email"
            />
          </InputField>

          {/* Password */}
          <InputField label="Password">
            <InputWithIcon
              type="password"
              placeholder="Enter your password"
              icon="lock"
            />
          </InputField>

          {/* Forgot password */}
          <div className="flex justify-end -mt-2" >
            <Button variant="ghost">
              Forgot Password?
            </Button>
          </div>

          <FormActions>
            {/* Main login button */}
            <Button variant="outline" fullWidth>
              loading ? "Logging in..." : "Login"
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