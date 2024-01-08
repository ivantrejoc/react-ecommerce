"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignInSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .regex(
      new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/),
      "Password must have one digit, at least one lowercase, at least one uppercase"
    )
    .min(8, "Password is too short")
    .max(16, "Password is too long")
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema)
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
      // callbackUrl: "/"
    });

    if (signInData?.error) {
      console.log(signInData.error);
      alert("Invalid Credentials");
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex bg-white border-gray-400 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl"
      >
        <div className="hidden lg:block lg:w-1/2">
          <Image
            alt={"image"}
            src={"/models-images/engin-akyurt-jaZoffxg1yc-unsplash%201.png"}
            width={500}
            height={1500}
          />
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Buime
          </h2>
          <p className="text-xl text-center">Welcome again!</p>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-black text-center">
              Sign in with Google
            </h1>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              or Sign in with email
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-black text-sm font-semibold mb-2">
              Email
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              {...register("email")}
            />
            {errors?.email?.message && (
              <p className="text-xs text-gray-800">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-black text-sm font-semibold mb-2">
                Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              {...register("password")}
            />
            {errors?.password?.message && (
              <p className="text-xs text-gray-800">{errors.password.message}</p>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-black text-white font-semibold py-2 px-4 w-full rounded hover:bg-gray-800"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="/register" className="text-xs text-gray-500 uppercase">
              or Sign up
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
