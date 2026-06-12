# SahayBot — User Flow Diagrams

Covers 3 representative personas per the NSS Open Project Challenge 1.1 spec.

---

## Persona 1 — Ramesh, the Farmer

### Persona Card

| Field       | Detail                                              |
|-------------|-----------------------------------------------------|
| Name        | Ramesh Kumar                                        |
| Age         | 42                                                  |
| Location    | Pratapgarh district, Uttar Pradesh                  |
| Occupation  | Small farmer, 1.4 hectares inherited land           |
| Income      | ~₹40,000/year (kharif + rabi crops)                 |
| Device      | Feature phone (calls/SMS); borrows neighbour's Android for internet |
| Language    | Hindi                                               |
| Pain point  | Unaware of PM-KISAN; never completed e-KYC           |

### Journey Flow

```
[Opens SahayBot on borrowed Android]
              |
              v
   [Welcome Screen: Choose Language]
     EN | हिंदी | தமிழ்
              |
              v (selects हिंदी)
   [Language Set: Hindi]
              |
              v
   [Select Your Persona]
   Farmer | Gig Worker | Vendor | Other
              |
              v (selects Farmer)
   [Q1: आपका मुख्य व्यवसाय क्या है?]
   → selects: किसान / कृषि मजदूर
              |
              v
   [Q2: वार्षिक घरेलू आय?]
   → selects: ₹50,000 से कम
              |
              v
   [Q3: आपका लिंग?]
   → selects: पुरुष
              |
              v
   [Q4: क्या आपके पास बैंक खाता है?]
   → selects: हाँ
              |
              v
   [Q5: क्या आपके पास 2 हेक्टेयर से कम कृषि भूमि है?]
   (shown because occupation = farmer)
   → selects: हाँ, 2 हेक्टेयर से कम
              |
              v
   [Q6: (LPG question skipped — gender is male)]
              |
              v
   [Q7: क्या आपकी 10 वर्ष से कम उम्र की बेटी है?]
   → selects: नहीं
              |
              v
   [Eligibility Engine Runs]
   occupation=farmer, income<50K, male,
   hasBankAccount=true, hasLand=true,
   hasLPG=N/A, hasDaughter=false
              |
              v
   ┌─────────────────────────────────────────┐
   │  4 योजनाएं मिलीं (4 Schemes Found)     │
   │  1. PM-KISAN         ₹6,000/year        │
   │  2. Ayushman Bharat  ₹5 lakh cover      │
   │  3. PMAY-G           ₹1.20 lakh house   │
   │  4. MGNREGS          100 days/year      │
   └─────────────────────────────────────────┘
              |
        ______v______
       |             |
       v             v
[Download PM-KISAN    [Chat: "आधार के बिना
 Document Checklist]   कैसे अप्लाई करें?"]
       |                      |
       v                      v
[PDF/WhatsApp link:   [Bot explains: e-KYC
 - Aadhaar card        mandatory; nearest
 - Khasra-Khatauni     CSC can do it free
 - Bank passbook       with Aadhaar + mobile]
 - Mobile (Aadhaar-
   linked)
 - Self-declaration]
```

**Key Decision Points:**
- Q5 (land ownership) is conditional — shown only for farmers. A non-farmer skips this question entirely.
- Male users skip Q6 (LPG), reducing friction.
- Ramesh gets PM-KISAN because `occupation=farmer AND hasLand=true`.
- PMAY-G triggers because `isRural=true AND isBPL=true` (income < ₹1.2 lakh).

**Expected Outcome:** Ramesh learns about 4 schemes he qualifies for, downloads a Hindi document checklist for PM-KISAN, and gets a clear answer about how to complete Aadhaar e-KYC at a Common Service Centre (CSC).

---

## Persona 2 — Priya, the Gig Worker

### Persona Card

| Field       | Detail                                                    |
|-------------|-----------------------------------------------------------|
| Name        | Priya Selvam                                              |
| Age         | 28                                                        |
| Location    | Chennai, Tamil Nadu                                       |
| Occupation  | Delivery worker (gig platform), daily variable income     |
| Income      | ~₹70,000–80,000/year                                      |
| Device      | Android smartphone (Jio SIM, 4G)                          |
| Language    | Tamil                                                     |
| Family      | Daughter, age 7                                           |
| Pain point  | No LPG at home; unaware of skill-upgrade programmes        |

### Journey Flow

```
[Opens SahayBot Web App on Android Chrome]
              |
              v
   [Welcome Screen: Choose Language]
     EN | हिंदी | தமிழ்
              |
              v (selects தமிழ்)
   [Language Set: Tamil]
              |
              v
   [Select Persona]
   → selects: கிக் / தினசரி கூலி தொழிலாளர்
              |
              v
   [Q1: உங்கள் முதன்மை தொழில்?]
   → selects: கிக் / தினசரி கூலி தொழிலாளர்
              |
              v
   [Q2: வருடாந்திர குடும்ப வருமானம்?]
   → selects: ₹50,000 – ₹1,00,000
              |
              v
   [Q3: பாலினம்?]
   → selects: பெண்
              |
              v
   [Q4: வங்கி கணக்கு உள்ளதா?]
   → selects: ஆம்
              |
              v
   [Q5: (land question skipped — not a farmer)]
              |
              v
   [Q6: வீட்டில் LPG இணைப்பு உள்ளதா?]
   (shown because gender = female)
   → selects: இல்லை (No LPG)
              |
              v
   [Q7: 10 வயதுக்கு குறைவான மகள் இருக்கிறாளா?]
   → selects: ஆம் (Yes — daughter age 7)
              |
              v
   [Eligibility Engine Runs]
   occupation=gig_worker, income=100K,
   female, hasBankAccount=true,
   hasLPG=false, hasDaughter=true
              |
              v
   ┌─────────────────────────────────────────┐
   │  5 திட்டங்கள் கண்டறியப்பட்டன           │
   │  (5 Schemes Found)                      │
   │  1. Ayushman Bharat  ₹5 lakh cover      │
   │  2. Ujjwala Yojana   Free LPG           │
   │  3. MGNREGS          100 days/year      │
   │  4. PMKVY            Free skill cert    │
   │  5. Sukanya Samriddhi ₹250/month invest │
   └─────────────────────────────────────────┘
              |
        ______v_______
       |              |
       v              v
[SMS Checklist     [Chat: "PMKVY
 to Phone]          courses near me
       |             in Chennai?"]
       v                   |
[Text message sent         v
 with doc list for   [Bot shows nearby
 Ujjwala + PMKVY]    PMKVY training
                     centres in TN
                     with enrolment
                     deadline]
```

**Key Decision Points:**
- Q6 (LPG) appears because `gender=female`. Priya answers "No" → Ujjwala Yojana is added.
- Q5 (land) is skipped because `occupation=gig_worker`.
- MGNREGS is included because `occupation=gig_worker` falls under the `isRural` OR `gig_worker` condition in the eligibility engine.
- Sukanya Samriddhi triggers because `hasDaughter=true`.
- PMKVY triggers because `occupation=gig_worker`.

**Expected Outcome:** Priya receives Tamil-language scheme cards for 5 schemes, SMSes a document checklist to herself, and follows up with a location-aware question about PMKVY training centres.

---

## Persona 3 — Sunita, Woman Head-of-Household

### Persona Card

| Field       | Detail                                                      |
|-------------|-------------------------------------------------------------|
| Name        | Sunita Devi                                                 |
| Age         | 35                                                          |
| Location    | Barmer district, rural Rajasthan                            |
| Occupation  | Unemployed (widow, husband deceased 2 years ago)            |
| Income      | ~₹30,000/year (MGNREGS occasional work + support)           |
| Device      | No smartphone; uses WhatsApp on neighbour's phone           |
| Language    | Hindi                                                       |
| Family      | Two children including one daughter, age 6                  |
| Pain point  | No bank account; no LPG; unaware of Jan Dhan Yojana         |

### Journey Flow

```
[Neighbour's WhatsApp → sends "नमस्ते" to SahayBot number]
              |
              v
   [Bot auto-replies: Language Menu]
   "Reply 1 for English
    Reply 2 for हिंदी
    Reply 3 for தமிழ்"
              |
              v (replies: 2)
   [Language Set: Hindi via WhatsApp]
              |
              v
   [Bot: "आपका मुख्य व्यवसाय चुनें:
    1. किसान  2. गिग मजदूर
    3. वेंडर  4. बेरोजगार  5. गर्भवती माँ"]
              |
              v (replies: 4)
   [Q1: बेरोजगार / नौकरी तलाशने वाला ✓]
              |
              v
   [Q2: वार्षिक आय?
    1. ₹50,000 से कम
    2. ₹50K–1L  3. ₹1L–2L ...]
              |
              v (replies: 1)
   [Income: <₹50,000 ✓]
              |
              v
   [Q3: लिंग?  1. पुरुष  2. महिला  3. अन्य]
              |
              v (replies: 2)
   [Gender: महिला ✓]
              |
              v
   [Q4: क्या आपके पास बैंक खाता है?
    1. हाँ  2. नहीं]
              |
              v (replies: 2)
   [hasBankAccount: false ✓]
              |
              v
   [Q5: (Land question skipped — not a farmer)]
              |
              v
   [Q6: क्या घर में LPG कनेक्शन है?
    1. हाँ  2. नहीं]
   (shown because gender = female)
              |
              v (replies: 2)
   [hasLPG: false ✓]
              |
              v
   [Q7: 10 वर्ष से कम की बेटी है?
    1. हाँ  2. नहीं]
              |
              v (replies: 1)
   [hasDaughter: true ✓]
              |
              v
   [Eligibility Engine Runs]
   occupation=unemployed, income<50K,
   female, hasBankAccount=false,
   hasLPG=false, hasDaughter=true
              |
              v
   ┌─────────────────────────────────────────┐
   │  5 योजनाएं मिलीं                        │
   │  1. PM Jan Dhan       Zero-balance a/c  │
   │  2. Ayushman Bharat   ₹5 lakh cover     │
   │  3. PMAY-G            ₹1.20 lakh house  │
   │  4. Ujjwala Yojana    Free LPG          │
   │  5. Sukanya Samriddhi ₹250/month invest │
   └─────────────────────────────────────────┘
              |
        ______v_________
       |                |
       v                v
[Bot sends scheme    [Sunita replies:
 summaries as        "जन धन खाता कैसे
 WhatsApp messages   खुलवाएं?"]
 (numbered list,           |
  plain text for           v
  feature phone      [Bot: Step-by-step
  readability)]       Jan Dhan process —
                      nearest bank branch,
                      docs needed: Aadhaar
                      + address proof,
                      zero minimum balance]
```

**Key Decision Points:**
- WhatsApp number-reply interface — no touchscreen navigation needed; works on a borrowed phone.
- `hasBankAccount=false` triggers Jan Dhan (unbanked path), making it the first priority scheme.
- PMAY-G triggers because `occupation=unemployed` → `isRural=true` AND `isBPL=true`.
- All scheme messages are sent as separate WhatsApp texts to allow reading one at a time on a small screen.
- Follow-up question about Jan Dhan triggers a contextual RAG-grounded response about the nearest branch and zero-balance account process.

**Expected Outcome:** Sunita learns about 5 schemes via plain-text WhatsApp messages she can read on her neighbour's phone. Jan Dhan is surfaced first — opening a bank account unlocks DBT payments for all other schemes.

---

## Summary: Decision Point Matrix

| Question          | Ramesh (Farmer) | Priya (Gig Worker) | Sunita (Unemployed) |
|-------------------|-----------------|--------------------|----------------------|
| Q1 Occupation     | farmer          | gig_worker         | unemployed           |
| Q2 Income         | <₹50,000        | ₹50K–₹1L          | <₹50,000             |
| Q3 Gender         | male            | female             | female               |
| Q4 Bank Account   | yes             | yes                | no                   |
| Q5 Land (<2 ha)   | yes (shown)     | skipped            | skipped              |
| Q6 LPG            | skipped (male)  | no (shown)         | no (shown)           |
| Q7 Daughter <10   | no              | yes                | yes                  |
| **Schemes Found** | **4**           | **5**              | **5**                |
| **Channel**       | Web App         | Web App            | WhatsApp             |
