import { userLoginApi, userRegistApi, vertifySMSApi } from "@/api/users";
import { userSelector } from "@/recoil/user";
import { setCookie } from "@/util/authCookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import Button from "../button/Button";
import { Radio } from "./Input";
import dayjs from "dayjs";

type formPropsType = {
  tab: number;
  registType?: "login" | "regist";
  isRegistration?: string;
  setTab?: React.Dispatch<React.SetStateAction<number>>;
};

const RegistForm = ({
  tab,
  setTab,
  registType = "regist",
  isRegistration,
}: formPropsType) => {
  // const [sms, setSms] = useState(0);
  const setUserAtk = useSetRecoilState(userSelector("atk"));
  const setUserInfo = useSetRecoilState(userSelector("role"));
  const router = useRouter();
  const [selectedAdult, setSelectedAdult] = useState("");
  const [sms, setSms] = useState({
    inputnumber: 0, // 문자 입력
    sendsms: 0, // api로 받은문자 인증번호
    vertifysms: 0, // 인증번호 입력
    success: false, // 인증번호 입력 확인
  });

  const today = dayjs();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  // 인증번호 발송
  const vertifySms = () => {
    // console.log('dd', watch().phone)
    const a = watch().phone?.toString();
    if (a?.length == 11 && a.includes("010")) {
      console.log("문자발송", a, typeof a);
      vertifySMSApi(a).then((res) => {
        console.log("res", res);
        setSms((prevState) => ({
          ...prevState,
          sendsms: res.data.randomCode,
        }));
      });
    } else {
      alert("010을 포함한 11자리를 입력해주세요");
    }
  };

  // 인증번호 확인
  const okSms = () => {
    // e.preventDefault();
    console.log(sms.sendsms, watch().chkVertifysms);
    // let inputsms = watch().chkVertifysms
    if (sms.sendsms == watch().chkVertifysms) {
      console.log("맞음");
      setSms((sms) => ({
        ...sms,
        success: true,
      }));
    } else {
      alert("다시 한번 확인해주세요");
    }
  };

  const onChange = (e: any) => {
    const key = e.target.value;
    setSms((prevState) => ({
      ...prevState,
      inputnumber: key,
    }));
  };

  const handleGenderChange = (e: any) => {
    // console.log('ee', e);
    setSelectedAdult(e.target.value);
  };

  // console.log('회원가입 폼 : ', watch(), isRegistration)

  const onSubmit = (data: any) => {
    console.log(
      "form : ",
      data.username,
      data.password,
      data.phone,
      selectedAdult === "adult" ? true : false,
      isRegistration === "isRegistrationTrue" ? true : false,
      false
    );
    if (sms.success) {
      userRegistApi(
        data.username,
        data.password,
        data.phone,
        selectedAdult === "adult" ? true : false,
        isRegistration === "isRegistrationTrue" ? true : false,
        false
      ).then((res) => {
        userLoginApi(data.username, data.password).then((res) => {
          console.log("res", res.data);
          setUserAtk(res.data.accessToken);
          setCookie("rtk", res.data.refreshToken, {
            path: "/",
            secure: "/",
          });
          setUserInfo("isRegistrationTrue" ? "ROLE_REGISTRANT" : "ROLE_USER");
          router.push("/");
        });
      });
    } else {
      alert("인증을 완료해주세요");
    }
    // userRegistApi()
  };

  // useEffect(() => {
  //   setTab(-1);
  // }, [isRegistration])

  return (
    <div>
      {isRegistration !== "" && (
        <form className="mt-40 w-full" onSubmit={handleSubmit(onSubmit)}>
          {tab === 1 && (
            <>
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

              {registType === "regist" && (
                <>
                  <div className="mb-10">
                    <div className="flex gap-6">
                      성인 여부
                      <Radio
                        name="adultchk"
                        id="미성년"
                        label="미성년"
                        value="unadult"
                        checked={selectedAdult === "unadult"}
                        onChange={handleGenderChange}
                      />
                      <Radio
                        name="adultchk"
                        id="성년"
                        label="성년"
                        value="adult"
                        checked={selectedAdult === "adult"}
                        onChange={handleGenderChange}
                      />
                    </div>
                    {selectedAdult === "false" && (
                      <small role="alert">성인여부를 체크해주세요</small>
                    )}
                  </div>
                  <div className="mb-10">
                    <div className="flex items-center gap-6 whitespace-pre">
                      전화번호
                      <input
                        type="text"
                        id=""
                        placeholder="- 을 제외한 11자리입력"
                        maxLength={11}
                        disabled={sms.sendsms != 0 ? true : false}
                        {...register("phone", {
                          required: "- 을 제외한 11자리입력",
                          minLength: {
                            value: 11,
                            message: "11자리 입력해주세요.",
                          },
                        })}
                      />
                      <Button
                        size="small"
                        onClick={(e: any) => {
                          // e.stopPropagation();
                          e.preventDefault();
                          vertifySms();
                        }}
                      >
                        문자인증
                      </Button>
                    </div>
                    {errors.phone && (
                      <small role="alert">{errors.phone.message}</small>
                    )}
                  </div>
                  {sms.sendsms !== 0 && sms.success == false && (
                    <div className="mb-10">
                      <div className="flex items-center gap-6 whitespace-pre">
                        인증번호
                        <input
                          type="text"
                          id="chkVertifysms"
                          placeholder="문자로 수신된 인증번호 입력"
                          // onChange={chkonChange}
                          maxLength={4}
                          {...register("chkVertifysms", {
                            required: "인증문자를 입력해주세요",
                            minLength: {
                              value: 4,
                              message: "4자리 입력해주세요.",
                            },
                          })}
                        />
                        <Button
                          size="small"
                          onClick={(e: any) => {
                            e.preventDefault();
                            okSms();
                          }}
                        >
                          {" "}
                          확인
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
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
                {registType === "login" ? "로그인" : "회원 가입"}
              </Button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default RegistForm;
