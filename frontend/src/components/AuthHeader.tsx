import { Link } from "react-router-dom";

const AuthHeader = ({ type }: { type: "signUp" | "signIn" }) => {
  return (
    <div>
      <div className="text-4xl font-bold">
        {type === "signUp" ? (
          <div> Create an Account</div>
        ) : (
          <div> Sign In to Continue </div>
        )}
      </div>
      <div className="text-lg text-slate-500">
        {type === "signUp" ? (
          <div>
            {" "}
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign In
            </Link>
          </div>
        ) : (
          <div>
            Create an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
