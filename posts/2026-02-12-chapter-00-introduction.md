---
title: "Chapter 00. AI Agent란 무엇인가?"
date: "2026-02-12"
tags:
  - "agent"
  - "llm"
  - "rag"
category:
  - "aitouragenthon"
summary: "Agent, LLM, Hallucination, RAG 핵심 개념을 빠르게 정리합니다."
status: "Public"
type: "Post"
---

# Chapter 00. AI Agent란 무엇인가?

> Copilot Studio로 Agent를 직접 만들어보기 전에,  
> **Agent · LLM · Hallucination · RAG**의 핵심 개념을 먼저 이해합니다.

---

## 🤖 Agent란?

![Agent Concept](/images/posts/2026-02-12-chapter-00-introduction/00-agent-overview.png)

**Agent**란,
특정 **Task(업무)** 를 수행하도록 설계된 인공지능입니다.

단순히 질문에 답하는 AI를 넘어,  
다음과 같은 일을 수행할 수 있습니다.

- 필요한 정보를 **검색**하고
- 상황을 **판단**하며
- 실제 **행동(Action)** 까지 수행

> ✅ 즉, Agent는  
> **"잘 대답하는 AI"가 아니라 "업무를 대신 처리하는 AI"** 입니다.

---

## 🧠 LLM (Large Language Model)

![LLM](/images/posts/2026-02-12-chapter-00-introduction/01-llm.png)

**LLM**은 Agent의 **두뇌 역할**을 합니다.

- 방대한 텍스트 데이터로 학습된 신경망 모델
- 사람의 언어를 이해하고, 다음 행동을 결정
- 질문 답변, 문장 생성, 요약, 의사결정 가능

하지만 LLM에는 한계가 있습니다.

---

## ⚠️ Hallucination (환각 현상)

![Hallucination](/images/posts/2026-02-12-chapter-00-introduction/02-hallucination.png)

**Hallucination**이란,
AI가 **그럴듯하지만 사실이 아닌 정보**를 생성하는 현상입니다.

이런 문제가 발생하는 이유는:
- 모델의 학습 데이터는 **정적인 과거 데이터**
- 최신 정보, 회사 내부 정책, 실무 문서와 **불일치** 가능

특히 **업무용 Agent**에서는 치명적인 문제입니다.

---

## 📚 RAG (Retrieval-Augmented Generation)

![RAG Flow](/images/posts/2026-02-12-chapter-00-introduction/03-rag-flow.png)

**RAG**는 Hallucination을 해결하기 위한 대표적인 방법입니다.

💡 개념적으로는 **"오픈북 시험"** 과 같습니다.

### RAG 동작 흐름

1. 사용자가 질문을 입력
2. Agent가 내부 지식(문서, SharePoint, DB 등)을 **조회**
3. 조회된 정보를 LLM에게 함께 전달
4. **근거 있는 답변**을 생성

이를 통해 Agent는:
- 모델의 학습 데이터에만 의존하지 않고
- **조직의 실제 데이터에 grounded된 답변**을 제공합니다.

---

## 🧩 Agent 구조 한눈에 보기

![Agent Architecture](/images/posts/2026-02-12-chapter-00-introduction/04-agent-architecture.png)

Agent는 보통 다음 요소들로 구성됩니다.

- **LLM**: 언어 이해 및 생성
- **Instructions**: 역할, 톤, 행동 규칙
- **Knowledge**: 문서, SharePoint, 웹 등 참조 데이터
- **Tools (Actions)**: 이메일 발송, 일정 생성, 시스템 호출

이 요소들이 결합되어  
Agent는 **대화 → 판단 → 실행**까지 수행합니다.

---

## ✅ 정리 한 줄 요약

> **Agent는 LLM에 지식과 행동을 결합해  
> 실제 업무를 끝까지 처리하는 AI입니다.**
