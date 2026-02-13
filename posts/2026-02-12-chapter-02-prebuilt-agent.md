---
title: "Chapter 02. Pre-built Agent 사용하기"
date: "2026-02-12"
tags:
  - "copilot-studio"
  - "prebuilt"
  - "agent"
category:
  - "aitouragenthon"
summary: "기본 제공 Pre-built Agent를 생성하고 테스트하는 흐름을 따라갑니다."
status: "Public"
type: "Post"
---

# Chapter 02. Pre-built Agent 사용하기

이 챕터에서는 Copilot Studio에서 기본 제공하는  
**Pre-built Agent**를 사용해봅니다.

Pre-built Agent를 통해  
Agent가 어떤 구성 요소로 이루어져 있고,  
어떻게 동작하는지 전체 흐름을 빠르게 이해할 수 있습니다.

---

## Pre-built Agent란?

![Pre-built Agent](/images/posts/2026-02-12-chapter-02-prebuilt-agent/00-prebuilt-agent.png)

Pre-built Agent는  
Microsoft에서 미리 설계해 제공하는 Agent 템플릿입니다.

- 이름, 설명, 지침(Instructions)이 사전에 구성됨
- 별도의 복잡한 설정 없이 바로 생성 가능
- Agent 구조를 빠르게 이해하거나 데모용으로 적합

---

## Copilot Studio 접속

![Copilot Studio Login](/images/posts/2026-02-12-chapter-02-prebuilt-agent/01-copilotstudio-login.png)

브라우저에서 아래 주소로 이동해 로그인합니다.

https://copilotstudio.microsoft.com

---

## Pre-built Agent 템플릿 선택

![Select Template](/images/posts/2026-02-12-chapter-02-prebuilt-agent/02-select-template.png)

1. Copilot Studio 좌측 메뉴에서 **에이전트**를 선택합니다.
2. 제공되는 템플릿 목록 중  
   **"안전한 이동"** 에이전트를 선택합니다.

---

## 에이전트 생성

![Create Agent](/images/posts/2026-02-12-chapter-02-prebuilt-agent/03-create-agent.png)

- 템플릿 화면에서 **만들기** 버튼을 선택합니다.
- 템플릿에 다음 항목이 미리 설정된 것을 확인할 수 있습니다.
  - 에이전트 이름
  - 설명
  - 기본 지침(Instructions)

---

## 에이전트 설정 확인

![Agent Settings](/images/posts/2026-02-12-chapter-02-prebuilt-agent/04-agent-settings.png)

에이전트 생성 후,  
오른쪽 상단의 **설정** 메뉴를 선택합니다.

![Orchestration](/images/posts/2026-02-12-chapter-02-prebuilt-agent/05-orchestration.png)

- **오케스트레이션** 옵션이 활성화되어 있는지 확인합니다.
- 이 설정을 통해 Copilot Studio가  
  사용자 의도를 기반으로 Agent 동작을 조율합니다.

---

## 참조 자료(Knowledge) 추가

![Add Knowledge](/images/posts/2026-02-12-chapter-02-prebuilt-agent/06-add-knowledge.png)

에이전트 설정 화면에서 **참조 자료 추가**를 선택해  
외부 웹 사이트를 연결할 수 있습니다.

예시로 다음과 같은 공개 웹 사이트를 추가할 수 있습니다.

- https://tourist.eu

이 과정을 통해 Agent는  
해당 사이트의 정보를 참고해 답변을 생성합니다.

---

## 에이전트 테스트

![Test Agent](/images/posts/2026-02-12-chapter-02-prebuilt-agent/07-test-agent.png)

오른쪽 테스트 패널을 통해  
에이전트를 바로 테스트할 수 있습니다.

예시 질문:
- "미국 여행할 도시 추천해줘."
- "스페인 여행 3일 일정 짜줘."

---

## 에이전트 게시

![Publish Agent](/images/posts/2026-02-12-chapter-02-prebuilt-agent/08-publish-agent.png)

- 테스트가 완료되면 **게시** 버튼을 선택합니다.
- 에이전트는 이후 Copilot 환경에서 사용할 수 있습니다.

---

## Chapter 02 요약

Pre-built Agent를 통해  
Copilot Studio Agent의 기본 구조와 동작 방식을 살펴보았습니다.

다음 챕터에서는  
자연어로 목적과 행동을 직접 정의하는  
**Custom Agent**를 만들어봅니다.
