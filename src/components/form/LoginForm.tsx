"use client";

import { userLoginApi } from "@/api/users";
import { userSelector } from "@/recoil/user";
import { setCookie } from "@/util/authCookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import Button from "../button/Button";

type formPropsType = {
  tab: number;
  setTab?: React.Dispatch<React.SetStateAction<number>>;
};

const LoginForm = ({ tab, setTab }: formPropsType) => {
  // const [sms, setSms] = useState(0);
  const setUserAtk = useSetRecoilState(userSelector("atk"));
  const setUserInfo = useSetRecoilState(userSelector("role"));

  const router = useRouter();
  const [selectedAdult, setSelectedAdult] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  const handleGenderChange = (e: any) => {
    // console.log('ee', e);
    setSelectedAdult(e.target.value);
  };

  // console.log('회원가입 폼 : ', watch(), isRegistration)

  const onSubmit = (data: any) => {
    console.log("data", data);
    userLoginApi(data.username, data.password)
      .then((res) => {
        setUserAtk(res.data.accessToken);
        setCookie("rtk", res.data.refreshToken, {
          path: "/",
          secure: "/",
        });
        setUserInfo("isRegistrationTrue" ? "ROLE_REGISTRANT" : "ROLE_USER");
        router.push("/");
      })
      .catch((err) => alert(err.response.data.data));
    // userRegistApi()
  };

  // useEffect(() => {
  //   setTab(-1);
  // }, [isRegistration])

  return (
    <div>
      {
        <form className="mt-40 w-full" onSubmit={handleSubmit(onSubmit)}>
          {tab === 1 && (
            <div>
              <div className="mb-10">
                <div className="flex gap-6">
                  <label>{tab === 1 ? "아이디" : "이름"}</label>
                  <input
                    type="text"
                    id="username"
                    placeholder={
                      tab === 1
                        ? "아이디를 입력해주세요"
                        : "이름을 입력해주세요"
                    }
                    maxLength={10}
                    {...register("username", {
                      required: "이름은 필수 입력입니다.",
                      minLength: {
                        value: 2,
                        message: "2자리 이상 입력해주세요.",
                      },
                    })}
                  />
                </div>
                {errors.username && (
                  <small role="alert">{errors.username.message}</small>
                )}
              </div>

              <div className="mb-10">
                <div className="flex gap-6">
                  <label>비밀번호</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                    minLength={6}
                    {...register("password", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 6,
                        message: "6자리 이상 입력해주세요.",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                        message: "영어와 숫자를 포함해주세요",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <small role="alert">{errors.password.message}</small>
                )}
              </div>

              <Button
                className="bottom-0"
                full
                type="submit"
                // disabled={!isSubmitting}
                // disabled={true}
                onClick={() => {
                  if (selectedAdult === "") {
                    setSelectedAdult("false");
                  }
                }}
              >
                로그인
              </Button>
            </div>
          )}
        </form>
      }
    </div>
  );
};

export default LoginForm;
