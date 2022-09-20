import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";

import { IRegister } from "../server/common/schemas";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { mutate } = trpc.useMutation("user.register", {
    onSuccess: () => {
      console.log("Logged in!");
    },
    onError: () => {
      console.log("This is broken");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <span>Field is required.</span>}
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <span>Field is required.</span>}
        <input {...register("email", { required: true })} />
        {errors.email && <span>Field is required.</span>}
        <input {...register("password", { required: true })} />
        {errors.password && <span>Field is required.</span>}
        <input {...register("confirmPassword", { required: true })} />
        {errors.confirmPassword && <span>Field is required.</span>}
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Home;
