'use strict';

/**
 * SCHEMES — Full knowledge base for 10 Indian government welfare schemes.
 * Each scheme includes English, Hindi (Hi), and Tamil (Ta) translations.
 */
const SCHEMES = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    nameHi: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)',
    nameTa: 'பிஎம்-கிசான் (பிரதான் மந்திரி கிசான் சம்மான் நிதி)',

    benefit: 'Direct income support of ₹6,000 per year paid in three equal instalments of ₹2,000 directly to farmer bank accounts.',
    benefitHi: 'किसानों के बैंक खातों में सीधे ₹2,000 की तीन किस्तों में प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।',
    benefitTa: 'விவசாயிகளின் வங்கிக் கணக்குகளில் நேரடியாக ₹2,000 மூன்று தவணைகளில் ஆண்டுக்கு ₹6,000 நேரடி வருமான உதவி.',

    eligibility: 'Small and marginal farmer families owning cultivable land up to 2 hectares. The farmer, spouse, and minor children together should not own more than 2 hectares. Excludes institutional landholders, government employees, income taxpayers, retired pensioners drawing ≥₹10,000/month, and professionals (doctors, engineers, lawyers, CAs).',
    eligibilityHi: 'छोटे और सीमांत किसान परिवार जिनके पास 2 हेक्टेयर तक खेती योग्य भूमि है। किसान, पति/पत्नी और नाबालिग बच्चों के पास मिलाकर 2 हेक्टेयर से अधिक भूमि नहीं होनी चाहिए। संस्थागत भूमिधारक, सरकारी कर्मचारी, आयकर दाता, ₹10,000/माह से अधिक पेंशन पाने वाले सेवानिवृत्त और पेशेवर (डॉक्टर, इंजीनियर, वकील, CA) को बाहर रखा गया है।',
    eligibilityTa: '2 ஹெக்டேர் வரை பயிரிடக்கூடிய நிலம் உள்ள சிறு மற்றும் குறு விவசாயக் குடும்பங்கள். விவசாயி, மனைவி/கணவன் மற்றும் சிறுவயது குழந்தைகள் சேர்ந்து 2 ஹெக்டேருக்கு மேல் நிலம் வைத்திருக்கக் கூடாது. நிறுவன நிலவுரிமையாளர்கள், அரசு ஊழியர்கள், வருமான வரி செலுத்துவோர் மற்றும் தொழில் வல்லுனர்கள் விலக்கு.',

    documents: [
      'Aadhaar card (mandatory for e-KYC)',
      'Land ownership records / Khasra-Khatauni',
      'Bank account passbook (for DBT)',
      'Mobile number linked to Aadhaar',
      'Self-declaration form'
    ],
    documentsHi: [
      'आधार कार्ड (e-KYC के लिए अनिवार्य)',
      'भूमि स्वामित्व रिकॉर्ड / खसरा-खतौनी',
      'बैंक खाता पासबुक (DBT के लिए)',
      'आधार से जुड़ा मोबाइल नंबर',
      'स्व-घोषणा पत्र'
    ],
    documentsTa: [
      'ஆதார் அட்டை (e-KYC கட்டாயம்)',
      'நில உரிமை ஆவணங்கள் / கசரா-கட்டவணி',
      'வங்கி கணக்கு பாஸ்புக் (DBT க்கு)',
      'ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்',
      'சுய அறிவிப்பு படிவம்'
    ],

    keywords: ['farmer', 'kisan', 'agriculture', 'land', 'income support', 'pm kisan', 'khet', 'kheti', 'fasal', 'crop', '6000', 'rupees', 'installment', 'khasra'],
    targetGroups: ['farmer', 'rural'],
    incomeLimit: null,
    requiresLand: true,
    requiresFemale: false
  },

  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)',
    nameHi: 'आयुष्मान भारत पीएम-जेएवाई (प्रधानमंत्री जन आरोग्य योजना)',
    nameTa: 'ஆயுஷ்மான் பாரத் பிஎம்-ஜேஏஒய் (பிரதான் மந்திரி ஜன் ஆரோக்ய யோஜனா)',

    benefit: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalisation at empanelled government and private hospitals. Covers pre and post-hospitalisation expenses.',
    benefitHi: 'सरकारी और निजी अस्पतालों में माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा। अस्पताल में भर्ती से पहले और बाद के खर्च शामिल।',
    benefitTa: 'அரசு மற்றும் தனியார் மருத்துவமனைகளில் இரண்டாம் நிலை மற்றும் மூன்றாம் நிலை மருத்துவமனை அனுமதிக்கு குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் சுகாதார காப்பீடு.',

    eligibility: 'Families listed in the Socio-Economic Caste Census (SECC) 2011 database covering the bottom 40% of the population — approximately 10.74 crore poor and vulnerable families. Beneficiaries are identified by SECC data and can be verified via Ayushman Bharat app or Common Service Centre.',
    eligibilityHi: 'सामाजिक-आर्थिक जाति जनगणना (SECC) 2011 डेटाबेस में सूचीबद्ध परिवार, जो जनसंख्या के नीचे के 40% को कवर करते हैं — लगभग 10.74 करोड़ गरीब और कमजोर परिवार। लाभार्थियों की पहचान SECC डेटा से होती है।',
    eligibilityTa: 'சமூக-பொருளாதார சாதி கணக்கெடுப்பு (SECC) 2011 தரவுத்தளத்தில் பட்டியலிடப்பட்ட குடும்பங்கள், மக்கட்தொகையின் கீழ் 40% — சுமார் 10.74 கோடி ஏழை மற்றும் பாதிக்கப்படக்கூடிய குடும்பங்கள்.',

    documents: [
      'Aadhaar card or Voter ID for identity proof',
      'Ration card (BPL / Antyodaya Anna Yojana)',
      'SECC 2011 inclusion letter or printout',
      'Ayushman Bharat e-card (generated at CSC)',
      'Mobile number for OTP verification'
    ],
    documentsHi: [
      'पहचान प्रमाण के लिए आधार कार्ड या मतदाता पहचान पत्र',
      'राशन कार्ड (BPL / अंत्योदय अन्न योजना)',
      'SECC 2011 समावेश पत्र या प्रिंटआउट',
      'आयुष्मान भारत ई-कार्ड (CSC पर जनरेट)',
      'OTP सत्यापन के लिए मोबाइल नंबर'
    ],
    documentsTa: [
      'அடையாள சான்றிற்கு ஆதார் அட்டை அல்லது வாக்காளர் அட்டை',
      'ரேஷன் அட்டை (BPL / அந்தியோதய அண்ணா யோஜனா)',
      'SECC 2011 சேர்க்கை கடிதம் அல்லது அச்சு',
      'ஆயுஷ்மான் பாரத் e-card (CSC இல் உருவாக்கப்பட்டது)',
      'OTP சரிபார்ப்பிற்கு மொபைல் எண்'
    ],

    keywords: ['health', 'hospital', 'insurance', 'medical', 'ayushman', 'pmjay', 'treatment', 'surgery', 'illness', 'cashless', 'bimari', 'sehat', 'swasthya', '5 lakh', 'BPL'],
    targetGroups: ['poor', 'rural'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  },

  {
    id: 'pmay-g',
    name: 'PMAY-G (Pradhan Mantri Awas Yojana — Gramin)',
    nameHi: 'पीएमएवाई-जी (प्रधानमंत्री आवास योजना — ग्रामीण)',
    nameTa: 'பிஎம்ஏஒய்-ஜி (பிரதான் மந்திரி ஆவாஸ் யோஜனா — கிராமம்)',

    benefit: 'Financial assistance of ₹1.20 lakh in plains and ₹1.30 lakh in hilly/difficult areas for construction of a pucca house. Additional ₹12,000 for toilet under Swachh Bharat Mission.',
    benefitHi: 'पक्का मकान निर्माण के लिए मैदानी इलाकों में ₹1.20 लाख और पहाड़ी/कठिन क्षेत्रों में ₹1.30 लाख की वित्तीय सहायता। स्वच्छ भारत मिशन के तहत शौचालय के लिए अतिरिक्त ₹12,000।',
    benefitTa: 'சமதள பகுதிகளில் ₹1.20 லட்சம் மற்றும் மலை/கஷ்டமான பகுதிகளில் ₹1.30 லட்சம் வீடு கட்ட நிதி உதவி. சுவச் பாரத் மிஷனில் கழிவறைக்கு கூடுதல் ₹12,000.',

    eligibility: 'Homeless families or those living in kutcha/dilapidated houses in rural areas as identified in the Awaas+ survey or SECC 2011 data. Priority to SC/ST, minorities, widows, disabled persons, ex-servicemen, and families of bonded labourers. Must not own a pucca house anywhere in India.',
    eligibilityHi: 'ग्रामीण क्षेत्रों में बेघर परिवार या जो कच्चे/जर्जर मकानों में रहते हैं, जैसा कि आवास+ सर्वेक्षण या SECC 2011 डेटा में पहचाना गया है। SC/ST, अल्पसंख्यक, विधवाएं, विकलांग, भूतपूर्व सैनिक और बंधुआ मजदूरों के परिवारों को प्राथमिकता।',
    eligibilityTa: 'கிராமப்புறங்களில் வீடற்ற குடும்பங்கள் அல்லது கச்சா/பழுதடைந்த வீடுகளில் வசிப்பவர்கள். SC/ST, சிறுபான்மையினர், விதவைகள், மாற்றுத்திறனாளிகள், முன்னாள் படைவீரர்களுக்கு முன்னுரிமை.',

    documents: [
      'Aadhaar card of all family members',
      'SECC 2011 or Awaas+ survey inclusion proof',
      'BPL ration card',
      'Land ownership or possession certificate (if applicable)',
      'Caste certificate (for SC/ST/OBC)',
      'Bank account passbook for DBT',
      'MGNREGS job card (for unskilled labour component)'
    ],
    documentsHi: [
      'सभी परिवार के सदस्यों का आधार कार्ड',
      'SECC 2011 या आवास+ सर्वेक्षण समावेश प्रमाण',
      'BPL राशन कार्ड',
      'भूमि स्वामित्व या कब्जा प्रमाण पत्र (यदि लागू हो)',
      'जाति प्रमाण पत्र (SC/ST/OBC के लिए)',
      'DBT के लिए बैंक खाता पासबुक',
      'MGNREGS जॉब कार्ड (अकुशल श्रम घटक के लिए)'
    ],
    documentsTa: [
      'அனைத்து குடும்ப உறுப்பினர்களின் ஆதார் அட்டை',
      'SECC 2011 அல்லது ஆவாஸ்+ கணக்கெடுப்பு சேர்க்கை சான்று',
      'BPL ரேஷன் அட்டை',
      'நில உரிமை அல்லது வைத்திருப்பு சான்றிதழ்',
      'சாதி சான்றிதழ் (SC/ST/OBC க்கு)',
      'DBT க்கு வங்கி கணக்கு பாஸ்புக்',
      'MGNREGS வேலை அட்டை'
    ],

    keywords: ['house', 'housing', 'awas', 'home', 'shelter', 'pucca', 'kutcha', 'rural', 'gramin', 'ghar', 'makaan', 'construction', 'BPL', 'homeless', 'SC', 'ST'],
    targetGroups: ['poor', 'rural'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  },

  {
    id: 'ujjwala-yojana',
    name: 'Pradhan Mantri Ujjwala Yojana (PMUY)',
    nameHi: 'प्रधानमंत्री उज्ज्वला योजना (पीएमयूवाई)',
    nameTa: 'பிரதான் மந்திரி உஜ்வலா யோஜனா (PMUY)',

    benefit: 'Free LPG connection including one free cylinder and a stove/regulator to BPL women. Continued subsidy on refill cylinders to reduce cost.',
    benefitHi: 'BPL महिलाओं को एक मुफ्त सिलेंडर और चूल्हा/रेगुलेटर सहित मुफ्त LPG कनेक्शन। रिफिल सिलेंडर पर सब्सिडी जारी।',
    benefitTa: 'BPL பெண்களுக்கு ஒரு இலவச சிலிண்டர் மற்றும் அடுப்பு/ரெகுலேட்டர் உட்பட இலவச LPG இணைப்பு. ரீஃபில் சிலிண்டர்களில் தொடர்ந்து மானியம்.',

    eligibility: 'Adult women (18+) from Below Poverty Line (BPL) households who do not already have an LPG connection in the household. Eligible categories include SECC-listed families, SC/ST households, PMAY-G beneficiaries, Antyodaya Anna Yojana beneficiaries, forest dwellers, and tea garden workers.',
    eligibilityHi: '18 वर्ष से अधिक उम्र की BPL महिलाएं जिनके घर में पहले से LPG कनेक्शन नहीं है। SECC सूचीबद्ध परिवार, SC/ST घर, PMAY-G लाभार्थी, अंत्योदय अन्न योजना लाभार्थी, वन निवासी और चाय बागान श्रमिक पात्र हैं।',
    eligibilityTa: '18 வயதுக்கு மேற்பட்ட BPL பெண்கள், வீட்டில் LPG இணைப்பு இல்லாதவர்கள். SECC பட்டியல் குடும்பங்கள், SC/ST வீடுகள், PMAY-G பயனாளிகள் தகுதியுடையவர்கள்.',

    documents: [
      'Aadhaar card of the woman applicant',
      'BPL ration card or SECC-2011 inclusion proof',
      'Proof that no existing LPG connection in household',
      'Bank account passbook (for subsidy DBT)',
      'Passport-size photograph',
      'Self-declaration of no existing LPG connection'
    ],
    documentsHi: [
      'महिला आवेदक का आधार कार्ड',
      'BPL राशन कार्ड या SECC-2011 समावेश प्रमाण',
      'घर में कोई मौजूदा LPG कनेक्शन नहीं है इसका प्रमाण',
      'बैंक खाता पासबुक (सब्सिडी DBT के लिए)',
      'पासपोर्ट साइज फोटो',
      'कोई मौजूदा LPG कनेक्शन नहीं की स्व-घोषणा'
    ],
    documentsTa: [
      'பெண் விண்ணப்பதாரரின் ஆதார் அட்டை',
      'BPL ரேஷன் அட்டை அல்லது SECC-2011 சேர்க்கை சான்று',
      'வீட்டில் LPG இணைப்பு இல்லை என்பதற்கான சான்று',
      'வங்கி கணக்கு பாஸ்புக் (மானிய DBT க்கு)',
      'பாஸ்போர்ட் அளவு புகைப்படம்',
      'LPG இணைப்பு இல்லை என சுய அறிவிப்பு'
    ],

    keywords: ['LPG', 'gas', 'cylinder', 'cooking', 'ujjwala', 'fuel', 'stove', 'BPL', 'woman', 'chulha', 'gas connection', 'kerosene', 'smoke', 'rसोई gas', 'rasoi'],
    targetGroups: ['woman', 'poor', 'rural'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: true
  },

  {
    id: 'mgnregs',
    name: 'MGNREGS / NREGA (Mahatma Gandhi National Rural Employment Guarantee Scheme)',
    nameHi: 'मनरेगा / नरेगा (महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना)',
    nameTa: 'MGNREGS / NREGA (மகாத்மா காந்தி தேசிய கிராமப்புற வேலைவாய்ப்பு உத்தரவாத திட்டம்)',

    benefit: 'Guaranteed 100 days of unskilled manual work per household per year at minimum wage (₹267/day nationally, varies by state). Unemployment allowance if work not provided within 15 days.',
    benefitHi: 'प्रति परिवार प्रति वर्ष न्यूनतम मजदूरी (राष्ट्रीय स्तर पर ₹267/दिन, राज्यवार भिन्न) पर 100 दिनों के अकुशल शारीरिक कार्य की गारंटी। 15 दिनों के भीतर काम न मिलने पर बेरोजगारी भत्ता।',
    benefitTa: 'குடும்பத்திற்கு ஆண்டுக்கு 100 நாட்கள் திறமையற்ற உடல் உழைப்பு குறைந்தபட்ச கூலியில் (தேசிய அளவில் ₹267/நாள்) உத்தரவாதம். 15 நாட்களில் வேலை கிடைக்காவிட்டால் வேலையின்மை கொடுப்பனவு.',

    eligibility: 'Any adult (18+) member of a rural household who is willing to do unskilled manual work. The household must reside in a rural area (gram panchayat). No income or caste restriction — open to all rural households. Must register for a job card at the local Gram Panchayat.',
    eligibilityHi: 'ग्रामीण घर का कोई भी वयस्क (18+) सदस्य जो अकुशल शारीरिक काम करने को तैयार हो। घर ग्रामीण क्षेत्र (ग्राम पंचायत) में होना चाहिए। कोई आय या जाति प्रतिबंध नहीं — सभी ग्रामीण परिवारों के लिए खुला है।',
    eligibilityTa: 'ஏதாவது திறமையற்ற உடல் உழைப்பு செய்ய தயாராக இருக்கும் கிராமப்புற குடும்பத்தின் எந்த வயது வந்தவரும் (18+). வருமான அல்லது சாதி கட்டுப்பாடு இல்லை — அனைத்து கிராமப்புற குடும்பங்களுக்கும் திறந்தது.',

    documents: [
      'MGNREGS / NREGA Job Card (obtained from Gram Panchayat)',
      'Aadhaar card for identity and DBT',
      'Bank or post office account passbook',
      'Passport-size photograph',
      'Residence proof (rural address)'
    ],
    documentsHi: [
      'मनरेगा / नरेगा जॉब कार्ड (ग्राम पंचायत से प्राप्त)',
      'पहचान और DBT के लिए आधार कार्ड',
      'बैंक या डाकघर खाता पासबुक',
      'पासपोर्ट साइज फोटो',
      'निवास प्रमाण (ग्रामीण पता)'
    ],
    documentsTa: [
      'MGNREGS / NREGA வேலை அட்டை (கிராம பஞ்சாயத்தில் இருந்து பெறவும்)',
      'அடையாளம் மற்றும் DBT க்கு ஆதார் அட்டை',
      'வங்கி அல்லது தபால் நிலைய கணக்கு பாஸ்புக்',
      'பாஸ்போர்ட் அளவு புகைப்படம்',
      'வசிப்பிட சான்று (கிராமப்புற முகவரி)'
    ],

    keywords: ['work', 'employment', 'job', 'wage', 'labour', 'nrega', 'mgnrega', 'rural work', 'job card', 'rozgar', 'mazdoor', 'unskilled', '100 days', 'guarantee', 'panchayat'],
    targetGroups: ['rural', 'poor', 'farmer'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  },

  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    nameHi: 'सुकन्या समृद्धि योजना (एसएसवाई)',
    nameTa: 'சுகன்யா சம்ரிதி யோஜனா (SSY)',

    benefit: 'Government-backed savings scheme for girl children offering 8.2% annual interest (tax-free under Section 80C). Minimum deposit ₹250/year; maximum ₹1.5 lakh/year. Matures when girl turns 21.',
    benefitHi: 'बालिकाओं के लिए सरकार समर्थित बचत योजना जो 8.2% वार्षिक ब्याज (धारा 80C के तहत कर-मुक्त) देती है। न्यूनतम जमा ₹250/वर्ष; अधिकतम ₹1.5 लाख/वर्ष। बालिका के 21 वर्ष होने पर परिपक्व।',
    benefitTa: 'பெண் குழந்தைகளுக்கான அரசு ஆதரவு சேமிப்புத் திட்டம் 8.2% வருடாந்திர வட்டி (பிரிவு 80C இல் வரிவிலக்கு). குறைந்தபட்ச வைப்பு ₹250/ஆண்டு; அதிகபட்சம் ₹1.5 லட்சம்/ஆண்டு.',

    eligibility: 'Any Indian girl child below the age of 10 years. Account can be opened by the natural/legal guardian (parent) at any post office or authorised bank. Maximum two accounts per family (one per girl child); exception for twins/triplets. Girl must be an Indian resident.',
    eligibilityHi: '10 वर्ष से कम उम्र की कोई भी भारतीय बालिका। किसी भी डाकघर या अधिकृत बैंक में प्राकृतिक/कानूनी अभिभावक (माता-पिता) द्वारा खाता खोला जा सकता है। प्रति परिवार अधिकतम दो खाते (प्रति बालिका एक); जुड़वां/तीन बच्चों के लिए अपवाद।',
    eligibilityTa: '10 வயதுக்கு குறைவான எந்த இந்திய பெண் குழந்தையும். எந்த தபால் நிலையம் அல்லது அங்கீகரிக்கப்பட்ட வங்கியிலும் பெற்றோரால் கணக்கு திறக்கலாம். குடும்பத்திற்கு அதிகபட்சம் இரண்டு கணக்குகள்.',

    documents: [
      "Girl child's birth certificate",
      "Parent/guardian's Aadhaar card and PAN card",
      "Parent/guardian's passport-size photograph",
      'Address proof (Aadhaar / Voter ID / Utility bill)',
      'Initial deposit (minimum ₹250)'
    ],
    documentsHi: [
      'बालिका का जन्म प्रमाण पत्र',
      'माता-पिता/अभिभावक का आधार कार्ड और पैन कार्ड',
      'माता-पिता/अभिभावक की पासपोर्ट साइज फोटो',
      'पता प्रमाण (आधार / मतदाता पहचान पत्र / उपयोगिता बिल)',
      'प्रारंभिक जमा (न्यूनतम ₹250)'
    ],
    documentsTa: [
      'பெண் குழந்தையின் பிறப்பு சான்றிதழ்',
      'பெற்றோர்/பாதுகாவலரின் ஆதார் அட்டை மற்றும் PAN அட்டை',
      'பெற்றோர்/பாதுகாவலரின் பாஸ்போர்ட் அளவு புகைப்படம்',
      'முகவரி சான்று (ஆதார் / வாக்காளர் அட்டை / பயன்பாட்டு பில்)',
      'ஆரம்ப வைப்பு (குறைந்தபட்சம் ₹250)'
    ],

    keywords: ['girl', 'daughter', 'savings', 'interest', 'sukanya', 'beti', 'education', 'marriage', 'investment', 'post office', 'bank account', '8.2', 'beti bachao', 'ladki', 'ponnu'],
    targetGroups: ['woman'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  },

  {
    id: 'pm-matru-vandana',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nameHi: 'प्रधानमंत्री मातृ वंदना योजना (पीएमएमवीवाई)',
    nameTa: 'பிரதான் மந்திரி மாத்ரு வந்தன யோஜனா (PMMVY)',

    benefit: '₹5,000 maternity benefit paid in three instalments (₹1,000 on pregnancy registration, ₹2,000 after first ante-natal check-up, ₹2,000 after child birth and first vaccination cycle) for the first living child.',
    benefitHi: 'पहले जीवित बच्चे के लिए तीन किस्तों में ₹5,000 मातृत्व लाभ (गर्भावस्था पंजीकरण पर ₹1,000, पहली प्रसवपूर्व जांच के बाद ₹2,000, प्रसव और पहले टीकाकरण चक्र के बाद ₹2,000)।',
    benefitTa: 'முதல் உயிருள்ள குழந்தைக்கு மூன்று தவணைகளில் ₹5,000 மகப்பேறு நலன் (கர்ப்ப பதிவில் ₹1,000, முதல் ANC பரிசோதனைக்கு பிறகு ₹2,000, பிரசவம் மற்றும் முதல் தடுப்பூசிக்கு பிறகு ₹2,000).',

    eligibility: 'Pregnant women and lactating mothers who are pregnant for the first time and are 19 years of age or above. Applicable for the first living child only. Central government employees and those already receiving similar maternity benefits are excluded.',
    eligibilityHi: '19 वर्ष या उससे अधिक उम्र की पहली बार गर्भवती महिलाएं और स्तनपान कराने वाली माताएं। केवल पहले जीवित बच्चे के लिए लागू। केंद्र सरकार की कर्मचारी और पहले से समान मातृत्व लाभ पाने वाली महिलाएं बाहर।',
    eligibilityTa: '19 வயதுக்கு மேற்பட்ட முதன்முறையாக கர்ப்பமாக இருக்கும் பெண்கள் மற்றும் தாய்ப்பால் கொடுக்கும் தாய்மார்கள். முதல் உயிருள்ள குழந்தைக்கு மட்டுமே பொருந்தும். மத்திய அரசு ஊழியர்கள் விலக்கு.',

    documents: [
      'Aadhaar card of the pregnant woman',
      'Bank account passbook (for DBT)',
      'Mother and Child Protection (MCP) card from ASHA/ANM',
      'Pregnancy registration proof from health centre',
      'Husband/partner Aadhaar card',
      'Proof of first pregnancy (self-declaration)'
    ],
    documentsHi: [
      'गर्भवती महिला का आधार कार्ड',
      'बैंक खाता पासबुक (DBT के लिए)',
      'ASHA/ANM से मातृ और शिशु सुरक्षा (MCP) कार्ड',
      'स्वास्थ्य केंद्र से गर्भावस्था पंजीकरण प्रमाण',
      'पति/साथी का आधार कार्ड',
      'पहली गर्भावस्था का प्रमाण (स्व-घोषणा)'
    ],
    documentsTa: [
      'கர்ப்பிணி பெண்ணின் ஆதார் அட்டை',
      'வங்கி கணக்கு பாஸ்புக் (DBT க்கு)',
      'ASHA/ANM இலிருந்து தாய் மற்றும் குழந்தை பாதுகாப்பு (MCP) அட்டை',
      'சுகாதார மையத்தில் இருந்து கர்ப்ப பதிவு சான்று',
      'கணவர்/துணையின் ஆதார் அட்டை',
      'முதல் கர்ப்பம் என்பதற்கான சான்று (சுய அறிவிப்பு)'
    ],

    keywords: ['pregnant', 'maternity', 'mother', 'baby', 'child birth', 'pmmvy', 'matru vandana', 'antenatal', 'lactating', 'nursing', 'garbhvati', 'maa', 'shishu', 'delivery', 'first child'],
    targetGroups: ['woman', 'pregnant'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: true
  },

  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi (PM Street Vendor\'s AtmaNirbhar Nidhi)',
    nameHi: 'पीएम स्वनिधि (पीएम स्ट्रीट वेंडर\'स आत्मनिर्भर निधि)',
    nameTa: 'பிஎம் SVANidhi (பிரதான் மந்திரி தெரு வியாபாரிகள் ஆத்மநிர்பார் நிதி)',

    benefit: '₹10,000 initial working capital microloan (collateral-free) with 7% interest subsidy. On timely repayment, eligible for ₹20,000 loan (2nd tranche) and ₹50,000 (3rd tranche). Additional cashback incentive of up to ₹1,200/year for digital transactions.',
    benefitHi: '₹10,000 प्रारंभिक कार्यशील पूंजी माइक्रोलोन (बिना जमानत के) 7% ब्याज सब्सिडी के साथ। समय पर चुकाने पर ₹20,000 (दूसरी किस्त) और ₹50,000 (तीसरी किस्त) लोन के पात्र। डिजिटल लेनदेन के लिए ₹1,200/वर्ष तक कैशबैक प्रोत्साहन।',
    benefitTa: '₹10,000 ஆரம்ப பணி மூலதன நுண்கடன் (பிணை இல்லாமல்) 7% வட்டி மானியத்துடன். சரியான நேரத்தில் திருப்பிச் செலுத்தினால் ₹20,000 (2வது தவணை) மற்றும் ₹50,000 (3வது தவணை) கடனுக்கு தகுதி. டிஜிட்டல் பரிவர்த்தனைகளுக்கு ₹1,200/ஆண்டு வரை கேஷ்பேக்.',

    eligibility: 'Street vendors who were vending on or before March 24, 2020, in urban areas. Must have a Certificate of Vending from the Town Vending Committee (TVC) or a Letter of Recommendation from ULB/TVC. Includes vendors operating from fixed locations as well as mobile vendors (thela, rehri).',
    eligibilityHi: '24 मार्च 2020 को या उससे पहले शहरी क्षेत्रों में काम कर रहे स्ट्रीट वेंडर। टाउन वेंडिंग कमेटी (TVC) से वेंडिंग प्रमाण पत्र या ULB/TVC से सिफारिश पत्र होना चाहिए। स्थिर स्थानों से और मोबाइल विक्रेताओं (ठेला, रेहड़ी) दोनों के लिए।',
    eligibilityTa: 'மார்ச் 24, 2020 அல்லது அதற்கு முன்பு நகர்ப்புறங்களில் வியாபாரம் செய்த தெரு வியாபாரிகள். நகர வெண்டிங் குழுவிடம் வெண்டிங் சான்றிதழ் அல்லது ULB/TVC இடம் பரிந்துரை கடிதம் வேண்டும்.',

    documents: [
      'Aadhaar card',
      'Certificate of Vending / Letter of Recommendation from TVC or ULB',
      'Bank account passbook or details',
      'Mobile number for OTP',
      'Photograph',
      'Declaration of street vending activity'
    ],
    documentsHi: [
      'आधार कार्ड',
      'TVC या ULB से वेंडिंग प्रमाण पत्र / सिफारिश पत्र',
      'बैंक खाता पासबुक या विवरण',
      'OTP के लिए मोबाइल नंबर',
      'फोटोग्राफ',
      'स्ट्रीट वेंडिंग गतिविधि की घोषणा'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'TVC அல்லது ULB இலிருந்து வெண்டிங் சான்றிதழ் / பரிந்துரை கடிதம்',
      'வங்கி கணக்கு பாஸ்புக் அல்லது விவரங்கள்',
      'OTP க்கு மொபைல் எண்',
      'புகைப்படம்',
      'தெரு வியாபார செயல்பாட்டின் அறிவிப்பு'
    ],

    keywords: ['street vendor', 'vendor', 'thela', 'rehri', 'loan', 'microloan', 'working capital', 'svanidhi', 'hawker', 'pheriwala', 'vending', 'cart', 'sabzi', 'fruit seller', 'tea stall'],
    targetGroups: ['street_vendor', 'poor'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  },

  {
    id: 'pmkvy',
    name: 'PMKVY (Pradhan Mantri Kaushal Vikas Yojana)',
    nameHi: 'पीएमकेवीवाई (प्रधानमंत्री कौशल विकास योजना)',
    nameTa: 'PMKVY (பிரதான் மந்திரி கௌஷல் விகாஸ் யோஜனா)',

    benefit: 'Free short-term skill training (3 months to 1 year) in 40+ sectors aligned to National Occupational Standards. Post-training monetary reward of ₹8,000 and placement assistance. Certificate recognised by government and industry.',
    benefitHi: 'राष्ट्रीय व्यावसायिक मानकों के अनुरूप 40+ क्षेत्रों में नि:शुल्क अल्पकालिक कौशल प्रशिक्षण (3 महीने से 1 वर्ष)। प्रशिक्षण के बाद ₹8,000 की मौद्रिक पुरस्कार और प्लेसमेंट सहायता।',
    benefitTa: '40+ துறைகளில் இலவச குறுகிய-கால திறன் பயிற்சி (3 மாதம் முதல் 1 வருடம்). பயிற்சிக்கு பிறகு ₹8,000 பண வெகுமதி மற்றும் வேலைவாய்ப்பு உதவி.',

    eligibility: 'Indian youth between 15 and 45 years of age. Open to school dropouts, graduates, and unemployed youth. For Recognition of Prior Learning (RPL) track: workers with prior experience aged 15–59. No income or caste restrictions.',
    eligibilityHi: '15 से 45 वर्ष की आयु के भारतीय युवा। स्कूल छोड़ने वाले, स्नातक और बेरोजगार युवाओं के लिए खुला। पूर्व शिक्षा की मान्यता (RPL) ट्रैक के लिए: 15-59 वर्ष की आयु के पूर्व अनुभव वाले श्रमिक।',
    eligibilityTa: '15 முதல் 45 வயதுக்கிடைப்பட்ட இந்திய இளைஞர்கள். பள்ளி நடுவிலே விட்டவர்கள், பட்டதாரிகள் மற்றும் வேலையில்லாத இளைஞர்களுக்கு திறந்தது.',

    documents: [
      'Aadhaar card',
      'Educational qualification certificates (if any)',
      'Bank account passbook (for stipend/reward)',
      'Passport-size photograph',
      'Mobile number'
    ],
    documentsHi: [
      'आधार कार्ड',
      'शैक्षिक योग्यता प्रमाण पत्र (यदि हो)',
      'बैंक खाता पासबुक (वजीफा/पुरस्कार के लिए)',
      'पासपोर्ट साइज फोटो',
      'मोबाइल नंबर'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'கல்வி தகுதி சான்றிதழ்கள் (ஏதேனும் இருந்தால்)',
      'வங்கி கணக்கு பாஸ்புக் (உதவித்தொகை/வெகுமதிக்கு)',
      'பாஸ்போர்ட் அளவு புகைப்படம்',
      'மொபைல் எண்'
    ],

    keywords: ['skill', 'training', 'pmkvy', 'course', 'certificate', 'youth', 'employment', 'kaushal', 'job', 'vocational', 'career', 'computer', 'electrician', 'plumber', 'stipend', '8000'],
    targetGroups: ['youth'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  },

  {
    id: 'jan-dhan',
    name: 'PM Jan Dhan Yojana (PMJDY)',
    nameHi: 'पीएम जन धन योजना (पीएमजेडीवाई)',
    nameTa: 'பிஎம் ஜன் தன் யோஜனா (PMJDY)',

    benefit: 'Zero-balance savings bank account with RuPay debit card and ₹2 lakh accidental insurance cover. ₹10,000 overdraft facility after 6 months. Access to pension, insurance, and credit products through the banking system.',
    benefitHi: 'रुपे डेबिट कार्ड और ₹2 लाख दुर्घटना बीमा कवर के साथ जीरो-बैलेंस बचत बैंक खाता। 6 महीने बाद ₹10,000 ओवरड्राफ्ट सुविधा। बैंकिंग प्रणाली के माध्यम से पेंशन, बीमा और ऋण उत्पादों तक पहुंच।',
    benefitTa: 'ரூபே டெபிட் கார்டு மற்றும் ₹2 லட்சம் விபத்து காப்பீட்டு கவர் உடன் ஜீரோ-பேலன்ஸ் சேமிப்பு வங்கி கணக்கு. 6 மாதங்களுக்கு பிறகு ₹10,000 ஓவர்டிராஃப்ட் வசதி.',

    eligibility: 'Any Indian citizen aged 10 or above who does not have a bank account. No minimum balance required. KYC documents needed. Special focus on unbanked poor, women, rural residents, and migrant workers. Even small children (10+) can open a minor account.',
    eligibilityHi: '10 वर्ष या उससे अधिक उम्र का कोई भी भारतीय नागरिक जिसके पास बैंक खाता नहीं है। न्यूनतम बैलेंस की आवश्यकता नहीं। KYC दस्तावेज जरूरी। बिना बैंक सुविधा वाले गरीब, महिलाओं, ग्रामीण निवासियों और प्रवासी श्रमिकों पर विशेष ध्यान।',
    eligibilityTa: 'வங்கி கணக்கு இல்லாத 10 வயதுக்கு மேற்பட்ட எந்த இந்திய குடிமகனும். குறைந்தபட்ச இருப்பு தேவையில்லை. KYC ஆவணங்கள் தேவை. வங்கி வசதியற்ற ஏழைகள், பெண்கள், கிராமப்புற மக்கள் மற்றும் குடியேற்றத் தொழிலாளர்களுக்கு சிறப்பு கவனம்.',

    documents: [
      'Aadhaar card (or any officially valid document)',
      'Passport-size photograph',
      'Mobile number',
      'Address proof if Aadhaar address is different'
    ],
    documentsHi: [
      'आधार कार्ड (या कोई आधिकारिक रूप से मान्य दस्तावेज)',
      'पासपोर्ट साइज फोटो',
      'मोबाइल नंबर',
      'पता प्रमाण अगर आधार का पता अलग हो'
    ],
    documentsTa: [
      'ஆதார் அட்டை (அல்லது எந்த அதிகாரப்பூர்வமாக செல்லுபடியாகும் ஆவணம்)',
      'பாஸ்போர்ட் அளவு புகைப்படம்',
      'மொபைல் எண்',
      'ஆதார் முகவரி வேறாக இருந்தால் முகவரி சான்று'
    ],

    keywords: ['bank account', 'banking', 'jan dhan', 'zero balance', 'rupay', 'debit card', 'unbanked', 'financial inclusion', 'account', 'insurance', 'khata', 'overdraft', 'savings', 'DBT'],
    targetGroups: ['unbanked', 'poor', 'rural', 'woman'],
    incomeLimit: null,
    requiresLand: false,
    requiresFemale: false
  }
];

module.exports = { SCHEMES };
