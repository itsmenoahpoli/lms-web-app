import React from "react";
import { useForm } from "react-hook-form";

export const SigninForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = handleSubmit(async (formData: any) => {
    console.log(formData);
  });

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h1 className="text-center text-lg text-white font-medium">SIGN IN</h1>
      <p className="text-xs text-slate-300">Provide your credentials</p>

      <form className="w-full flex flex-col gap-y-3" onSubmit={handleLogin}>
        <div className="flex flex-col gap-y-1">
          <input
            type="text"
            placeholder="Your e-mail address"
            className={errors.email ? "border border-red-400" : ""}
            {...register("email", { required: true })}
          />
          {errors.email ? (
            <small className="text-xs text-red-400">E-mail is required</small>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            type="password"
            placeholder="Your password"
            className={errors.password ? "border border-red-400" : ""}
            {...register("password", { required: true })}
          />
          {errors.password ? (
            <small className="text-xs text-red-400">Password is required</small>
          ) : null}
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-xs font-light">
            Forgot your password?
          </a>
        </div>
        <button type="submit">SIGN IN</button>
        <div className="text-xs text-center mt-4">
          <p className="text-white">
            Don't have an account?
            <a href="#" className="ml-1 hover:underline">
              Click here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
