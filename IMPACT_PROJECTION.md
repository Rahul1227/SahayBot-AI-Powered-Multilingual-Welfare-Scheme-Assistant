# SahayBot — Impact Projection & Adoption Roadmap

---

## Section 1 — Baseline Problem

India's welfare delivery system is large and underpenetrated:

- **950+ central and state welfare schemes** are active at any given time, spread across 50+ ministries and departments.
- **Less than 40% of eligible rural beneficiaries** are aware of the schemes they qualify for (NITI Aayog, 2023).
- The primary cause of non-uptake is not ineligibility — it is **awareness and documentation friction**.
- Field-level outreach (Gram Panchayat workers, NGO volunteers) cannot scale to cover 600,000+ villages cost-effectively.

Key scheme values that remain unclaimed:

- **PM-KISAN:** ₹6,000/year per farming household — an estimated 2–3 crore eligible farmers remain unenrolled due to e-KYC gaps and documentation confusion.
- **Ayushman Bharat PM-JAY:** Up to ₹5 lakh/year in cashless health coverage — 10.74 crore eligible families identified in SECC 2011, but card-generation and hospital empanelment awareness remains uneven.
- **PMAY-G:** ₹1.20–1.30 lakh per household — Awaas+ survey data shows millions of kutcha-house dwellers yet to apply.

SahayBot addresses this gap with a multilingual, conversational eligibility screener that reduces the 950-scheme search problem to a 7-question conversation.

---

## Section 2 — Target Coverage

| Scheme              | Eligible Population    | Estimated Uptake Gap  | Annual Value per Beneficiary    |
|---------------------|------------------------|-----------------------|---------------------------------|
| PM-KISAN            | ~14.5 crore farmers    | ~2–3 crore unenrolled | ₹6,000                          |
| Ayushman Bharat     | ~10.74 crore families  | ~3–4 crore unactivated| Up to ₹5,00,000 (insurance)     |
| PMAY-G              | ~2.95 crore households | ~80 lakh pending      | ₹1,20,000–₹1,30,000 (one-time)  |
| Ujjwala Yojana      | ~9.6 crore BPL women   | ~1–2 crore without    | ₹1,600 (connection) + subsidies |
| MGNREGS             | All rural households   | Widespread under-use  | ₹26,700/year (100 days @ ₹267)  |
| Sukanya Samriddhi   | Parents of girls <10   | ~50% low awareness    | ₹250/month minimum deposit      |
| PMKVY               | ~5 crore youth         | High dropout intent   | Free certification + stipend     |
| PM Jan Dhan         | ~14 crore unbanked     | Ongoing               | Debit card + ₹10,000 overdraft  |

Sources: PM-KISAN dashboard (pmkisan.gov.in); NHA annual report 2022–23; MoRD PMAY-G data; PPAC LPG data; MoLE MGNREGS report.

---

## Section 3 — Adoption Scenario Modeling

### Pilot — Year 1

| Parameter                  | Value                                               |
|----------------------------|-----------------------------------------------------|
| Partners                   | 1 NGO (e.g., Pratham, SEWA, or similar)             |
| Coverage                   | 1 district (~10 blocks, ~500 villages)              |
| Total users reached        | 10,000                                              |
| Scheme uptake lift         | 20% of users successfully enrol in at least 1 scheme|
| Additional beneficiaries   | ~2,000 new enrolments                               |
| Monetary value unlocked    | ~₹1.2 crore/year (avg ₹6,000 per new PM-KISAN enrolment × 2,000 users) |
| Operational cost           | ~₹1.8 lakh (10,000 conversations × ₹2/conversation at Gemini API + WhatsApp @ ₹0.58/message × 10,000 messages ≈ ₹5,800 messaging + ₹20,000 API + staff) |
| Cost per beneficiary       | ~₹90                                               |

### Scale — Year 2

| Parameter                  | Value                                               |
|----------------------------|-----------------------------------------------------|
| Partners                   | 10 NGOs across 5 states                             |
| Coverage                   | UP, Rajasthan, MP, Bihar, Jharkhand                 |
| Total users reached        | 5,00,000                                            |
| Scheme uptake lift         | 25% enrolment rate                                  |
| Additional beneficiaries   | ~1,25,000 new enrolments                            |
| Monetary value unlocked    | ~₹75 crore/year (mix of PM-KISAN, Ayushman, MGNREGS)|
| Operational cost           | ~₹25 lakh (5L conversations × ₹2 + messaging + infra)|
| Cost per beneficiary       | ~₹20                                               |

### National — Year 3

| Parameter                  | Value                                               |
|----------------------------|-----------------------------------------------------|
| Integration                | Government Common Service Centres (CSCs) via MeitY  |
| Coverage                   | All 36 states and UTs                               |
| Total users reached        | 1 crore                                             |
| Scheme uptake lift         | 30% enrolment rate                                  |
| Additional beneficiaries   | ~30 lakh new enrolments                             |
| Monetary value unlocked    | ~₹1,800 crore/year (weighted average ₹6,000/beneficiary) |
| Operational cost           | ~₹3 crore (economies of scale; bulk WhatsApp pricing, cached LLM responses) |
| Cost per beneficiary       | ~₹10                                               |

---

## Section 4 — Cost-Effectiveness Comparison

| Outreach Method                   | Cost per Beneficiary Reached | Notes                                              |
|-----------------------------------|------------------------------|----------------------------------------------------|
| Government field officer          | ₹500 – ₹2,000                | Salary + travel; limited hours; 1:1 interaction    |
| NGO camp / mela                   | ₹200 – ₹800                  | Periodic; difficult to reach remote villages        |
| IVR helpline (e.g., 1800 numbers) | ₹50 – ₹150                   | Low comprehension; no personalised matching        |
| Printed pamphlet distribution     | ₹15 – ₹40                    | No eligibility logic; language gaps; discarded     |
| **SahayBot (Year 1 pilot)**       | **~₹90**                     | Personalised, multilingual, 24x7, document-ready   |
| **SahayBot (Year 3 national)**    | **~₹10**                     | CSC integration, cached responses, bulk pricing    |

SahayBot's cost advantage grows with scale. At Year 3 national deployment, it delivers personalised multilingual eligibility matching at a cost lower than printed pamphlets — while providing interactivity that no static channel can match.

Return on investment is strongly positive: ₹10 spent reaching a PM-KISAN beneficiary unlocks ₹6,000/year in direct cash transfer. A single successful enrolment recoups the per-user cost of ~600 conversations.

---

## Section 5 — Risks and Mitigations

| Risk                              | Likelihood | Impact | Mitigation                                                                 |
|-----------------------------------|------------|--------|----------------------------------------------------------------------------|
| LLM hallucination on scheme rules | Medium     | High   | All scheme facts grounded via RAG over `schemes.js` knowledge base; no free-form generation of eligibility criteria |
| Language coverage gaps            | High       | Medium | Current: Hindi + Tamil. Roadmap: Bengali (10 crore speakers), Marathi (9 crore), Telugu (8 crore) — 3 additions cover 4 major states and ~30% more rural population |
| Digital access barrier            | High       | High   | WhatsApp channel works on any phone including feature phones; shared-device use is common and supported by numbered-reply UI |
| Scheme rule changes by government | Medium     | High   | `schemes.js` is a modular knowledge file; update process takes <1 hour; version-pinned deployments prevent stale data from reaching users |
| User distrust of chatbot          | Medium     | Medium | Bot never makes final eligibility decisions — it matches and refers; all outputs include "verify at CSC or Gram Panchayat" disclaimer |
| Data privacy (personal questions) | Low-Medium | High   | No PII stored server-side; profile collected per-session, discarded after results; WhatsApp channel uses Meta's E2E encryption |

---

## Section 6 — Recommended Next Steps

- **Pilot with 1 Gram Panchayat** — partner with a willing Panchayat in UP or Rajasthan, onboard 200–500 users over 60 days, measure enrolment outcomes vs. control villages.

- **Integrate Bhashini for voice input** — MeitY's Bhashini API provides ASR (Automatic Speech Recognition) in 22 languages; voice input removes literacy as a barrier for users who cannot type in Hindi or Tamil.

- **Submit to MyScheme.gov.in API beta programme** — NIC's MyScheme portal has an open API for scheme data; replacing the local `schemes.js` knowledge base with a live API feed ensures automatic updates when eligibility rules change.

- **Apply for MeitY/NASSCOM social impact grant** — both MeitY's Digital India programme and NASSCOM Foundation's tech-for-good grants fund exactly this category of civic-tech deployment; the pilot data from Step 1 provides the evidence base for the application.

- **Add Bengali, Marathi, and Telugu translations** — three additions to `ELIGIBILITY_QUESTIONS` and `SCHEMES` extend coverage to West Bengal, Maharashtra, and Andhra Pradesh/Telangana — collectively adding ~27 crore rural citizens to the reachable population.

- **Integrate MGNREGS job card number as optional input** — users with job cards can be pre-verified for MGNREGS eligibility, reducing friction and enabling direct referral to the local Panchayat employment register.

---

*Figures are estimates based on publicly available Government of India dashboards, NITI Aayog reports, and standard civic-tech deployment benchmarks. All cost projections assume a non-profit/NGO deployment model with no margin.*
