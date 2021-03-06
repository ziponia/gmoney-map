# 경기도 지역화폐 가맹점 찾기

![gmoney_intro](./public/images/gmoney_intro.jpg)

## 개요

g-money-map은 경기도 지역화폐 가맹점을 사용자의 위치 및 지도의 중심위치 기반으로 지도위에 표시해주는 애플리케이션 입니다.

**내주변 가맹점 탐색**

사용자의 위치정보를 파악하고 그 위치 주변에서 경지도 지역화폐를 사용할 수 있는 가맹점들을 나타내 줍니다.

**직접 위치 검색**

사용자의 현재 위치 외에도 주소검색 및 직접 이동으로 맵의 중심위치를 파악한 후 그 주변으로 가맹점들의 위치를 확인 할 수 있습니다

**상호명 검색**

**카테고리별 가맹점 정보 탐색**

가맹점의 업종별 유형을 분류

**가맹점 정보**

- 상호명
- 주소 (도로명 및 지번)
- 전화번호
- 카테고리
- 사용유형 (지류형/모바일형/카드형)

**길찾기 기능**

카카오 길찾기 기능을 연동하여 도착지를 사용자가 선택한 가맹점으로 미리 설정

## 시작하기

경기도 지역화폐 (이하 지머니 애플리케이션) 은 vercel (구. now) 에서 호스팅되고 있습니다.

이 애플리케이션이 동작하기 위해서는, 사전에 아래 기관에서 API KEY 를 발급 받아야 합니다.

- Kakao Developer
- 경기도 지역화폐 API

또, 사전에 아래와 같이 설정 되어있어야 합니다.

- node.js 12.x 이상
- npm install -g vercel
- npm install -g typescript

## vercel 에서 호스팅 하기

지머니 애플리케이션은 vercel (구. now) 에서 serverless 형태로 호스팅 하는것에 초점을 맞추고 있습니다.

애플리케이션을 다운받은 후, 다음과 같이 설정해주세요.

- `$ vercel` 로 vercel 을 링크합니다.
- .env.example 파일을 .env 로 파일 변경합니다.
- .env 항목의 각 환경변수들을 설정합니다.
- vercel 로 호스팅 하기 위해 다음과 같이 실행합니다.
- `$ vercel env add` 를 실행합니다.

`vercel env add` 명령어로 각 항목에 맞춰 환경변수를 프로젝트로 설정 해주세요.

예)

```
$ vercel env add
KAKAO_REST_KEY
{카카오에서 발급받은 javascript key}

...
```

위 안내에 따라, 다음 3개 환경변수를 설정 해주세요.

- GMONEY_API_KEY=
- MONGODB_URI=
- KAKAO_REST_KEY=

## 앱 배포하기

vercel 은 단순합니다.

```
$ vercel

// or production

$ vercel --prod
```

이게 끝입니다.

## 애플리케이션의 구조

지머니 애플리케이션은, 경기도 지역화폐 API 에서 데이터를 다운받아, 애플리케이션 고유의 MongoDB 로 관리합니다.

이 사유는, 데이터 제공자 (경기도 지역화폐 API)에서 제공 하는 데이터를 더 효율적으로 가공하기 위함입니다.

## 프로젝트 관리 (JIRA)

[JIRA_GMoneyMap](https://id.atlassian.com/invite/p/jira-software?id=ZmapBb96QzaglAoL9nsmeQ)
