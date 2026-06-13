# SahayBot — Pilot Test Report

**Project:** NSS Open Project Challenge 1.1 — AI-Based Multilingual Chatbot for Welfare Scheme Awareness  
**Tested By:** Rahul Yadav (M.Tech CSE, Enrollment No. 25535037)  
**Test Location:** Gram Panchayat Office, Village — Bhadohi District, Uttar Pradesh  
**Test Dates:** 10 May 2026 and 11 May 2026  
**Total Participants:** 10  

---

## 1. Objective

The purpose of this pilot test was to check whether real users from a village community could use SahayBot on their own to find out which government welfare schemes they are eligible for. We wanted to measure three things:

1. How many people completed the eligibility flow without giving up (target: 80% or more)
2. How well they understood the scheme information shown to them (target: 70% or more)
3. How fast the system responded (target: under 3 seconds)

---

## 2. How the Test Was Conducted

All ten participants were tested at the Gram Panchayat community room over two days (5 participants per day). The environment was informal — participants sat at a table, used either their own smartphone or the tester's phone, and were given a brief one-line instruction:

> "Open this website and try to find out which government schemes you might be eligible for."

No further guidance was given during the task. The tester only observed and noted the time taken, any confusion or hesitation, and whether the participant completed the flow.

After completing the eligibility flow, each participant was asked three simple verbal questions to check if they understood what the chatbot had told them. These three questions were the same for everyone:

- **Q1:** Which scheme gives money directly to farmers every year, and how much?
- **Q2:** What is the health coverage amount under Ayushman Bharat PM-JAY?
- **Q3:** Name one document that is required to apply for any scheme shown to you.

Scores were marked as correct (1 point) or incorrect/unsure (0 points). Maximum score per person was 3.

**Device access:**  
- 7 participants used their own Android smartphones  
- 3 participants (Manorama, SitaPati, Raju) used the tester's phone  

**Language:**  
All 10 participants chose Hindi (हिन्दी) at the language selection step.

**Channel used:**  
Web interface at https://sahaybot.netlify.app

---

## 3. Participant Profiles

| # | Name | Age | Gender | Occupation | Est. Annual Income | Device |
|---|---|---|---|---|---|---|
| 1 | Ram Niwas Yadav | 32 | Male | Farmer | ₹80,000 | Own phone |
| 2 | Ghanshyam Tiwari | 46 | Male | Farmer | ₹55,000 | Own phone |
| 3 | Manorama Sharma | 35 | Female | Housewife | ₹70,000 (household) | Tester's phone |
| 4 | SitaRam Yadav | 40 | Male | Teacher + Farmer | ₹2,80,000 | Own phone |
| 5 | Guddu Sharma | 56 | Male | Farmer | ₹50,000 | Own phone |
| 6 | Manoj Singh | 25 | Male | Daily Wage Worker | ₹72,000 | Own phone |
| 7 | SitaPati Sharma | 43 | Female | Housewife + Farmer | ₹88,000 | Tester's phone |
| 8 | Raju Yadav | 61 | Male | Farmer | ₹45,000 | Tester's phone |
| 9 | Rajesh Singh | 45 | Male | Farmer | ₹95,000 | Own phone |
| 10 | Shanker Singh | 49 | Male | Farmer | ₹62,000 | Own phone |

---

## 4. Individual Test Results

---

### Participant 1 — Ram Niwas Yadav

**Background:** Young farmer with around 1 hectare of land. Comfortable with smartphones. Uses WhatsApp daily.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: ₹50,000 – ₹1,00,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: No

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, MGNREGS, PMKVY

**Time to complete flow:** 4 minutes 10 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 3 / 3 (100%)

**Quiz answers:**
- Q1: Correctly said PM-KISAN gives ₹6,000 per year
- Q2: Correctly said ₹5 lakh per year
- Q3: Said Aadhaar card — correct

**Observation:** Ram Niwas was already aware of PM-KISAN but did not know about PMKVY (skill training scheme). He said, "PMKVY ke baare mein pata nahi tha. Yeh free training milti hai?" He then asked the chatbot a follow-up question in Hindi about PMKVY and received a clear answer.

**Feedback (in own words):** "Bahut helpful hai. Sabse acchi baat yeh hai ki apni bhasha mein baat kar sakte hain."

---

### Participant 2 — Ghanshyam Tiwari

**Background:** Middle-aged marginal farmer with less than 1 hectare. Has used basic Android phone for 2 years but mostly for calls.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: Below ₹50,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: No

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, PMAY-G, MGNREGS

**Time to complete flow:** 6 minutes 20 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 2 / 3 (67%)

**Quiz answers:**
- Q1: Correctly answered PM-KISAN, ₹6,000 per year
- Q2: Said "bahut saara paisa" but could not recall the exact figure of ₹5 lakh — marked incorrect
- Q3: Correctly said Aadhaar card

**Observation:** Ghanshyam took a little longer to read through the scheme descriptions. He was mostly interested in PMAY-G (housing scheme) and asked the chatbot how to apply. He was happy with the document checklist that appeared. One moment of hesitation came when he was asked about annual income — he said "pata nahi exact kitna hai" but eventually selected the closest bracket.

**Feedback:** "Ayushman Bharat card kaise banwate hain? Yeh bhi step by step batao."

---

### Participant 3 — Manorama Sharma

**Background:** Housewife, husband is a farmer. Has basic literacy. Does not own a personal phone. Uses wood-fire stove at home, no LPG connection. Has a 7-year-old daughter.

**Eligibility answers given:**
- Occupation: (selected closest — Gig / Daily Wage worker as she does occasional farm work; no direct housewife option)
- Annual Income: ₹50,000 – ₹1,00,000
- Gender: Female
- Bank Account: Yes (Jan Dhan account)
- LPG connection: No
- Has daughter under 10: Yes

**Schemes shown by chatbot:** Ayushman Bharat, Ujjwala Yojana, Sukanya Samriddhi Yojana

**Time to complete flow:** 7 minutes 05 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 2 / 3 (67%)

**Quiz answers:**
- Q1: Said she did not see the PM-KISAN scheme (which is correct — she was not shown it, so she could not answer this question for herself). The question was modified to ask about Ujjwala instead. Correctly said Ujjwala gives a free LPG connection.
- Q2: Correctly said ₹5 lakh health coverage
- Q3: Said "ration card" — correct (one of the required documents for Ujjwala)

**Observation:** Manorama took some time to figure out her occupation category since there was no "housewife" option. This was noted as a usability gap. Once past that step, she moved smoothly. She was genuinely excited when she saw Sukanya Samriddhi — she said she had never heard of it before. She asked the chatbot "beti ke liye kitne paise jama karne honge?" and received a clear answer.

**Feedback:** "Ek 'Grihini' (Housewife) ka option bhi add karo. Main confused ho gayi thi."

---

### Participant 4 — SitaRam Yadav

**Background:** Private school teacher who also farms a small plot on weekends. Good literacy and comfortable with technology. Uses a mid-range Android phone.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: ₹2,00,000 – ₹5,00,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: No

**Schemes shown by chatbot:** PM-KISAN, PMKVY

**Time to complete flow:** 3 minutes 05 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 3 / 3 (100%)

**Quiz answers:**
- Q1: Correctly answered
- Q2: Correctly answered
- Q3: Correctly said Aadhaar card and land ownership records

**Observation:** SitaRam completed the flow the second fastest. He noticed that because of his higher income, he was shown fewer schemes than the other farmers around him. He appreciated this and said the system was honest. He asked the chatbot a follow-up question about whether a private school teacher qualifies for PM-KISAN and received a correct answer. He also suggested that schemes related to education loans or teacher welfare could be added in future versions.

**Feedback:** "Acchi baat hai ki system ne sahi schemes dikhaayi — fake ummeed nahi di. Lekin teachers ke liye bhi kuch schemes honi chahiye."

---

### Participant 5 — Guddu Sharma

**Background:** Older farmer, slow reader, not very comfortable with smartphones. Has a basic Android phone but mainly his son operates it. Has health issues and was particularly interested in health-related schemes.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: Below ₹50,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: No

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, PMAY-G, MGNREGS

**Time to complete flow:** 9 minutes 15 seconds  
**Completed without restart:** Yes (but paused twice to re-read questions)  
**Comprehension quiz score:** 2 / 3 (67%)

**Quiz answers:**
- Q1: Correctly answered PM-KISAN
- Q2: Correctly said Ayushman Bharat gives health coverage
- Q3: Could not recall a specific document name — marked incorrect

**Observation:** Guddu was the slowest among the group due to his age and limited phone familiarity. He paused at the income question and the land question, re-reading both twice. Once the schemes were displayed, he was most interested in Ayushman Bharat and asked the chatbot verbally (with the tester typing on his behalf) where he could get the Ayushman card made. He found the response helpful.

**Feedback:** "Theek hai, samajh aa gaya. Lekin bade bade aksharon mein hota toh aur accha hota."  
*(It's fine, I understood. But if the text was in bigger font, it would be better.)*

---

### Participant 6 — Manoj Singh

**Background:** Young daily wage laborer, tech-savvy, uses smartphone frequently for YouTube and WhatsApp. Does not have a bank account. Irregular income from construction work.

**Eligibility answers given:**
- Occupation: Gig / Daily Wage Worker
- Annual Income: ₹50,000 – ₹1,00,000
- Gender: Male
- Bank Account: No
- Has daughter under 10: No

**Schemes shown by chatbot:** MGNREGS, PMKVY, Ayushman Bharat, PM Jan Dhan Yojana

**Time to complete flow:** 3 minutes 30 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 3 / 3 (100%)

**Quiz answers:**
- Q1: Said "PMKVY deta hai free training, ₹8,000 bhi milte hain" — adjusted question was relevant for him
- Q2: Correctly said ₹5 lakh
- Q3: Correctly said Aadhaar card

**Observation:** Manoj was the most enthusiastic participant. He had never heard of Jan Dhan Yojana before and was surprised to know he could open a zero-balance bank account. He said he would go to the bank the next day. He also asked the chatbot a follow-up about PMKVY training centers near him. After finishing, he asked the tester to send him the website link so he could show his friends.

**Feedback:** "Yaar yeh toh bahut kaam ki cheez hai. Mujhe Jan Dhan account ke baare mein pata hi nahi tha."

---

### Participant 7 — SitaPati Sharma

**Background:** Works alongside husband on farm, also manages household. Moderate literacy. Has a young daughter. No LPG connection at home.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: ₹50,000 – ₹1,00,000
- Gender: Female
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- LPG connection: No
- Has daughter under 10: Yes (8 years old)

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, Ujjwala Yojana, MGNREGS, Sukanya Samriddhi Yojana

**Time to complete flow:** 8 minutes 00 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 2 / 3 (67%)

**Quiz answers:**
- Q1: Correctly answered PM-KISAN
- Q2: Knew it was a health scheme but said "₹2 lakh" instead of ₹5 lakh — marked incorrect
- Q3: Correctly said Aadhaar card

**Observation:** SitaPati was shown 5 schemes — the most of any participant — because she satisfied multiple criteria (female, farmer, no LPG, has daughter). She was most excited about Ujjwala Yojana and Sukanya Samriddhi. She said she had heard of Ujjwala before on TV but never knew where to apply. The document checklist was very useful for her. She downloaded it (screenshot) so she could take it to the block office.

**Feedback:** "5 yojanaon ke baare mein ek hi jagah pata chal gaya. Ujjwala aur beti ki yojana ke baare mein pehle nahi maloom tha kahan jaayein."

---

### Participant 8 — Raju Yadav

**Background:** Elderly farmer, literate but not used to touchscreen smartphones. Needed help navigating. Has very small landholding. Low income.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: Below ₹50,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: No

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, PMAY-G, MGNREGS

**Time to complete flow:** 12 minutes 40 seconds  
**Completed without restart:** No — restarted once midway when he accidentally selected the wrong income bracket. Completed successfully on second attempt.  
**Comprehension quiz score:** 2 / 3 (67%)

**Quiz answers:**
- Q1: Correctly answered PM-KISAN
- Q2: Said "bade hospital mein free ilaaj" — partially correct, but could not state the ₹5 lakh amount — marked incorrect
- Q3: Correctly said Aadhaar card and khasra (land record)

**Observation:** Raju was the most challenging user for the system. His main difficulty was with the income bracket question — he was unsure which bracket his income fell under and accidentally tapped the wrong one. After restarting, he completed successfully. He was very interested in PMAY-G (housing assistance). The tester helped him understand the scheme by reading out the chatbot's response. He said if someone in his village could help him apply, he would do it.

**Feedback:** "Akele yeh sab karna mushkil hai mere liye. Koi helper ho toh sab karwa sakte hain. System theek hai."

---

### Participant 9 — Rajesh Singh

**Background:** Medium-scale farmer with 1.5 hectares. Comfortable with Android phone, uses it regularly. Was already enrolled in PM-KISAN but wanted to know about other schemes.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: ₹50,000 – ₹1,00,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: No

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, MGNREGS

**Time to complete flow:** 5 minutes 00 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 3 / 3 (100%)

**Quiz answers:**
- Q1: Correctly answered
- Q2: Correctly answered ₹5 lakh
- Q3: Correctly named Aadhaar card, land records, and bank passbook

**Observation:** Rajesh was one of the smoother participants. After viewing his eligible schemes, he was the first person to use the SMS checklist feature — he entered his mobile number and received the document list on his phone within seconds. He said this was very useful. He already knew about PM-KISAN but the Ayushman Bharat process was clearer to him now.

**Feedback:** "Documents ki list SMS par aana bahut useful hai. Seedha le jaate hain block office."

---

### Participant 10 — Shanker Singh

**Background:** Middle-aged farmer, moderate phone familiarity, has a 4-year-old daughter. Land is around 1.2 hectares.

**Eligibility answers given:**
- Occupation: Farmer
- Annual Income: ₹50,000 – ₹1,00,000
- Gender: Male
- Bank Account: Yes
- Land ownership (<2 ha): Yes
- Has daughter under 10: Yes (4 years old)

**Schemes shown by chatbot:** PM-KISAN, Ayushman Bharat, PMAY-G, MGNREGS, Sukanya Samriddhi Yojana

**Time to complete flow:** 6 minutes 10 seconds  
**Completed without restart:** Yes  
**Comprehension quiz score:** 2 / 3 (67%)

**Quiz answers:**
- Q1: Correctly answered PM-KISAN
- Q2: Said "5 lakh ka beema" — correct
- Q3: Could not remember a specific document for Sukanya Samriddhi — marked incorrect

**Observation:** Shanker was unaware of Sukanya Samriddhi before this session. When the chatbot displayed it, he said "yeh toh beti ke liye savings scheme hai, acchi cheez hai." He asked the chatbot the minimum deposit amount and was told it is ₹250 per year. He noted this was affordable.

**Feedback:** "Sukanya Samriddhi ke baare mein bilkul nahi pata tha. Kal post office mein jaake poochhenge."

---

## 5. Summary of Results

### Completion Rate

| # | Name | Completed Flow | Restart Required |
|---|---|---|---|
| 1 | Ram Niwas Yadav | Yes | No |
| 2 | Ghanshyam Tiwari | Yes | No |
| 3 | Manorama Sharma | Yes | No |
| 4 | SitaRam Yadav | Yes | No |
| 5 | Guddu Sharma | Yes | No |
| 6 | Manoj Singh | Yes | No |
| 7 | SitaPati Sharma | Yes | No |
| 8 | Raju Yadav | Yes | Yes (1 restart) |
| 9 | Rajesh Singh | Yes | No |
| 10 | Shanker Singh | Yes | No |

**All 10 participants (100%) completed the eligibility flow.**  
**9 out of 10 (90%) completed without any restart or drop-off.**  
**Target was ≥ 80% — this target is met. ✓**

---

### Comprehension Scores

| # | Name | Q1 | Q2 | Q3 | Score | Percentage |
|---|---|---|---|---|---|---|
| 1 | Ram Niwas Yadav | ✓ | ✓ | ✓ | 3/3 | 100% |
| 2 | Ghanshyam Tiwari | ✓ | ✗ | ✓ | 2/3 | 67% |
| 3 | Manorama Sharma | ✓ | ✓ | ✓ | 2/3 | 67%* |
| 4 | SitaRam Yadav | ✓ | ✓ | ✓ | 3/3 | 100% |
| 5 | Guddu Sharma | ✓ | ✓ | ✗ | 2/3 | 67% |
| 6 | Manoj Singh | ✓ | ✓ | ✓ | 3/3 | 100% |
| 7 | SitaPati Sharma | ✓ | ✗ | ✓ | 2/3 | 67% |
| 8 | Raju Yadav | ✓ | ✗ | ✓ | 2/3 | 67% |
| 9 | Rajesh Singh | ✓ | ✓ | ✓ | 3/3 | 100% |
| 10 | Shanker Singh | ✓ | ✓ | ✗ | 2/3 | 67% |

*Manorama's Q1 was adapted since PM-KISAN was not her scheme; she was asked about Ujjwala instead and answered correctly.

**Average comprehension score: 24/30 = 80%**  
**Target was ≥ 70% — this target is met. ✓**

---

### Response Time

Response times were measured on participants' own mobile data connections (4G/LTE) in the village. Times recorded per message exchange.

| Metric | Value |
|---|---|
| Fastest individual response | 1.2 seconds |
| Slowest individual response | 2.4 seconds |
| Median response time | 1.85 seconds |
| Average response time | 1.9 seconds |

**Median response time was 1.85 seconds — under the 3-second target. ✓**

**Note:** The very first message sent by Raju Yadav (participant 8) experienced a delay of approximately 22 seconds. This is due to the Render free-tier hosting going into a sleep mode when the server has been idle for more than 15 minutes. All subsequent messages in the session were fast. This cold-start delay is a known limitation of the current free deployment and can be resolved by upgrading to a paid hosting plan.

---

## 6. Schemes Discovered (New Awareness)

One of the most important outcomes of the pilot was understanding which schemes participants did not know about before using SahayBot.

| Scheme | Times Newly Discovered (Not Known Before) |
|---|---|
| Sukanya Samriddhi Yojana | 3 participants (Manorama, SitaPati, Shanker) |
| PM Jan Dhan Yojana | 1 participant (Manoj) |
| Ujjwala Yojana | 2 participants (Manorama, SitaPati) |
| PMKVY | 2 participants (Ram Niwas, Manoj) |
| Ayushman Bharat (process clarity) | 4 participants (Ghanshyam, Guddu, Raju, Rajesh) |
| PMAY-G | 2 participants (Ghanshyam, Shanker) |

Most participants already knew about PM-KISAN, but very few knew about skill training (PMKVY), savings for daughters (Sukanya Samriddhi), or the Jan Dhan zero-balance account. This confirms that information gaps exist even for schemes with high financial impact.

---

## 7. Usability Observations and Friction Points

**What worked well:**
- The Hindi language interface was universally preferred. All 10 participants chose Hindi.
- The 4–6 question flow was short enough that no one felt overwhelmed.
- Scheme cards with clear benefit descriptions were easy to understand.
- The SMS document checklist (used by Rajesh Singh) was very practical — participants wanted to take the list with them to the block office.
- The chatbot's follow-up Q&A capability was appreciated by the more tech-comfortable users.

**Friction points observed:**
1. **No "Housewife" occupation option** — both female participants (Manorama, SitaPati) had to approximate their occupation. A dedicated option for homemakers who also do agricultural work would make the system more accurate.
2. **Income bracket question caused confusion for older users** — Raju and Guddu were unsure which bracket to select. A simpler option like "Kam aay (poor)" and "Thodi aay" might be more intuitive.
3. **Font size too small for older participants** — Guddu (56) and Raju (61) both mentioned the text was hard to read. Accessibility improvements like a larger font option would help.
4. **Cold-start delay on first message** — the first message took ~22 seconds when the server was sleeping. This was confusing for participants who thought the app had stopped working.
5. **Scheme amounts not always retained** — several participants who scored 2/3 forgot exact benefit amounts (e.g., ₹5 lakh for Ayushman Bharat). Showing a summary card at the end of the chat could reinforce key numbers.

---

## 8. Overall Assessment

The pilot test results show that SahayBot is working well for its primary purpose. All 10 participants completed the eligibility flow, most without any difficulty. The comprehension score of 80% is above the target of 70%, which means participants genuinely understood the information provided, not just scrolled through it.

The system was most impactful for participants who did not know about certain schemes before — especially Sukanya Samriddhi, Jan Dhan, and PMKVY. For these users, the chatbot was not just informative but directly actionable (Manoj planned to open a bank account the next day; SitaPati took a screenshot of the document checklist).

The main areas for improvement are around accessibility for older and less tech-literate users, and the addition of a housewife/homemaker occupation option.

---

## 9. Key Metrics — Final Summary

| Success Metric | Target | Achieved | Status |
|---|---|---|---|
| Eligibility flow completion rate | ≥ 80% | 90% (9/10 without restart; 10/10 eventual) | ✓ Met |
| Comprehension score (post-chat quiz) | ≥ 70% | 80% average | ✓ Met |
| Median response time (2G/3G equivalent) | < 3 seconds | 1.85 seconds (on 4G village network) | ✓ Met |

---

*Report prepared by Rahul Yadav, M.Tech CSE (Enrollment No. 25535037)*  
*NSS Open Project 2026 — Challenge 1.1: AI & Intelligent Systems*
