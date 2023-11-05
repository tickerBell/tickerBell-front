"use client";

import { userInfoApi, userReserveApi } from "@/api/users";
import { getSession } from "@/hooks/useSeection";
import { userSelector } from "@/recoil/user";
import { getCookie } from "@/util/authCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Menu = () => {
  // console.log('권한: ', getRole && getRole, 'rtk : ', getCookie('rtk'), 'atk: ', getAtk)
  const getRole = useRecoilValue(userSelector("role"));
  const setIsLogin = useSetRecoilState(userSelector("isLogin"));
  const getIsLogin = useRecoilValue(userSelector("isLogin"));
  const [atk, setAtk] = useState("");
  const router = useRouter();

  const page = 0;
  const size = 1;
  const sort = ["string"];

  useEffect(() => {
    setAtk(getCookie("ticket-atk"));
    setIsLogin(getCookie("ticket-atk") !== null ? true : false);
    userInfoApi(getCookie("ticket-atk")).then((res) =>
      console.log("re정보: ", res)
    );
    userReserveApi(page, size, sort).then((res) =>
      console.log("list정보: ", res)
    );
  }, []);

  // console.log("cc", getIsLogin, atk, getCookie("ticket-atk"));
  const handleMyPageClick = (e: any) => {
    if (!atk) {
      e.preventDefault();
      alert("로그인 후 이용해주세요");
      router.push("/login");
    }
  };

  return (
    <div className="flex gap-6 text-[14px]">
      {/* {isDev && } */}
      <Link href="/modal">모달 임시</Link>

      {getRole === "ROLE_REGISTRANT" && (
        <Link href="/event_regist">이벤트 등록</Link>
      )}
      {!atk && <Link href="/login">로그인</Link>}
      <Link href="/regist">회원가입</Link>
      <Link href="/mypage" onClick={handleMyPageClick}>
        마이페이지
      </Link>
      <Link href="/reserve" onClick={handleMyPageClick}>
        예약확인/취소
      </Link>
    </div>
  );
};

export default Menu;
