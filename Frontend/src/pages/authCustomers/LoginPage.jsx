// import Input from '~/components/Inputs';
import InputWithIcon from '~/components/Inputs/InputWithIcon';
import InputField from '~/components/Inputs/InputField';
import Button from '~/components/Button';



export default function LoginPage() {
    return (
        <>
            <div className="login-page">
                <div className="login-page__form">
                    <h2 className="login-page__title">Login to Your Account</h2>
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
                    <Button size="full">Login</Button>
                </div>
            </div>
        </>
    );
}
