---
title: "Chapter 03. Custom Agent 만들기"
date: "2026-02-12"
tags:
  - "copilot-studio"
  - "custom-agent"
  - "knowledge"
category:
  - "aitouragenthon"
summary: "자연어 프롬프트와 Knowledge를 활용해 Custom Agent를 설계합니다."
thumbnail: "/images/posts/2026-02-12-chapter-03-custom-agent/Chapter4.JPG"
status: "Public"
type: "Post"
---

# Chapter 03. Custom Agent 만들기

이 챕터에서는 Copilot Studio에서  
**Custom Agent**를 직접 만들어봅니다.

Pre-built Agent와 달리,  
Custom Agent는 목적과 동작을 사용자가 직접 정의하는  
맞춤형 AI 에이전트입니다.

---

## Custom Agent란?

![Custom Agent](/images/posts/2026-02-12-chapter-03-custom-agent/00-custom-agent.png)

Custom Agent는  
질문에 답하는 것을 넘어,  
정보를 수집하고 회사 데이터와 연결해  
**실제 업무를 처리**하는 AI 도우미입니다.

Custom Agent를 통해 다음을 직접 설계할 수 있습니다.

- 에이전트의 목적과 역할
- 대화 방식과 응답 톤
- 참조할 데이터(Knowledge)
- 실제로 수행할 업무 동작

---

## 오늘 만들어볼 Custom Agent

이번 실습에서는  
**IT Helpdesk Assistant**를 만들어봅니다.

이 에이전트는:
- 직원의 IT 문제를 자연어로 입력받고
- 관련 정보를 안내하며
- 내부 자료를 참고해 실무적인 답변을 제공합니다.

---

## 1. 자연어로 Agent 생성하기

![Natural Language Agent](/images/posts/2026-02-12-chapter-03-custom-agent/01-nl-agent.png)

Copilot Studio에 접속한 뒤,  
Agent 생성 과정에서 **자연어 프롬프트**를 입력합니다.

프롬프트에는 다음 요소가 포함됩니다.

- 에이전트의 역할 (IT 헬프데스크)
- 응답 톤과 스타일
- 문제 해결을 위한 단계별 안내 방식
- 참조 자료 기반 답변 원칙

Copilot은 이 내용을 바탕으로  
Agent의 기본 설정을 자동으로 구성합니다.

---

## 2. 참조 자료(Knowledge) 추가

![Add Knowledge](/images/posts/2026-02-12-chapter-03-custom-agent/02-add-knowledge.png)

Custom Agent가 정확한 답변을 제공하도록,  
참조 자료를 추가합니다.

Copilot Studio에서는 다음과 같은 자료를 연결할 수 있습니다.

### 공개 웹 사이트

![Add Web Source](/images/posts/2026-02-12-chapter-03-custom-agent/03-add-web.png)

예시:
- https://support.microsoft.com

Agent는 해당 사이트의 정보를 참고해  
문제 해결 안내를 제공합니다.

---

### SharePoint Site 연결

![Add SharePoint](/images/posts/2026-02-12-chapter-03-custom-agent/04-add-sharepoint.png)

사전에 생성한 SharePoint Site를  
Agent의 Knowledge Source로 연결합니다.

이를 통해 Agent는  
조직 내부 문서를 기반으로 답변할 수 있습니다.

- [Custom Agent 프롬프트.txt](/files/posts/2026-02-12-chapter-03-custom-agent/Custom%20Agent%20프롬프트.txt)

---

### 파일 업로드

![Add File](/images/posts/2026-02-12-chapter-03-custom-agent/05-add-file.png)

문서 파일을 직접 업로드해  
Agent의 참조 자료로 사용할 수 있습니다.

예:
- [Agenthon_Wifi_Guide.docx](/files/posts/2026-02-12-chapter-03-custom-agent/Agenthon_Wifi_Guide.docx)

---

## 3. 에이전트 게시

![Publish Agent](/images/posts/2026-02-12-chapter-03-custom-agent/06-publish.png)

설정이 완료되면,  
**게시** 버튼을 선택해 에이전트를 배포합니다.

게시된 에이전트는  
Copilot 환경에서 실제로 사용할 수 있습니다.

---

## 4. 에이전트 테스트 및 확인

![Test Agent](/images/posts/2026-02-12-chapter-03-custom-agent/07-test-agent.png)

테스트 패널을 통해  
에이전트의 동작을 직접 확인합니다.

![M365 Copilot](/images/posts/2026-02-12-chapter-03-custom-agent/08-m365-copilot.png)

또한 게시된 에이전트는  
Microsoft 365 Copilot에서도 확인할 수 있습니다.

---

## 프롬프트 작성 팁

좋은 Custom Agent를 만들기 위해  
다음과 같은 구조로 프롬프트를 작성하는 것이 도움이 됩니다.

- **Goal**: 에이전트의 목적
- **Context**: 역할, 관점, 톤
- **Source**: 참조해야 할 자료
- **Expectations**: 기대하는 응답 형태

이 구조를 활용하면  
일관되고 신뢰도 높은 Agent를 설계할 수 있습니다.

---

## Chapter 03 요약

Custom Agent를 통해  
자연어로 목적을 정의하고,  
조직의 데이터를 기반으로  
업무를 처리하는 AI 에이전트를 만들어보았습니다.

---

## 전체 정리

> Copilot Studio를 사용하면  
> **Agent를 이해하는 것에서 그치지 않고,  
> 직접 설계하고 배포할 수 있습니다.**
