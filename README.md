# tickerBell 
- 간이 이벤트 결제, 예약 서비스

## 주요 로직
- 회원, 비회원 공통 : 로그인한 상태를 로컬스토리지에 저장.
- 회원 : 로그인시 atk 와 rtk 는 cookie에 저장.
- 비회원 : 로그인시 name과 phone을 내부 상태로 저장.

## 설계
- mutataion의 onSuccess시 리스트를 invalidateQueries를 이용해서 가져올때, 동적으로 바뀌는 변수(페이징)가 있다면 같이 넣어줘야 해서 전역으로 사용하기 위해 페이징넘버를 atom으로 지정.

### 사용기술


### style
tailwind로 시작하였으나 아래와 같은 불편함으로 생산성이 떨어져 혼용.
 - class merge 및 다양한 상태에 대한 대응의 불편함
 - 긴 class의 경우 재사용 및 관리의 불편함