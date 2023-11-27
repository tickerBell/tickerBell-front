"use client";

import { userInfoApi, userLoginApi } from "@/api/users";
import { userSelector } from "@/recoil/user";
import { setCookie } from "@/util/authCookie";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import Button from "../button/Button";
import axios from "axios";

type formPropsType = {
  tab: number;
  setTab?: React.Dispatch<React.SetStateAction<number>>;
};

const LoginForm = ({ tab, setTab }: formPropsType) => {
  // const [sms, setSms] = useState(0);
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const setUserInfo = useSetRecoilState(userSelector("role"));
  const setNonMember = useSetRecoilState(userSelector('nonMember'));


  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

  // console.log('회원가입 폼 : ', watch(), isRegistration)

  const onSubmit = (data: any) => {
    if (tab === 1) {
      userLoginApi(data.username, data.password)
        .then((res) => {
          setIsLogin(true);
          userInfoApi(res.data.accessToken).then((res) => {
            setUserInfo(res?.data.role)
          })
          setCookie("ticket-atk", res.data.accessToken, {
            path: "/",
            secure: "/",
          });
          setCookie("ticket-rtk", res.data.refreshToken, {
            path: "/",
            secure: "/",
          });
          setUserInfo("isRegistrationTrue" ? "ROLE_REGISTRANT" : "ROLE_USER");
          router.push("/");
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/emitter/subscribe`, {
              headers: {
                "Authorization": `Bearer ${res.data.accessToken}`,
                "Content-Type": "text/event-stream",
                Connection: "keep-alive",
                // "Cache-Control": "no-cache",
              },
            })
            .then((res) => console.log("sse test: ", res));
        })
        .catch((err) => console.log('err', err));
    }
    if (tab === 2) {
      setIsLogin(true);
      setCookie("ticket-atk", { name: data.username, phone: data.phone }, {
        path: "/",
        secure: "/",
        expires: oneHourFromNow
      });
      // setNonMember({ name: data.username, phone: data.phone });
      router.push("/");
    }
  };

  return (
    <div>
      {tab !== -1 &&
        <form className="mt-40 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {tab === 2 && <div className="text-[14px]">비회원은 재접속시 로그인 상태가 유지되지 않습니다</div>}
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

            {tab === 1 &&
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
            }

            {tab === 2 && <div className="mb-10">
              <div className="flex gap-6">
                <label>전화번호</label>
                <input
                  type="text"
                  id=""
                  placeholder="- 을 제외한 11자리입력"
                  maxLength={11}
                  {...register("phone", {
                    required: "- 을 제외한 11자리입력",
                    minLength: {
                      value: 11,
                      message: "11자리 입력해주세요.",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <small role="alert">{errors.phone.message}</small>
              )}
            </div>}

            <Button
              className="bottom-0"
              full
              type="submit"
            // disabled={!isSubmitting}
            // disabled={true}
            // onClick={() => {

            // }}
            >
              로그인
            </Button>
          </div>
        </form>
      }
    </div>
  );
};

export default LoginForm;
