// import { postEventImageApi } from "@/api/events";
// import { useMutation } from "@tanstack/react-query";

// export function useEventImageUpload() {
//   const mutation = useMutation(
//     ({ atk, thumbNailImage, eventImages }) =>
//       postEventImageApi(atk, thumbNailImage, eventImages),
//     {
//       onSuccess: (data) => {
//         // 업로드 성공 시 수행할 작업
//         console.log("업로드 성공:", data);
//       },
//       onError: (error) => {
//         // 업로드 실패 시 수행할 작업
//         console.error("업로드 중 에러 발생:", error);
//       },
//     }
//   );

//   return mutation;
// }
