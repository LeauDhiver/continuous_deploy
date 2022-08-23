# 📌 매장 관리 API 프로젝트
## 👉 주제 선정

- **음식점(매장관리)** : [매장관리](https://app.swaggerhub.com/apis-docs/gotoweb/restaurant/1.0)

---
## 👉 배포방식 선정

### ✅ 프론트엔드

아키텍처 선정 사유 : 

1. S3를 이용하여 정적 웹호스팅을 구현하였습니다.
2. CloudFront를 이용하여 다음과 같은 기능을 기대하였습니다.
    - CDN 기능으로 웹페이지를 캐싱하여 성능 개선 
    - http → https 리다이렉트를 사용하여 인증서를 이용한 보안성있는 연결
3. Github → CodeBuild   
   프론트엔드 코드는 AWS의 서비스중 하나인 CodeBuild를 이용하여 CD 파이프라인 구축하였습니다.
    



### ✅ 백엔드

아키텍처 선정 사유: 

1. ECS Fargate를 사용해서 Scale-out을 용이하게 구현하고자 하였습니다.  
2. Github Action으로 CI/CD Pipeline 구축 하였습니다.  
3. Route53으로 커스텀 도메인 지정하여 [api.xgro.be](http://api.xgro.be) 와 같이 엔드포인트를 구성하였습니다.
4. ALB를 이용해서 요청을 http → https 리다이렉트 하였습니다.



<br>


## 👉 Available Scripts
---
In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode
